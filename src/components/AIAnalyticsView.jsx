import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { 
  BrainCircuit, 
  Flame, 
  CloudRain, 
  ZapOff, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Terminal, 
  Activity, 
  ShieldCheck,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export const AIAnalyticsView = () => {
  const { activeScenario, triggerScenario, aiLogs, metrics } = useCity();
  const [userQuery, setUserQuery] = useState('');
  const [aiAnswers, setAiAnswers] = useState([
    {
      query: 'Analyze city power grid stability during evening peak hours.',
      response: 'OmniCity AI Diagnostic: Substation 02 (Tech Park) experiencing 86% load. Recommending shifting 120 MW to Solar Farm Battery Storage. Overall frequency stable at 50.02 Hz.'
    }
  ]);

  const handleAiQuerySubmit = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    let responseText = `OmniCity AI Diagnostic: Evaluated query "${userQuery}". All 6 districts cross-referenced. Current city health index is 96.4%. Infrastructure load parameters are within normal variance thresholds.`;

    if (userQuery.toLowerCase().includes('traffic') || userQuery.toLowerCase().includes('signal')) {
      responseText = `Traffic AI Diagnostic: Congestion is currently at ${metrics.traffic.congestion}%. Signal automation rate is ${metrics.traffic.signalAutomation}%. Recommending 4-minute green wave extension along Main Street.`;
    } else if (userQuery.toLowerCase().includes('water') || userQuery.toLowerCase().includes('leak')) {
      responseText = `Hydraulics AI Diagnostic: Reservoir storage level is ${metrics.water.reservoirLevel}%. Leaks detected: ${metrics.water.leaksDetected}. Automated pressure balancing is active across Sector W-4.`;
    } else if (userQuery.toLowerCase().includes('power') || userQuery.toLowerCase().includes('grid') || userQuery.toLowerCase().includes('energy')) {
      responseText = `Energy AI Diagnostic: Grid load is ${metrics.electricity.totalLoad} MW. Renewable power share is ${Math.round(((metrics.electricity.solar + metrics.electricity.wind + metrics.electricity.hydro) / metrics.electricity.totalLoad) * 100)}%. EV charging station occupancy is 82%.`;
    }

    setAiAnswers(prev => [{ query: userQuery, response: responseText }, ...prev]);
    setUserQuery('');
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-purple-500/20">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
            <span>AI Predictive Analytics & Scenario Simulator</span>
          </h2>
          <p className="text-xs text-slate-400">Deep neural network city telemetry diagnostics, scenario stress-testing, and anomaly forecasting.</p>
        </div>

        <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 px-3.5 py-1.5 rounded-xl text-xs font-mono">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 font-bold">NEO-AI CORE: ACTIVE</span>
        </div>
      </div>

      {/* Interactive "What-If" Crisis Simulator Section */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border-l-4 border-l-purple-500">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            "What-If" Stress Test Crisis Simulator Engine
          </h3>
          <span className="text-xs font-mono text-slate-400">Select scenario to simulate city-wide telemetry cascade</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
          <button 
            onClick={() => triggerScenario('NORMAL')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition text-left ${
              activeScenario === 'NORMAL' 
                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10' 
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">DEFAULT</span>
            </div>
            <span className="font-bold text-sm text-white">Normal Operation</span>
            <p className="text-[10px] text-slate-400">Balanced load, steady traffic flow, normal weather.</p>
          </button>

          <button 
            onClick={() => triggerScenario('HEATWAVE')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition text-left ${
              activeScenario === 'HEATWAVE' 
                ? 'bg-rose-500/20 border-rose-500 text-white shadow-lg shadow-rose-500/10' 
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <Flame className="w-5 h-5 text-rose-400" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">STRESS TEST</span>
            </div>
            <span className="font-bold text-sm text-white">Extreme Heatwave (+8°C)</span>
            <p className="text-[10px] text-slate-400">Power grid surge warning, water demand spike, high cooling draw.</p>
          </button>

          <button 
            onClick={() => triggerScenario('FLASH_FLOOD')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition text-left ${
              activeScenario === 'FLASH_FLOOD' 
                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/10' 
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <CloudRain className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">STRESS TEST</span>
            </div>
            <span className="font-bold text-sm text-white">Torrential Flash Flood</span>
            <p className="text-[10px] text-slate-400">Torrential rain 85mm/h, traffic congestion surge, drainage load.</p>
          </button>

          <button 
            onClick={() => triggerScenario('BLACKOUT')}
            className={`p-4 rounded-xl border flex flex-col gap-2 transition text-left ${
              activeScenario === 'BLACKOUT' 
                ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/10' 
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <ZapOff className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">STRESS TEST</span>
            </div>
            <span className="font-bold text-sm text-white">Substation Blackout</span>
            <p className="text-[10px] text-slate-400">Substation 3 tripping, battery backup auto-routing engaged.</p>
          </button>
        </div>
      </div>

      {/* Grid Content: OmniCity AI Query Box + Anomaly Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OmniCity Natural Language Query Engine */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            OmniCity AI Natural Language Query Box
          </h3>

          <form onSubmit={handleAiQuerySubmit} className="flex gap-2">
            <input 
              type="text"
              placeholder="e.g. Analyze traffic light optimization in Downtown..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="input-glass text-xs font-mono"
            />
            <button type="submit" className="btn-primary shrink-0">
              <Send className="w-3.5 h-3.5" />
              <span>Query AI</span>
            </button>
          </form>

          {/* Q&A Stream */}
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto font-mono text-xs pr-1">
            {aiAnswers.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 p-3.5 rounded-xl border border-cyan-500/20 flex flex-col gap-2">
                <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>USER QUERY: "{item.query}"</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  {item.response}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Anomaly Log Stream */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            Live AI System Diagnostic Stream
          </h3>
          <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto font-mono text-xs pr-1">
            {aiLogs.map((log) => (
              <div key={log.id} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <span className="text-slate-500 text-[10px] shrink-0 mt-0.5">{log.time}</span>
                <p className={`text-[11px] ${log.type === 'rose' ? 'text-rose-400 font-bold' : log.type === 'warning' ? 'text-amber-400' : log.type === 'success' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>
                  {log.msg}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
