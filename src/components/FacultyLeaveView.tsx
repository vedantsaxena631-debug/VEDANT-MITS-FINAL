import { Calendar, User, FileText, Send, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function FacultyLeaveView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Leave Applications</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Apply for leave and view application status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Apply for Leave</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Leave Type</label>
              <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Casual Leave</option>
                <option>Medical Leave</option>
                <option>Earned Leave</option>
                <option>Duty Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">From Date</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">To Date</label>
                <input type="date" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Reason</label>
              <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="State reason for leave..."></textarea>
            </div>
            <button type="button" className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm p-6 overflow-hidden">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Past Applications</h3>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Casual Leave</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Sep 15, 2026 - Sep 16, 2026</p>
                </div>
                <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Approved
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Family function attendance.</p>
            </div>

            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Duty Leave</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Nov 10, 2026 - Nov 12, 2026</p>
                </div>
                <span className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Attending AI conference in Delhi.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
