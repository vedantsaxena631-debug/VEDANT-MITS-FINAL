import { LayoutDashboard, BookOpen, GraduationCap, ClipboardCheck, FileText, Bell, Award, MessageSquare, Map, CalendarClock, BookA, IndianRupee, Briefcase, Globe, Users, Home, User, Download, Upload, Users2, ShieldAlert, Activity, Settings, HelpCircle, FileQuestion, Send, Calendar, LogOut, Database, History, Cpu, Layers } from 'lucide-react';
import { studentData } from '../data';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: 'student' | 'faculty' | 'admin';
}

export function Sidebar({ activeTab, setActiveTab, role }: SidebarProps) {
  const getNavGroups = () => {
    switch (role) {
      case 'faculty':
        return [
          {
            title: "Main",
            items: [
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'students', label: 'Student List', icon: Users2 },
              { id: 'schedule', label: 'Course Schedule', icon: CalendarClock },
            ]
          },
          {
            title: "Management",
            items: [
              { id: 'attendance', label: 'Mark Attendance', icon: ClipboardCheck },
              { id: 'grades', label: 'Enter Grades', icon: Award },
              { id: 'materials', label: 'Upload Materials', icon: Upload },
              { id: 'assignments', label: 'Manage Assignments', icon: FileText },
              { id: 'quizzes', label: 'Create Quizzes', icon: FileQuestion },
              { id: 'submissions', label: 'View Submissions', icon: Send },
              { id: 'leave', label: 'Leave Applications', icon: User },
              { id: 'calendar', label: 'Academic Calendar', icon: Calendar },
            ]
          }
        ];
      case 'admin':
        return [
          {
            title: "MAIN",
            items: [
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'departments', label: 'Department Management', icon: Layers },
            ]
          },
          {
            title: "OPERATIONS",
            items: [
              { id: 'notices', label: 'Notice Board', icon: Bell },
              { id: 'academic-calendar', label: 'Academic Calendar', icon: Calendar },
              { id: 'exam-scheduling', label: 'Exam Scheduling', icon: BookA },
              { id: 'assignment-control', label: 'Assignment Control', icon: ClipboardCheck },
              { id: 'fee-management', label: 'Fee Management', icon: IndianRupee },
              { id: 'grievances', label: 'Grievance Handling', icon: MessageSquare },
            ]
          },
          {
            title: "ANALYTICS & SYSTEM",
            items: [
              { id: 'traffic-analytics', label: 'Traffic Analytics', icon: Activity },
              { id: 'performance-metrics', label: 'Performance Metrics', icon: Cpu },
              { id: 'app-settings', label: 'App Settings', icon: Settings },
              { id: 'backup-restore', label: 'Backup & Restore', icon: Database },
              { id: 'activity-logs', label: 'Activity Logs', icon: History },
            ]
          }
        ];
      case 'student':
      default:
        return [
          {
            title: "Main",
            items: [
              { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
              { id: 'courses', label: 'Syllabus', icon: BookOpen },
              { id: 'attendance', label: 'Attendance', icon: ClipboardCheck },
              { id: 'profile', label: 'Profile & Settings', icon: User },
            ]
          },
          {
            title: "Academic Essentials",
            items: [
              { id: 'timetable', label: 'Timetable', icon: CalendarClock },
              { id: 'exams', label: 'Exam Schedule', icon: BookA },
              { id: 'assignments', label: 'Assignments', icon: FileText },
              { id: 'results', label: 'Results & SGPA', icon: Award },
              { id: 'fees', label: 'Fee Details', icon: IndianRupee },
              { id: 'downloads', label: 'Download Center', icon: Download },
            ]
          },
          {
            title: "Career & Growth",
            items: [
              { id: 'placements', label: 'Placement Cell', icon: Briefcase },
              { id: 'internships', label: 'Internship Portal', icon: Globe },
            ]
          },
          {
            title: "Campus & Utilities",
            items: [
              { id: 'events', label: 'Notices', icon: Bell },
              { id: 'clubs', label: 'Events & Clubs', icon: Users },
              { id: 'hostel', label: 'Hostel & Mess', icon: Home },
              { id: 'grievance', label: 'Grievance', icon: MessageSquare },
              { id: 'map', label: 'Campus Map', icon: Map },
            ]
          }
        ];
    }
  };

  const navGroups = getNavGroups();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 dark:bg-slate-950 text-slate-700 dark:text-slate-300 flex flex-col shrink-0 h-full border-r border-slate-200 dark:border-slate-800 transition-colors duration-300 z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-300">
        <GraduationCap className="h-6 w-6 mr-3 text-blue-600 dark:text-blue-400 dark:text-blue-500" />
        <span className="font-sans font-bold tracking-tight text-xl text-slate-900 dark:text-slate-100">Portal</span>
      </div>

      <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className={gIdx > 0 ? "mt-6" : ""}>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-3">{group.title}</p>
            <nav className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 dark:bg-blue-500 dark:bg-blue-600/10 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-200'
                  }`}
                >
                  <item.icon className={`h-4 w-4 mr-3 shrink-0 ${activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 dark:text-slate-400'}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:bg-slate-900/30 shrink-0 transition-colors duration-300">
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm">
          {role === 'student' ? (
            <>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{studentData.branch}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Semester {studentData.semester}</p>
              <div className="mt-3 inline-flex items-center space-x-1.5 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 dark:bg-emerald-500 dark:bg-emerald-600/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
                <span>{studentData.status}</span>
              </div>
            </>
          ) : role === 'faculty' ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Professor</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Computer Science Dept</p>
              </div>
              <button className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10" title="Logout">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-xs relative">
                AD
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse"></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">Admin</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">System Administrator</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
