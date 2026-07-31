# Smart City Digital Twin 🌆 | Central Command Hub (v3.8)

A state-of-the-art, interactive 3D **Smart City Digital Twin** dashboard built with **React**, **Vite**, **Three.js**, and **Tailwind CSS**.

GitHub Repository: [https://github.com/YAGAVI2006/Smartcity](https://github.com/YAGAVI2006/Smartcity)

---

## 🌟 Key Features

- **Interactive 3D Digital Twin Viewport (Three.js)**:
  - Procedurally rendered 3D city with 6 urban districts (*Downtown*, *Tech Park*, *Residential Bay*, *Industrial Hub*, *Eco Park*, *Harbor*).
  - Raycaster building inspector with real-time telemetry (height, occupancy, power draw, water flow, indoor AQI).
  - Visual layers toggle: Traffic light streams, Power grid arcs, Water aqueducts, AQI smog heatmaps, and Atmospheric weather effects (rain, fog, day/night cycle).
- **8 Core Subsystem Dashboards**:
  - 🚦 **Traffic & Transit**: Congestion index (%), average speed, transit ETAs, AI green-wave signal override.
  - 💧 **Water Grid**: Supply vs demand (MLD), reservoir capacity, sector PSI pressure, water purity pH, leak repair drone dispatch.
  - ⚡ **Energy Grid**: Solar/Wind/Hydro renewable generation share, 50.02 Hz frequency stability, substation loads, EV charging occupancy.
  - 🍃 **AQI & Environment**: EPA air quality scorecard, PM2.5, PM10, CO2 ppm, NO2, decibel noise levels, urban bio-scrubbers.
  - ♻️ **Smart Waste**: IoT dumpster fill capacity, full bin alerts (>80%), truck route optimization, recycling sorting efficiency.
  - 🌧️ **Weather Control**: Temperature, humidity, wind velocity, UV index, 5-day & 12-hr forecast, rain & heatwave crisis triggers.
  - 📣 **Citizen Complaints**: Crowdsourced civic operations ticket stream, priority filtering, resolution action buttons, issue report modal, search & upvotes.
  - 🧠 **AI Scenario Lab**: OmniCity AI natural language query box with shortcut chips, live diagnostic logs, and interactive "What-If" crisis simulator (*Heatwave*, *Flash Flood*, *Blackout*).

---

## 🏗 System Architecture Diagram

```
+-------------------------------------------------------------------+
|                        NEO-VERIDIAN APP SHELL                     |
|                                                                   |
|  +------------------+  +---------------------------------------+  |
|  |     HEADER       |  | Live Clock | Scenario Status | District|  |
|  +------------------+  +---------------------------------------+  |
|                                                                   |
|  +------------------+  +---------------------------------------+  |
|  |     SIDEBAR      |  | 3D Digital Twin | Traffic | Water     |  |
|  |   (Collapsible)  |  | Energy | AQI | Waste | Weather | AI   |  |
|  +------------------+  +---------------------------------------+  |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  |             3D DIGITAL TWIN CANVAS (Three.js)               |  |
|  |     Buildings | Vehicles | Power Lines | Weather Overlays    |  |
|  +-------------------------------------------------------------+  |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  |                 8 SUBSYSTEM TELEMETRY GRID                  |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`

### Installation
```bash
# Clone repository
git clone https://github.com/YAGAVI2006/Smartcity.git
cd Smartcity

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 📦 Production Build

```bash
npm run build
```

The output will be in the `dist/` directory ready for deployment to Vercel, Netlify, or GitHub Pages.

---

## 🛠️ Git Contribution Sync

```bash
git push -u origin main
```
