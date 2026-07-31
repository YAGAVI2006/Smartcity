import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Car, 
  Gauge, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Navigation, 
  Clock, 
  Radio, 
  ShieldCheck
} from 'lucide-react';

export const TrafficView = () => {
  const { metrics, toggleSignalOverride } = useCity();
  const { traffic } = metrics;

  const districtTraffic = [
    { name: 'Downtown Sector 1', density: 78, level: 'High', color: 'bg-rose-500' },
    { name: 'Tech Park Arterial', density: 54, level: 'Moderate', color: 'bg-amber-500' },
    { name: 'Residential Bay West', density: 32, level: 'Optimal', color: 'bg-emerald-500' },
    { name: 'Industrial Belt Way', density: 45, level: 'Moderate', color: 'bg-amber-500' },
    { name: 'Harbor Transit Hub', density: 62, level: 'High', color: 'bg-rose-500' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-cyan-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Car className="w-6 h-6 text-emerald-400" />
            <span>Traffic & Mobility Control Hub</span>
          </h2>
          <p className="text-xs text-slate-400">Autonomous traffic light AI, flow vectors, and transit ETAs.</p>
        </div>

        <button onClick={toggleSignalOverride} className="btn-primary">
          <Sliders className="w-4 h-4" />
          <span>{traffic.signalAutomation === 100 ? 'Signal Override Active (100%)' : 'Engage AI Green-Wave Optimization'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card rose">
          <span className="metric-label">Congestion Index</span>
          <div className="metric-val text-rose-400">{traffic.congestion}%</div>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Activity className="w-3.5 h-3.5 text-rose-400" /> Real-time arterial load
          </span>
        </div>

        <div className="glass-panel metric-card emerald">
          <span className="metric-label">Avg City Speed</span>
          <div className="metric-val text-emerald-400">{traffic.avgSpeed} km/h</div>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Gauge className="w-3.5 h-3.5 text-emerald-400" /> +4 km/h vs peak hour avg
          </span>
        </div>

        <div className="glass-panel metric-card">
          <span className="metric-label">Active Vehicles</span>
          <div className="metric-val text-cyan-400">{traffic.activeVehicles.toLocaleString()}</div>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <Radio className="w-3.5 h-3.5 text-cyan-400" /> Connected IoT vehicle beacons
          </span>
        </div>

        <div className="glass-panel metric-card purple">
          <span className="metric-label">AI Automation Rate</span>
          <div className="metric-val text-purple-400">{traffic.signalAutomation}%</div>
          <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> 420 AI Traffic Nodes Active
          </span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District Congestion Bar Overview */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            District Congestion Density
          </h3>
          <div className="flex flex-col gap-4">
            {districtTraffic.map((d, i) => (
              <div key={i} className="flex flex-col gap-1.5 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{d.name}</span>
                  <span className="text-slate-400 font-bold">{d.density}% ({d.level})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`h-full ${d.color} transition-all duration-500`} 
                    style={{ width: `${d.density}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Public Transit Network ETAs */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            Public Transit Live ETAs
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Metro Line 1 (North-South)</span>
                <span className="text-slate-400 text-[10px]">Headway: 4 mins • 12 Trains Active</span>
              </div>
              <span className="text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">ON TIME</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Express EV Bus 40 (Downtown)</span>
                <span className="text-slate-400 text-[10px]">Rerouted via Sector 4</span>
              </div>
              <span className="text-amber-400 font-bold px-2 py-1 bg-amber-500/10 rounded border border-amber-500/20">+3 MIN DELAY</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Autonomous Harbor Ferry</span>
                <span className="text-slate-400 text-[10px]">Pier 9 to Tech Dock</span>
              </div>
              <span className="text-emerald-400 font-bold px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">ON TIME</span>
            </div>
          </div>
        </div>

        {/* Live Traffic Alerts & AI Rerouting */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Active Road Incidents
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-rose-400 font-bold">Minor Collision - 5th Ave</span>
                <span className="text-slate-400 text-[10px]">14:02 PM</span>
              </div>
              <p className="text-slate-300 text-[11px]">Lane 2 blocked. AI traffic rerouting dispatched green-light wave through 6th Ave bypass.</p>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-emerald-400 font-bold">Autonomous Reroute Success</span>
                <span className="text-slate-400 text-[10px]">13:45 PM</span>
              </div>
              <p className="text-slate-300 text-[11px]">Diverted 1,400 vehicles around Tech Park roadwork, saving avg 11 minutes per commuter.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
