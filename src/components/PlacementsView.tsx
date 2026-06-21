import { Briefcase, Building2, CheckCircle, Clock } from 'lucide-react';

const placementDrives = [
  { id: 1, company: 'Google', role: 'Software Engineer', type: 'Full-time', ctcs: '₹ 25 LPA', date: '25 Nov 2024', status: 'Applied', statusType: 'pending' },
  { id: 2, company: 'Microsoft', role: 'SDE-1', type: 'Full-time', ctcs: '₹ 22 LPA', date: '10 Dec 2024', status: 'Shortlisted', statusType: 'success' },
  { id: 3, company: 'TCS Digital', role: 'Systems Engineer', type: 'Full-time', ctcs: '₹ 7.5 LPA', date: '05 Jan 2025', status: 'Apply Now', statusType: 'action' },
];

export function PlacementsView() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Placement Cell</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Drive updates, company information, and your application status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Eligible Drives</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">12</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applied</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">4</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">2</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Ongoing & Upcoming Drives</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {placementDrives.map((drive) => (
            <div key={drive.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-800">
                  {drive.company[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg flex items-center gap-2">
                    {drive.company}
                    {drive.statusType === 'success' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:text-emerald-400">Shortlisted</span>}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{drive.role} • {drive.type}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{drive.ctcs}</span>
                    <span>•</span>
                    <span>Deadline: {drive.date}</span>
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                {drive.statusType === 'action' ? (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md transition-colors w-full md:w-auto">
                    {drive.status}
                  </button>
                ) : (
                  <span className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
                    drive.statusType === 'pending' ? 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800' : 
                    'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400'
                  }`}>
                    {drive.statusType === 'pending' ? 'Application Submitted' : 'View Next Steps'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
