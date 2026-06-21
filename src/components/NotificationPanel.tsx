import { Bell, X, FileText, CheckCircle, Calendar as CalendarIcon, Info, Users, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'student' | 'faculty' | 'admin' | null;
}

const studentNotifications = [
  {
    id: 1,
    type: 'attendance',
    title: 'Low Attendance Alert',
    message: 'Your attendance in Operating Systems has dropped below 75%. Please ensure you attend the next class to maintain sufficient attendance.',
    time: '2 mins ago',
    read: false,
    icon: Info,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Fee Payment Deadline',
    message: 'The deadline for Even Semester tuition fee is Dec 1st. Please clear your dues.',
    time: '1 hour ago',
    read: false,
    icon: FileText,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20'
  },
  {
    id: 3,
    type: 'grade',
    title: 'New Grade Posted',
    message: 'Your grade for Data Structures Mid-Sem is now available.',
    time: '4 hours ago',
    read: false,
    icon: CheckCircle,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20'
  },
  {
    id: 4,
    type: 'deadline',
    title: 'Assignment Due Tomorrow',
    message: 'Machine Learning Lab 3 is due tomorrow at 11:59 PM.',
    time: '1 day ago',
    read: true,
    icon: FileText,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20'
  },
  {
    id: 5,
    type: 'event',
    title: 'Tech Symposium Registration',
    message: 'Registration for the annual Tech Symposium closes in 2 days.',
    time: '2 days ago',
    read: true,
    icon: CalendarIcon,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  }
];

const facultyNotifications = [
  {
    id: 1,
    type: 'submissions',
    title: 'New Submissions Pending',
    message: '35 students have submitted their AI Module 2 assignment. Ready for grading.',
    time: '10 mins ago',
    read: false,
    icon: FileText,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 2,
    type: 'schedule',
    title: 'Timetable Change Request',
    message: 'Your request for a lab slot swap with Dr. Sharma has been approved for tomorrow.',
    time: '1 hour ago',
    read: false,
    icon: CheckCircle,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20'
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Department Meeting',
    message: 'Monthly faculty meeting scheduled for tomorrow at 2:00 PM in Seminar Hall 1.',
    time: '3 hours ago',
    read: false,
    icon: Users,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20'
  },
  {
    id: 4,
    type: 'attendance',
    title: 'Weekly Attendance Report',
    message: 'Please submit your weekly attendance report for CS301 by Friday evening.',
    time: '1 day ago',
    read: true,
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Maintenance Notice',
    message: 'Server maintenance will occur this weekend. MITS portal might experience downtime.',
    time: '2 days ago',
    read: true,
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20'
  }
];

export function NotificationPanel({ isOpen, onClose, role }: NotificationPanelProps) {
  const notifications = role === 'faculty' ? facultyNotifications : studentNotifications;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-slate-800 dark:text-slate-200" />
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 tracking-tight">Notifications</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800 transition-colors"
                aria-label="Close notifications"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {notifications.map((notif) => {
                const Icon = notif.icon;
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-colors flex gap-4 ${
                      notif.read ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-70' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className={`mt-0.5 shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${notif.bg} ${notif.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{notif.title}</h4>
                        {!notif.read && (
                          <span className="shrink-0 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-600 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                        {notif.message}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-950">
              <button className="w-full py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 hover:text-slate-900 dark:text-slate-100 rounded-lg transition-colors">
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
