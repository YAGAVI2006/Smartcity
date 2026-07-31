import React, { createContext, useContext, useState, useEffect } from 'react';

const CityContext = createContext();

const INITIAL_COMPLAINTS = [
  {
    id: 'TICK-8041',
    title: 'Major Pothole on Main St & 5th Ave',
    category: 'Traffic & Roads',
    sector: 'Downtown',
    priority: 'High',
    status: 'In Progress',
    date: '2026-07-31 09:15',
    reporter: 'Alex Mercer',
    upvotes: 24,
    description: 'Deep pothole causing traffic slowdown near Central Metro Entrance.'
  },
  {
    id: 'TICK-8042',
    title: 'Water Pipe Leakage near Tech Hub Tower B',
    category: 'Water Infrastructure',
    sector: 'Tech Park',
    priority: 'Critical',
    status: 'Pending',
    date: '2026-07-31 11:40',
    reporter: 'Elena Rostova',
    upvotes: 42,
    description: 'Substantial clean water leakage from secondary distribution valve.'
  },
  {
    id: 'TICK-8043',
    title: 'Streetlight Outage on Harbor Boulevard',
    category: 'Electricity Grid',
    sector: 'Harbor',
    priority: 'Medium',
    status: 'Pending',
    date: '2026-07-31 12:05',
    reporter: 'Marcus Vance',
    upvotes: 11,
    description: '3 consecutive LED smart poles powered off during evening hours.'
  },
  {
    id: 'TICK-8044',
    title: 'Overflowing Smart Dumpster outside Residential Block 4',
    category: 'Waste Management',
    sector: 'Residential',
    priority: 'Medium',
    status: 'In Progress',
    date: '2026-07-31 13:20',
    reporter: 'Sarah Jenkins',
    upvotes: 18,
    description: 'Bin fill sensor reporting 98% capacity for over 4 hours.'
  },
  {
    id: 'TICK-8045',
    title: 'Excessive Construction Noise after 10 PM',
    category: 'Pollution & Environment',
    sector: 'Industrial',
    priority: 'Low',
    status: 'Resolved',
    date: '2026-07-30 22:30',
    reporter: 'David Kim',
    upvotes: 7,
    description: 'Decibel sensor recorded 88 dBA from site 14B.'
  }
];

const INITIAL_BUILDINGS = [
  { id: 'b1', name: 'Apex Zenith Tower', district: 'Downtown', type: 'Commercial', floors: 64, occupancy: '92%', energy: '420 kW', water: '120 L/min', aqi: 34, height: 18 },
  { id: 'b2', name: 'Cyberdyne Quantum Lab', district: 'Tech Park', type: 'Research', floors: 40, occupancy: '85%', energy: '680 kW', water: '210 L/min', aqi: 28, height: 14 },
  { id: 'b3', name: 'Starlight Sky Residencies', district: 'Residential', type: 'Residential', floors: 32, occupancy: '98%', energy: '310 kW', water: '340 L/min', aqi: 32, height: 11 },
  { id: 'b4', name: 'Nova Forge Smelter', district: 'Industrial', type: 'Industrial', floors: 15, occupancy: '74%', energy: '1450 kW', water: '590 L/min', aqi: 78, height: 8 },
  { id: 'b5', name: 'Green Canopy Biosphere', district: 'Eco Park', type: 'Civic', floors: 8, occupancy: '60%', energy: '85 kW', water: '450 L/min', aqi: 14, height: 5 },
  { id: 'b6', name: 'Oceanic Freight Control', district: 'Harbor', type: 'Logistics', floors: 22, occupancy: '88%', energy: '530 kW', water: '180 L/min', aqi: 52, height: 9 },
];

export const CityProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('digital-twin');
  const [activeLayer, setActiveLayer] = useState('all'); // 'all', 'traffic', 'energy', 'water', 'pollution', 'waste', 'weather'
  const [selectedBuilding, setSelectedBuilding] = useState(INITIAL_BUILDINGS[0]);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [timeOfDay, setTimeOfDay] = useState('night'); // 'day', 'sunset', 'night'
  
  // AI Crisis Scenario state
  const [activeScenario, setActiveScenario] = useState('NORMAL'); // 'NORMAL', 'HEATWAVE', 'FLASH_FLOOD', 'BLACKOUT'

  // Dynamic Telemetry Metrics
  const [metrics, setMetrics] = useState({
    traffic: {
      congestion: 42,
      avgSpeed: 48,
      activeVehicles: 14250,
      signalAutomation: 94,
      rerouteActive: false,
      accidents: 1,
      transitEta: '12 min'
    },
    water: {
      totalSupply: 450, // MLD
      demand: 412,
      reservoirLevel: 84, // %
      avgPressure: 62, // PSI
      leaksDetected: 2,
      qualityScore: 96,
      pH: 7.3
    },
    electricity: {
      totalLoad: 2840, // MW
      solar: 780,
      wind: 520,
      hydro: 340,
      grid: 1200,
      frequency: 50.02,
      peakSurgeWarning: false,
      evChargersOccupied: 412,
      evChargersTotal: 500
    },
    pollution: {
      aqi: 38,
      pm25: 12.4,
      pm10: 24.8,
      co2: 412, // ppm
      no2: 18.2, // ppb
      noise: 54, // dBA
      scrubbersActive: 48
    },
    waste: {
      totalBins: 1240,
      binsNeedingPickup: 86,
      trucksEnRoute: 14,
      recyclingRate: 64, // %
      hazardousAlerts: 0
    },
    weather: {
      temp: 24, // °C
      humidity: 58, // %
      windSpeed: 14, // km/h
      uvIndex: 4,
      condition: 'Clear Sky',
      isRaining: false,
      isFoggy: false
    }
  });

  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [buildings] = useState(INITIAL_BUILDINGS);
  const [aiLogs, setAiLogs] = useState([
    { id: 1, time: '14:12:05', type: 'info', msg: 'OmniCity AI initialized. All 6 districts synchronized.' },
    { id: 2, time: '14:13:30', type: 'success', msg: 'Traffic Light Green Wave optimized Sector 2 (Downtown).' },
    { id: 3, time: '14:14:10', type: 'warning', msg: 'Micro-leak detected in Tech Park pipe segment W-402.' }
  ]);

  // Live Telemetry Tick Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const isHeatwave = activeScenario === 'HEATWAVE';
        const isFlood = activeScenario === 'FLASH_FLOOD';
        const isBlackout = activeScenario === 'BLACKOUT';

        // Calculate dynamic fluctuations
        const congestionDelta = (Math.random() - 0.48) * 2;
        const newCongestion = Math.max(10, Math.min(98, Math.round(prev.traffic.congestion + (isFlood ? 2 : congestionDelta))));

        const loadDelta = (Math.random() - 0.48) * 30;
        const newLoad = Math.max(1500, Math.min(4500, Math.round(prev.electricity.totalLoad + (isHeatwave ? 45 : loadDelta))));

        const aqiDelta = (Math.random() - 0.48) * 1.5;
        const newAqi = Math.max(10, Math.min(300, Math.round(prev.pollution.aqi + (isHeatwave ? 1.2 : aqiDelta))));

        const waterDemand = Math.round(prev.water.demand + (isHeatwave ? 2 : (Math.random() - 0.5) * 3));

        return {
          ...prev,
          traffic: {
            ...prev.traffic,
            congestion: newCongestion,
            avgSpeed: Math.max(15, Math.min(80, Math.round(65 - newCongestion * 0.4))),
            activeVehicles: Math.round(14000 + newCongestion * 120)
          },
          electricity: {
            ...prev.electricity,
            totalLoad: isBlackout ? 850 : newLoad,
            frequency: +(50.0 + (Math.random() - 0.5) * 0.08).toFixed(2),
            peakSurgeWarning: isHeatwave || newLoad > 3400
          },
          pollution: {
            ...prev.pollution,
            aqi: newAqi,
            pm25: +(newAqi * 0.32).toFixed(1),
            co2: Math.round(400 + newAqi * 0.8)
          },
          water: {
            ...prev.water,
            demand: waterDemand,
            avgPressure: Math.max(30, Math.min(90, Math.round(65 - (waterDemand > 430 ? 8 : 0))))
          },
          waste: {
            ...prev.waste,
            binsNeedingPickup: Math.max(20, Math.min(250, prev.waste.binsNeedingPickup + (Math.random() > 0.7 ? 1 : 0)))
          }
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [activeScenario]);

  // Actions
  const triggerScenario = (scenarioId) => {
    setActiveScenario(scenarioId);
    let logMsg = '';
    let newWeather = { ...metrics.weather };

    if (scenarioId === 'HEATWAVE') {
      logMsg = 'CRISIS TRIGGERED: Extreme Heatwave (+8°C). Power grid surge warning active.';
      newWeather = { ...newWeather, temp: 38, humidity: 32, condition: 'Severe Heatwave', isRaining: false };
    } else if (scenarioId === 'FLASH_FLOOD') {
      logMsg = 'CRISIS TRIGGERED: Flash Flooding. Torrential rain (85mm/h) & traffic gridlock.';
      newWeather = { ...newWeather, temp: 19, humidity: 95, condition: 'Torrential Rain', isRaining: true, isFoggy: true };
    } else if (scenarioId === 'BLACKOUT') {
      logMsg = 'CRISIS TRIGGERED: Substation 3 Tripped! Grid capacity dropped to 30%. Backup batteries engaging.';
      newWeather = { ...newWeather, condition: 'Power Outage Alert' };
    } else {
      logMsg = 'System restored to Normal Operating Parameters.';
      newWeather = { temp: 24, humidity: 58, condition: 'Clear Sky', isRaining: false, isFoggy: false };
    }

    setMetrics(prev => ({ ...prev, weather: newWeather }));
    setAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: scenarioId === 'NORMAL' ? 'info' : 'rose', msg: logMsg }, ...prev]);
  };

  const addComplaint = (newTicket) => {
    const ticket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
      upvotes: 1,
      ...newTicket
    };
    setComplaints(prev => [ticket, ...prev]);
    setAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: 'info', msg: `New Citizen Complaint logged: "${ticket.title}" [${ticket.sector}]` }, ...prev]);
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const dispatchLeakRepair = () => {
    setMetrics(prev => ({ ...prev, water: { ...prev.water, leaksDetected: Math.max(0, prev.water.leaksDetected - 1) } }));
    setAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: 'success', msg: 'Water maintenance drone dispatched to repair pipe leak.' }, ...prev]);
  };

  const dispatchGarbageTruck = () => {
    setMetrics(prev => ({ ...prev, waste: { ...prev.waste, binsNeedingPickup: Math.max(10, prev.waste.binsNeedingPickup - 25), trucksEnRoute: prev.waste.trucksEnRoute + 2 } }));
    setAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: 'success', msg: 'AI route optimized. 2 additional Garbage Dispatch units deployed.' }, ...prev]);
  };

  const toggleSignalOverride = () => {
    setMetrics(prev => ({
      ...prev,
      traffic: {
        ...prev.traffic,
        signalAutomation: prev.traffic.signalAutomation === 100 ? 85 : 100,
        congestion: Math.max(20, prev.traffic.congestion - 12)
      }
    }));
    setAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), type: 'success', msg: 'AI Green-Wave Signal Override engaged across Downtown arterial roads.' }, ...prev]);
  };

  return (
    <CityContext.Provider value={{
      activeTab, setActiveTab,
      activeLayer, setActiveLayer,
      selectedBuilding, setSelectedBuilding,
      selectedDistrict, setSelectedDistrict,
      timeOfDay, setTimeOfDay,
      activeScenario, triggerScenario,
      metrics, setMetrics,
      complaints, addComplaint, updateComplaintStatus,
      buildings,
      aiLogs,
      dispatchLeakRepair, dispatchGarbageTruck, toggleSignalOverride
    }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
