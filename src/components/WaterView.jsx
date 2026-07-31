import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Droplet, 
  Activity, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  Waves, 
  CheckCircle,
  FlaskConical
} from 'lucide-react';

export const WaterView = () => {
  const { metrics, dispatchLeakRepair } = useCity();
  const { water } = metrics;

  const sectors = [
    { name: 'Downtown Sector', pressure: 64, status: 'Optimal', pH: 7.3 },
    { name: 'Tech Park Aqueduct W-4', pressure: 52, status: 'Minor Leak Warning', pH: 7.2 },
    { name: 'Residential Bay Sub-grid', pressure: 68, status: 'Optimal', pH: 7.4 },
    { name: 'Industrial Water Plant', pressure: 75, status: 'High Pressure', pH: 7.1 },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-cyan-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Droplet className="w-6 h-6 text-blue-400" />
            <span>Water Grid & Aqueduct Management</span>
          </h2>
          <p className="text-xs text-slate-400">Monitoring municipal supply, reservoir storage, pressure distribution, and leak detection.</p>
        </div>

        <button onClick={dispatchLeakRepair} className="btn-primary">
          <Wrench className="w-4 h-4 text-blue-400" />
          <span>Dispatch Leak Repair Drone ({water.leaksDetected} Active Leaks)</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card">
          <span className="metric-label">Total Daily Supply</span>
          <div className="metric-val text-blue-400">{water.totalSupply} MLD</div>
          <span className="text-xs text-slate-400 font-mono">Million Liters / Day</span>
        </div>

        <div className="glass-panel metric-card emerald">
          <span className="metric-label">City Demand</span>
          <div className="metric-val text-emerald-400">{water.demand} MLD</div>
          <span className="text-xs text-slate-400 font-mono">Capacity Margin: +{water.totalSupply - water.demand} MLD</span>
        </div>

        <div className="glass-panel metric-card purple">
          <span className="metric-label">Reservoir Level</span>
          <div className="metric-val text-purple-400">{water.reservoirLevel}%</div>
          <span className="text-xs text-slate-400 font-mono">Central Aqua Reserve</span>
        </div>

        <div className="glass-panel metric-card amber">
          <span className="metric-label">Pipe Leaks Detected</span>
          <div className="metric-val text-amber-400">{water.leaksDetected}</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Acoustic Sensor Triggers
          </span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Pressure Details */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Sector Pipeline Pressure Metrics
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            {sectors.map((s, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-sm block">{s.name}</span>
                  <span className="text-slate-400 text-[10px]">Purity Score: pH {s.pH}</span>
                </div>
                <div className="text-right">
                  <span className="text-blue-400 font-bold text-base block">{s.pressure} PSI</span>
                  <span className={`text-[10px] font-bold ${s.status.includes('Leak') ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Quality & Purification Parameters */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            Water Quality Index (WQI)
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 text-xs font-mono">OVERALL PURITY SCORE</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono block">{water.qualityScore} / 100</span>
              </div>
              <ShieldCheck className="w-12 h-12 text-emerald-400/80" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">pH LEVEL</span>
                <span className="text-white font-bold text-sm">{water.pH} (Balanced)</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">TURBIDITY</span>
                <span className="text-white font-bold text-sm">0.4 NTU (Optimal)</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">CHLORINE RESIDUAL</span>
                <span className="text-white font-bold text-sm">1.2 mg/L</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">DISSOLVED OXYGEN</span>
                <span className="text-white font-bold text-sm">8.6 mg/L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
