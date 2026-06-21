import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginViewProps {
  onLogin: (role: 'student' | 'faculty' | 'admin') => void;
}

type Role = 'student' | 'faculty' | 'admin';

export function LoginView({ onLogin }: LoginViewProps) {
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 1000);
  };

  const roles: { id: Role; label: string; icon: React.ElementType }[] = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'faculty', label: 'Faculty', icon: User },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen inset-0 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 selection:bg-blue-100 dark:bg-blue-900/40 selection:text-blue-900 dark:selection:bg-blue-900/40 dark:selection:text-blue-100 relative overflow-hidden transition-colors duration-300">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-600 to-slate-50 dark:to-slate-950 opacity-10 dark:opacity-5 blur-3xl mix-blend-multiply dark:mix-blend-screen pointer-events-none -z-10"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-10 dark:opacity-5 pointer-events-none -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
      >
        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-slate-900 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-700/50">
              <GraduationCap className="h-6 w-6 text-white dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Portal Access</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your academic account</p>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${
                  role === r.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-600/50'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <r.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-0.5">
                Email / ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-400" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-900 dark:text-slate-100"
                  placeholder={`Enter your ${role} ID`}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-300 transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500 dark:text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-900 dark:text-slate-100"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 dark:bg-red-500 dark:bg-red-600/10 py-2 px-3 rounded-lg border border-red-100 dark:border-red-500/20 flex items-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Log in to Portal
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Need help? Contact <a href="#" className="font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-100 underline underline-offset-2">IT Support</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
