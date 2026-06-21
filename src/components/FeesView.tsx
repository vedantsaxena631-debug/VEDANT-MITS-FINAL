import { IndianRupee, Download, CheckCircle, Clock } from 'lucide-react';

export function FeesView() {
  const feeHistory = [
    { id: 'RCPT-2024-081', date: '10 Aug 2024', amount: '₹45,500', term: 'Semester 3 Tuition Fee', status: 'Paid' },
    { id: 'RCPT-2024-002', date: '15 Jul 2024', amount: '₹22,000', term: 'Hostel & Mess Fee (Odd Sem)', status: 'Paid' },
    { id: 'RCPT-2023-112', date: '05 Jan 2024', amount: '₹45,500', term: 'Semester 2 Tuition Fee', status: 'Paid' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Fee Details</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">View fee structure, payment history, pending dues, and download receipts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-lg border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
            <IndianRupee size={160} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
              <Clock className="h-4 w-4" /> Pending Dues
            </div>
            <div className="text-4xl font-sans font-bold tracking-tight mb-1">₹8,500</div>
            <p className="text-slate-400 text-sm">Exam Fee & Library Fines</p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800">
            <button className="bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-md transition-colors w-full sm:w-auto shadow-none">
              Pay Now
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-lg flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg mb-4">Current Semester Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Tuition Fee</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">₹45,500</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Development Fee</span>
                <span className="font-medium text-slate-900 dark:text-slate-100">₹5,000</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Exam Fee (Pending)</span>
                <span className="font-medium text-rose-600 flex items-center gap-1"><Clock className="h-3 w-3"/> ₹8,000</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Library Fine (Pending)</span>
                <span className="font-medium text-rose-600 flex items-center gap-1"><Clock className="h-3 w-3"/> ₹500</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center font-bold text-slate-900 dark:text-slate-100">
            <span>Total Expected</span>
            <span>₹59,000</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">Payment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3 font-semibold">Receipt ID</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Amount</th>
                <th className="px-6 py-3 font-semibold text-center">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {feeHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800 dark:bg-slate-950/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400 font-medium">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{item.term}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">{item.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200">
                      <CheckCircle className="h-3 w-3" /> {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium inline-flex items-center gap-1 transition-colors">
                      <Download className="h-4 w-4" /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
