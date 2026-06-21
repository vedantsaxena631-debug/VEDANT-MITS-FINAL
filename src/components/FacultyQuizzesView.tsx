import { Plus, ListTodo, Edit3, Settings, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultyQuizzesView() {
  const quizzes = [
    { id: 1, title: 'Mid-Term MCQ Test', course: 'CS301', questions: 25, duration: '30 mins', status: 'Draft' },
    { id: 2, title: 'Process Scheduling Quiz', course: 'CS302', questions: 10, duration: '15 mins', status: 'Published' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Create Quizzes</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Design multiple-choice and short-answer tests with auto-grading.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4 mr-2" />
          New Quiz
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Your Quizzes</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{quiz.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    quiz.status === 'Published' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}>
                    {quiz.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">{quiz.course}</span>
                  <span className="flex items-center"><ListTodo className="w-3.5 h-3.5 mr-1" /> {quiz.questions} Questions</span>
                  <span>• {quiz.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {quiz.status === 'Draft' ? (
                  <button className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded transition text-sm font-medium">
                    <Edit3 className="w-4 h-4 mr-1.5" />
                    Edit Draft
                  </button>
                ) : (
                  <button className="flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 rounded transition text-sm font-medium">
                    <Play className="w-4 h-4 mr-1.5" />
                    View Results
                  </button>
                )}
                <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
