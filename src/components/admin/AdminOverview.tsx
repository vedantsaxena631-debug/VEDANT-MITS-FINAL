import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Activity, MessageSquare, Cpu, ArrowUpRight, ArrowDownRight, AlertTriangle, ShieldCheck, Zap, RefreshCw, Server, Database, Globe } from 'lucide-react';

interface OverviewProps {
  setActiveTab: (tab: string) => void;
}

export function AdminOverview({ setActiveTab }: OverviewProps) {
  // Live Event Feed State for Real-time Placeholder Data
  const [liveEvents, setLiveEvents] = useState([
    { id: 1, time: '3s ago', message: 'User (Enrollment: MITS-22-1084) logged in from Chrome (Mobile)', type: 'info' },
    { id: 2, time: '1m ago', message: 'Academic Calendar updated: Final Practical Schedule published', type: 'success' },
    { id: 3, time: '4m ago', message: 'Automated database backup completed successfully (Snapshot: #BK-1498)', type: 'success' },
    { id: 4, time: '12m ago', message: 'New grievance submitted by CSE-B Student (Priority: High)', type: 'warning' },
    { id: 5, time: '20m ago', message: 'Fee Payment Reminders dispatched for unpaid Hostel dues', type: 'info' },
  ]);

  // Real-time log ticketing simulation
  useEffect(() => {
    const messages = [
      { message: 'Admissions Desk generated 15 new credentials', type: 'info' },
      { message: 'Server check: CPU load normalized at 18%', type: 'success' },
      { message: 'Assignment deadline extended for CSE-402: Advanced OS', type: 'info' },
      { message: 'Exam scheduling conflict flagged and auto-resolved', type: 'warning' },
      { message: 'Session keep-alive heartbeat acknowledged by DNS-Node-B', type: 'info' },
    ];

    const interval = setInterval(() => {
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setLiveEvents(prev => [
        {
          id: Date.now(),
          time: 'Just now',
          message: randomMsg.message,
          type: randomMsg.type
        },
        ...prev.slice(0, 5)
      ].map((event, idx) => ({
        ...event,
        time: idx === 0 ? 'Just now' : `${idx * 2}m ago`
      })));
    }, 15000); // Trigger a tick every 15s

    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      title: 'Total Users',
      value: '4,821',
      change: '+14% this month',
      trend: 'up',
      icon: Users,
      color: 'from-blue-600/30 to-blue-500/10 border-blue-500/20 text-blue-400',
      tab: 'users'
    },
    {
      title: 'Active Sessions',
      value: '294',
      change: 'Peak: 512 today',
      trend: 'up',
      icon: Activity,
      color: 'from-cyan-600/30 to-cyan-500/10 border-cyan-500/20 text-cyan-400',
      tab: 'traffic-analytics'
    },
    {
      title: 'Pending Grievances',
      value: '14',
      change: '-5 since yesterday',
      trend: 'down',
      icon: MessageSquare,
      color: 'from-red-600/30 to-red-500/10 border-red-500/20 text-red-400',
      tab: 'grievances'
    },
    {
      title: 'System Uptime',
      value: '99.98%',
      change: 'Uptime (30 days)',
      trend: 'up',
      icon: Cpu,
      color: 'from-emerald-600/30 to-emerald-500/10 border-emerald-500/20 text-emerald-400',
      tab: 'performance-metrics'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live Deck
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics and controls for MITS Portal System Administrators.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded bg-slate-800 text-slate-300 border border-white/5">
            NODE_MITS_SRV_01: ONLINE
          </div>
          <button className="p-1 text-slate-400 hover:text-white transition-colors" title="Force Refresh Stream">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setActiveTab(kpi.tab)}
            className={`p-5 rounded-xl border bg-gradient-to-tr ${kpi.color} cursor-pointer hover:scale-[1.02] hover:border-slate-500/30 transition-all shadow-xl shadow-slate-950/20 flex flex-col`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
              <div className="p-2 bg-slate-900/50 rounded-lg">
                <kpi.icon className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{kpi.value}</span>
              <span className="text-[10px] font-medium text-slate-400">curr</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-slate-300">
              {kpi.trend === 'up' ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-400" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-emerald-400" />
              )}
              <span className="text-[10px] font-mono text-slate-400">{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Event Feed Widget */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-sm">Automated Event Pipeline</h3>
              <p className="text-[10px] text-slate-400">Dynamic system notifications and transactional logs</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping"></span>
              Live Stream
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-1">
            {liveEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/40 border border-white/5 hover:border-slate-800/80 transition-all text-xs"
              >
                <div className="mt-0.5 shrink-0">
                  {event.type === 'success' ? (
                    <div className="p-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                      <ShieldCheck className="h-3 w-3" />
                    </div>
                  ) : event.type === 'warning' ? (
                    <div className="p-1 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
                      <AlertTriangle className="h-3 w-3" />
                    </div>
                  ) : (
                    <div className="p-1 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20">
                      <Zap className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 mt-0.5 leading-relaxed">{event.message}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0 whitespace-nowrap mt-0.5">{event.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cockpit Status Summary Widget */}
        <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl flex flex-col">
          <h3 className="font-bold text-white text-sm mb-1">System Health Checklist</h3>
          <p className="text-[10px] text-slate-400 mb-4">Core services telemetry status</p>

          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-white/5">
              <div className="flex items-center gap-2.5">
                <Server className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-300 font-medium">Node Gateways (4/4)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">100% OK</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-white/5">
              <div className="flex items-center gap-2.5">
                <Database className="h-4 w-4 text-indigo-400" />
                <span className="text-xs text-slate-300 font-medium">PostgreSQL Clusters</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">CONNECTED</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-white/5">
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-cyan-400" />
                <span className="text-xs text-slate-300 font-medium">SSL / DNS Endpoints</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">SECURE [A+]</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/40 border border-white/5">
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">Redis In-Memory Cache</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-400">HEAT: 3%</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/5 bg-slate-900/30">
            <button
              onClick={() => setActiveTab('app-settings')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white transition-colors"
            >
              Configure Master Flags
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
