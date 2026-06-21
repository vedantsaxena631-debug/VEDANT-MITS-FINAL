import { ExternalLink, FileText, Upload, Briefcase, PlusCircle } from 'lucide-react';

export function InternshipsView() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Internship Portal</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Apply for internships, track status, and upload training reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Summer Internship 2024</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mandatory 6-week industrial training.</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded border border-emerald-200">
                  Approved
                </span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Company: TechFlow IT Solutions</span>
              </div>
            </div>
            <button className="shrink-0 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
              <Upload className="h-4 w-4" /> Upload Report
            </button>
          </div>

          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xl border-b border-slate-200 dark:border-slate-800 pb-2 mt-8">Recommended Opportunities</h3>
          
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col sm:flex-row gap-4 justify-between items-center rounded-lg hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800">
                     <Briefcase className="h-6 w-6 text-slate-400" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-800 dark:text-slate-200">Frontend Developer Intern</h4>
                     <p className="text-sm text-slate-500 dark:text-slate-400">Stark Industries • Remote • 3 Months</p>
                   </div>
                </div>
                <button className="w-full sm:w-auto text-slate-600 dark:text-slate-400 border border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950 font-medium px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm">
                  Apply <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white rounded-lg p-6">
             <h3 className="font-semibold text-lg mb-2">Request NOC</h3>
             <p className="text-sm text-slate-400 mb-6 font-light leading-relaxed">
               Need a No Objection Certificate (NOC) for your external internship application? Apply here.
             </p>
             <button className="w-full flex justify-center items-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold py-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800 transition-colors">
               <PlusCircle className="h-5 w-5" /> Apply for NOC
             </button>
           </div>
           
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
             <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Guidelines</h3>
             <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
               <li className="flex gap-2"><FileText className="h-4 w-4 shrink-0 text-slate-400 mt-0.5"/> Minimum duration must be 6 weeks.</li>
               <li className="flex gap-2"><FileText className="h-4 w-4 shrink-0 text-slate-400 mt-0.5"/> Reports must be signed by the external supervisor.</li>
               <li className="flex gap-2"><FileText className="h-4 w-4 shrink-0 text-slate-400 mt-0.5"/> Plagiarism in reports will lead to cancellation.</li>
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
