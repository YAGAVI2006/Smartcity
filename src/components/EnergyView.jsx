import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Zap, 
  Sun, 
  Wind, 
  Activity, 
  BatteryCharging, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

export const EnergyView = () => {
  const { metrics } = useCity();
  const { electricity } = metrics;

  const totalRenewable = electricity.solar + electricity.wind + electricity.hydro;
  const renewableRatio = Math.round((totalRenewable / electricity.totalLoad) * 100);

  const substations = [
    { name: 'Substation 01 (Downtown)', load: '640 MW', capacity: '800 MW', status: 'Optimal', temp: '42°C' },
    { name: 'Substation 02 (Tech Park)', load: '780 MW', capacity: '900 MW', status: 'Optimal', temp: '48°C' },
    { name: 'Substation 03 (Industrial)', load: '920 MW', capacity: '1000 MW', status: electricity.peakSurgeWarning ? 'HIGH LOAD' : 'Optimal', temp: electricity.peakSurgeWarning ? '68°C' : '52°C' },
    { name: 'Substation 04 (Residential)', load: '500 MW', capacity: '700 MW', status: 'Optimal', temp: '38°C' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-amber-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <span>Smart Microgrid & Energy Infrastructure</span>
          </h2>
          <p className="text-xs text-slate-400">Real-time load balancing, renewable solar/wind generation, and EV grid telemetry.</p>
        </div>

        {electricity.peakSurgeWarning ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-400 text-xs font-semibold animate-pulse">
            <ShieldAlert className="w-4 h-4" />
            <span>GRID SURGE WARNING ACTIVE</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>GRID STABLE (50.02 Hz)</span>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card amber">
          <span className="metric-label">Total Grid Load</span>
          <div className="metric-val text-amber-400">{electricity.totalLoad} MW</div>
          <span className="text-xs text-slate-400 font-mono">Frequency: {electricity.frequency} Hz</span>
        </div>

        <div className="glass-panel metric-card emerald">
          <span className="metric-label">Renewable Energy Share</span>
          <div className="metric-val text-emerald-400">{renewableRatio}%</div>
          <span className="text-xs text-slate-400 font-mono">{totalRenewable} MW Clean Power</span>
        </div>

        <div className="glass-panel metric-card">
          <span className="metric-label">Solar Farm Generation</span>
          <div className="metric-val text-cyan-400">{electricity.solar} MW</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> 14,000 Photovoltaic Panels
          </span>
        </div>

        <div className="glass-panel metric-card purple">
          <span className="metric-label">EV Charging Stations</span>
          <div className="metric-val text-purple-400">{electricity.evChargersOccupied} / {electricity.evChargersTotal}</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <BatteryCharging className="w-3.5 h-3.5 text-purple-400" /> 82% Occupancy Rate
          </span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Sources Breakdown */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            Power Generation Mix Breakdown
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="text-white font-bold">Solar Array Matrix</span>
              </div>
              <span className="text-amber-400 font-bold">{electricity.solar} MW</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">Offshore Wind Turbines</span>
              </div>
              <span className="text-cyan-400 font-bold">{electricity.wind} MW</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">Hydro Dam Power</span>
              </div>
              <span className="text-emerald-400 font-bold">{electricity.hydro} MW</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-white font-bold">Base Grid Supply</span>
              </div>
              <span className="text-purple-400 font-bold">{electricity.grid} MW</span>
            </div>
          </div>
        </div>

        {/* Substation Nodes */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            District Substation Nodes
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            {substations.map((sub, i) => (
              <div key={i} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">{sub.name}</span>
                  <span className="text-slate-400 text-[10px]">Temp: {sub.temp}</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-400 font-bold text-sm block">{sub.load} / {sub.capacity}</span>
                  <span className={`text-[10px] font-bold ${sub.status === 'Optimal' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
