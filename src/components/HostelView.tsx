import { Home, Coffee, AlertOctagon, Utensils, Info } from 'lucide-react';

export function HostelView() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Hostel & Mess</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage hostel attendance, view mess menu, and register complaints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <Home className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Room Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-md border border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Hostel</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Bose Hostel (Block A)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-md border border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Room No</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">214 (Double Occupancy)</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-md border border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Attendance Status</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <div className="h-2 w-2 bg-emerald-500 dark:bg-emerald-600 rounded-full"></div> Marked Present
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
              <Utensils className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Today's Mess Menu</h3>
          </div>
          <div className="space-y-3">
            <div className="border-l-2 border-slate-300 pl-3 py-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Breakfast (8:00 AM)</span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Aloo Paratha, Curd, Tea/Coffee</span>
            </div>
            <div className="border-l-2 border-slate-300 pl-3 py-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Lunch (01:00 PM)</span>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Rajma Chawal, Roti, Salad, Mix Veg</span>
            </div>
            <div className="border-l-2 border-blue-500 pl-3 py-1 bg-blue-50 dark:bg-blue-900/20/50 rounded-r-md">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider block mb-1">Dinner (8:00 PM)</span>
              <span className="text-sm font-medium text-blue-900">Paneer Butter Masala, Naan, Jeera Rice, Gulab Jamun</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Recent Complaints</h3>
          <button className="bg-slate-900 text-slate-50 hover:bg-slate-800 text-sm font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2">
            <AlertOctagon className="h-4 w-4" /> Raise Complaint
          </button>
        </div>
        <div className="p-6">
           <div className="flex gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
             <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
               <Info className="h-5 w-5 text-slate-500 dark:text-slate-400" />
             </div>
             <div>
               <div className="flex items-center gap-2 mb-1">
                 <h4 className="font-semibold text-slate-800 dark:text-slate-200">Fan Speed Regulator Broken</h4>
                 <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded">Pending</span>
               </div>
               <p className="text-sm text-slate-600 dark:text-slate-400">The regulator in Room 214 is free-spinning. Needs replacement.</p>
               <p className="text-xs text-slate-400 mt-2 font-medium">Ticket #4002 • Raised 2 days ago</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
