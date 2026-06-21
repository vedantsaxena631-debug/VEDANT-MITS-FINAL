import { Calendar, Clock, MapPin, AlertCircle, FileText } from 'lucide-react';

export function ExamsView() {
  const upcomingExams = [
    { course: 'Microcontrollers & IoT', code: '22242102', date: '25 Oct 2024', time: '09:30 AM - 12:30 PM', room: 'Hall A, Admin Block', type: 'Mid-Sem' },
    { course: 'Data Structures', code: '22242103', date: '27 Oct 2024', time: '09:30 AM - 12:30 PM', room: 'Hall B, Admin Block', type: 'Mid-Sem' },
    { course: 'IoT Architecture and Protocol', code: '22242105', date: '29 Oct 2024', time: '02:00 PM - 05:00 PM', room: 'Room 304, CS Block', type: 'Mid-Sem' },
    { course: 'Probability and Random Process', code: '22242101', date: '31 Oct 2024', time: '09:30 AM - 12:30 PM', room: 'Hall A, Admin Block', type: 'Mid-Sem' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Exam Schedule</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Check dates, timings, and halls for your upcoming mid-sem and end-sem examinations.</p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-800 p-5 rounded-lg flex items-start gap-4">
        <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-blue-900">Admit Card Available</h4>
          <p className="text-sm text-blue-800/80 mt-1">Your admit card for the upcoming Mid-Sem examinations is now available. Please download and print it before your first exam.</p>
          <button className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            <FileText className="h-4 w-4" /> Download Admit Card
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Mid-Semester Examination - Oct 2024</h3>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {upcomingExams.map((exam, idx) => (
            <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center gap-6 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950/50 transition-colors">
              <div className="md:w-48 shrink-0 flex flex-col gap-2 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-amber-400 rounded-r opacity-50"></div>
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                  <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" /> {exam.date}
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-mono">
                  <Clock className="h-4 w-4" /> {exam.time}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded border border-amber-200">{exam.type}</span>
                  <span className="text-xs font-mono text-slate-400">{exam.code}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{exam.course}</h4>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mt-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Venue: <span className="font-medium text-slate-700 dark:text-slate-300">{exam.room}</span>
                </div>
              </div>
              
              <div className="hidden md:flex shrink-0 items-center justify-center">
                 <div className="text-center p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Seat No.</span>
                    <span className="block font-mono font-bold text-slate-800 dark:text-slate-200">A-12</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
