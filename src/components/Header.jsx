import React, { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { 
  Building2, 
  Clock, 
  Sun, 
  Moon, 
  Sunset, 
  AlertTriangle, 
  Activity, 
  Zap, 
  Wind, 
  MapPin, 
  ShieldAlert
} from 'lucide-react';

export const Header = () => {
  const { 
    metrics, 
    timeOfDay, 
    setTimeOfDay, 
    selectedDistrict, 
    setSelectedDistrict, 
    activeScenario, 
    triggerScenario 
  } = useCity();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getScenarioBadge = () => {
    if (activeScenario === 'HEATWAVE') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-400 text-xs font-semibold animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          <span>CRISIS: EXTREME HEATWAVE</span>
          <button onClick={() => triggerScenario('NORMAL')} className="ml-2 text-white bg-rose-600 px-2 py-0.5 rounded text-[10px] hover:bg-rose-700">RESET</button>
        </div>
      );
    }
    if (activeScenario === 'FLASH_FLOOD') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-semibold animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          <span>CRISIS: FLASH FLOODING</span>
          <button onClick={() => triggerScenario('NORMAL')} className="ml-2 text-white bg-cyan-600 px-2 py-0.5 rounded text-[10px] hover:bg-cyan-700">RESET</button>
        </div>
      );
    }
    if (activeScenario === 'BLACKOUT') {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500 text-amber-300 text-xs font-semibold animate-pulse">
          <ShieldAlert className="w-4 h-4" />
          <span>CRISIS: GRID BLACKOUT</span>
          <button onClick={() => triggerScenario('NORMAL')} className="ml-2 text-white bg-amber-600 px-2 py-0.5 rounded text-[10px] hover:bg-amber-700">RESET</button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
        <span className="pulse-dot pulse-emerald"></span>
        <span>GRID SYSTEM OPTIMAL</span>
      </div>
    );
  };

  return (
    <header className="w-full bg-[#090d1f]/90 backdrop-blur-md border-b border-cyan-500/20 px-6 py-3 flex flex-wrap items-center justify-between gap-4 z-40">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-wider text-white flex items-center gap-2">
              NEO-VERIDIAN <span className="text-cyan-400 text-xs font-mono font-normal tracking-normal px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">v3.8 TWIN</span>
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>2026-07-31 {currentTime}</span>
          </p>
        </div>
      </div>

      {/* Quick Metric Ticker */}
      <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Traffic:</span>
          <span className="text-white font-bold">{metrics.traffic.congestion}%</span>
        </div>
        <div className="w-px h-4 bg-slate-800" />
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Grid:</span>
          <span className="text-white font-bold">{metrics.electricity.totalLoad} MW</span>
        </div>
        <div className="w-px h-4 bg-slate-800" />
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">AQI:</span>
          <span className="text-white font-bold">{metrics.pollution.aqi} (Good)</span>
        </div>
      </div>

      {/* Controls & Scenario Status */}
      <div className="flex items-center gap-3">
        {getScenarioBadge()}

        {/* District Selector */}
        <div className="flex items-center gap-1 bg-slate-900/80 border border-cyan-500/20 rounded-lg px-2 py-1 text-xs">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <select 
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-transparent text-white focus:outline-none cursor-pointer pr-1"
          >
            <option value="All" className="bg-slate-900">All Districts</option>
            <option value="Downtown" className="bg-slate-900">Downtown</option>
            <option value="Tech Park" className="bg-slate-900">Tech Park</option>
            <option value="Residential" className="bg-slate-900">Residential Bay</option>
            <option value="Industrial" className="bg-slate-900">Industrial Hub</option>
            <option value="Eco Park" className="bg-slate-900">Eco Park</option>
            <option value="Harbor" className="bg-slate-900">Harbor & Transit</option>
          </select>
        </div>

        {/* Time of Day Cycle Toggle */}
        <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setTimeOfDay('day')}
            className={`p-1.5 rounded transition ${timeOfDay === 'day' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            title="Day Mode"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setTimeOfDay('sunset')}
            className={`p-1.5 rounded transition ${timeOfDay === 'sunset' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            title="Sunset Mode"
          >
            <Sunset className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setTimeOfDay('night')}
            className={`p-1.5 rounded transition ${timeOfDay === 'night' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            title="Night Mode"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
