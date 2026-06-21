import { FileText, Upload, Clock, CheckCircle2 } from 'lucide-react';

export function AssignmentsView() {
  const assignments = [
    { id: 1, title: 'Network Protocols Implementation', subject: 'IoT Architecture', dueDate: 'Today, 11:59 PM', status: 'pending' },
    { id: 2, title: 'Binary Search Tree Assignment', subject: 'Data Structures', dueDate: 'Tomorrow', status: 'pending' },
    { id: 3, title: '8051 Microcontroller Sim', subject: 'Microcontrollers & IoT', dueDate: 'Oct 24', status: 'submitted' },
    { id: 4, title: 'Python List Comprehensions', subject: 'Python Programming', dueDate: 'Oct 20', status: 'graded', points: '9.5/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Assignments</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your coursework, uploads, and deadlines.</p>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white dark:bg-slate-900 p-5 rounded-md border border-slate-200 dark:border-slate-800 shadow-none flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-none">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${assignment.status === 'pending' ? 'bg-slate-50 dark:bg-slate-950 border-l-2 border-l-indigo-500 text-indigo-600' : 'bg-slate-50 dark:bg-slate-950 border-l-2 border-l-emerald-500 text-emerald-600 dark:text-emerald-400'}`}>
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{assignment.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{assignment.subject} • Due: {assignment.dueDate}</p>
                {assignment.status === 'graded' && (
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">Grade: {assignment.points}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:w-auto w-full">
              {assignment.status === 'pending' ? (
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-slate-50 px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors">
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
              ) : (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-950 border-l-2 border-l-emerald-500 px-4 py-2 rounded-lg font-medium text-sm w-full md:w-auto justify-center border border-emerald-100">
                  <CheckCircle2 className="h-4 w-4" />
                  {assignment.status === 'submitted' ? 'Submitted' : 'Graded'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
