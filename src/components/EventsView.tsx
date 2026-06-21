import { Calendar as CalendarIcon, MapPin, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const notices = [
  { id: 1, title: 'Mid-Sem Examination Schedule', date: 'Oct 25, 2024', department: 'Academic Section' },
  { id: 2, title: 'Hackathon Registration Open', date: 'Oct 26, 2024', department: 'Computer Science Club' },
  { id: 3, title: 'Hostel Mess Fee Deadline', date: 'Nov 01, 2024', department: 'Accounts' }
];

const calendarEvents = [
  { date: '2024-10-02', title: 'Gandhi Jayanti', type: 'holiday' },
  { date: '2024-10-12', title: 'Dussehra', type: 'holiday' },
  { date: '2024-10-25', title: 'Mid-Sem Exam Begins', type: 'exam' },
  { date: '2024-10-28', title: 'Tech Symposium', type: 'fest' },
  { date: '2024-10-31', title: 'Diwali', type: 'holiday' },
  { date: '2024-11-01', title: 'Haryana Day', type: 'holiday' },
  { date: '2024-11-15', title: 'Alumni Meet', type: 'fest' },
  { date: '2024-11-20', title: 'End-Sem Exam', type: 'exam' },
];

function getEventStyle(type: string) {
  switch(type) {
    case 'holiday': return 'bg-slate-50 dark:bg-slate-950 text-red-700 border-l-2 border-l-red-500 border-y-slate-200 border-r-slate-200';
    case 'exam': return 'bg-slate-50 dark:bg-slate-950 text-blue-700 dark:text-blue-300 border-l-2 border-l-blue-500 border-y-slate-200 border-r-slate-200';
    case 'fest': return 'bg-slate-50 dark:bg-slate-950 text-blue-700 dark:text-blue-300 border-l-2 border-l-blue-500 border-y-slate-200 border-r-slate-200';
    default: return 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800';
  }
}

function getEventDot(type: string) {
  switch(type) {
    case 'holiday': return 'bg-red-500 dark:bg-red-600';
    case 'exam': return 'bg-blue-500 dark:bg-blue-600';
    case 'fest': return 'bg-blue-500 dark:bg-blue-600';
    default: return 'bg-slate-500';
  }
}

export function EventsView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // Init to Oct 2024

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-24 sm:h-28 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayEvents = calendarEvents.filter(e => e.date === dateStr);
    const isToday = new Date().toDateString() === new Date(year, month, i).toDateString();
    
    calendarDays.push(
      <div key={`day-${i}`} className={`h-24 sm:h-28 border border-slate-100 dark:border-slate-800 p-1 sm:p-2 flex flex-col gap-1 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950/50 relative ${isToday ? 'bg-slate-50 dark:bg-slate-950 border-l-2 border-l-blue-500/30' : 'bg-white dark:bg-slate-900'}`}>
        <div className="flex items-center justify-between px-1">
           <span className={`text-sm font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>{i}</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1 no-scrollbar pr-1">
           {dayEvents.map((evt, idx) => (
             <div key={idx} className={`text-[10px] sm:text-xs leading-tight font-medium px-1.5 py-1 rounded border ${getEventStyle(evt.type)} truncate flex items-center gap-1.5`} title={evt.title}>
               <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${getEventDot(evt.type)}`}></div>
               <span className="truncate">{evt.title}</span>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Notice Board & Events</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Stay updated with campus activities and official announcements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Official Notices</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {notices.map((notice) => (
              <div key={notice.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 transition-colors cursor-pointer group">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{notice.department}</span>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mt-1 group-hover:text-blue-600 dark:text-blue-400 transition-colors">{notice.title}</h4>
                <p className="text-sm text-slate-400 mt-2">{notice.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8">
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-600 border-4 border-white shadow-none"></div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tech Symposium 2024</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Main Auditorium
                </p>
                <p className="text-xs font-medium text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded">Oct 28 • 10:00 AM</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-600 border-4 border-white shadow-none"></div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">Mid-Sem Exams Begin</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Exam Centers
                </p>
                <p className="text-xs font-medium text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 inline-block px-2 py-1 rounded">Oct 25 • 9:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Academic Calendar</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-xs font-medium text-slate-600 dark:text-slate-400 hidden sm:flex">
              <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-600"></div>Exam</div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-red-500 dark:bg-red-600"></div>Holiday</div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-600"></div>Fest</div>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-none">
               <button onClick={prevMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800 rounded-md transition-colors text-slate-600 dark:text-slate-400"><ChevronLeft className="h-4 w-4"/></button>
               <span className="text-sm font-bold text-slate-800 dark:text-slate-200 min-w-[110px] text-center">{monthNames[month]} {year}</span>
               <button onClick={nextMonth} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800 rounded-md transition-colors text-slate-600 dark:text-slate-400"><ChevronRight className="h-4 w-4"/></button>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
           <div className="grid grid-cols-7 mb-2">
             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
               <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                 {day}
               </div>
             ))}
           </div>
           <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
             {calendarDays}
           </div>
        </div>
      </div>
    </div>
  );
}

