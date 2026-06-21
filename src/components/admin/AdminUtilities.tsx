import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Settings, Database, History, RefreshCw, Trash2, ToggleLeft, ToggleRight, Check, AlertCircle, FileUp, Download, Eye, Table, Play, CheckCircle2, CloudLightning, Search
} from 'lucide-react';

interface UtilitiesProps {
  activeSection: 'app-settings' | 'backup-restore' | 'activity-logs';
}

interface BackupFile { id: string; name: string; date: string; size: string; type: 'Automated' | 'Manual'; status: 'Healthy' | 'Corrupt'; }
interface ActivityLog { id: string; time: string; admin: string; module: string; action: string; ip: string; status: 'Success' | 'Warning'; }

export function AdminUtilities({ activeSection }: UtilitiesProps) {
  // ================= APP SETTINGS STATE =================
  const [featureToggles, setFeatureToggles] = useState({
    chatbot: true,
    maintenanceMode: false,
    resultsRelease: true,
    offlineSimulation: false,
    gradesAppeal: false,
  });

  const [formParams, setFormParams] = useState({
    portalTitle: 'MITS Student Information Terminal',
    adminMail: 'admin@mits.ac',
    alertBanner: 'Portal Maintenance scheduled for 25th June, 02:00 IST.',
    sessionTimeout: '60', // minutes
  });

  const [settingsNotice, setSettingsNotice] = useState<string | null>(null);
  const [reindexingState, setReindexingState] = useState<'idle' | 'running' | 'done'>('idle');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsNotice('Global settings committed successfully to active server nodes!');
    setTimeout(() => setSettingsNotice(null), 4000);
  };

  const handleTriggerReindexing = () => {
    setReindexingState('running');
    setTimeout(() => {
      setReindexingState('done');
      setTimeout(() => setReindexingState('idle'), 3000);
    }, 4000);
  };

  // ================= BACKUP & RESTORE STATE =================
  const [backups, setBackups] = useState<BackupFile[]>([
    { id: 'BK-9428', name: 'mits_prod_scheduled_backup_1002.tar.gz', date: '2026-06-20 03:00', size: '24.8 MB', type: 'Automated', status: 'Healthy' },
    { id: 'BK-9410', name: 'mits_prod_manual_snapshot_991.tar.gz', date: '2026-06-18 15:45', size: '18.4 MB', type: 'Manual', status: 'Healthy' },
    { id: 'BK-9392', name: 'mits_prod_pre_deployment_grade_release.tar.gz', date: '2026-06-12 09:12', size: '14.2 MB', type: 'Manual', status: 'Healthy' },
  ]);

  const [backingUp, setBackingUp] = useState(false);
  const [restoringFile, setRestoringFile] = useState(false);
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);

  const handleGenerateBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      const newBackup: BackupFile = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        name: `mits_manual_control_snapshot_${Date.now().toString().slice(-4)}.tar.gz`,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        size: '12.6 MB',
        type: 'Manual',
        status: 'Healthy'
      };
      setBackups([newBackup, ...backups]);
      setBackingUp(false);
    }, 3000);
  };

  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setRestoringFile(true);
    setTimeout(() => {
      setRestoringFile(false);
      setRestoreNotice('System state reverted! Re-imported PostgreSQL and asset configurations.');
      setTimeout(() => setRestoreNotice(null), 6000);
    }, 4500);
  };

  // ================= ACTIVITY LOGS STATE =================
  const [logs, setLogs] = useState<ActivityLog[]>([
    { id: 'L-101', time: '2026-06-21 06:15:32', admin: 'Admin ID: A-02', module: 'User Catalog', action: 'Modified student profile: Vedant Saxena (ID: MITS-CS-22-045)', ip: '103.45.19.22', status: 'Success' },
    { id: 'L-102', time: '2026-06-21 04:12:10', admin: 'Admin ID: A-01', module: 'Operations', action: 'Extended Compiler Design Assignment locks due-date', ip: '103.45.19.04', status: 'Success' },
    { id: 'L-103', time: '2026-06-20 22:50:11', admin: 'System Script', module: 'Database Kernel', action: 'Daily cron database index reindexing check', ip: '127.0.0.1', status: 'Success' },
    { id: 'L-104', time: '2026-06-20 18:24:45', admin: 'Admin ID: A-02', module: 'App Settings', action: 'Modified Notification ALERT BANNER contents', ip: '103.45.19.22', status: 'Warning' },
    { id: 'L-105', time: '2026-06-20 14:02:18', admin: 'Admin ID: A-03', module: 'Finance Operations', action: 'Cleared fee collection locks for MITS-CS-22-192', ip: '182.90.112.44', status: 'Success' },
    { id: 'L-106', time: '2026-06-20 11:32:04', admin: 'System Watcher', module: 'Performance Audit', action: 'Endpoint route latency spike detected: /api/results/sgpa (310ms)', ip: '127.0.0.1', status: 'Warning' },
  ]);

  const [logSearch, setLogSearch] = useState('');
  const [logFilter, setLogFilter] = useState<'all' | 'User Catalog' | 'Operations' | 'App Settings' | 'Database Kernel' | 'Finance Operations'>('all');

  const exportLogsToCSV = (filteredLogs: ActivityLog[]) => {
    const headers = ['Log Index', 'Timestamp', 'Actor/Officer', 'Module Section', 'Details of Audit', 'Origin IP', 'Status'];
    const rows = filteredLogs.map(l => [l.id, l.time, l.admin, l.module, l.action, l.ip, l.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mits_system_actions_audit.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLogs = logs.filter(l => {
    return (logFilter === 'all' || l.module === logFilter) &&
           (l.action.toLowerCase().includes(logSearch.toLowerCase()) || l.admin.toLowerCase().includes(logSearch.toLowerCase()) || l.module.toLowerCase().includes(logSearch.toLowerCase()));
  });

  return (
    <div className="space-y-6">
      {settingsNotice && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold">
          <Check className="h-4 w-4" /> {settingsNotice}
        </motion.div>
      )}

      {restoreNotice && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg text-xs font-semibold">
          <Database className="h-4 w-4" /> {restoreNotice}
        </motion.div>
      )}

      {/* ================= SECTION 1: GLOBAL APP SETTINGS ================= */}
      {activeSection === 'app-settings' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-400" /> Administrative App Settings
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Toggle portal services, set alerts, and trigger diagnostics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feature Flags switches */}
            <div className="lg:col-span-1 p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Portal Feature Switches</h3>

              <div className="space-y-4">
                {/* Chatbot Toggle */}
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg border border-white/5 text-xs">
                  <div>
                    <p className="font-semibold text-slate-200">AI Chatbot Assistant</p>
                    <p className="text-[10px] text-slate-500">Provide direct academic guidance</p>
                  </div>
                  <button onClick={() => setFeatureToggles({ ...featureToggles, chatbot: !featureToggles.chatbot })}>
                    {featureToggles.chatbot ? <ToggleRight className="h-6 w-6 text-indigo-400" /> : <ToggleLeft className="h-6 w-6 text-slate-600" />}
                  </button>
                </div>

                {/* Maintenance Toggle */}
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg border border-white/5 text-xs">
                  <div>
                    <p className="font-semibold text-slate-200">Maintenance Lockout</p>
                    <p className="text-[10px] text-slate-500">Enable read-only gateway block</p>
                  </div>
                  <button onClick={() => setFeatureToggles({ ...featureToggles, maintenanceMode: !featureToggles.maintenanceMode })}>
                    {featureToggles.maintenanceMode ? <ToggleRight className="h-6 w-6 text-red-500" /> : <ToggleLeft className="h-6 w-6 text-slate-600" />}
                  </button>
                </div>

                {/* Term Results Release */}
                <div className="flex items-center justify-between p-3 bg-slate-950/40 rounded-lg border border-white/5 text-xs">
                  <div>
                    <p className="font-semibold text-slate-200">Grade Card Release</p>
                    <p className="text-[10px] text-slate-500">Allow students to query results</p>
                  </div>
                  <button onClick={() => setFeatureToggles({ ...featureToggles, resultsRelease: !featureToggles.resultsRelease })}>
                    {featureToggles.resultsRelease ? <ToggleRight className="h-6 w-6 text-indigo-400" /> : <ToggleLeft className="h-6 w-6 text-slate-600" />}
                  </button>
                </div>
              </div>
            </div>

            {/* General form configuration details */}
            <div className="lg:col-span-2 p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Metadata & Alert Banners</h3>
              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Administrative Institution Title</label>
                  <input type="text" value={formParams.portalTitle} onChange={(e) => setFormParams({ ...formParams, portalTitle: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Support Desk Master Email</label>
                  <input type="email" value={formParams.adminMail} onChange={(e) => setFormParams({ ...formParams, adminMail: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Portal Main Header Alert Banner</label>
                  <textarea value={formParams.alertBanner} onChange={(e) => setFormParams({ ...formParams, alertBanner: e.target.value })} className="w-full bg-slate-950 border border-white/5 rounded-lg p-2.5 text-white h-16 resize-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-bold text-white text-xs">Commit Content Updates</button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Fixing Operations Diagnostics */}
          <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl text-xs">
            <div className="mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Self-Healing Diagnostics Dashboard</h3>
              <p className="text-[10px] text-slate-500 mt-1 font-sans">Trigger diagnostics or optimize relational databases to prevent latency issues</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Re-indexing database</h4>
                  <p className="text-[10px] text-slate-500 mt-1 mb-4">Optimizes query schemas inside PostgreSQL arrays</p>
                </div>
                <button
                  onClick={handleTriggerReindexing}
                  disabled={reindexingState === 'running'}
                  className={`w-full py-2 rounded font-bold transition-all ${
                    reindexingState === 'running' ? 'bg-slate-800 text-slate-500' :
                    reindexingState === 'done' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20' :
                    'bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-white/5'
                  }`}
                >
                  {reindexingState === 'running' ? 'Reindexing indices...' : reindexingState === 'done' ? 'Optimized' : 'Execute Diagnostic'}
                </button>
              </div>

              <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Flush cache clusters</h4>
                  <p className="text-[10px] text-slate-500 mt-1 mb-4">Cleans in-memory hashes to sync database records</p>
                </div>
                <button
                  onClick={() => alert('Redis cache clusters purged successfully.')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-white/5 rounded font-bold"
                >
                  Flush Cache
                </button>
              </div>

              <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Wipe file attachments temp</h4>
                  <p className="text-[10px] text-slate-500 mt-1 mb-4">Purges incomplete grading drafts uploaded</p>
                </div>
                <button
                  onClick={() => alert('Draft uploads folder cleared.')}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-white/5 rounded font-bold"
                >
                  Clear Temporary Files
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= SECTION 2: BACKUP & RESTORE ================= */}
      {activeSection === 'backup-restore' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-indigo-400" /> Disaster Recovery: Backup & Restore
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Generate direct server snapshots, download off-site archives</p>
            </div>
            <button
              onClick={handleGenerateBackup}
              disabled={backingUp}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-400 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2"
            >
              {backingUp ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Packaging cluster tarball...
                </>
              ) : (
                'Generate Manual Backup'
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Backup Archive</h3>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 font-mono pb-2">
                      <th className="pb-2">ID</th>
                      <th className="pb-2">Filename</th>
                      <th className="pb-2">Trigger Date</th>
                      <th className="pb-2">Archive Size</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2 text-right">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backups.map((bk) => (
                      <tr key={bk.id} className="border-b border-white/5 last:border-0 hover:bg-slate-950/30 text-slate-300">
                        <td className="py-3 font-mono font-bold text-slate-500">{bk.id}</td>
                        <td className="py-3 font-mono text-[11px] text-white font-medium">{bk.name}</td>
                        <td className="py-3 font-mono">{bk.date}</td>
                        <td className="py-3 font-mono">{bk.size}</td>
                        <td className="py-3 font-semibold">{bk.type}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => alert(`Starting download packet pipeline for secure snapshot: ${bk.name}`)}
                            className="p-1 px-2 hover:bg-slate-800 rounded font-bold text-[10px] text-indigo-400 flex items-center gap-1.5 ml-auto border border-indigo-500/10 hover:border-indigo-500/20"
                          >
                            <Download className="h-3 w-3" /> Get gzip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Restore trigger widget */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Restore From Snapshot</h3>
                <p className="text-[10px] text-slate-500 mb-6">Import a custom backup archive file to revert portal databases.</p>

                <div className="border border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl p-6 bg-slate-950/50 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative">
                  <input
                    type="file"
                    accept=".gz,.tar,.zip"
                    onChange={handleRestoreBackup}
                    disabled={restoringFile}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FileUp className={`h-8 w-8 mb-3 text-slate-500 ${restoringFile ? 'animate-bounce text-indigo-400' : ''}`} />
                  <p className="text-xs font-semibold text-slate-300">
                    {restoringFile ? 'Restoring system states...' : 'Drag / click backup zip'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2 font-mono">Format: .tar.gz (Max 200MB)</p>
                </div>
              </div>

              {restoringFile && (
                <div className="mt-4 p-2 bg-indigo-950/20 border border-indigo-500/10 text-[10px] font-mono text-indigo-300 text-center rounded">
                  Locking databases & merging tables...
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ================= SECTION 3: SYSTEM ACTIVITY LOGS ================= */}
      {activeSection === 'activity-logs' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <History className="h-5 w-5 text-indigo-400" /> Administrative Audit (Activity Logs)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Read, filter, search, explore, and analyze audit trails</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search audit trail message..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>

            <div className="flex gap-2 w-full md:w-auto justify-end">
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value as any)}
                className="bg-slate-950 text-slate-200 border border-white/5 rounded-lg text-xs p-2"
              >
                <option value="all">Every Module</option>
                <option value="User Catalog">User Catalog</option>
                <option value="Operations">Operations</option>
                <option value="App Settings">App Settings</option>
                <option value="Database Kernel">Database Kernel</option>
                <option value="Finance Operations">Finance Operations</option>
              </select>
              <button
                onClick={() => exportLogsToCSV(filteredLogs)}
                className="px-3 border border-white/5 bg-slate-950 hover:bg-slate-900 text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1.5"
                title="CSV spreadsheet archive package"
              >
                <Download className="h-3 w-3" /> Download logs
              </button>
            </div>
          </div>

          <div className="bg-slate-900/40 rounded-xl border border-white/5 overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/50 border-b border-white/5 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">Timestamp</th>
                  <th className="py-3 px-4 font-semibold">Actor / Officer</th>
                  <th className="py-3 px-4 font-semibold">Module Location</th>
                  <th className="py-3 px-4 font-semibold">Audit Action Log Details</th>
                  <th className="py-3 px-4 font-semibold">Origin IP</th>
                  <th className="py-3 px-4 font-semibold text-right">Audit Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-white/5 last:border-0 hover:bg-slate-900/30 transition-all text-slate-300">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.time}</td>
                    <td className="py-3 px-4 font-semibold text-slate-200">{log.admin}</td>
                    <td className="py-3 px-4"><span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-950 text-indigo-300 border border-white/5 font-semibold">{log.module}</span></td>
                    <td className="py-3 px-4 font-medium text-white">{log.action}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{log.ip}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${log.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>{log.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
