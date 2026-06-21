import { resultsData, syllabusData } from '../data';
import { Award, Calculator, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function ResultsView() {
  const [marks, setMarks] = useState<Record<string, number | "">>({});
  
  const getGradeFromMarks = (mark: number | "") => {
    if (mark === "") return 'N/A';
    if (mark >= 90) return 'A+';
    if (mark >= 80) return 'A';
    if (mark >= 70) return 'B+';
    if (mark >= 60) return 'B';
    if (mark >= 50) return 'C+';
    if (mark >= 40) return 'C';
    if (mark >= 33) return 'D';
    return 'F';
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-950 border-l-2 border-l-emerald-500 border-slate-200 dark:border-slate-800';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-950 border-l-2 border-l-blue-500 border-slate-200 dark:border-slate-800';
    if (grade === 'C+' || grade === 'C') return 'text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-950 border-l-2 border-l-blue-500 border-slate-200 dark:border-slate-800';
    if (grade === 'F') return 'text-red-600 dark:text-red-400 bg-slate-50 dark:bg-slate-950 border-l-2 border-l-red-500 border-slate-200 dark:border-slate-800';
    return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800';
  };

  const gradePoints: Record<string, number> = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0, 'N/A': 0 };

  const calculateExpectedSGPA = () => {
    let totalPoints = 0;
    syllabusData.forEach((sub) => {
      const mark = marks[sub.code];
      // Default to 85 (Grade A) if no marks entered
      const grade = getGradeFromMarks(mark === undefined ? 85 : mark);
      totalPoints += gradePoints[grade];
    });
    return (totalPoints / syllabusData.length).toFixed(2);
  };

  const calculateExpectedCGPA = () => {
    const pastSGPA = resultsData.reduce((acc, curr) => acc + curr.sgpa, 0);
    const expectedSGPA = parseFloat(calculateExpectedSGPA());
    // Assuming equal weightage for simplicity
    const totalSems = resultsData.length + 1; 
    return ((pastSGPA + expectedSGPA) / totalSems).toFixed(2);
  };

  const handleMarkChange = (code: string, value: string) => {
    let num = parseInt(value, 10);
    if (value === "") {
      setMarks({ ...marks, [code]: "" });
    } else if (!isNaN(num)) {
      if (num < 0) num = 0;
      if (num > 100) num = 100;
      setMarks({ ...marks, [code]: num });
    }
  };

  return (
    <motion.div layoutId="card-results" className="space-y-8 pb-12 bg-slate-50 dark:bg-slate-950">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Results & SGPA</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View past academic results and calculate your current semester performance based on marks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-500" /> Past Semesters
          </h3>
          <div className="space-y-4">
            {resultsData.map((res, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-md border border-slate-200 dark:border-slate-800 shadow-none flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Semester {res.semester}</p>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{res.status}</span>
                </div>
                <div className="text-3xl font-sans font-semibold tracking-tight font-bold text-slate-900 dark:text-slate-100">
                  {res.sgpa}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-md p-6 text-slate-50 shadow-none">
            <div className="flex items-center gap-2 mb-4 text-slate-300">
              <TrendingUp className="h-5 w-5" />
              <h3 className="font-semibold">Cumulative Info</h3>
            </div>
            <div className="space-y-3">
               <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <span className="text-sm font-medium text-slate-400">Past CGPA</span>
                  <span className="text-xl font-sans font-semibold tracking-tight font-bold">
                    {(resultsData.reduce((acc, curr) => acc + curr.sgpa, 0) / resultsData.length).toFixed(2)}
                  </span>
               </div>
               <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-slate-400">Est. New CGPA</span>
                  <span className="text-2xl font-sans font-semibold tracking-tight font-bold text-blue-500">
                    {calculateExpectedCGPA()}
                  </span>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Live SGPA Calculator</h3>
              </div>
              <div className="bg-slate-900 text-slate-50 px-4 py-2 rounded-lg font-sans font-semibold tracking-tight font-bold shadow-inner">
                Est SGPA: <span className="text-emerald-400 ml-1">{calculateExpectedSGPA()}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="flex text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                  <div className="flex-1">Subject</div>
                  <div className="w-24 text-center">Marks (100)</div>
                  <div className="w-20 text-right pr-1">Grade</div>
                </div>
                {syllabusData.map(sub => {
                  const mark = marks[sub.code];
                  const grade = getGradeFromMarks(mark === undefined ? 85 : mark);
                  return (
                    <div key={sub.code} className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 transition-colors border border-transparent hover:border-slate-100 dark:border-slate-800">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate min-w-0 flex-1" title={sub.subject}>{sub.subject}</span>
                      
                      <div className="w-24 shrink-0 flex items-center justify-center relative">
                        <input
                          type="number"
                          placeholder="85"
                          min="0"
                          max="100"
                          value={mark === undefined ? "" : mark}
                          onChange={(e) => handleMarkChange(sub.code, e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 text-center outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="w-20 shrink-0 text-right pr-1">
                        <span className={`inline-flex items-center justify-center w-9 h-9 border rounded-lg text-sm font-bold ${getGradeColor(grade)}`}>
                          {grade === 'N/A' ? '-' : grade}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
