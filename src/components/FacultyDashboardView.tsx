import { Users, BookOpen, Clock, Upload, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
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
  Cell,
} from "recharts";

interface FacultyDashboardViewProps {
  setActiveTab?: (tab: string) => void;
}

export function FacultyDashboardView({
  setActiveTab,
}: FacultyDashboardViewProps) {
  const classPerformanceData = [
    { name: "CS301", avg: 8.2 },
    { name: "CS302", avg: 7.5 },
    { name: "CS303", avg: 8.8 },
  ];

  const classAttendanceData = [
    { name: "CS301", percentage: 92, fill: "#3b82f6" },
    { name: "CS302", percentage: 85, fill: "#10b981" },
    { name: "CS303", percentage: 78, fill: "#f59e0b" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6 pb-6"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Faculty Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Welcome back, Dr. Smith. Here is your teaching overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <motion.div
          onClick={() => setActiveTab?.("students")}
          className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center space-x-2.5 mb-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">
              Total Students
            </h3>
          </div>
          <p className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">
            142
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Across all classes
          </p>
        </motion.div>

        <motion.div
          onClick={() => setActiveTab?.("schedule")}
          className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center space-x-2.5 mb-2.5">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 dark:bg-emerald-500 dark:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">
              Today's Classes
            </h3>
          </div>
          <p className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">
            2
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Next: CS301 at 10:00 AM
          </p>
        </motion.div>

        <motion.div
          onClick={() => setActiveTab?.("assignments")}
          className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col cursor-pointer sm:col-span-2 lg:col-span-1 hover:border-amber-300 dark:hover:border-amber-700/50 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center space-x-2.5 mb-2.5">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 dark:bg-amber-500 dark:bg-amber-600/10 text-amber-600 dark:text-amber-400 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-300 truncate">
              To Grade
            </h3>
          </div>
          <p className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-auto">
            45
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Pending submissions
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
          <h3 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-4">
            Class Average Performance (CGPA)
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classPerformanceData}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  fillOpacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  dy={8}
                />
                <YAxis
                  domain={["auto", 10]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  dx={-5}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(8px)",
                    fontSize: "11px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avg"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAvg)"
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#3b82f6" }}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
          <h3 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-4">
            Course Attendance Rates
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={classAttendanceData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  fillOpacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  dy={8}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9", opacity: 0.5 }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(8px)",
                    fontSize: "11px",
                  }}
                />
                <Bar
                  dataKey="percentage"
                  radius={[4, 4, 0, 0]}
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

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/20 flex justify-between items-center">
          <h3 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Recent Activity
          </h3>
          <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-350">
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <div className="px-4 py-3 sm:px-5 sm:py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 dark:bg-slate-950/20 transition-colors">
            <div className="flex items-center min-w-0">
              <div className="mr-3 p-1.5 bg-emerald-50 dark:bg-emerald-900/20 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                  Graded Assignment 2 (CS301)
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  2 hours ago
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-5 sm:py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 dark:bg-slate-950/20 transition-colors">
            <div className="flex items-center min-w-0">
              <div className="mr-3 p-1.5 bg-blue-50 dark:bg-blue-900/20 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                <Upload className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                  Uploaded Lecture Notes (Week 4)
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Yesterday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
