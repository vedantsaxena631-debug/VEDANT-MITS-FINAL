import { Award, Upload, Search, Filter, Save, FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultyGradesView() {
  const [selectedCourse, setSelectedCourse] = useState('CS301');
  const [selectedExam, setSelectedExam] = useState('Mid-Term');

  const students = [
    { id: '0901EC211021', name: 'Ayush Sharma', internal: 26, external: '', total: 26 },
    { id: '0901EC211022', name: 'Bhumika Desai', internal: 28, external: '', total: 28 },
    { id: '0901EC211023', name: 'Chirag Vyas', internal: 22, external: '', total: 22 },
    { id: '0901EC211024', name: 'Deepti Joshi', internal: 29, external: '', total: 29 },
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
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Enter Grades</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Input internal and external marks or upload via CSV.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            <Save className="w-4 h-4 mr-2" />
            Save Grades
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
          <div className="flex gap-4">
            <select 
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="CS301">CS301 - Data Structures</option>
              <option value="CS302">CS302 - Operating Systems</option>
            </select>
            <select 
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mid-Term">Mid-Term Exam</option>
              <option value="End-Term">End-Term Exam</option>
              <option value="Assignment-1">Assignment 1</option>
            </select>
          </div>
          <button className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            <FileDown className="w-4 h-4 mr-1" />
            Download Template
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-semibold w-1/4">Enrollment Id</th>
                <th className="px-6 py-4 font-semibold w-1/3">Student Name</th>
                <th className="px-6 py-4 font-semibold text-center">Internal (30)</th>
                <th className="px-6 py-4 font-semibold text-center">External (70)</th>
                <th className="px-6 py-4 font-semibold text-center">Total (100)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-sm">{student.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{student.name}</td>
                  <td className="px-6 py-3 text-center">
                    <input 
                      type="number" 
                      defaultValue={student.internal}
                      className="w-20 text-center px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="px-6 py-3 text-center">
                    <input 
                      type="number" 
                      defaultValue={student.external}
                      placeholder="-"
                      className="w-20 text-center px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-slate-100">{student.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
