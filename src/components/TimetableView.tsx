import { Clock, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

const scheduleData = {
  Monday: [
    { time: '09:00 AM - 10:00 AM', course: 'Microcontrollers & IoT', type: 'Lecture', room: 'Room 201', faculty: 'Dr. R. Sharma' },
    { time: '10:00 AM - 11:00 AM', course: 'Data Structures', type: 'Lecture', room: 'Room 202', faculty: 'Prof. S. Gupta' },
    { time: '11:00 AM - 01:00 PM', course: 'Data Structures Lab', type: 'Lab', room: 'Computer Lab 3', faculty: 'Prof. S. Gupta' },
    { time: '02:00 PM - 03:00 PM', course: 'Probability and Random Process', type: 'Lecture', room: 'Room 105', faculty: 'Dr. A. Verma' },
  ],
  Tuesday: [
    { time: '09:00 AM - 10:00 AM', course: 'IoT Architecture and Protocol', type: 'Lecture', room: 'Room 201', faculty: 'Dr. N. Singh' },
    { time: '10:00 AM - 11:00 AM', course: 'Electronic Devices and Circuits', type: 'Lecture', room: 'Room 110', faculty: 'Prof. K. Raj' },
    { time: '11:00 AM - 01:00 PM', course: 'IoT Architecture Lab', type: 'Lab', room: 'IoT Lab', faculty: 'Dr. N. Singh' },
  ],
  Wednesday: [
    { time: '09:00 AM - 10:00 AM', course: 'Data Structures', type: 'Lecture', room: 'Room 202', faculty: 'Prof. S. Gupta' },
    { time: '10:00 AM - 12:00 PM', course: 'Problem Solving through Python', type: 'Lecture/Lab', room: 'Computer Lab 1', faculty: 'Mr. V. Kumar' },
    { time: '01:00 PM - 02:00 PM', course: 'Microcontrollers & IoT', type: 'Tutorial', room: 'Room 201', faculty: 'Dr. R. Sharma' },
  ],
  Thursday: [
    { time: '09:00 AM - 10:00 AM', course: 'Probability and Random Process', type: 'Lecture', room: 'Room 105', faculty: 'Dr. A. Verma' },
    { time: '10:00 AM - 11:00 AM', course: 'Electronic Devices and Circuits', type: 'Lecture', room: 'Room 110', faculty: 'Prof. K. Raj' },
    { time: '11:00 AM - 12:00 PM', course: 'Macro Project-I', type: 'Project', room: 'Project Room', faculty: 'Dr. N. Singh' },
  ],
  Friday: [
    { time: '09:00 AM - 10:00 AM', course: 'IoT Architecture and Protocol', type: 'Lecture', room: 'Room 201', faculty: 'Dr. N. Singh' },
    { time: '10:00 AM - 11:00 AM', course: 'Semester Proficiency*', type: 'Activity', room: 'Auditorium', faculty: 'Mentors' },
    { time: '11:00 AM - 01:00 PM', course: 'Novel Engaging Course', type: 'Activity', room: 'Room 101', faculty: 'Guest' },
  ]
};

export function TimetableView() {
  const [activeDay, setActiveDay] = useState('Monday');

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'Lecture': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'Lab': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
      case 'Project': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Timetable</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View your daily and weekly class schedule along with room numbers.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Days Sidebar */}
        <div className="md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-row md:flex-col overflow-x-auto no-scrollbar shrink-0">
          {Object.keys(scheduleData).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-4 text-sm font-semibold text-left border-b border-transparent whitespace-nowrap md:border-b-0 md:border-l-4 transition-colors ${
                activeDay === day 
                  ? 'md:border-l-blue-600 border-b-blue-600 md:border-b-transparent bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800/50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule Classes */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{activeDay}'s Schedule</h3>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search class..." className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-900 dark:text-slate-100 w-48" />
            </div>
          </div>

          <div className="space-y-4">
            {scheduleData[activeDay as keyof typeof scheduleData]?.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 transition-colors">
                <div className="sm:w-36 shrink-0 flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                  <span className="text-sm font-mono font-medium">{item.time}</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getTypeStyle(item.type)}`}>
                      {item.type}
                    </span>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">{item.course}</h4>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {item.room}
                    </div>
                    <div className="flex items-center gap-1.5">
                       <span className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">{item.faculty[0]}</span>
                       {item.faculty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
