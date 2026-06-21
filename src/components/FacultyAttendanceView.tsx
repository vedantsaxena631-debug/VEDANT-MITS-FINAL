import { Filter, Users, CalendarDays, CheckCircle2, XCircle, ArrowLeft, Save, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultyAttendanceView() {
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [isMarking, setIsMarking] = useState(false);
  const [markDate, setMarkDate] = useState('2026-10-24');
  const [markCourse, setMarkCourse] = useState('CS301');
  const [markClass, setMarkClass] = useState('Lecture');

  const classesData = [
    { id: 1, course: 'CS301', title: 'Data Structures and Algorithms', date: 'Oct 23, 2026', time: '10:00 AM', totalStudents: 80, attended: 78, absent: 2, topic: 'Graph Traversal (BFS & DFS)' },
    { id: 2, course: 'CS302', title: 'Operating Systems', date: 'Oct 23, 2026', time: '01:00 PM', totalStudents: 75, attended: 69, absent: 6, topic: 'Process Scheduling' },
    { id: 3, course: 'CS301', title: 'Data Structures and Algorithms', date: 'Oct 22, 2026', time: '10:00 AM', totalStudents: 80, attended: 75, absent: 5, topic: 'Binary Search Trees' },
    { id: 4, course: 'CS303', title: 'Database Management Systems', date: 'Oct 22, 2026', time: '02:00 PM', totalStudents: 80, attended: 71, absent: 9, topic: 'SQL Joins' },
    { id: 5, course: 'CS301', title: 'Data Structures and Algorithms', date: 'Oct 21, 2026', time: '10:00 AM', totalStudents: 80, attended: 79, absent: 1, topic: 'Heaps and Priority Queues' },
    { id: 6, course: 'CS302', title: 'Operating Systems', date: 'Oct 20, 2026', time: '11:00 AM', totalStudents: 75, attended: 73, absent: 2, topic: 'Deadlocks' },
    { id: 7, course: 'CS301', title: 'Data Structures and Algorithms', date: 'Oct 19, 2026', time: '10:00 AM', totalStudents: 80, attended: 72, absent: 8, topic: 'Dynamic Programming Introduction' },
  ];

  const studentsToMark = [
    { id: '0901EC211021', name: 'Ayush Sharma', present: true },
    { id: '0901EC211022', name: 'Bhumika Desai', present: true },
    { id: '0901EC211023', name: 'Chirag Vyas', present: false },
    { id: '0901EC211024', name: 'Deepti Joshi', present: true },
    { id: '0901EC211025', name: 'Eshaan Patel', present: true },
  ];

  const [attendanceState, setAttendanceState] = useState(studentsToMark);

  const filteredClasses = selectedCourse === 'ALL' 
    ? classesData 
    : classesData.filter(c => c.course === selectedCourse);

  const stats = {
    totalClasses: filteredClasses.length,
    avgAttendance: filteredClasses.length > 0 
      ? Math.round(filteredClasses.reduce((acc, curr) => acc + (curr.attended / curr.totalStudents) * 100, 0) / filteredClasses.length)
      : 0
  };

  const markAll = (status: boolean) => {
    setAttendanceState(prev => prev.map(s => ({ ...s, present: status })));
  };

  const toggleAttendance = (id: string) => {
    setAttendanceState(prev => prev.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  if (isMarking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-8 pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <button onClick={() => setIsMarking(false)} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-2 transition">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Records
            </button>
            <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Mark Attendance</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Record attendance for a specific class session.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Date</label>
                <input 
                  type="date" 
                  value={markDate}
                  onChange={(e) => setMarkDate(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Subject</label>
                <select 
                  value={markCourse}
                  onChange={(e) => setMarkCourse(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CS301">CS301 - Data Structures</option>
                  <option value="CS302">CS302 - Operating Systems</option>
                  <option value="CS303">CS303 - Database Systems</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Class Type</label>
                <select 
                  value={markClass}
                  onChange={(e) => setMarkClass(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Lecture">Lecture</option>
                  <option value="Lab">Lab Practical</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>
            </div>

            <div className="flex items-end gap-2 border-t lg:border-t-0 border-slate-200 dark:border-slate-800 pt-4 lg:pt-0 mt-4 lg:mt-0">
              <button 
                onClick={() => markAll(true)}
                className="flex items-center px-3 py-2 border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition"
              >
                <CheckSquare className="w-4 h-4 mr-1.5" /> Mark All Present
              </button>
              <button 
                onClick={() => markAll(false)}
                className="flex items-center px-3 py-2 border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition"
              >
                Mark All Absent
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 font-semibold w-1/4">Enrollment Id</th>
                  <th className="px-6 py-4 font-semibold w-2/4">Student Name</th>
                  <th className="px-6 py-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attendanceState.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-sm">{student.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{student.name}</td>
                    <td className="px-6 py-3 text-right">
                      <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-1 bg-slate-50 dark:bg-slate-800 gap-1">
                        <button 
                          onClick={() => setAttendanceState(prev => prev.map(s => s.id === student.id ? { ...s, present: true } : s))}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                            student.present ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
                          }`}
                        >
                          Present
                        </button>
                        <button 
                          onClick={() => setAttendanceState(prev => prev.map(s => s.id === student.id ? { ...s, present: false } : s))}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                            !student.present ? 'bg-red-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Class Attendance Records</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review lecture-wise attendance details across your courses.</p>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="ALL">All Courses</option>
            <option value="CS301">CS301 - DSA</option>
            <option value="CS302">CS302 - OS</option>
            <option value="CS303">CS303 - DBMS</option>
          </select>
          <button onClick={() => setIsMarking(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Mark New Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Classes Conducted</p>
            <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{stats.totalClasses}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Average Attendance Rate</p>
            <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{stats.avgAttendance}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Course & Topic</th>
                <th className="px-6 py-4 font-semibold">Attendance Stats</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredClasses.map((cls) => {
                const percent = Math.round((cls.attended / cls.totalStudents) * 100);
                return (
                  <tr key={cls.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{cls.date}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{cls.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-bold border border-slate-200 dark:border-slate-700">{cls.course}</span>
                        <p className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{cls.topic}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cls.attended} / {cls.totalStudents}</span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5"><CheckCircle2 className="h-3 w-3" /> {cls.attended} Present</span>
                        </div>
                        <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{percent}%</span>
                          <span className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1 mt-0.5"><XCircle className="h-3 w-3" /> {cls.absent} Absent</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">View List</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredClasses.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No classes found.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
