import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { Activity, Clock, Chrome, Smartphone, Tablet, Terminal, CheckCircle2, AlertTriangle, Layers, Cpu, Server, History, Wifi, Database } from 'lucide-react';

interface AnalyticsProps {
  activeSection: 'traffic' | 'performance';
}

export function AdminAnalytics({ activeSection }: AnalyticsProps) {
  // Traffic state: Daily/Weekly/Monthly timeframes
  const [trafficTimeframe, setTrafficTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Interactive Mock Datasets
  const dailyTraffic = [
    { day: 'Mon', logins: 1200, views: 3400 },
    { day: 'Tue', logins: 1450, views: 4100 },
    { day: 'Wed', logins: 1890, views: 5600 },
    { day: 'Thu', logins: 1320, views: 3900 },
    { day: 'Fri', logins: 1540, views: 4500 },
    { day: 'Sat', logins: 850, views: 2100 },
    { day: 'Sun', logins: 620, views: 1500 },
  ];

  const weeklyTraffic = [
    { day: 'Week 1', logins: 8900, views: 24000 },
    { day: 'Week 2', logins: 10400, views: 29000 },
    { day: 'Week 3', logins: 12500, views: 34000 },
    { day: 'Week 4', logins: 11200, views: 31000 },
  ];

  const monthlyTraffic = [
    { day: 'Jan', logins: 34000, views: 98000 },
    { day: 'Feb', logins: 38000, views: 112000 },
    { day: 'Mar', logins: 45000, views: 134000 },
    { day: 'Apr', logins: 48000, views: 142000 },
    { day: 'May', logins: 52000, views: 156000 },
    { day: 'Jun', logins: 49000, views: 145000 },
  ];

  const peakUsageData = [
    { hour: '08:00', requests: 450 },
    { hour: '10:00', requests: 1200 },
    { hour: '12:00', requests: 1400 },
    { hour: '14:00', requests: 890 },
    { hour: '16:00', requests: 1650 }, // Peak after classrooms dismiss
    { hour: '18:00', requests: 1100 },
    { hour: '20:00', requests: 1350 },
    { hour: '22:00', requests: 750 },
  ];

  const featureUsageHeatmap = [
    { name: 'Notice Board', morning: 'High', afternoon: 'Medium', evening: 'Low', night: 'Very Low', score: 85 },
    { name: 'Assignments', morning: 'Medium', afternoon: 'High', evening: 'Very High', night: 'Medium', score: 94 },
    { name: 'Attendance', morning: 'Very High', afternoon: 'High', evening: 'Low', night: 'Very Low', score: 78 },
    { name: 'Fees & Invoicing', morning: 'Low', afternoon: 'Low', evening: 'Medium', night: 'Low', score: 45 },
    { name: 'Results & SGPA', morning: 'Medium', afternoon: 'High', evening: 'High', night: 'Very High', score: 92 },
  ];

  // Performance datasets
  const serverResponseData = [
    { route: '/api/auth/login', latency: 45 },
    { route: '/api/attendance/mark', latency: 195 },
    { route: '/api/results/sgpa', latency: 290 }, // Slowest query (e.g., aggregate calculations)
    { route: '/api/notices/list', latency: 65 },
    { route: '/api/assignments/upload', latency: 135 },
    { route: '/api/syllabus/details', latency: 80 },
  ];

  const dbQueryLoad = [
    { time: '01:00', qps: 18 },
    { time: '03:00', qps: 12 },
    { time: '05:00', qps: 25 },
    { time: '07:00', qps: 84 },
    { time: '09:00', qps: 142 },
    { time: '11:00', qps: 210 },
    { time: '13:00', qps: 185 },
    { time: '15:00', qps: 245 }, // Peak classroom upload activity
    { time: '17:00', qps: 160 },
    { time: '19:00', qps: 195 },
    { time: '21:00', qps: 115 },
    { time: '23:00', qps: 55 },
  ];

  const storageUsageInfo = [
    { name: 'PostgreSQL Relational DB', used: 14.5, total: 50, color: '#3b82f6' },
    { name: 'Static Assets & PDFs', used: 28.2, total: 100, color: '#06b6d4' },
    { name: 'System Logs & Audits', used: 3.4, total: 10, color: '#ef4444' },
    { name: 'Docker Overlay Backups', used: 12.0, total: 50, color: '#8b5cf6' },
  ];

  const getHeatmapColor = (intensity: string) => {
    switch (intensity) {
      case 'Very High': return 'bg-purple-500/80 text-white font-semibold';
      case 'High': return 'bg-purple-600/40 text-purple-200';
      case 'Medium': return 'bg-purple-700/20 text-purple-300';
      case 'Low': return 'bg-purple-900/15 text-slate-400';
      default: return 'bg-slate-950/40 text-slate-600';
    }
  };

  const currentTrafficData = 
    trafficTimeframe === 'daily' ? dailyTraffic :
    trafficTimeframe === 'weekly' ? weeklyTraffic : monthlyTraffic;

  return (
    <div className="space-y-6">
      {activeSection === 'traffic' ? (
        // ================= TRAFFIC ANALYTICS =================
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Traffic Control Center</h2>
              <p className="text-xs text-slate-400 mt-1">Audit active requests, heatmaps, and login clusters across devices</p>
            </div>
            {/* Timeframe selector */}
            <div className="flex bg-slate-800 p-0.5 rounded-lg border border-white/5 text-[11px]">
              {(['daily', 'weekly', 'monthly'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTrafficTimeframe(t)}
                  className={`px-3 py-1.5 rounded-md font-bold uppercase tracking-wider transition-all ${
                    trafficTimeframe === t
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Traffic Area Chart */}
            <div className="lg:col-span-2 p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">User Portals Logging Density</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentTrafficData}>
                    <defs>
                      <linearGradient id="gradLogins" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                    <YAxis tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-10} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    <Area type="monotone" name="Logins" dataKey="logins" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#gradLogins)" />
                    <Area type="monotone" name="Page Views" dataKey="views" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#gradViews)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Peak Usage hourly distribution bar chart */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl flex flex-col">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Server Load: Peak Usage Hours</h3>
              <div className="h-60 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={peakUsageData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 9}} dy={5} />
                    <YAxis tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 9}} dx={-5} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                    <Bar dataKey="requests" name="HTTP Requests" radius={[4, 4, 0, 0]}>
                      {peakUsageData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.requests > 1300 ? '#ec4899' : '#4f46e5'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-500 text-center font-mono mt-3">High density clusters are color-coded in Magenta</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feature Usage Heatmap */}
            <div className="lg:col-span-2 p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Module Popularity Matrix (Usage Heatmap)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-500 font-mono">
                      <th className="pb-2 font-semibold">Portal Feature</th>
                      <th className="pb-2 font-semibold">Morning</th>
                      <th className="pb-2 font-semibold">Afternoon</th>
                      <th className="pb-2 font-semibold">Evening</th>
                      <th className="pb-2 font-semibold">Night</th>
                      <th className="pb-2 font-semibold text-right">Agg Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureUsageHeatmap.map((feat, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-0">
                        <td className="py-3 font-semibold text-slate-200">{feat.name}</td>
                        <td className="py-2 pr-2">
                          <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono ${getHeatmapColor(feat.morning)}`}>
                            {feat.morning}
                          </span>
                        </td>
                        <td className="py-2 pr-2">
                          <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono ${getHeatmapColor(feat.afternoon)}`}>
                            {feat.afternoon}
                          </span>
                        </td>
                        <td className="py-2 pr-2">
                          <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono ${getHeatmapColor(feat.evening)}`}>
                            {feat.evening}
                          </span>
                        </td>
                        <td className="py-2 pr-2">
                          <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono ${getHeatmapColor(feat.night)}`}>
                            {feat.night}
                          </span>
                        </td>
                        <td className="py-3 font-mono font-bold text-indigo-400 text-right">{feat.score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Device breakdown progress bars */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Agent Device Breakdown</h3>
                <p className="text-[10px] text-slate-500 mb-6">User Agent classification parameters</p>

                <div className="space-y-4">
                  {/* Desktop */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Chrome className="h-3.5 w-3.5 text-blue-400" />
                        Web Desktop (Chrome/Safari)
                      </span>
                      <span className="text-white">54%</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-950">
                      <div className="h-full bg-blue-500 rounded" style={{ width: '54%' }} />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                        iOS / Android Native & PWA
                      </span>
                      <span className="text-white">42%</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-950">
                      <div className="h-full bg-emerald-500 rounded" style={{ width: '42%' }} />
                    </div>
                  </div>

                  {/* Tablet */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <Tablet className="h-3.5 w-3.5 text-amber-400" />
                        Tablets & Other
                      </span>
                      <span className="text-white">4%</span>
                    </div>
                    <div className="w-full h-2 rounded bg-slate-950">
                      <div className="h-full bg-amber-500 rounded" style={{ width: '4%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>Unique SSL Signatures:</span>
                <span className="text-white font-bold">1,821 / Day</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        // ================= PERFORMANCE METRICS =================
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Infrastructure Latency Metrics</h2>
              <p className="text-xs text-slate-400 mt-1">Audit active API load indices, database loads, and storage quotas</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SWIFT ENGINE HEALTH: 98% GOOD
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Server Response Times */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Database API Route Latencies (API ms)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serverResponseData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                    <XAxis type="number" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <YAxis dataKey="route" type="category" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 9}} width={110} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                    <Bar dataKey="latency" name="Latency (ms)" radius={[0, 4, 4, 0]}>
                      {serverResponseData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.latency > 150 ? '#ef4444' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-3">Warning limit threshold triggers red banner above 150ms</p>
            </div>

            {/* Database Query Load */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Database Query Loads (Queries/sec)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dbQueryLoad}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                    <YAxis tickLine={false} axisLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-10} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                    <Line type="monotone" name="QPS" dataKey="qps" stroke="#a855f7" strokeWidth={3} dot={{ stroke: '#a855f7', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Storage usage quotas */}
          <div className="p-5 rounded-xl border border-white/5 bg-slate-900/60 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Volume Mounting & Storage quotas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {storageUsageInfo.map((storage, idx) => {
                const percent = Math.round((storage.used / storage.total) * 100);
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/40 border border-white/5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider block mb-2">Mount Disk #{idx + 1}</span>
                      <h4 className="text-xs font-bold text-slate-200 mb-4">{storage.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-mono text-slate-400">{storage.used} GB / {storage.total} GB</span>
                        <span className="font-bold text-white font-mono">{percent}%</span>
                      </div>
                      <div className="w-full h-2 rounded bg-slate-900 overflow-hidden">
                        <div className="h-full rounded" style={{ width: `${percent}%`, backgroundColor: storage.color }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
