import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Wind, 
  TreePine, 
  Volume2, 
  Gauge, 
  ShieldCheck, 
  AlertTriangle,
  Leaf,
  Flower2
} from 'lucide-react';

export const PollutionView = () => {
  const { metrics } = useCity();
  const { pollution } = metrics;

  const getAqiStatus = (aqi) => {
    if (aqi <= 50) return { label: 'GOOD (Optimal)', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };
    if (aqi <= 100) return { label: 'MODERATE', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' };
    return { label: 'UNHEALTHY', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' };
  };

  const aqiInfo = getAqiStatus(pollution.aqi);

  const districtPollution = [
    { name: 'Eco Park Reserve', aqi: 14, status: 'Good', noise: '38 dBA', green: '84%' },
    { name: 'Residential Bay', aqi: 28, status: 'Good', noise: '44 dBA', green: '42%' },
    { name: 'Downtown Center', aqi: 45, status: 'Good', noise: '62 dBA', green: '18%' },
    { name: 'Harbor Logistics', aqi: 58, status: 'Moderate', noise: '68 dBA', green: '12%' },
    { name: 'Industrial Smelter Hub', aqi: 82, status: 'Moderate', noise: '76 dBA', green: '8%' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-teal-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wind className="w-6 h-6 text-teal-400" />
            <span>Air Quality Index & Environmental Monitoring</span>
          </h2>
          <p className="text-xs text-slate-400">Particulate matter, atmospheric emissions, noise pollution, and urban tree scrubbers.</p>
        </div>

        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${aqiInfo.bg} ${aqiInfo.border}`}>
          <span className="pulse-dot pulse-emerald"></span>
          <span className={`text-xs font-bold ${aqiInfo.color}`}>AQI STATUS: {aqiInfo.label}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card emerald">
          <span className="metric-label">Air Quality Index</span>
          <div className="metric-val text-emerald-400">{pollution.aqi}</div>
          <span className="text-xs text-slate-400 font-mono">0 - 500 EPA Scale</span>
        </div>

        <div className="glass-panel metric-card">
          <span className="metric-label">PM2.5 Particles</span>
          <div className="metric-val text-cyan-400">{pollution.pm25} µg/m³</div>
          <span className="text-xs text-slate-400 font-mono">Fine inhalable particles</span>
        </div>

        <div className="glass-panel metric-card purple">
          <span className="metric-label">CO2 Concentration</span>
          <div className="metric-val text-purple-400">{pollution.co2} ppm</div>
          <span className="text-xs text-slate-400 font-mono">Carbon Dioxide Sensor</span>
        </div>

        <div className="glass-panel metric-card amber">
          <span className="metric-label">Noise Pollution</span>
          <div className="metric-val text-amber-400">{pollution.noise} dBA</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" /> Ambient City Decibels
          </span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District AQI & Noise Comparison */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Gauge className="w-4 h-4 text-teal-400" />
            District Environmental Scorecard & Green Canopy
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            {districtPollution.map((d, i) => (
              <div key={i} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">{d.name}</span>
                  <span className="text-slate-400 text-[10px]">Noise: {d.noise} • Green Canopy: {d.green}</span>
                </div>
                <div className="text-right">
                  <span className="text-teal-400 font-bold text-sm block">AQI {d.aqi}</span>
                  <span className="text-emerald-400 text-[10px]">{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio-Scrubber & Carbon Offset Engine */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <TreePine className="w-4 h-4 text-emerald-400" />
            Urban Bio-Scrubber Filtration Matrix
          </h3>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs font-mono">ACTIVE SCATTER SCRUBBERS</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono block">{pollution.scrubbersActive} Units</span>
              </div>
              <Leaf className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">PM10 CONCENTRATION</span>
                <span className="text-white font-bold text-sm">{pollution.pm10} µg/m³</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">NITROGEN DIOXIDE (NO2)</span>
                <span className="text-white font-bold text-sm">{pollution.no2} ppb</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">OZONE (O3)</span>
                <span className="text-white font-bold text-sm">22.4 ppb</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">DAILY CO2 SEQUESTRATION</span>
                <span className="text-emerald-400 font-bold text-sm">4.2 Tons</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
