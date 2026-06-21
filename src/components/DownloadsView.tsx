import { Download, FileText, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function DownloadsView() {
  const documents = [
    { id: 1, title: 'Bonafide Certificate', status: 'Available', type: 'Official Document', size: '1.2 MB' },
    { id: 2, title: 'Semester 2 Marksheet', status: 'Available', type: 'Academic Record', size: '2.4 MB' },
    { id: 3, title: 'Semester 1 Marksheet', status: 'Available', type: 'Academic Record', size: '2.3 MB' },
    { id: 4, title: 'Mid-Sem Hall Ticket', status: 'Available', type: 'Examination', size: '0.8 MB' },
    { id: 5, title: 'Fee Receipt (Odd Sem)', status: 'Available', type: 'Financial', size: '1.1 MB' },
    { id: 6, title: 'Hostel Allotment Letter', status: 'Available', type: 'Accommodation', size: '0.5 MB' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12"
    >
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Download Center</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Access and download your official documents, marksheets, and certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 flex flex-col hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:bg-blue-50 dark:bg-blue-900/20 group-hover:text-blue-600 dark:text-blue-400 group-hover:border-blue-200 transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-100">
                {doc.status}
              </span>
            </div>
            
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{doc.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{doc.type} • {doc.size}</p>
            
            <div className="mt-auto pt-5">
              <button className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2 rounded-md text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-lg p-5 flex items-start gap-3">
        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-900">Document Verification Process</h4>
          <p className="text-sm text-amber-800/80 mt-1">If you require a digitally signed and stamped copy of any document for official purposes, please raise a request in the Grievance section. The process typically takes 2-3 working days.</p>
        </div>
      </div>
    </motion.div>
  );
}
