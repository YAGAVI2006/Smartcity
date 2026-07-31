import React from 'react';
import { useCity } from '../context/CityContext';
import { DigitalTwinCanvas } from './DigitalTwinCanvas';
import { TrafficView } from './TrafficView';
import { WaterView } from './WaterView';
import { EnergyView } from './EnergyView';
import { PollutionView } from './PollutionView';
import { WasteView } from './WasteView';
import { WeatherView } from './WeatherView';
import { ComplaintsView } from './ComplaintsView';
import { AIAnalyticsView } from './AIAnalyticsView';
import { 
  Car, 
  Droplet, 
  Zap, 
  Wind, 
  Trash2, 
  CloudRain, 
  MessageSquareWarning, 
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

export const MainDashboard = () => {
  const { activeTab, setActiveTab, metrics, complaints } = useCity();

  if (activeTab === 'traffic') return <TrafficView />;
  if (activeTab === 'water') return <WaterView />;
  if (activeTab === 'electricity') return <EnergyView />;
  if (activeTab === 'pollution') return <PollutionView />;
  if (activeTab === 'waste') return <WasteView />;
  if (activeTab === 'weather') return <WeatherView />;
  if (activeTab === 'complaints') return <ComplaintsView />;
  if (activeTab === 'ai-analytics') return <AIAnalyticsView />;

  // Default Digital Twin View
  return (
    <div className="flex flex-col gap-6 h-full animate-fade-in">
      {/* 3D Canvas Twin Viewport */}
      <div className="w-full h-[520px] shrink-0">
        <DigitalTwinCanvas />
      </div>

      {/* 8-Subsystem Quick Overview Widget Cards */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span>CITY INFRASTRUCTURE LIVE TELEMETRY</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Traffic Quick Card */}
          <div 
            onClick={() => setActiveTab('traffic')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-emerald-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-400" /> TRAFFIC
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-white">{metrics.traffic.congestion}%</span>
              <span className="text-xs text-slate-400">Congestion</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Avg Speed: {metrics.traffic.avgSpeed} km/h</span>
          </div>

          {/* Water Quick Card */}
          <div 
            onClick={() => setActiveTab('water')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-blue-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-blue-400" /> WATER GRID
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-white">{metrics.water.demand}</span>
              <span className="text-xs text-slate-400">MLD Demand</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Reservoir: {metrics.water.reservoirLevel}%</span>
          </div>

          {/* Electricity Quick Card */}
          <div 
            onClick={() => setActiveTab('electricity')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-amber-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> ENERGY GRID
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-white">{metrics.electricity.totalLoad}</span>
              <span className="text-xs text-slate-400">MW Load</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Solar: {metrics.electricity.solar} MW</span>
          </div>

          {/* Pollution Quick Card */}
          <div 
            onClick={() => setActiveTab('pollution')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-teal-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-400" /> AQI POLLUTION
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-emerald-400">{metrics.pollution.aqi}</span>
              <span className="text-xs text-slate-400">Good</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">CO2: {metrics.pollution.co2} ppm</span>
          </div>

          {/* Waste Quick Card */}
          <div 
            onClick={() => setActiveTab('waste')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-purple-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-purple-400" /> SMART WASTE
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-white">{metrics.waste.binsNeedingPickup}</span>
              <span className="text-xs text-slate-400">Full Bins</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Recycling Rate: {metrics.waste.recyclingRate}%</span>
          </div>

          {/* Weather Quick Card */}
          <div 
            onClick={() => setActiveTab('weather')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-indigo-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-indigo-400" /> WEATHER
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-white">{metrics.weather.temp}°C</span>
              <span className="text-xs text-slate-400">{metrics.weather.condition}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Wind: {metrics.weather.windSpeed} km/h</span>
          </div>

          {/* Complaints Quick Card */}
          <div 
            onClick={() => setActiveTab('complaints')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-rose-400"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <MessageSquareWarning className="w-4 h-4 text-rose-400" /> COMPLAINTS
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-rose-400">{complaints.filter(c => c.status !== 'Resolved').length}</span>
              <span className="text-xs text-slate-400">Active Tickets</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Resolution Rate: 92%</span>
          </div>

          {/* AI Analytics Quick Card */}
          <div 
            onClick={() => setActiveTab('ai-analytics')}
            className="glass-panel p-4 rounded-xl flex flex-col gap-2 cursor-pointer glass-panel-interactive border-l-4 border-l-purple-500"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-purple-400" /> AI SCENARIO LAB
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-extrabold text-purple-400">96.4%</span>
              <span className="text-xs text-slate-400">Health Index</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">What-If Engine Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
