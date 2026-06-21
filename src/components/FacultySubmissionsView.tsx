import { CheckCircle2, XCircle, Download, Eye, FileText, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultySubmissionsView() {
  const [selectedAssignment, setSelectedAssignment] = useState('All');

  const submissions = [
    { id: 1, student: 'Ayush Sharma', enrollment: '0901EC211021', assignment: 'Lab Record 1', course: 'CS301', status: 'Graded', file: 'ayush_record1.pdf', submittedAt: 'Oct 24, 2026, 10:30 AM', grade: '9/10' },
    { id: 2, student: 'Bhumika Desai', enrollment: '0901EC211022', assignment: 'Process Sync', course: 'CS302', status: 'Pending', file: 'bhumika_sync.pdf', submittedAt: 'Oct 25, 2026, 09:15 AM', grade: '-' },
    { id: 3, student: 'Chirag Vyas', enrollment: '0901EC211023', assignment: 'Lab Record 1', course: 'CS301', status: 'Late', file: 'chirag_lab.pdf', submittedAt: 'Oct 26, 2026, 02:45 PM', grade: '-' },
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
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Submissions</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review, grade, and download assignment submissions.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <Download className="w-4 h-4 mr-2" />
            Download All (ZIP)
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
            >
              <option value="All">All Assignments</option>
              <option value="Lab Record 1">Lab Record 1 (CS301)</option>
              <option value="Process Sync">Process Sync (CS302)</option>
            </select>
            <button className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search student..." className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-semibold">Student info</th>
                <th className="px-6 py-4 font-semibold">Assignment</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Submitted At</th>
                <th className="px-6 py-4 font-semibold text-center">Grade</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{sub.student}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{sub.enrollment}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{sub.assignment}</p>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-slate-600 dark:text-slate-300">{sub.course}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider items-center gap-1 ${
                      sub.status === 'Graded' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                      sub.status === 'Late' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                      'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                    }`}>
                      {sub.status === 'Graded' && <CheckCircle2 className="w-3 h-3" />}
                      {sub.status === 'Late' && <XCircle className="w-3 h-3" />}
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{sub.submittedAt}</td>
                  <td className="px-6 py-4 text-center">
                    {sub.status === 'Graded' ? (
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{sub.grade}</span>
                    ) : (
                      <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Mark</button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-50 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-900/20 rounded-lg transition" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-900/20 rounded-lg transition" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
