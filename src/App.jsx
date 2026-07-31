import React, { useState, useEffect } from 'react';
import { CityProvider } from './context/CityContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MainDashboard } from './components/MainDashboard';
import { Command, X } from 'lucide-react';

export function App() {
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        setShowShortcuts(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CityProvider>
      <div className="app-container">
        <Header />
        <div className="app-main">
          <Sidebar />
          <main className="content-area">
            <MainDashboard />
          </main>
        </div>

        {/* Keyboard Shortcuts Modal */}
        {showShortcuts && (
          <div className="modal-overlay animate-fade-in z-50">
            <div className="modal-content max-w-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Command className="w-5 h-5 text-cyan-400" />
                  System Keyboard Shortcuts
                </h3>
                <button onClick={() => setShowShortcuts(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs text-slate-300">
                <div className="flex justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span>Toggle Shortcuts Help</span>
                  <span className="text-cyan-400 font-bold px-2 py-0.5 bg-slate-800 rounded">Shift + ?</span>
                </div>
                <div className="flex justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span>Reset 3D Camera View</span>
                  <span className="text-cyan-400 font-bold px-2 py-0.5 bg-slate-800 rounded">Click "Overview"</span>
                </div>
                <div className="flex justify-between bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span>Toggle Audio Alert Feedback</span>
                  <span className="text-cyan-400 font-bold px-2 py-0.5 bg-slate-800 rounded">Click Volume Icon</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CityProvider>
  );
}

export default App;
