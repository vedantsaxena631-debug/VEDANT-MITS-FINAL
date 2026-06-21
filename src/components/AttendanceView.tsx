import { syllabusData } from '../data';
import { motion } from 'motion/react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

function CircularProgress({ percentage, size = 64, strokeWidth = 6, color = "currentColor" }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{percentage}%</span>
      </div>
    </div>
  );
}

export function AttendanceView() {
  const totalAttended = syllabusData.reduce((sum, item) => sum + item.attended, 0);
  const totalClasses = syllabusData.reduce((sum, item) => sum + item.total, 0);
  const overallPercentage = Math.round((totalAttended / totalClasses) * 100) || 0;

  return (
    <motion.div layoutId="card-attendance" className="space-y-8 pb-12 bg-slate-50 dark:bg-slate-950">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Attendance</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Track your class attendance for the current semester.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-none flex items-center space-x-6">
        <CircularProgress percentage={overallPercentage} size={84} strokeWidth={8} color={overallPercentage >= 75 ? "text-emerald-500" : "text-indigo-500"} />
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Overall Attendance</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            You attended {totalAttended} out of {totalClasses} classes. Minimum required is 75%.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {syllabusData.map((course, idx) => {
          const percent = Math.round((course.attended / course.total) * 100) || 0;
          const lowAttendance = percent < 75;

          return (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-md border border-slate-200 dark:border-slate-800 shadow-none hover:shadow-none transition-all flex items-center space-x-4">
              <CircularProgress 
                percentage={percent} 
                color={lowAttendance ? "text-red-500" : "text-blue-500"} 
              />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono text-slate-400 block mb-0.5">{course.code}</span>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm truncate" title={course.subject}>
                  {course.subject}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {course.attended} / {course.total} classes
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
