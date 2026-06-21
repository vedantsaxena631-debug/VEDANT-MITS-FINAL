import { Plus, Edit2, Trash2, Users, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultyAssignmentsView() {
  const assignments = [
    { id: 1, title: 'Process Synchronization Implementation', course: 'CS302', deadline: 'Oct 30, 2026', time: '11:59 PM', submissions: 45, total: 75, status: 'Active' },
    { id: 2, title: 'BST Operations Lab Record', course: 'CS301', deadline: 'Oct 25, 2026', time: '5:00 PM', submissions: 72, total: 80, status: 'Active' },
    { id: 3, title: 'SQL Queries Practice', course: 'CS303', deadline: 'Oct 15, 2026', time: '11:59 PM', submissions: 78, total: 80, status: 'Closed' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Assignments</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Create new tasks, set deadlines, and monitor student submissions.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4 mr-2" />
          Create Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => {
          const progress = Math.round((assignment.submissions / assignment.total) * 100);
          return (
            <div key={assignment.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col group hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-xs font-bold border border-slate-200 dark:border-slate-700">
                    {assignment.course}
                  </span>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    assignment.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight mb-4">{assignment.title}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due: {assignment.deadline}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {assignment.time}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Submissions</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{assignment.submissions} / {assignment.total}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex items-center px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  View All
                </button>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-amber-500 transition rounded hover:bg-amber-50 dark:hover:bg-amber-900/20">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-red-500 transition rounded hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
