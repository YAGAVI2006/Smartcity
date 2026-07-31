import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  CloudRain, 
  Sun, 
  Wind, 
  Droplet, 
  Compass, 
  CloudLightning, 
  Thermometer, 
  Eye
} from 'lucide-react';

export const WeatherView = () => {
  const { metrics, triggerScenario, activeScenario } = useCity();
  const { weather } = metrics;

  const forecast = [
    { time: '15:00', temp: '25°C', condition: 'Sunny', rain: '5%' },
    { time: '18:00', temp: '23°C', condition: 'Partly Cloudy', rain: '15%' },
    { time: '21:00', temp: '20°C', condition: 'Clear Night', rain: '0%' },
    { time: '00:00', temp: '18°C', condition: 'Cool Breeze', rain: '0%' },
    { time: '03:00', temp: '17°C', condition: 'Mist', rain: '10%' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-indigo-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CloudRain className="w-6 h-6 text-indigo-400" />
            <span>Weather Telemetry & Environmental Control</span>
          </h2>
          <p className="text-xs text-slate-400">Microclimate atmospheric sensors, precipitation forecasts, and weather simulation presets.</p>
        </div>

        {/* Weather Simulator Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerScenario(activeScenario === 'FLASH_FLOOD' ? 'NORMAL' : 'FLASH_FLOOD')} 
            className={`btn-secondary text-xs ${activeScenario === 'FLASH_FLOOD' ? 'border-cyan-400 text-cyan-300' : ''}`}
          >
            <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeScenario === 'FLASH_FLOOD' ? 'Stop Rain Simulation' : 'Simulate Heavy Rain'}</span>
          </button>
          <button 
            onClick={() => triggerScenario(activeScenario === 'HEATWAVE' ? 'NORMAL' : 'HEATWAVE')} 
            className={`btn-secondary text-xs ${activeScenario === 'HEATWAVE' ? 'border-amber-400 text-amber-300' : ''}`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeScenario === 'HEATWAVE' ? 'Stop Heat Simulation' : 'Simulate Heatwave'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card amber">
          <span className="metric-label">Temperature</span>
          <div className="metric-val text-amber-400">{weather.temp}°C</div>
          <span className="text-xs text-slate-400 font-mono">Feels like {weather.temp + 2}°C</span>
        </div>

        <div className="glass-panel metric-card">
          <span className="metric-label">Humidity</span>
          <div className="metric-val text-cyan-400">{weather.humidity}%</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Droplet className="w-3.5 h-3.5 text-cyan-400" /> Dew Point: 14°C
          </span>
        </div>

        <div className="glass-panel metric-card purple">
          <span className="metric-label">Wind Velocity</span>
          <div className="metric-val text-purple-400">{weather.windSpeed} km/h</div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-purple-400" /> Direction: WNW (280°)
          </span>
        </div>

        <div className="glass-panel metric-card emerald">
          <span className="metric-label">UV Index</span>
          <div className="metric-val text-emerald-400">{weather.uvIndex} (Moderate)</div>
          <span className="text-xs text-slate-400 font-mono">Barometer: 1014 hPa</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 24-Hour Forecast */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-indigo-400" />
            Next 12-Hour Weather Trend
          </h3>
          <div className="grid grid-cols-5 gap-2 font-mono text-xs text-center">
            {forecast.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col items-center gap-1.5">
                <span className="text-slate-400 text-[10px]">{item.time}</span>
                <Sun className="w-5 h-5 text-amber-400 my-1" />
                <span className="text-white font-bold text-sm">{item.temp}</span>
                <span className="text-cyan-400 text-[10px]">{item.rain} Rain</span>
              </div>
            ))}
          </div>
        </div>

        {/* Microclimate District Monitoring */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            District Microclimate Sensors
          </h3>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">Coastal Harbor Station</span>
                <span className="text-slate-400 text-[10px]">High Humidity & Coastal Fog</span>
              </div>
              <span className="text-cyan-400 font-bold">{weather.temp - 2}°C • 74% Humidity</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">Downtown Urban Heat Island</span>
                <span className="text-slate-400 text-[10px]">Concrete thermal reflection</span>
              </div>
              <span className="text-amber-400 font-bold">{weather.temp + 3}°C • 48% Humidity</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-white font-bold block">Eco Park Canopy Sensor</span>
                <span className="text-slate-400 text-[10px]">Natural tree canopy cooling</span>
              </div>
              <span className="text-emerald-400 font-bold">{weather.temp - 1}°C • 64% Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
