import { Clock, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultyScheduleView() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [currentWeek, setCurrentWeek] = useState('Oct 21 - Oct 25, 2026');

  const schedule = [
    { day: 'Monday', time: '10:00 AM - 11:00 AM', course: 'CS301 - DSA', room: 'Room 201', type: 'Lecture' },
    { day: 'Monday', time: '02:00 PM - 04:00 PM', course: 'CS301 - Lab', room: 'Lab 4', type: 'Practical' },
    { day: 'Tuesday', time: '11:00 AM - 12:00 PM', course: 'CS302 - OS', room: 'Room 204', type: 'Lecture' },
    { day: 'Wednesday', time: '10:00 AM - 11:00 AM', course: 'CS301 - DSA', room: 'Room 201', type: 'Lecture' },
    { day: 'Wednesday', time: '01:00 PM - 02:00 PM', course: 'CS303 - DBMS', room: 'Room 205', type: 'Lecture' },
    { day: 'Thursday', time: '11:00 AM - 12:00 PM', course: 'CS302 - OS', room: 'Room 204', type: 'Lecture' },
    { day: 'Thursday', time: '02:00 PM - 04:00 PM', course: 'CS303 - Lab', room: 'Lab 2', type: 'Practical' },
    { day: 'Friday', time: '10:00 AM - 11:00 AM', course: 'CS301 - DSA', room: 'Room 201', type: 'Lecture' },
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
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Course Schedule</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and view your weekly teaching timetable.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{currentWeek}</span>
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {days.map((day) => {
              const dayClasses = schedule.filter(s => s.day === day);
              if (dayClasses.length === 0) return null;
              
              return (
                <div key={day} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-32 py-4">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">{day}</h3>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayClasses.map((cls, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-2 ${
                        cls.type === 'Lecture' 
                          ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30' 
                          : 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30'
                      }`}>
                        <div className="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {cls.time}
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100">{cls.course}</h4>
                        <div className="flex justify-between items-center text-sm mt-auto pt-2">
                          <span className={`${
                            cls.type === 'Lecture' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
                          } px-2 py-0.5 rounded text-xs font-semibold`}>
                            {cls.type}
                          </span>
                          <span className="text-slate-600 dark:text-slate-400 font-medium">{cls.room}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
