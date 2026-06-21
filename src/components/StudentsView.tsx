import { Search, Mail, Filter, Info, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function StudentsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const students = [
    { id: '1', name: 'Ayush Sharma', enrollment: '0901EC211021', branch: 'CS', sem: '3', batch: '2021-2025', subject: 'CS301', attendance: 85, grade: 'A' },
    { id: '2', name: 'Bhumika Desai', enrollment: '0901EC211022', branch: 'CS', sem: '3', batch: '2021-2025', subject: 'CS301', attendance: 92, grade: 'A+' },
    { id: '3', name: 'Chirag Vyas', enrollment: '0901EC211023', branch: 'CS', sem: '3', batch: '2021-2025', subject: 'CS302', attendance: 78, grade: 'B' },
    { id: '4', name: 'Deepti Joshi', enrollment: '0901EC211024', branch: 'CS', sem: '3', batch: '2022-2026', subject: 'CS301', attendance: 95, grade: 'A+' },
    { id: '5', name: 'Eshaan Patel', enrollment: '0901EC211025', branch: 'CS', sem: '3', batch: '2022-2026', subject: 'CS302', attendance: 64, grade: 'C' },
    { id: '6', name: 'Farah Khan', enrollment: '0901EC211026', branch: 'CS', sem: '3', batch: '2021-2025', subject: 'CS301', attendance: 88, grade: 'A' },
    { id: '7', name: 'Gaurav Mehta', enrollment: '0901EC211027', branch: 'CS', sem: '3', batch: '2022-2026', subject: 'CS303', attendance: 71, grade: 'B' },
    { id: '8', name: 'Harshit Singh', enrollment: '0901EC211028', branch: 'CS', sem: '3', batch: '2021-2025', subject: 'CS302', attendance: 90, grade: 'A' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.enrollment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'All' || student.batch === selectedBatch;
    const matchesSubject = selectedSubject === 'All' || student.subject === selectedSubject;
    return matchesSearch && matchesBatch && matchesSubject;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Student List</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and view all students currently enrolled in your classes.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-auto flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by student name or enrollment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 w-full md:w-32"
            >
              <option value="All">All Batches</option>
              <option value="2021-2025">2021-2025</option>
              <option value="2022-2026">2022-2026</option>
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200 w-full md:w-32"
            >
              <option value="All">All Subjects</option>
              <option value="CS301">CS301</option>
              <option value="CS302">CS302</option>
              <option value="CS303">CS303</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-semibold">Student Name</th>
                <th className="px-6 py-4 font-semibold">Enrollment No.</th>
                <th className="px-6 py-4 font-semibold">Branch</th>
                <th className="px-6 py-4 font-semibold">Sem</th>
                <th className="px-6 py-4 font-semibold">Attendance</th>
                <th className="px-6 py-4 font-semibold">Grade</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs uppercase">
                      {student.name.substring(0, 2)}
                    </div>
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-sm">{student.enrollment}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">{student.branch}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">{student.sem}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-md font-medium text-xs ${
                      student.attendance >= 85 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                      student.attendance >= 75 ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                      'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-semibold">{student.grade}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition" title="Email Student">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition" title="View Details">
                      <Info className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No students found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
