import { studentData, resultsData, syllabusData } from '../data';
import { Award, Book, Clock, Megaphone, Bell, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface DashboardViewProps {
  setActiveTab?: (tab: string) => void;
}

export function DashboardView({ setActiveTab }: DashboardViewProps) {
  const latestResult = resultsData[resultsData.length - 1];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return '#10b981'; // emerald-500
    if (percentage >= 75) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  const attendanceData = syllabusData.map(course => {
    const percentage = Math.round((course.attended / course.total) * 100);
    return {
      name: course.code,
      percentage: percentage,
      fill: getAttendanceColor(percentage)
    };
  });

  const performanceData = resultsData.map(result => ({
    name: `Sem ${result.semester}`,
    sgpa: typeof result.sgpa === 'number' ? result.sgpa : parseFloat(result.sgpa)
  }));

  const departmentNews = [
    { id: 1, title: 'End Semester virtual exam guidelines released', date: 'Oct 25, 2026', type: 'Exam' },
    { id: 2, title: 'Guest Lecture on AI by Dr. Smith', date: 'Oct 23, 2026', type: 'Event' },
    { id: 3, title: 'Hackathon registration deadline extended', date: 'Oct 20, 2026', type: 'Important' },
    { id: 4, title: 'Lab Record submission instructions updated', date: 'Oct 18, 2026', type: 'Notice' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, {studentData.firstName}. Here's your academic overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          layoutId="card-results"
          onClick={() => setActiveTab?.('results')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-blue-300 dark:hover:border-blue-700/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-500 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Latest SGPA</h3>
          </div>
          <p className="text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">{latestResult.sgpa}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Semester {latestResult.semester} • {latestResult.status}</p>
        </motion.div>

        <motion.div 
          layoutId="card-courses"
          onClick={() => setActiveTab?.('courses')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Book className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Active Courses</h3>
          </div>
          <p className="text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">{syllabusData.length}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Semester {studentData.semester} Syllabus</p>
        </motion.div>

        <motion.div 
          layoutId="card-attendance"
          onClick={() => setActiveTab?.('attendance')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 dark:bg-emerald-500 dark:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Academic Standing</h3>
          </div>
          <p className="text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">Excellent</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Consistent performance</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm">
           <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6">SGPA Trend</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={performanceData}>
                 <defs>
                   <linearGradient id="colorSgpa" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" fillOpacity={0.1} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis domain={['auto', 10]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                 <Tooltip
                   contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                 />
                 <Area 
                   type="monotone" 
                   dataKey="sgpa" 
                   stroke="#3b82f6" 
                   strokeWidth={3} 
                   fillOpacity={1} 
                   fill="url(#colorSgpa)"
                   activeDot={{r: 6, strokeWidth: 0, fill: '#3b82f6'}} 
                   isAnimationActive={true}
                   animationDuration={1500}
                   animationEasing="ease-out"
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm">
           <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6">Subject-wise Attendance</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={attendanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" fillOpacity={0.1} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip
                   cursor={{fill: '#f1f5f9', opacity: 0.5}}
                   contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                 />
                 <Bar 
                   dataKey="percentage" 
                   radius={[6, 6, 0, 0]}
                   isAnimationActive={true}
                   animationDuration={1500}
                   animationEasing="ease-out"
                 >
                   {attendanceData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 dark:bg-slate-900/50">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Academic History</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
            {resultsData.map((result, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Semester {result.semester}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
                </div>
                <div className="text-right">
                  <p className="font-sans font-bold tracking-tight text-xl text-slate-900 dark:text-slate-100">{result.sgpa}</p>
                  <span className="inline-flex items-center px-2 py-0.5 mt-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {result.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 dark:bg-slate-900/50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Department News</h3>
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 rounded-md">Computer Science</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
            {departmentNews.map((news) => (
              <div key={news.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 items-start">
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  news.type === 'Important' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                  news.type === 'Event' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' :
                  news.type === 'Exam' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                  'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {news.type === 'Important' ? <Megaphone className="w-5 h-5" /> :
                   news.type === 'Event' ? <Calendar className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">{news.title}</h4>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{news.type}</span> 
                    <span className="mx-2">•</span> 
                    <span>{news.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm overflow-hidden mt-6">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 dark:bg-slate-900/50 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Virtual Lab Hardware</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Interactive 3D diagrams of equipment for Current Semester</p>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              id: 1, 
              name: 'Digital Oscilloscope', 
              course: 'Analog Electronics', 
              desc: 'Dual-channel signal visualization',
              color: 'from-blue-500 to-indigo-600',
              icon: '📡'
            },
            { 
              id: 2, 
              name: 'Function Generator', 
              course: 'Analog Electronics', 
              desc: 'Waveform synthesis and frequency control',
              color: 'from-emerald-500 to-teal-600',
              icon: '🎛️'
            },
            { 
              id: 3, 
              name: 'MPU 8085 Kit', 
              course: 'Microprocessors Lab', 
              desc: 'Assembly programming trainer board',
              color: 'from-amber-500 to-orange-600',
              icon: '📟'
            }
          ].map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
              className="relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-50 blur-xl -z-10 rounded-2xl" style={{ backgroundImage: `var(--tw-gradient-stops)` }} />
              <div className={`h-48 rounded-2xl bg-gradient-to-br ${item.color} p-5 flex flex-col items-center justify-center text-white shadow-xl border border-white/20 overflow-hidden relative group`}>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />
                
                <div className="text-4xl mb-3 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300 group-hover:-translate-y-2 relative z-10">
                  {item.icon}
                </div>
                
                <h4 className="font-bold text-center text-sm tracking-wide drop-shadow-md relative z-10">{item.name}</h4>
                <p className="text-[10px] text-white/80 mt-1 uppercase tracking-wider relative z-10">{item.course}</p>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center backdrop-blur-sm border-t border-white/10">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-white/90">{item.desc}</span>
                </div>
                
                {/* 3D highlights */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-all duration-1000 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
