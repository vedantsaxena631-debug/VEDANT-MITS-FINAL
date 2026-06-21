import { syllabusData } from '../data';
import { FileCheck, BookOpen, Presentation, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'DLC': return <FlaskConical className="h-4 w-4 text-purple-500 relative z-10" />;
    case 'PBL': return <Presentation className="h-4 w-4 text-indigo-500 relative z-10" />;
    case 'DC': return <BookOpen className="h-4 w-4 text-blue-500 relative z-10" />;
    default: return <FileCheck className="h-4 w-4 text-emerald-500 relative z-10" />;
  }
};

const getTypeLabel = (type: string) => {
  const map: Record<string, string> = {
    BSC: 'Basic Science',
    DC: 'Department Core',
    DLC: 'Lab Course',
    SP: 'Proficiency',
    PBL: 'Project',
    SLP: 'Self Learning',
    NEC: 'Activity Course'
  };
  return map[type] || type;
};

export function CoursesView() {
  return (
    <motion.div layoutId="card-courses" className="space-y-8 pb-12 bg-transparent">
      <div>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Syllabus</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Currently enrolled courses for Semester 3.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {syllabusData.map((course, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all group flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 -mr-4 -mt-4">
              {getTypeIcon(course.type)}
            </div>

            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-800 dark:border-slate-700/50">
                {getTypeIcon(course.type)}
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 dark:text-slate-300 uppercase tracking-wide">{getTypeLabel(course.type)}</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:text-slate-100 dark:group-hover:text-slate-300 transition-colors mt-1">
                {course.code}
              </span>
            </div>
            
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 leading-snug mt-2 mb-4 text-base relative z-10 transition-colors">
              {course.subject}
            </h3>

            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
              <button className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-400 flex items-center transition-colors">
                View Details
                <svg className="h-3.5 w-3.5 ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
