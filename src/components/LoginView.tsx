import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle,
  LockKeyhole,
  Sun,
  Moon,
  Database,
  CheckCircle2,
  UserPlus,
  LogIn,
  KeyRound,
  Info
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

interface LoginViewProps {
  onLogin: (role: 'student' | 'faculty' | 'admin', user?: any) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

type Role = 'student' | 'faculty' | 'admin';
type AuthMode = 'signin' | 'signup';

export function LoginView({ onLogin, isDarkMode, onToggleTheme }: LoginViewProps) {
  const [role, setRole] = useState<Role>('student');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI Status States
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fallback direct static login behavior for Sandbox testing
  const handleLocalBypass = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 600);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (!email || !password) {
      setError('Please provide both academic email and secure password.');
      return;
    }

    if (authMode === 'signup' && !fullName) {
      setError('Full Name is required to build your academic profile.');
      return;
    }

    setIsLoading(true);

    // If Supabase is not configured, fallback to Sandbox login immediately
    if (!isSupabaseConfigured || !supabase) {
      setTimeout(() => {
        setIsLoading(false);
        onLogin(role);
      }, 700);
      return;
    }

    try {
      if (authMode === 'signin') {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (authError) {
          throw authError;
        }

        if (data?.user) {
          // Read user role from metadata, defaulting to chosen role if not stored yet
          const userRole = (data.user.user_metadata?.role as Role) || role;
          onLogin(userRole, data.user);
        }
      } else {
        // Sign up flow
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              role: role,
              full_name: fullName.trim(),
              enrollment_no: enrollmentNo.trim() || undefined,
            }
          }
        });

        if (authError) {
          throw authError;
        }

        // Check if session is auto-established (depends on Supabase settings)
        if (data?.session?.user) {
          setInfoMessage('Registration successful! Launching academic session...');
          setTimeout(() => {
            onLogin(role, data.session?.user);
          }, 1500);
        } else {
          setInfoMessage('Account created! You can now switch to "Sign In" to authenticate with your password.');
          setAuthMode('signin');
        }
      }
    } catch (err: any) {
      console.error('Supabase authentication failed:', err);
      setError(err.message || 'Verification of credentials failed. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles: { id: Role; label: string; icon: React.ElementType; description: string }[] = [
    { 
      id: 'student', 
      label: 'Student Portal', 
      icon: GraduationCap,
      description: 'Access class schedules, grades, digital assignments, and academic progress.'
    },
    { 
      id: 'faculty', 
      label: 'Faculty Console', 
      icon: User,
      description: 'Manage digital gradebooks, track daily attendance, and configure curriculum.'
    },
    { 
      id: 'admin', 
      label: 'Admin Workspace', 
      icon: ShieldCheck,
      description: 'Configure institutional settings, adjust roles, and verify server health.'
    },
  ];

  const currentRoleGlow = role === 'student' ? 'rgba(59,130,246,0.15)' : role === 'faculty' ? 'rgba(16,185,129,0.15)' : 'rgba(168,85,247,0.15)';

  return (
    <div className="min-h-screen w-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-100 relative overflow-hidden flex items-center justify-center p-3 sm:p-6 md:p-8 font-sans selection:bg-blue-900/40 selection:text-blue-100 transition-colors duration-300">
      
      {/* Dynamic Ambient Background Illumination */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full blur-[150px] pointer-events-none opacity-20 transition-all duration-700 ease-in-out animate-pulse" 
        style={{ backgroundColor: role === 'student' ? '#2563eb' : role === 'faculty' ? '#059669' : '#7c3aed' }}
      />
      <div className="absolute bottom-10 right-10 w-[40vw] h-[40vh] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Overlay for Visual Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a10_1px,transparent_1px),linear-gradient(to_bottom,#0f172a10_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a50_1px,transparent_1px),linear-gradient(to_bottom,#0f172a50_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Spacious Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-4xl bg-white/80 dark:bg-[#0b1329]/50 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-slate-800/80 p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all duration-300 relative z-10"
        style={{
          boxShadow: isDarkMode 
            ? `0 15px 40px -15px ${currentRoleGlow}, 0 0 1px 1px rgba(255,255,255,0.02)` 
            : `0 15px 40px -15px rgba(59,130,246,0.08)`
        }}
      >
        
        {/* Dynamic theme switch toggle button embedded smoothly in top-right */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2">
          {isSupabaseConfigured ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-wide">
              <Database className="h-3 w-3" />
              <span>Real Auth Connected</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold tracking-wide">
              <Database className="h-3 w-3" />
              <span>Sandbox Offline Mode</span>
            </div>
          )}

          <button
            onClick={onToggleTheme}
            type="button"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/40 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-950/80 transition-colors shadow-sm cursor-pointer"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-600" />}
          </button>
        </div>

        {/* Top Header Section */}
        <div className="text-center mb-6 space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Institutional Identity Service
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2.5">
            <GraduationCap className="h-7 w-7 text-blue-500 shrink-0" />
            <span>MITS Academic Ecosystem</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Unified login workspace. Coordinate courses, verify continuous grade metrics, and access administrative modules.
          </p>
        </div>

        {/* Spacious Grid-based Role Selector */}
        <div className="mb-6 space-y-2">
          <label className="block text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
            1. Select Account Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {roles.map((r) => {
              const isSelected = role === r.id;
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id);
                    setError('');
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-300 relative group flex flex-col justify-between min-h-[105px] sm:min-h-[110px] select-none cursor-pointer ${
                    isSelected
                      ? 'bg-slate-50 dark:bg-slate-950/60 border-blue-500/80 dark:border-blue-500/50 shadow-[0_4px_20px_rgba(59,130,246,0.08)] dark:shadow-[0_4px_20px_rgba(59,130,246,0.1)]'
                      : 'bg-slate-50/20 dark:bg-slate-950/10 hover:bg-slate-50 dark:hover:bg-slate-950/40 border-slate-200 dark:border-slate-900/60 hover:border-slate-300 dark:hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                      isSelected 
                        ? (role === 'student' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' : role === 'faculty' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-purple-500/15 text-purple-600 dark:text-purple-400')
                        : 'bg-slate-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                    }`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isSelected
                        ? (role === 'student' ? 'bg-blue-500 ring-2 ring-blue-500/25' : role === 'faculty' ? 'bg-emerald-500 ring-2 ring-emerald-500/25' : 'bg-purple-500 ring-2 ring-purple-500/25')
                        : 'bg-transparent border border-slate-300 dark:border-slate-800'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs sm:text-sm transition-colors duration-200 ${isSelected ? 'text-slate-950 dark:text-white' : 'text-slate-650 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white'}`}>
                      {r.label}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Credentials Form Section */}
        <div className="max-w-xl mx-auto w-full space-y-4">
          
          {/* Auth Switcher Menu Tab */}
          <div className="flex border-b border-slate-200 dark:border-slate-800/80 mb-2">
            <button
              onClick={() => { setAuthMode('signin'); setError(''); }}
              type="button"
              className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold tracking-wide transition-colors relative cursor-pointer ${
                authMode === 'signin' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <LogIn className="h-4 w-4" />
                <span>2. Sign In to {role.toUpperCase()}</span>
              </span>
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setError(''); }}
              type="button"
              className={`flex-1 pb-2.5 text-xs sm:text-sm font-bold tracking-wide transition-colors relative cursor-pointer ${
                authMode === 'signup' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
                  : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <UserPlus className="h-4 w-4" />
                <span>2. Create {role.toUpperCase()} Account</span>
              </span>
            </button>
          </div>

          {!isSupabaseConfigured && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 p-3 rounded-xl flex items-start gap-2.5 text-xs">
              <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="font-semibold">Bypass local sandbox ready:</span> You can either type dummy values and click authenticate for local validation fallback, or add client variables <strong>`VITE_SUPABASE_URL`</strong> and <strong>`VITE_SUPABASE_ANON_KEY`</strong> in settings to switch to real DB authentication immediately!
              </div>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            <div className="flex flex-col gap-4">
              
              {/* Conditional Name and Reg ID logic during sign-up */}
              {authMode === 'signup' && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="space-y-1.5">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-950/60 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 focus:border-blue-500 text-slate-900 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/10 text-xs sm:text-sm placeholder-slate-450 dark:placeholder-slate-500 font-medium transition-all outline-none"
                        placeholder="e.g. Vedant Saxena"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                      {role === 'student' ? 'Enrollment Number' : role === 'faculty' ? 'Faculty ID Code' : 'Admin Code'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <KeyRound className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={enrollmentNo}
                        onChange={(e) => setEnrollmentNo(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-950/60 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 focus:border-blue-500 text-slate-900 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/10 text-xs sm:text-sm placeholder-slate-450 dark:placeholder-slate-500 font-medium transition-all outline-none"
                        placeholder={role === 'student' ? 'e.g. BTIO25O1142' : role === 'faculty' ? 'e.g. F-1029' : 'e.g. AD-090'}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Email/ID Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
                  Academic Email ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-950/60 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 focus:border-blue-500 text-slate-900 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/10 text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-600 font-medium transition-all outline-none"
                    placeholder="e.g. student@mits.edu"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-1">
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Secure Password
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Use standard Supabase Auth recovery console if configured."); }} className="text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Reset Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <LockKeyhole className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-50 dark:hover:bg-slate-950/60 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 focus:border-blue-500 text-slate-900 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/10 text-xs sm:text-sm placeholder-slate-400 dark:placeholder-slate-600 font-medium transition-all outline-none"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-red-500 dark:text-red-400 bg-red-100/50 dark:bg-red-950/25 py-2 px-3 rounded-xl border border-red-200 dark:border-red-900/30 flex items-center gap-2 font-medium"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-550 dark:text-red-400" />
                <span>{error}</span>
              </motion.div>
            )}

            {infoMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/25 py-2 px-3 rounded-xl border border-emerald-200 dark:border-emerald-900/30 flex items-center gap-2 font-medium"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-550 dark:text-emerald-400" />
                <span>{infoMessage}</span>
              </motion.div>
            )}

            {/* Authentication Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-2.5 sm:py-3 px-5 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 text-xs sm:text-sm shadow-md cursor-pointer ${
                  role === 'student' 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10' 
                    : role === 'faculty' 
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10' 
                      : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/10'
                }`}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authMode === 'signin' ? 'Verify Secure Session' : 'Create Real Account'}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {!isSupabaseConfigured && (
                <button
                  type="button"
                  onClick={handleLocalBypass}
                  className="py-2.5 sm:py-3 px-4 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-250 dark:border-slate-800 transition-colors rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  Bypass Local Login
                </button>
              )}
            </div>
          </form>

          {/* IT Support Desk Helper */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-center text-[11px] sm:text-xs">
            <p className="text-slate-400 dark:text-slate-500">
              Experiencing portal handshake issues? Contact the{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Campus Tech Help Desk: ext 405 / tech@mits.edu"); }} className="font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white underline underline-offset-4 transition-colors">
                MITS Technical Operations Desk
              </a>
            </p>
          </div>

        </div>

      </motion.div>

    </div>
  );
}
