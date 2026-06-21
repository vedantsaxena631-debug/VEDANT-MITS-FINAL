import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell, Calendar, BookA, ClipboardCheck, IndianRupee, MessageSquare, Search, Plus, Trash2, Edit, X, Download, ToggleLeft, ToggleRight, Check, AlertCircle, Eye, MailCheck
} from 'lucide-react';

interface OperationsProps {
  activeSection: 'notices' | 'academic-calendar' | 'exam-scheduling' | 'assignment-control' | 'fee-management' | 'grievances';
}

// Interfaces
interface NoticeRecord { id: string; title: string; date: string; category: 'Exam' | 'Academic' | 'Placement' | 'General'; status: 'Published' | 'Draft'; }
interface CalendarEvent { id: string; title: string; start: string; end: string; type: 'Holiday' | 'Examination' | 'Cultural' | 'Milestone'; }
interface ExamSchedule { id: string; course: string; semester: string; date: string; session: 'Morning' | 'Afternoon'; venue: string; supervisor: string; }
interface AssignmentControlItem { id: string; subject: string; instructor: string; duedate: string; active: boolean; submissions: number; }
interface FeeRecord { id: string; name: string; semester: number; dueAmount: number; paidAmount: number; status: 'Paid' | 'Partial' | 'Overdue'; email: string; }
interface GrievanceRecord { id: string; filedBy: string; category: 'Hostel' | 'Academic' | 'Facilities' | 'Other'; message: string; priority: 'High' | 'Medium' | 'Low'; status: 'Pending' | 'Investigating' | 'Resolved'; reply?: string; }

export function AdminOperations({ activeSection }: OperationsProps) {
  // ================= NOTICE BOARD STATE =================
  const [notices, setNotices] = useState<NoticeRecord[]>([
    { id: 'N1', title: 'Mid-Term Examinations Timetable Released', date: '2026-06-18', category: 'Exam', status: 'Published' },
    { id: 'N2', title: 'Campus Recruitment Drive by Google India', date: '2026-06-15', category: 'Placement', status: 'Published' },
    { id: 'N3', title: 'Maintenance Notice: Core Hostel Wi-Fi server reboot', date: '2026-06-12', category: 'General', status: 'Draft' },
    { id: 'N4', title: 'Monsoon Break Schedules & Hostel Leave Guidelines', date: '2026-06-10', category: 'Academic', status: 'Published' },
  ]);
  const [noticeSearch, setNoticeSearch] = useState('');
  const [noticeFilter, setNoticeFilter] = useState<'all' | 'Exam' | 'Academic' | 'Placement' | 'General'>('all');
  const [selectedNoticeIds, setSelectedNoticeIds] = useState<string[]>([]);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeRecord | null>(null);
  const [newNotice, setNewNotice] = useState<NoticeRecord>({ id: '', title: '', date: '2026-06-21', category: 'General', status: 'Published' });

  // ================= ACADEMIC CALENDAR STATE =================
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 'E1', title: 'Induction / Orientation Program', start: '2026-07-06', end: '2026-07-10', type: 'Milestone' },
    { id: 'E2', title: 'First Sessional Examinations', start: '2026-08-17', end: '2026-08-21', type: 'Examination' },
    { id: 'E3', title: 'Independence Academics Holiday', start: '2026-08-15', end: '2026-08-15', type: 'Holiday' },
    { id: 'E4', title: 'MITS Youth Cultural Festival "VIBRANCE"', start: '2026-09-22', end: '2026-09-24', type: 'Cultural' },
  ]);
  const [eventSearch, setEventSearch] = useState('');
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({ id: '', title: '', start: '2026-07-01', end: '2026-07-01', type: 'Milestone' });

  // ================= EXAMS SCHEDULING STATE =================
  const [exams, setExams] = useState<ExamSchedule[]>([
    { id: 'X1', course: 'Computer Architecture & Networks', semester: 'IV Sems', date: '2026-07-15', session: 'Morning', venue: 'Main Hall A', supervisor: 'Dr. Sarah Smith' },
    { id: 'X2', course: 'Digital Signal Processing', semester: 'VI Sems', date: '2026-07-16', session: 'Afternoon', venue: 'Seminar Hall 2', supervisor: 'Dr. Rajesh Gupta' },
    { id: 'X3', course: 'Theoretical Automata & Machines', semester: 'IV Sems', date: '2026-07-18', session: 'Morning', venue: 'Drawing Lab B', supervisor: 'Prof. Ramesh Khanna' },
    { id: 'X4', course: 'Design & Analysis of Algorithms', semester: 'IV Sems', date: '2026-07-20', session: 'Afternoon', venue: 'Main Hall A', supervisor: 'Dr. Sarah Smith' },
  ]);
  const [examSearch, setExamSearch] = useState('');
  const [selectedExamIds, setSelectedExamIds] = useState<string[]>([]);
  const [showExamModal, setShowExamModal] = useState(false);
  const [editingExam, setEditingExam] = useState<ExamSchedule | null>(null);
  const [newExam, setNewExam] = useState<ExamSchedule>({ id: '', course: '', semester: 'IV Sems', date: '2026-07-15', session: 'Morning', venue: 'Main Hall A', supervisor: 'Dr. Sarah Smith' });

  // ================= ASSIGNMENT CONTROL STATE =================
  const [assignments, setAssignments] = useState<AssignmentControlItem[]>([
    { id: 'A1', subject: 'Compiler Design: LL(1) Parsers', instructor: 'Dr. Sarah Smith', duedate: '2026-06-25', active: true, submissions: 42 },
    { id: 'A2', subject: 'Signals Lab: Fourier Series Simulation', instructor: 'Dr. Rajesh Gupta', duedate: '2026-06-28', active: true, submissions: 18 },
    { id: 'A3', subject: 'Theory of Computation: Turing Machines', instructor: 'Prof. Ramesh Khanna', duedate: '2026-06-20', active: false, submissions: 58 },
    { id: 'A4', subject: 'Machine Learning: SVM Regression', instructor: 'Dr. Robert Johnson', duedate: '2026-07-02', active: true, submissions: 9 },
  ]);
  const [assignSearch, setAssignSearch] = useState('');
  const [selectedAssignIds, setSelectedAssignIds] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingAssign, setEditingAssign] = useState<AssignmentControlItem | null>(null);
  const [newAssign, setNewAssign] = useState<AssignmentControlItem>({ id: '', subject: '', instructor: '', duedate: '2026-06-30', active: true, submissions: 0 });

  // ================= FEE MANAGEMENT STATE =================
  const [fees, setFees] = useState<FeeRecord[]>([
    { id: 'MITS-CS-22-045', name: 'Vedant Saxena', semester: 4, dueAmount: 0, paidAmount: 48000, status: 'Paid', email: 'vedantsaxena571@gmail.com' },
    { id: 'MITS-CS-22-102', name: 'Priya Sharma', semester: 4, dueAmount: 12000, paidAmount: 36000, status: 'Partial', email: 'priya.sharma@mits.ac' },
    { id: 'MITS-EC-23-018', name: 'Amit Patel', semester: 2, dueAmount: 48000, paidAmount: 0, status: 'Overdue', email: 'amit.patel@mits.ac' },
    { id: 'MITS-CS-22-192', name: 'Tushar Verma', semester: 4, dueAmount: 0, paidAmount: 48000, status: 'Paid', email: 'tusharv@mits.ac' },
  ]);
  const [feeSearch, setFeeSearch] = useState('');
  const [feeFilter, setFeeFilter] = useState<'all' | 'Paid' | 'Partial' | 'Overdue'>('all');
  const [selectedFeeIds, setSelectedFeeIds] = useState<string[]>([]);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeRecord | null>(null);
  const [newFee, setNewFee] = useState<FeeRecord>({ id: '', name: '', semester: 4, dueAmount: 48000, paidAmount: 0, status: 'Overdue', email: '' });
  const [reminderAlert, setReminderAlert] = useState<string | null>(null);

  // ================= GRIEVANCE HANDLING STATE =================
  const [grievances, setGrievances] = useState<GrievanceRecord[]>([
    { id: 'G-1402', filedBy: 'Vedant Saxena', category: 'Facilities', message: 'The CSE Lab 3 air conditioning system is broken during examinations. Extreme heat.', priority: 'High', status: 'Pending' },
    { id: 'G-1384', filedBy: 'Amit Patel', category: 'Hostel', message: 'Hostel Mess: Dinner protein options consist of repetitive tofu. We request variations.', priority: 'Medium', status: 'Investigating' },
    { id: 'G-1210', filedBy: 'Priya Sharma', category: 'Academic', message: 'Conflicting time-slot schedules for CSE elective and ECE elective credits.', priority: 'High', status: 'Resolved', reply: 'Liaised with HOD: ECE credit shifted.' },
  ]);
  const [grievanceSearch, setGrievanceSearch] = useState('');
  const [grievanceFilter, setGrievanceFilter] = useState<'all' | 'Pending' | 'Investigating' | 'Resolved'>('all');
  const [selectedGrievanceIds, setSelectedGrievanceIds] = useState<string[]>([]);
  const [editingGrievance, setEditingGrievance] = useState<GrievanceRecord | null>(null);
  const [grievanceReplyText, setGrievanceReplyText] = useState('');

  // ================= UNIVERSAL BULK CONTROLLER =================
  const handleToggleSelect = (id: string, list: string[], setList: (l: string[]) => void) => {
    if (list.includes(id)) { setList(list.filter(x => x !== id)); } else { setList([...list, id]); }
  };

  const handleSelectAll = (ids: string[], list: string[], setList: (l: string[]) => void) => {
    if (list.length === ids.length) { setList([]); } else { setList(ids); }
  };

  const triggerExport = (headers: string[], rows: any[][], fileName: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dispatch Fee Payment Reminders Simulation
  const handleDispatchReminders = (records: FeeRecord[]) => {
    const debtors = records.filter(f => f.status !== 'Paid');
    if (debtors.length === 0) return;
    setReminderAlert(`Email triggers dispatched! Payment warnings sent securely to ${debtors.length} academic mailbox records.`);
    setTimeout(() => setReminderAlert(null), 5000);
  };

  return (
    <div className="space-y-6">
      {reminderAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs"
        >
          <MailCheck className="h-4 w-4 shrink-0" />
          <p className="font-semibold">{reminderAlert}</p>
        </motion.div>
      )}

      {/* ================= SECTION 1: NOTICES CRUD ================= */}
      {activeSection === 'notices' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-400" /> Notice Board (CRUD)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Publish circulars, placement metrics, exam timetables</p>
            </div>
            <button
              onClick={() => { setNewNotice({ id: `N${Date.now()}`, title: '', date: '2026-06-21', category: 'General', status: 'Published' }); setShowNoticeModal(true); }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Compose Circular Notice
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search circular title..."
                value={noticeSearch}
                onChange={(e) => setNoticeSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-end">
              <select
                value={noticeFilter}
                onChange={(e) => setNoticeFilter(e.target.value as any)}
                className="bg-slate-950 text-slate-200 border border-white/5 rounded-lg text-xs p-2"
              >
                <option value="all">Every Category</option>
                <option value="Exam">Exam Board</option>
                <option value="Academic">Academic</option>
                <option value="Placement">Recruitments</option>
                <option value="General">General Care</option>
              </select>
              <button
                onClick={() => triggerExport(['Index', 'Title', 'Date', 'Category', 'Workflow Status'], notices.map(n => [n.id, n.title, n.date, n.category, n.status]), 'notice_indexes')}
                className="px-3 border border-white/5 bg-slate-950 hover:bg-slate-900 text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Download className="h-3 w-3" /> Export CSV
              </button>
            </div>
          </div>

          {selectedNoticeIds.length > 0 && (
            <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/20 flex justify-between items-center text-xs text-indigo-300">
              <span>{selectedNoticeIds.length} circulars selected.</span>
              <button
                onClick={() => { setNotices(notices.filter(n => !selectedNoticeIds.includes(n.id))); setSelectedNoticeIds([]); }}
                className="px-3 py-1 bg-red-600/30 text-red-300 border border-red-500/30 rounded text-[11px] font-bold"
              >
                Destructive Purge
              </button>
            </div>
          )}

          <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                  <th className="py-3 px-4 w-12">
                    <input
                      type="checkbox"
                      checked={selectedNoticeIds.length === notices.length && notices.length > 0}
                      onChange={() => handleSelectAll(notices.map(n => n.id), selectedNoticeIds, setSelectedNoticeIds)}
                      className="rounded accent-indigo-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4 font-semibold">Title Banner</th>
                  <th className="py-3 px-4 font-semibold">Publish Date</th>
                  <th className="py-3 px-4 font-semibold">Category Bracket</th>
                  <th className="py-3 px-4 font-semibold">Workflow Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notices.filter(n => (noticeFilter === 'all' || n.category === noticeFilter) && n.title.toLowerCase().includes(noticeSearch.toLowerCase())).map((notice) => (
                  <tr key={notice.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                    <td className="py-3.5 px-4">
                      <input
                        type="checkbox"
                        checked={selectedNoticeIds.includes(notice.id)}
                        onChange={() => handleToggleSelect(notice.id, selectedNoticeIds, setSelectedNoticeIds)}
                        className="rounded accent-indigo-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4 text-white font-semibold">{notice.title}</td>
                    <td className="py-3.5 px-4 font-mono">{notice.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-950 text-slate-300 border border-white/5">{notice.category}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${notice.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>{notice.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => { setEditingNotice(notice); }} className="p-1.5 hover:text-indigo-400 text-slate-500 rounded"><Edit className="h-3.5 w-3.5" /></button>
                        <button onClick={() => { setNotices(notices.filter(n => n.id !== notice.id)); }} className="p-1.5 hover:text-red-400 text-slate-500 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Notice Modal */}
          {showNoticeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-xs">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                  <h3 className="font-bold text-white text-sm">Compose Circular Notice</h3>
                  <button onClick={() => setShowNoticeModal(false)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setNotices([newNotice, ...notices]); setShowNoticeModal(false); }} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Notice Title Banner</label>
                    <input type="text" required placeholder="e.g. End Semester Practical Vivas" value={newNotice.title} onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <select value={newNotice.category} onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white">
                        <option value="General">General</option>
                        <option value="Exam">Exam Board</option>
                        <option value="Academic">Academic</option>
                        <option value="Placement">Placement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Status</label>
                      <select value={newNotice.status} onChange={(e) => setNewNotice({ ...newNotice, status: e.target.value as any })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white">
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Post Notice</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Edit Notice Modal */}
          {editingNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-xs">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                  <h3 className="font-bold text-white text-sm">Edit Notice</h3>
                  <button onClick={() => setEditingNotice(null)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setNotices(notices.map(n => n.id === editingNotice.id ? editingNotice : n)); setEditingNotice(null); }} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Notice Title</label>
                    <input type="text" required value={editingNotice.title} onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Status</label>
                      <select value={editingNotice.status} onChange={(e) => setEditingNotice({ ...editingNotice, status: e.target.value as any })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white">
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <select value={editingNotice.category} onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value as any })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white">
                        <option value="General">General</option>
                        <option value="Exam">Exam</option>
                        <option value="Academic">Academic</option>
                        <option value="Placement">Placement</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Commit Notice</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* ================= SECTION 2: CALENDAR CRUD ================= */}
      {activeSection === 'academic-calendar' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" /> Academic Calendar
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage holidays, cultural events, exam cycles, orientation rosters</p>
            </div>
            <button
              onClick={() => { setNewEvent({ id: `E${Date.now()}`, title: '', start: '2026-07-01', end: '2026-07-01', type: 'Milestone' }); setShowEventModal(true); }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Add Event Target
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search event title..."
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">Event Target</th>
                  <th className="py-3 px-4 font-semibold">Starts On</th>
                  <th className="py-3 px-4 font-semibold">Ends On</th>
                  <th className="py-3 px-4 font-semibold">Event Class</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.filter(ev => ev.title.toLowerCase().includes(eventSearch.toLowerCase())).map((ev) => (
                  <tr key={ev.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                    <td className="py-3.5 px-4 text-white font-semibold">{ev.title}</td>
                    <td className="py-3.5 px-4 font-mono">{ev.start}</td>
                    <td className="py-3.5 px-4 font-mono">{ev.end}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded font-bold font-mono text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{ev.type}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button onClick={() => setEditingEvent(ev)} className="p-1.5 hover:text-indigo-400 text-slate-500 rounded"><Edit className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setEvents(events.filter(e => e.id !== ev.id))} className="p-1.5 hover:text-red-400 text-slate-500 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showEventModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-xs">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                  <h3 className="font-bold text-white text-sm">Add Event</h3>
                  <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setEvents([newEvent, ...events]); setShowEventModal(false); }} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Event Name</label>
                    <input type="text" required value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Start Date</label>
                      <input type="date" required value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">End Date</label>
                      <input type="date" required value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Target Class Type</label>
                    <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white">
                      <option value="Milestone">Core Milestone</option>
                      <option value="Examination">Examinations</option>
                      <option value="Holiday">Holidays</option>
                      <option value="Cultural">Cultural / Sports</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Commit Milestone</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* ================= SECTION 3: EXAM SCHEDULING CRUD ================= */}
      {activeSection === 'exam-scheduling' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookA className="h-5 w-5 text-indigo-400" /> End-Semester Exam Scheduling
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Apportion venues, schedules, invigilation duty registers</p>
            </div>
            <button
              onClick={() => { setNewExam({ id: `X${Date.now()}`, course: '', semester: 'IV Sems', date: '2026-07-15', session: 'Morning', venue: 'Main Hall A', supervisor: 'Dr. Sarah Smith' }); setShowExamModal(true); }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Create Exam Slot
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search examination course..."
                value={examSearch}
                onChange={(e) => setExamSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">Course Module</th>
                  <th className="py-3 px-4 font-semibold">Semester Group</th>
                  <th className="py-3 px-4 font-semibold">Exam Date</th>
                  <th className="py-3 px-4 font-semibold">Timing Session</th>
                  <th className="py-3 px-4 font-semibold">Assigned Venue</th>
                  <th className="py-3 px-4 font-semibold">Invigilator Staff</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.filter(ex => ex.course.toLowerCase().includes(examSearch.toLowerCase())).map((ex) => (
                  <tr key={ex.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                    <td className="py-3.5 px-4 text-white font-semibold">{ex.course}</td>
                    <td className="py-3.5 px-4 font-mono font-medium">{ex.semester}</td>
                    <td className="py-3.5 px-4 font-mono">{ex.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ex.session === 'Morning' ? 'bg-indigo-500/10 text-indigo-300' : 'bg-pink-500/10 text-pink-300'}`}>{ex.session}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{ex.venue}</td>
                    <td className="py-3.5 px-4 font-sans font-medium">{ex.supervisor}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button onClick={() => setEditingExam(ex)} className="p-1.5 hover:text-indigo-400 text-slate-500 rounded"><Edit className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setExams(exams.filter(exItem => exItem.id !== ex.id))} className="p-1.5 hover:text-red-400 text-slate-500 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showExamModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 text-xs">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 rounded-xl p-5 w-full max-w-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4">
                  <h3 className="font-bold text-white text-sm">Create Exam Slot</h3>
                  <button onClick={() => setShowExamModal(false)} className="text-slate-400 hover:text-white"><X className="h-4 w-4" /></button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setExams([newExam, ...exams]); setShowExamModal(false); }} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Course Module *</label>
                    <input type="text" required value={newExam.course} onChange={(e) => setNewExam({ ...newExam, course: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white animate-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Exam Date *</label>
                      <input type="date" required value={newExam.date} onChange={(e) => setNewExam({ ...newExam, date: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Session</label>
                      <select value={newExam.session} onChange={(e) => setNewExam({ ...newExam, session: e.target.value as any })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white">
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Assigned Hall *</label>
                      <input type="text" required value={newExam.venue} onChange={(e) => setNewExam({ ...newExam, venue: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-semibold">Invigilator Pro</label>
                      <input type="text" required value={newExam.supervisor} onChange={(e) => setNewExam({ ...newExam, supervisor: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2 text-white" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-end gap-2">
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Commit Slot</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      )}

      {/* ================= SECTION 4: ASSIGNMENT CONTROL ================= */}
      {activeSection === 'assignment-control' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-indigo-400" /> Global Assignment Control
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Toggle active submission locks, override due dates app-wide</p>
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">Subject Assignment</th>
                  <th className="py-3 px-4 font-semibold">Assignee Instructor</th>
                  <th className="py-3 px-4 font-semibold">Target Due Date</th>
                  <th className="py-3 px-4 font-semibold">Upload Streams</th>
                  <th className="py-3 px-4 font-semibold">Submission Locks</th>
                  <th className="py-3 px-4 font-semibold text-right">Delete</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                    <td className="py-3.5 px-4 text-white font-semibold">{item.subject}</td>
                    <td className="py-3.5 px-4">{item.instructor}</td>
                    <td className="py-3.5 px-4 font-mono">{item.duedate}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">{item.submissions} students</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setAssignments(assignments.map(a => a.id === item.id ? { ...a, active: !a.active } : a))}
                        className="flex items-center gap-1 text-[11px] font-bold"
                      >
                        {item.active ? (
                          <span className="flex items-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded gap-1">
                            <ToggleRight className="h-4 w-4" /> ACCEPTING
                          </span>
                        ) : (
                          <span className="flex items-center text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded gap-1">
                            <ToggleLeft className="h-4 w-4" /> LOCKED
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setAssignments(assignments.filter(a => a.id !== item.id))} className="p-1.5 hover:text-red-400 text-slate-500 rounded"><Trash2 className="h-3.5 w-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ================= SECTION 5: FEE MANAGEMENT CRUD ================= */}
      {activeSection === 'fee-management' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-indigo-400" /> Portal Fee Management
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Apportion term dues, audit transaction status, mass dispatches</p>
            </div>
            <button
              onClick={() => handleDispatchReminders(fees)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Dispatch Payment Reminders
            </button>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">Student ID</th>
                  <th className="py-3 px-4 font-semibold">Billing Name</th>
                  <th className="py-3 px-4 font-semibold">Receipt Sem</th>
                  <th className="py-3 px-4 font-semibold">Invoiced Dues</th>
                  <th className="py-3 px-4 font-semibold">Cleared Payments</th>
                  <th className="py-3 px-4 font-semibold">Remittance Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Invoice actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                    <td className="py-3.5 px-4 font-mono">{f.id}</td>
                    <td className="py-3.5 px-4 text-white font-semibold">{f.name}</td>
                    <td className="py-3.5 px-4 font-mono font-medium">Semester {f.semester}</td>
                    <td className="py-3.5 px-4 font-mono text-pink-400 font-semibold">₹{f.dueAmount}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">₹{f.paidAmount}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        f.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        f.status === 'Partial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>{f.status}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setFees(fees.map(x => x.id === f.id ? { ...x, status: 'Paid', paidAmount: x.paidAmount + x.dueAmount, dueAmount: 0 } : x))}
                        disabled={f.status === 'Paid'}
                        className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${f.status === 'Paid' ? 'text-slate-600 cursor-not-allowed' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white'}`}
                      >
                        {f.status === 'Paid' ? 'Remitted' : 'Mark Cleared'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ================= SECTION 6: GRIEVANCES HANDLING ================= */}
      {activeSection === 'grievances' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-400" /> Grievance Handling Center
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Review complaints, assign investigators, reply with official resolutions</p>
            </div>
          </div>

          <div className="space-y-4">
            {grievances.map((grid) => (
              <motion.div
                key={grid.id}
                className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl space-y-4 text-xs"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-indigo-400 font-bold">{grid.id}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-200 font-semibold">{grid.filedBy}</span>
                      <span className="text-slate-500">•</span>
                      <span className="px-2 py-0.5 bg-slate-950 text-slate-400 border border-white/5 font-mono text-[9px] uppercase tracking-wider font-bold rounded">{grid.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] rounded font-bold uppercase tracking-wider ${grid.priority === 'High' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>{grid.priority} Priority</span>
                    <select
                      value={grid.status}
                      onChange={(e) => setGrievances(grievances.map(g => g.id === grid.id ? { ...g, status: e.target.value as any } : g))}
                      className="bg-slate-950 text-slate-200 border border-white/5 rounded p-1 text-[11px]"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Investigating">Investigating</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded border border-white/5 text-slate-300">
                  <p className="leading-relaxed">{grid.message}</p>
                </div>

                {grid.reply ? (
                  <div className="p-3 bg-emerald-500/5 rounded border border-emerald-500/15 text-slate-300">
                    <span className="font-bold text-emerald-400 block mb-1">Official Resolution response:</span>
                    <p className="italic">{grid.reply}</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type administrative resolution message..."
                      className="flex-1 bg-slate-950 border border-white/5 p-2 rounded text-white outline-none focus:border-indigo-500 text-xs"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          setGrievances(grievances.map(g => g.id === grid.id ? { ...g, reply: e.currentTarget.value, status: 'Resolved' } : g));
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.currentTarget.previousSibling as HTMLInputElement;
                        if (input.value) {
                          setGrievances(grievances.map(g => g.id === grid.id ? { ...g, reply: input.value, status: 'Resolved' } : g));
                          input.value = '';
                        }
                      }}
                      className="px-4 bg-indigo-600 hover:bg-indigo-500 font-bold rounded text-white"
                    >
                      Post Reply & Resolve
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
