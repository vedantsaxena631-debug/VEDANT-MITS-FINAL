import { Plus, Edit2, Trash2, Users, Calendar, Clock, Database, Loader2, AlertCircle, X, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  deadline: string;
  time: string;
  submissions: number;
  total: number;
  status: string;
  fallback?: boolean;
}

export function FacultyAssignmentsView() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('CS302');
  const [deadline, setDeadline] = useState('');
  const [time, setTime] = useState('11:59 PM');
  const [totalStudents, setTotalStudents] = useState(80);
  const [assignmentStatus, setAssignmentStatus] = useState('Active');

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/assignments');
      if (res.ok) {
        const data = await res.json();
        setAssignments(data);
      }
    } catch (err) {
      console.error('Failed to resolve academic assignments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreateAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    setIsSubmitLoading(true);
    try {
      const formattedDate = new Date(deadline).toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });

      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          course,
          deadline: formattedDate,
          time,
          total: Number(totalStudents),
          status: assignmentStatus
        })
      });

      if (res.ok) {
        setTitle('');
        setDeadline('');
        setShowCreateModal(false);
        fetchAssignments();
      }
    } catch (err) {
      console.error('Failed to create academic task assignments:', err);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleDeleteAssignment = async (id: string) => {
    if (!confirm('Are you sure you want to terminate/delete this coursework assignment?')) return;

    try {
      const res = await fetch(`/api/assignments/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchAssignments();
      }
    } catch (err) {
      console.error('Failed to delete assignment:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 pb-12 relative"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-slate-100">Manage Assignments</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Configure curriculum assignments, specify cutoffs, and monitor student progress metrics.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm shadow-blue-500/10 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Create Course Assignment
        </button>
      </div>

      {isLoading ? (
        <div className="h-48 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <p className="text-xs font-semibold">Reading assignment directory...</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="py-20 text-center text-slate-400 dark:text-slate-550 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <AlertCircle className="h-10 w-10 text-slate-350 dark:text-slate-700" />
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-200">No active assignments tracked</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Initialize a course task by clicking the button above.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => {
            const progress = assignment.total > 0 
              ? Math.round((assignment.submissions / assignment.total) * 100)
              : 0;
            return (
              <div 
                key={assignment.id} 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors"
              >
                <div className="p-5 flex-1 select-none">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-950 text-slate-650 dark:text-slate-300 rounded text-[10px] font-bold border border-slate-200/50 dark:border-slate-800">
                        {assignment.course}
                      </span>
                      {assignment.fallback && (
                        <span className="text-[8px] font-bold text-slate-450 dark:text-slate-500 bg-slate-100 dark:bg-slate-955 px-1 py-0.5 rounded leading-none">Fallback</span>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      assignment.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/10' 
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-950 dark:text-slate-450 border border-slate-200 dark:border-slate-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 leading-tight mb-4 tracking-tight min-h-[40px] line-clamp-2">
                    {assignment.title}
                  </h3>
                  
                  <div className="space-y-1.5 mb-5 border-t border-slate-50 dark:border-slate-950 pt-3">
                    <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-blue-500" />
                      Due: {assignment.deadline}
                    </div>
                    <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5 mr-2 text-indigo-550" />
                      Time cutoff: {assignment.time}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1.5">
                      <span className="font-semibold text-slate-650 dark:text-slate-300">Participation Submissions</span>
                      <span className="font-bold text-slate-900 dark:text-white">{assignment.submissions} / {assignment.total}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-1.5">
                      <div className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800/80 p-3 bg-slate-50/50 dark:bg-slate-900/30 flex justify-between items-center opacity-100 group-hover:opacity-100 transition-opacity">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-tight">
                    id: {assignment.id.slice(0, 10)}
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="p-1.5 text-slate-405 hover:text-red-500 dark:hover:text-red-400 transition rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                      title="Delete assignment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE ASSIGNMENT POPUP OVERLAY MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-xl"
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-150 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4.5 w-4.5 text-blue-500" />
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">Publish Academic Assignment</h3>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-md text-slate-450 hover:text-slate-705 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAssignmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Assignment Title / Project Outline
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                    placeholder="e.g. Critical Threading Synchronization Lab"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Course Subject
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold cursor-pointer"
                    >
                      <option value="CS301">CS301 - Data Structures</option>
                      <option value="CS302">CS302 - Operating Systems</option>
                      <option value="CS303">CS303 - DBMS Schema</option>
                      <option value="CS304">CS304 - Computer Networks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Target Students Max Limit
                    </label>
                    <input
                      type="number"
                      value={totalStudents}
                      onChange={(e) => setTotalStudents(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Due Date
                    </label>
                    <input
                      type="date"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-905 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold font-mono cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Submission Time Limit
                    </label>
                    <input
                      type="text"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-905 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold font-mono"
                      placeholder="e.g. 11:59 PM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Initial Portal Status
                  </label>
                  <select
                    value={assignmentStatus}
                    onChange={(e) => setAssignmentStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-250 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold cursor-pointer"
                  >
                    <option value="Active">Active (Accepting submissions)</option>
                    <option value="Closed">Closed (Read only)</option>
                  </select>
                </div>

                <div className="flex gap-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-205 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Cancel Action
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitLoading}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    {isSubmitLoading ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Publishing Assignment...</span>
                      </>
                    ) : (
                      <span>Publish & Synchronize</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
