import React from 'react';
import { CityProvider } from './context/CityContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MainDashboard } from './components/MainDashboard';

export function App() {
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
      </div>
    </CityProvider>
  );
}

export default App;
