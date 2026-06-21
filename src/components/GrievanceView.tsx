import { AlertCircle, Send, Flag } from 'lucide-react';

export function GrievanceView() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Grievance Portal</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Submit feedback, requests, or administrative complaints confidentially.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-md border border-slate-200 dark:border-slate-800 shadow-none">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Grievance submitted successfully."); }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5"><Flag className="h-4 w-4 text-slate-400"/> Category</label>
              <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 outline-none transition-colors">
                <option>Academics & Teaching</option>
                <option>Hostel & Mess</option>
                <option>Examinations & Results</option>
                <option>IT & Infrastructure</option>
                <option>Library Issues</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
              <input type="text" required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 outline-none transition-colors" placeholder="Brief subject or title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
              <textarea rows={5} required className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 resize-none outline-none transition-colors" placeholder="Elaborate your concern with necessary facts..."></textarea>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-slate-800 transition-colors font-medium rounded-lg text-sm px-5 py-3 text-center shadow-none hover:shadow-none active:translate-y-[1px]">
              <Send className="h-4 w-4" /> Submit Report
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-950 border-l-2 border-l-indigo-500 border border-indigo-100 p-5 rounded-md flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-indigo-500 shrink-0" />
            <div>
              <h4 className="font-semibold text-indigo-900">Support Guidelines</h4>
              <p className="text-sm text-indigo-800/80 mt-1.5 leading-relaxed">
                Please ensure your grievances are clear and factual. False or abusive complaints will face strict disciplinary action. Routine support requests normally take 2-3 working days to escalate.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Your Active Tickets</h3>
            </div>
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <Flag className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No active grievances filed.</p>
              <p className="text-slate-400 text-xs mt-1">Your submitted tickets will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
