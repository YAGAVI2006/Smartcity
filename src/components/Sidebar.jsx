import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Box, 
  Car, 
  Droplet, 
  Zap, 
  Wind, 
  Trash2, 
  CloudRain, 
  MessageSquareWarning, 
  BrainCircuit, 
  Layers
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, activeLayer, setActiveLayer } = useCity();

  const navItems = [
    { id: 'digital-twin', label: 'Digital Twin 3D', icon: Box, color: 'text-cyan-400' },
    { id: 'traffic', label: 'Traffic & Transit', icon: Car, color: 'text-emerald-400' },
    { id: 'water', label: 'Water Network', icon: Droplet, color: 'text-blue-400' },
    { id: 'electricity', label: 'Energy Grid', icon: Zap, color: 'text-amber-400' },
    { id: 'pollution', label: 'AQI & Pollution', icon: Wind, color: 'text-teal-400' },
    { id: 'waste', label: 'Smart Waste', icon: Trash2, color: 'text-purple-400' },
    { id: 'weather', label: 'Weather Control', icon: CloudRain, color: 'text-indigo-400' },
    { id: 'complaints', label: 'Civic Complaints', icon: MessageSquareWarning, color: 'text-rose-400' },
    { id: 'ai-analytics', label: 'AI Scenario Lab', icon: BrainCircuit, color: 'text-purple-400' }
  ];

  const layerItems = [
    { id: 'all', label: 'All Visual Layers' },
    { id: 'traffic', label: 'Traffic Streams' },
    { id: 'energy', label: 'Power Lines' },
    { id: 'water', label: 'Water Aqueducts' },
    { id: 'pollution', label: 'Smog AQI Heatmap' },
    { id: 'waste', label: 'Waste Bins Markers' },
    { id: 'weather', label: 'Atmospheric Effects' }
  ];

  return (
    <aside className="w-64 bg-[#090d1f]/95 border-r border-cyan-500/20 flex flex-col justify-between p-4 z-30 select-none">
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2 block">
            OPERATIONAL VIEWS
          </span>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 border border-cyan-500/40 text-white shadow-lg shadow-cyan-500/10' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? item.color : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Layer Overlay Switcher for 3D Twin */}
        {activeTab === 'digital-twin' && (
          <div className="bg-slate-950/60 rounded-xl p-3 border border-cyan-500/15 animate-fade-in">
            <div className="flex items-center gap-2 mb-2 px-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                3D TWIN LAYERS
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {layerItems.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition ${
                    activeLayer === layer.id
                      ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* System Footer Info */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-1 text-[11px] font-mono text-slate-400">
        <div className="flex items-center justify-between">
          <span>AI Engine:</span>
          <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Latency:</span>
          <span className="text-cyan-400">14 ms</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Active Nodes:</span>
          <span className="text-purple-400">1,248</span>
        </div>
      </div>
    </aside>
  );
};
