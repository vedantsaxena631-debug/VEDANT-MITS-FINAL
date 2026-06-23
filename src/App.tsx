import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { FacultyDashboardView } from './components/FacultyDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { StudentsView } from './components/StudentsView';
import { CoursesView } from './components/CoursesView';
import { AttendanceView } from './components/AttendanceView';
import { FacultyAttendanceView } from './components/FacultyAttendanceView';
import { FacultyScheduleView } from './components/FacultyScheduleView';
import { FacultyGradesView } from './components/FacultyGradesView';
import { FacultyMaterialsView } from './components/FacultyMaterialsView';
import { FacultyAssignmentsView } from './components/FacultyAssignmentsView';
import { FacultyQuizzesView } from './components/FacultyQuizzesView';
import { FacultySubmissionsView } from './components/FacultySubmissionsView';
import { FacultyLeaveView } from './components/FacultyLeaveView';
import { AssignmentsView } from './components/AssignmentsView';
import { EventsView } from './components/EventsView';
import { ResultsView } from './components/ResultsView';
import { GrievanceView } from './components/GrievanceView';
import { MapView } from './components/MapView';
import { TimetableView } from './components/TimetableView';
import { ExamsView } from './components/ExamsView';
import { FeesView } from './components/FeesView';
import { PlacementsView } from './components/PlacementsView';
import { ClubsView } from './components/ClubsView';
import { HostelView } from './components/HostelView';
import { InternshipsView } from './components/InternshipsView';
import { ProfileView } from './components/ProfileView';
import { DownloadsView } from './components/DownloadsView';
import { NotificationPanel } from './components/NotificationPanel';
import { ChatBot } from './components/ChatBot';
import { LoginView } from './components/LoginView';
import { studentData } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageSquareText, Bell, Search, LogOut, Sun, Moon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          return savedTheme === 'dark';
        }
      } catch (e) {
        console.warn('Unable to access localStorage:', e);
      }
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (e) {
        console.warn('Unable to query matchMedia:', e);
      }
    }
    return false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'admin' | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        console.warn('Unable to set localStorage:', e);
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        console.warn('Unable to set localStorage:', e);
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Get current session initially
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        setUserRole((session.user.user_metadata?.role as any) || 'student');
        setIsLoggedIn(true);
      }
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        setUserRole((session.user.user_metadata?.role as any) || 'student');
        setIsLoggedIn(true);
      } else {
        setSupabaseUser(null);
        setUserRole(null);
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (role: 'student' | 'faculty' | 'admin', user?: SupabaseUser) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if (user) {
      setSupabaseUser(user);
    }
    setActiveTab('dashboard'); // Redirect to dashboard conceptually
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setSupabaseUser(null);
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <LoginView 
        onLogin={handleLogin} 
        isDarkMode={isDarkMode} 
        onToggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans transition-colors duration-300">
      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-10 lg:hidden backdrop-blur-sm" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} role={userRole || 'student'} onLogout={handleLogout} />
      </div>
      
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 transition-colors duration-300">
          <div className="flex items-center">
            <button 
              className="mr-3 lg:hidden p-1.5 -ml-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <h1 className="font-sans font-semibold tracking-tight text-slate-800 dark:text-slate-100 text-sm sm:text-base hidden md:block">
              MITS
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-4 flex items-center">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                 <Search className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search commands, resources, or ask AI..." 
                className="w-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent rounded-full py-1.5 pl-8 pr-4 text-xs text-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-300 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 outline-none transition-all placeholder:text-slate-500 dark:placeholder:text-slate-400"
                onClick={() => setIsChatBotOpen(true)}
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                 <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">⌘K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={() => setNotificationsOpen(true)}
              className="relative p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-500 border border-white blur-[0.2px]"></span>
            </button>
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3 sm:pl-4">
              <div className="text-right flex-col justify-center hidden sm:flex">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-none">
                  {supabaseUser
                    ? (supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0])
                    : (userRole === 'admin' ? 'Admin User' : userRole === 'faculty' ? 'Dr. Smith' : `${studentData.firstName} ${studentData.lastName}`)}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 leading-none">
                  {supabaseUser
                    ? (supabaseUser.user_metadata?.enrollment_no || supabaseUser.email)
                    : (userRole === 'admin' ? 'System Administrator' : userRole === 'faculty' ? 'Faculty ID: F-1029' : studentData.enrollmentNo)}
                </p>
              </div>
              <div className="h-8 w-8 shrink-0 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-sans font-bold text-xs relative shadow-sm border border-white dark:border-slate-900">
                {supabaseUser 
                  ? ((supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email || 'U')[0].toUpperCase())
                  : (userRole === 'admin' ? 'A' : userRole === 'faculty' ? 'S' : `${studentData.firstName[0]}${studentData.lastName[0]}`)}
                <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900"></span>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-1 p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-colors"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="max-w-7xl mx-auto w-full relative">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {userRole === 'admin' ? (
                  <AdminDashboardView activeTab={activeTab} setActiveTab={handleTabChange} />
                ) : (
                  <>
                    {activeTab === 'dashboard' && userRole === 'faculty' && <FacultyDashboardView setActiveTab={handleTabChange} />}
                    {activeTab === 'dashboard' && (!userRole || userRole === 'student') && <DashboardView setActiveTab={handleTabChange} />}
                    {activeTab === 'students' && <StudentsView />}
                    {activeTab === 'schedule' && userRole === 'faculty' && <FacultyScheduleView />}
                    {activeTab === 'schedule' && userRole !== 'faculty' && <TimetableView />}
                    {activeTab === 'courses' && <CoursesView />}
                    {activeTab === 'attendance' && (userRole === 'faculty' ? <FacultyAttendanceView /> : <AttendanceView />)}
                    {activeTab === 'grades' && userRole === 'faculty' && <FacultyGradesView />}
                    {activeTab === 'materials' && userRole === 'faculty' && <FacultyMaterialsView />}
                    {activeTab === 'assignments' && (userRole === 'faculty' ? <FacultyAssignmentsView /> : <AssignmentsView />)}
                    {activeTab === 'quizzes' && userRole === 'faculty' && <FacultyQuizzesView />}
                    {activeTab === 'submissions' && userRole === 'faculty' && <FacultySubmissionsView />}
                    {activeTab === 'leave' && userRole === 'faculty' && <FacultyLeaveView />}
                    {activeTab === 'calendar' && userRole === 'faculty' && <EventsView />}
                    {activeTab === 'profile' && <ProfileView />}
                    {activeTab === 'timetable' && <TimetableView />}
                    {activeTab === 'exams' && <ExamsView />}
                    {activeTab === 'results' && <ResultsView />}
                    {activeTab === 'fees' && <FeesView />}
                    {activeTab === 'downloads' && <DownloadsView />}
                    {activeTab === 'placements' && <PlacementsView />}
                    {activeTab === 'internships' && <InternshipsView />}
                    {activeTab === 'events' && <EventsView />}
                    {activeTab === 'clubs' && <ClubsView />}
                    {activeTab === 'hostel' && <HostelView />}
                    {activeTab === 'grievance' && <GrievanceView />}
                    {activeTab === 'map' && <MapView />}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Slide-over Notification Panel */}
      <NotificationPanel isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} role={userRole} />

      {/* Chat Bot */}
      <ChatBot isOpen={isChatBotOpen} onClose={() => setIsChatBotOpen(false)} />

      {/* Floating Chat Fab */}
      {!isChatBotOpen && (
        <button 
          onClick={() => setIsChatBotOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-105 hover:bg-blue-700 dark:hover:bg-blue-400 active:scale-95 transition-all z-40 group"
        >
          <MessageSquareText className="h-6 w-6 transition-colors" />
        </button>
      )}
    </div>
  );
}
