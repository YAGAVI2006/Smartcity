import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Trash2, 
  Truck, 
  Recycle, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Send
} from 'lucide-react';

export const WasteView = () => {
  const { metrics, dispatchGarbageTruck } = useCity();
  const { waste } = metrics;

  const binSectors = [
    { name: 'Downtown Sector B', fullBins: 34, fillAvg: '84%', urgency: 'High', color: 'text-rose-400' },
    { name: 'Tech Park Block A', fullBins: 18, fillAvg: '62%', urgency: 'Moderate', color: 'text-amber-400' },
    { name: 'Residential Bay East', fullBins: 22, fillAvg: '74%', urgency: 'Moderate', color: 'text-amber-400' },
    { name: 'Industrial Zone 3', fullBins: 12, fillAvg: '48%', urgency: 'Normal', color: 'text-emerald-400' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-purple-400" />
            <span>Smart Waste & Circular Operations</span>
          </h2>
          <p className="text-xs text-slate-400">IoT dumpster fill sensors, automated AI truck routing, and recycling metrics.</p>
        </div>

        <button onClick={dispatchGarbageTruck} className="btn-primary">
          <Send className="w-4 h-4 text-purple-400" />
          <span>Deploy AI Optimized Garbage Dispatch</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card purple">
          <span className="metric-label">Total IoT Smart Bins</span>
          <div className="metric-val text-purple-400">{waste.totalBins.toLocaleString()}</div>
          <span className="text-xs text-slate-400 font-mono">Ultrasonic fill sensors</span>
        </div>

        <div className="glass-panel metric-card rose">
          <span className="metric-label">Bins Needing Pickup (&gt;80%)</span>
          <div className="metric-val text-rose-400">{waste.binsNeedingPickup}</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> High capacity alerts
          </span>
        </div>

        <div className="glass-panel metric-card">
          <span className="metric-label">Trucks En Route</span>
          <div className="metric-val text-cyan-400">{waste.trucksEnRoute}</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-cyan-400" /> Electric Compactor Fleet
          </span>
        </div>

        <div className="glass-panel metric-card emerald">
          <span className="metric-label">Recycling Efficiency</span>
          <div className="metric-val text-emerald-400">{waste.recyclingRate}%</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Recycle className="w-3.5 h-3.5 text-emerald-400" /> Automated optical sorting
          </span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Bin Fill Telemetry */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            District Dumpster Fill Density
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            {binSectors.map((s, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-sm block">{s.name}</span>
                  <span className="text-slate-400 text-[10px]">{s.fullBins} Bins Over 80% Capacity</span>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-base block ${s.color}`}>{s.fillAvg} Fill</span>
                  <span className="text-slate-400 text-[10px]">Urgency: {s.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recycling & Circular Economy Efficiency */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Recycle className="w-4 h-4 text-emerald-400" />
            Recycling & Sorting Facility Telemetry
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">Paper & Cardboard Sorting</span>
                <span className="text-slate-400 text-[10px]">Optical Sorter Unit 1</span>
              </div>
              <span className="text-emerald-400 font-bold">92% Purity</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">Plastics & Polymers</span>
                <span className="text-slate-400 text-[10px]">AI NIR Spectroscopy</span>
              </div>
              <span className="text-emerald-400 font-bold">88% Purity</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">Organic Bio-Compost</span>
                <span className="text-slate-400 text-[10px]">Anaerobic Digester</span>
              </div>
              <span className="text-cyan-400 font-bold">14.2 MWh Power Generated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
