import { resultsData, syllabusData, studentData } from '../data';
import { Award, Calculator, TrendingUp, Sparkles, AlertCircle, CheckCircle2, Target, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface PredictionResult {
  predictedSgpa: number;
  predictedCgpa: number;
  trendAnalysis: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const LOADING_STEPS = [
  "Analyzing previous semester GPAs (Sem 1 & 2)...",
  "Correlating current syllabus, credit scales, and estimated benchmarks...",
  "Evaluating course assignments completion and performance indicators...",
  "Drafting personalized academic trends and projections using Gemini...",
  "Compiling actionable strategic studies recommendations..."
];

export function ResultsView() {
  const [marks, setMarks] = useState<Record<string, number | "">>({});
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const assignmentsData = [
    { id: 1, title: 'Network Protocols Implementation', subject: 'IoT Architecture', dueDate: 'Today, 11:59 PM', status: 'pending' },
    { id: 2, title: 'Binary Search Tree Assignment', subject: 'Data Structures', dueDate: 'Tomorrow', status: 'pending' },
    { id: 3, title: '8051 Microcontroller Sim', subject: 'Microcontrollers & IoT', dueDate: 'Oct 24', status: 'submitted' },
    { id: 4, title: 'Python List Comprehensions', subject: 'Python Programming', dueDate: 'Oct 20', status: 'graded', points: '9.5/10' },
  ];

  const handleStartPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/predict-cgpa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student: studentData,
          syllabus: syllabusData,
          results: resultsData,
          currentMarks: marks,
          assignments: assignmentsData,
        }),
      });

      if (!response.ok) {
        throw new Error('Our projection service returned an unexpected response. Please ensure your development server is running.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setPrediction(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Unable to load academic projections at this time.');
    } finally {
      setLoading(false);
    }
  };
  
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

      {/* Gemini AI CGPA Predictor Section */}
      <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 p-6 shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
              <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
              <h3 className="text-xl font-sans font-semibold tracking-tight">Gemini AI CGPA Predictor & Trends</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Analyze academic history, assignment patterns, and live estimates to dynamically predict target scores.
            </p>
          </div>
          <div>
            <button
              onClick={handleStartPrediction}
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-slate-50 font-medium text-sm px-5 py-2.5 rounded-lg shadow-none transition-all cursor-pointer ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing Pacing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analyze & Predict CGPA
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-6 flex gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Prediction Failed</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Loading indicators */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
              <Sparkles className="absolute h-6 w-6 text-blue-500 animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Consulting Academic Advisor</p>
              <motion.p
                key={loadingStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wide"
              >
                {LOADING_STEPS[loadingStep]}
              </motion.p>
            </div>
          </div>
        )}

        {/* Projections Dashboard */}
        {!loading && prediction && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-8"
          >
            {/* Predictions bento box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono">Projected Sem 4 SGPA</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Based on estimated course performance</p>
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-sans font-bold text-slate-900 dark:text-slate-100">{prediction.predictedSgpa.toFixed(2)}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded">AI Target</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">Projected Cum. CGPA</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Overall projected standing after Sem 4</p>
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-sans font-bold text-slate-900 dark:text-slate-100">{prediction.predictedCgpa.toFixed(2)}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded">Target Standing</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Performance Status</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Overall trajectory evaluation</p>
                </div>
                <div className="mt-6">
                  <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Consistent Improvement
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Reflects semester-over-semester positive pacing.</p>
                </div>
              </div>

            </div>

            {/* Strategic Analysis */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-lg">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider font-mono">Strategic Trend Assessment</h4>
              <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm leading-relaxed whitespace-pre-line">{prediction.trendAnalysis}</p>
            </div>

            {/* Strengths / Focus areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-lg bg-white dark:bg-slate-900">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" /> Key Academic Strengths
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {prediction.strengths.map((str, idx) => (
                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded shrink-0 font-mono">{idx + 1}</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-lg bg-white dark:bg-slate-900">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4.5 w-4.5 text-blue-500" /> Improvement & Focus Opportunities
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {prediction.weaknesses.map((weak, idx) => (
                    <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded shrink-0 font-mono">{idx + 1}</span>
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Action Roadmap */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider font-mono">Actionable Study Roadmap</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Strategic directives recommended by advisor analysis metrics to achieve target standings.</p>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prediction.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">
                    <div className="h-5 w-5 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 leading-snug">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

