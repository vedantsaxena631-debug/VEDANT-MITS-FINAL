import { Upload, FileText, Video, Presentation, Search, MoreVertical, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function FacultyMaterialsView() {
  const materials = [
    { id: 1, title: 'Chapter 1: Intro to Operating Systems', course: 'CS302', type: 'PDF', date: 'Oct 20, 2026', size: '2.4 MB' },
    { id: 2, title: 'Process Scheduling Algorithms', course: 'CS302', type: 'PPT', date: 'Oct 22, 2026', size: '5.1 MB' },
    { id: 3, title: 'Lecture 4 Recording - Deadlocks', course: 'CS302', type: 'Video', date: 'Oct 23, 2026', size: '145 MB' },
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
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Study Materials</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Upload and manage resources for your courses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Upload New Material</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Chapter 4 Notes" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course</label>
              <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>CS301 - DSA</option>
                <option>CS302 - OS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea rows={3} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Optional description..."></textarea>
            </div>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
              <Upload className="h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Click to upload or drag & drop</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PDF, PPT, MP4 up to 200MB</p>
            </div>
            <button type="button" className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Upload File
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 w-full">Uploaded Files</h3>
            <div className="relative w-full sm:w-auto">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search files..." className="pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {materials.map((file) => (
              <div key={file.id} className="flex items-center p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition group">
                <div className={`p-3 rounded-lg mr-4 ${
                  file.type === 'PDF' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                  file.type === 'PPT' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                  'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                }`}>
                  {file.type === 'PDF' && <FileText className="h-6 w-6" />}
                  {file.type === 'PPT' && <Presentation className="h-6 w-6" />}
                  {file.type === 'Video' && <Video className="h-6 w-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{file.title}</p>
                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 space-x-3">
                    <span className="font-semibold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{file.course}</span>
                    <span>• {file.date}</span>
                    <span>• {file.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="p-2 text-slate-400 hover:text-red-500 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-500 transition rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
