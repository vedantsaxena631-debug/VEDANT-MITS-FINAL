import React, { useState, useEffect } from 'react';
import { AlertCircle, Send, Flag, Database, HelpCircle, CheckCircle2, RefreshCw, Terminal, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../supabaseClient';

interface Grievance {
  id: string;
  category: string;
  subject: string;
  description: string;
  student_name?: string;
  enrollment_no?: string;
  status: string;
  created_at: string;
}

interface SupabaseStatus {
  configured: boolean;
  url: string | null;
  message: string;
  requiredSchemaSql: string;
}

export function GrievanceView() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [category, setCategory] = useState('Academics & Teaching');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  
  const [dbStatus, setDbStatus] = useState<SupabaseStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch live server resources and diagnostics
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const statusRes = await fetch('/api/supabase/status');
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setDbStatus(statusData);
      }

      const res = await fetch('/api/grievances');
      if (res.ok) {
        const data = await res.json();
        setGrievances(data);
      }
    } catch (err) {
      console.error('Failed to communicate with institutional portal APIs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setCurrentUser(user);
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    const studentName = currentUser?.user_metadata?.full_name || currentUser?.user_metadata?.name || currentUser?.email?.split('@')[0] || "Vedant Saxena";
    const enrollmentNo = currentUser?.user_metadata?.enrollment_no || "BTIO25O1142";

    try {
      const response = await fetch('/api/grievances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          subject,
          description,
          studentName,
          enrollmentNo,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSubmitSuccess(true);
          setSubject('');
          setDescription('');
          await fetchData();
          setTimeout(() => setSubmitSuccess(false), 5000);
        }
      }
    } catch (err) {
      console.error('Failed to register grievance request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header section with integrated db metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-sans font-semibold tracking-tight text-slate-900 dark:text-slate-100">Grievance Portal</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Submit feedback, requests, or administrative complaints confidentially.</p>
        </div>
        
        {/* Supabase Status Pill */}
        <div className="flex items-center gap-2">
          {dbStatus?.configured ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <Database className="h-3.5 w-3.5" />
              <span>Supabase Connected</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-medium">
              <Database className="h-3.5 w-3.5" />
              <span>Database (In-Memory Fallback)</span>
            </div>
          )}
          <button 
            onClick={fetchData} 
            disabled={isLoading}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 transition-colors cursor-pointer"
            title="Refresh current state"
          >
            <RefreshCw className={`h-4.5 w-4.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Setup notification block if Supabase is not yet populated in absolute terms */}
      {!dbStatus?.configured && (
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-xs sm:text-sm space-y-3">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Supabase Connection Available</h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Connect your database to store live grievances across different client sessions! Simply click on <strong>Settings</strong> representing environment configurations inside AI Studio, and supply <strong>`SUPABASE_URL`</strong> and <strong>`SUPABASE_SERVICE_ROLE_KEY`</strong>.
              </p>
            </div>
          </div>
          <div className="pl-8 flex flex-wrap gap-2">
            <button 
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <Terminal className="h-3 w-3" />
              <span>{showSqlGuide ? "Hide SQL Script" : "Show Setup SQL Schema"}</span>
            </button>
          </div>
          
          {showSqlGuide && (
            <div className="pl-8 pt-2">
              <p className="text-slate-400 text-xs mb-1.5">Run this code inside your Supabase project's SQL Editor to bootstrap the table:</p>
              <pre className="p-3.5 bg-slate-200 dark:bg-slate-950/80 text-teal-800 dark:text-teal-400 font-mono text-[11px] sm:text-xs rounded-lg overflow-x-auto border border-slate-300 dark:border-slate-800">
                {dbStatus?.requiredSchemaSql}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Submission Form Canvas */}
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg mb-4 flex items-center gap-2">
            <Flag className="h-5 w-5 text-slate-400" />
            <span>File Grievance Document</span>
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                Category
              </label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 outline-none transition-colors"
              >
                <option>Academics & Teaching</option>
                <option>Hostel & Mess</option>
                <option>Examinations & Results</option>
                <option>IT & Infrastructure</option>
                <option>Library Issues</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input 
                type="text" 
                required 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 outline-none transition-colors" 
                placeholder="Brief summary subject" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Detailed Description
              </label>
              <textarea 
                rows={5} 
                required 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block p-3 resize-none outline-none transition-colors" 
                placeholder="Elaborate your concern with necessary facts or context..."
              />
            </div>

            {submitSuccess && (
              <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Grievance filed successfully! Thank you for raising your voice.</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-75 transition-colors font-semibold rounded-lg text-sm px-5 py-3 text-center cursor-pointer active:translate-y-[1px]"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" /> 
                  <span>Submit Ticket</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Help info & Active tickets */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 border-l-2 border-l-blue-500 border border-slate-200 dark:border-slate-900 p-5 rounded-xl flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-blue-500 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Academic Support Guidelines</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Ensure grievances are concrete. Avoid personal insults. Standard IT or infrastructure submissions escalate directly to institutional technical ops desk.
              </p>
            </div>
          </div>
          
          {/* Your Tickets Panel */}
          <div className="bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Live Active Tickets</h3>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {grievances.length} total
              </span>
            </div>
            
            {grievances.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-3 border border-slate-200 dark:border-slate-800">
                  <Flag className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold">No active grievances filed.</p>
                <p className="text-slate-400 text-xs mt-1">Your submitted tickets will appear here dynamically.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-150 dark:divide-slate-800/80 max-h-[420px] overflow-y-auto">
                {grievances.map((ticket, index) => (
                  <div key={ticket.id || index} className="p-4 sm:p-5 hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded border border-blue-200/40 dark:border-blue-900/40 uppercase tracking-wide">
                          {ticket.category}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">
                          {ticket.subject}
                        </h4>
                      </div>
                      
                      {/* Ticket Status Badge */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        ticket.status === 'Resolved' 
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : ticket.status === 'In Progress'
                            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400'
                            : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {ticket.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 pt-1">
                      <span>Ref ID: <span className="font-mono text-[11px]">{ticket.id}</span></span>
                      <span>{new Date(ticket.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
