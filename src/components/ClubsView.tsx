import { Users, Calendar, ArrowRight, Target } from 'lucide-react';

const clubs = [
  { id: 1, name: 'Robotics Club', members: 120, status: 'Member', focus: 'AI & Automata' },
  { id: 2, name: 'Coding Blocks', members: 340, status: 'Core Committee', focus: 'Competitive Prog.' },
  { id: 3, name: 'Google Developer Student Club', members: 210, status: 'Join Now', focus: 'Web & App Dev' },
  { id: 4, name: 'Literary Society', members: 85, status: 'Join Now', focus: 'Debate & Writing' },
];

export function ClubsView() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Clubs & Societies</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Discover tech fests, hackathons, and register for campus clubs.</p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500 border border-slate-200 dark:border-slate-800 p-5 rounded-lg flex items-start gap-4">
        <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-blue-900">Upcoming Mega-Hackathon</h4>
          <p className="text-sm text-blue-800/80 mt-1">Register for 'HackTheFuture 2024' before 1st Nov. Grand prize of ₹50,000 to be won. Team size: 2-4 members.</p>
          <button className="mt-3 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            Register your team <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xl border-b border-slate-200 dark:border-slate-800 pb-2">Explore Campus Clubs</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div key={club.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col hover:border-slate-300 transition-colors">
            <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-300 mb-4 border border-slate-200 dark:border-slate-800">
               <Users className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{club.name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 flex-1">{club.focus}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded">{club.members} Members</span>
              {club.status === 'Join Now' ? (
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors">
                  Join Club &rarr;
                </button>
              ) : (
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                  club.status === 'Core Committee' ? 'bg-amber-100 text-amber-700 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:text-emerald-400'
                }`}>
                  {club.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
