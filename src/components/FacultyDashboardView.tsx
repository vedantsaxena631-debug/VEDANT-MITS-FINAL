import { Users, BookOpen, Clock, Upload, CheckCircle2 } from 'lucide-react';
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

interface FacultyDashboardViewProps {
  setActiveTab?: (tab: string) => void;
}

export function FacultyDashboardView({ setActiveTab }: FacultyDashboardViewProps) {
  const classPerformanceData = [
    { name: 'CS301', avg: 8.2 },
    { name: 'CS302', avg: 7.5 },
    { name: 'CS303', avg: 8.8 },
  ];

  const classAttendanceData = [
    { name: 'CS301', percentage: 92, fill: '#3b82f6' },
    { name: 'CS302', percentage: 85, fill: '#10b981' },
    { name: 'CS303', percentage: 78, fill: '#f59e0b' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div>
        <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Faculty Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Dr. Smith. Here is your teaching overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <motion.div 
          onClick={() => setActiveTab?.('students')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Total Students</h3>
          </div>
          <p className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">142</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Across all classes</p>
        </motion.div>

        <motion.div 
          onClick={() => setActiveTab?.('schedule')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 dark:bg-emerald-500 dark:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">Today's Classes</h3>
          </div>
          <p className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">2</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Next: CS301 at 10:00 AM</p>
        </motion.div>

        <motion.div 
          onClick={() => setActiveTab?.('assignments')}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-amber-300 dark:hover:border-amber-700/50 hover:shadow-md transition-all group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 dark:bg-amber-500 dark:bg-amber-600/10 text-amber-600 dark:text-amber-400 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-300">To Grade</h3>
          </div>
          <p className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">45</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pending submissions</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm">
           <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6">Class Average Performance (CGPA)</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={classPerformanceData}>
                 <defs>
                   <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" fillOpacity={0.1} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis domain={['auto', 10]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                 <Tooltip
                   contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                 />
                 <Area 
                   type="monotone" 
                   dataKey="avg" 
                   stroke="#3b82f6" 
                   strokeWidth={3} 
                   fillOpacity={1} 
                   fill="url(#colorAvg)"
                   activeDot={{r: 6, strokeWidth: 0, fill: '#3b82f6'}} 
                   isAnimationActive={true}
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm">
           <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6">Course Attendance Rates</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={classAttendanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" fillOpacity={0.1} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip
                   cursor={{fill: '#f1f5f9', opacity: 0.5}}
                   contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
                 />
                 <Bar 
                   dataKey="percentage" 
                   radius={[6, 6, 0, 0]}
                   isAnimationActive={true}
                 >
                   {classAttendanceData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.fill} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 dark:bg-slate-900/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Recent Activity</h3>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">View All</button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center">
               <div className="mr-4 p-2 bg-emerald-50 dark:bg-emerald-900/20 dark:bg-emerald-500 dark:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                 <CheckCircle2 className="h-4 w-4" />
               </div>
               <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Graded Assignment 2 (CS301)</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">2 hours ago</p>
               </div>
            </div>
          </div>
          <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800/50 transition-colors">
             <div className="flex items-center">
               <div className="mr-4 p-2 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-500 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-lg">
                 <Upload className="h-4 w-4" />
               </div>
               <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Uploaded Lecture Notes (Week 4)</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Yesterday</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
