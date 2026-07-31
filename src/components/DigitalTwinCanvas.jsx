import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useCity } from '../context/CityContext';
import { 
  Building2, 
  Eye, 
  Maximize2, 
  Activity, 
  Zap, 
  Droplet, 
  Wind, 
  Car, 
  RefreshCw, 
  Info,
  X,
  Compass
} from 'lucide-react';

export const DigitalTwinCanvas = () => {
  const containerRef = useRef(null);
  const { 
    timeOfDay, 
    activeLayer, 
    selectedBuilding, 
    setSelectedBuilding, 
    selectedDistrict, 
    metrics, 
    buildings 
  } = useCity();

  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [cameraPreset, setCameraPreset] = useState('Overview');

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const buildingsMeshGroup = useRef(null);
  const trafficParticlesGroup = useRef(null);
  const layerVisualsGroup = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. SCENE SETUP
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(45, 45, 55);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. LIGHTING & ENVIRONMENT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
    dirLight.position.set(50, 80, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // Cyan/Purple Cyber Spotlight
    const spotLight = new THREE.SpotLight(0x00f3ff, 2.5);
    spotLight.position.set(-30, 50, -30);
    scene.add(spotLight);

    // 3. GROUND GRID & ROADS
    const groundGeo = new THREE.PlaneGeometry(120, 120);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x070914, 
      roughness: 0.8, 
      metalness: 0.2 
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(120, 40, 0x00f3ff, 0x1a233d);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // Road Networks (Glowing lines)
    const roadGroup = new THREE.Group();
    const roadMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
    
    // Main Arterials
    const r1 = new THREE.Mesh(new THREE.BoxGeometry(120, 0.1, 3), roadMat);
    const r2 = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 120), roadMat);
    roadGroup.add(r1, r2);
    scene.add(roadGroup);

    // 4. PROCEDURAL 3D CITY BUILDINGS
    const buildingsGroup = new THREE.Group();
    buildingsMeshGroup.current = buildingsGroup;

    const districtCoords = [
      { district: 'Downtown', offsetX: -25, offsetZ: -25, count: 12, color: 0x00f3ff },
      { district: 'Tech Park', offsetX: 25, offsetZ: -25, count: 10, color: 0x9d4edd },
      { district: 'Residential', offsetX: -25, offsetZ: 25, count: 14, color: 0x00ff9d },
      { district: 'Industrial', offsetX: 25, offsetZ: 25, count: 8, color: 0xffb700 },
      { district: 'Eco Park', offsetX: 0, offsetZ: 30, count: 5, color: 0x10b981 },
      { district: 'Harbor', offsetX: 35, offsetZ: 0, count: 6, color: 0x3b82f6 }
    ];

    const buildingMeshes = [];

    districtCoords.forEach((d) => {
      for (let i = 0; i < d.count; i++) {
        const h = Math.random() * 12 + 4;
        const w = Math.random() * 3 + 3;
        const l = Math.random() * 3 + 3;

        const posX = d.offsetX + (Math.random() - 0.5) * 22;
        const posZ = d.offsetZ + (Math.random() - 0.5) * 22;

        const bGeo = new THREE.BoxGeometry(w, h, l);
        const bMat = new THREE.MeshStandardMaterial({
          color: 0x121a2e,
          metalness: 0.8,
          roughness: 0.2,
          emissive: d.color,
          emissiveIntensity: 0.18
        });

        const mesh = new THREE.Mesh(bGeo, bMat);
        mesh.position.set(posX, h / 2, posZ);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Rooftop glowing beacon
        const beaconGeo = new THREE.BoxGeometry(w * 0.8, 0.4, l * 0.8);
        const beaconMat = new THREE.MeshBasicMaterial({ color: d.color });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.y = h / 2 + 0.2;
        mesh.add(beacon);

        mesh.userData = { 
          district: d.district, 
          height: h, 
          baseColor: d.color,
          name: `${d.district} Block ${i + 1}`
        };

        buildingsGroup.add(mesh);
        buildingMeshes.push(mesh);
      }
    });

    scene.add(buildingsGroup);

    // 5. TRAFFIC PARTICLES ANIMATION
    const trafficGroup = new THREE.Group();
    trafficParticlesGroup.current = trafficGroup;

    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = [];

    for (let i = 0; i < particleCount; i++) {
      const axis = Math.random() > 0.5 ? 'x' : 'z';
      if (axis === 'x') {
        positions[i * 3] = (Math.random() - 0.5) * 110;
        positions[i * 3 + 1] = 0.5;
        positions[i * 3 + 2] = (Math.floor(Math.random() * 4) - 2) * 15;
      } else {
        positions[i * 3] = (Math.floor(Math.random() * 4) - 2) * 15;
        positions[i * 3 + 1] = 0.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 110;
      }
      speeds.push((Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1));
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff3366,
      size: 0.8,
      transparent: true,
      opacity: 0.9
    });

    const trafficParticles = new THREE.Points(particleGeo, particleMat);
    trafficGroup.add(trafficParticles);
    scene.add(trafficGroup);

    // 6. LAYER VISUAL OVERLAYS
    const layerGroup = new THREE.Group();
    layerVisualsGroup.current = layerGroup;

    // Power Grid Arcs
    const arcMat = new THREE.LineBasicMaterial({ color: 0x00f3ff, linewidth: 2 });
    for (let i = 0; i < 6; i++) {
      const p1 = new THREE.Vector3(districtCoords[i].offsetX, 8, districtCoords[i].offsetZ);
      const nextIdx = (i + 1) % 6;
      const p2 = new THREE.Vector3(districtCoords[nextIdx].offsetX, 8, districtCoords[nextIdx].offsetZ);
      const curve = new THREE.QuadraticBezierCurve3(p1, new THREE.Vector3((p1.x + p2.x) / 2, 20, (p1.z + p2.z) / 2), p2);
      const points = curve.getPoints(20);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMesh = new THREE.Line(arcGeo, arcMat);
      layerGroup.add(arcMesh);
    }
    scene.add(layerGroup);

    // 7. RAYCASTING INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let currentHoveredMesh = null;

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (currentHoveredMesh !== hit) {
          if (currentHoveredMesh) currentHoveredMesh.material.emissiveIntensity = 0.18;
          hit.material.emissiveIntensity = 0.6;
          currentHoveredMesh = hit;
        }
        setHoveredBuilding(hit.userData);
      } else {
        if (currentHoveredMesh) currentHoveredMesh.material.emissiveIntensity = 0.18;
        currentHoveredMesh = null;
        setHoveredBuilding(null);
      }
    };

    const handlePointerClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matched = buildings.find(b => b.district === hit.userData.district) || buildings[0];
        setSelectedBuilding({ ...matched, name: hit.userData.name, height: Math.round(hit.userData.height * 4) });
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointermove', handlePointerMove);
    domElem.addEventListener('click', handlePointerClick);

    // 8. ANIMATION LOOP
    let animationFrameId;
    let angle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles along roads
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let x = posAttr.getX(i);
        let z = posAttr.getZ(i);

        if (Math.abs(x) > Math.abs(z)) {
          x += speeds[i];
          if (x > 60) x = -60;
          if (x < -60) x = 60;
        } else {
          z += speeds[i];
          if (z > 60) z = -60;
          if (z < -60) z = 60;
        }

        posAttr.setXYZ(i, x, 0.5, z);
      }
      posAttr.needsUpdate = true;

      // Slow idle orbit rotation if Overview preset
      if (cameraPreset === 'Overview') {
        angle += 0.0012;
        camera.position.x = 60 * Math.sin(angle);
        camera.position.z = 60 * Math.cos(angle);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('pointermove', handlePointerMove);
      domElem.removeEventListener('click', handlePointerClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [buildings]);

  // Adjust Day/Night Environment
  useEffect(() => {
    if (!sceneRef.current) return;
    if (timeOfDay === 'day') {
      sceneRef.current.background = new THREE.Color(0x0a1628);
    } else if (timeOfDay === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x280e1a);
    } else {
      sceneRef.current.background = new THREE.Color(0x050711);
    }
  }, [timeOfDay]);

  // Layer Visibility
  useEffect(() => {
    if (!trafficParticlesGroup.current || !layerVisualsGroup.current) return;

    if (activeLayer === 'traffic' || activeLayer === 'all') {
      trafficParticlesGroup.current.visible = true;
    } else {
      trafficParticlesGroup.current.visible = false;
    }

    if (activeLayer === 'energy' || activeLayer === 'all') {
      layerVisualsGroup.current.visible = true;
    } else {
      layerVisualsGroup.current.visible = false;
    }
  }, [activeLayer]);

  // Handle Camera Presets
  const setPresetView = (preset) => {
    setCameraPreset(preset);
    if (!cameraRef.current) return;
    const cam = cameraRef.current;

    if (preset === 'Aerial') {
      cam.position.set(0, 85, 5);
      cam.lookAt(0, 0, 0);
    } else if (preset === 'Downtown') {
      cam.position.set(-30, 20, -10);
      cam.lookAt(-25, 5, -25);
    } else if (preset === 'Tech Park') {
      cam.position.set(30, 20, -10);
      cam.lookAt(25, 5, -25);
    } else {
      cam.position.set(45, 45, 55);
      cam.lookAt(0, 0, 0);
    }
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl">
      {/* 3D Canvas Target */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Top Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="bg-[#090d1f]/85 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">Layer:</span>
          <span className="text-white font-bold uppercase">{activeLayer}</span>
        </div>

        <div className="bg-[#090d1f]/85 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono">
          <span className="pulse-dot pulse-emerald"></span>
          <span className="text-slate-400">FPS:</span>
          <span className="text-emerald-400 font-bold">60</span>
        </div>
      </div>

      {/* Camera Angle Presets Overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#090d1f]/85 backdrop-blur-md border border-cyan-500/30 p-1.5 rounded-xl">
        {['Overview', 'Aerial', 'Downtown', 'Tech Park'].map(preset => (
          <button
            key={preset}
            onClick={() => setPresetView(preset)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
              cameraPreset === preset 
                ? 'bg-cyan-500 text-slate-950 font-bold' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Hover Info Tooltip */}
      {hoveredBuilding && (
        <div className="absolute bottom-6 left-6 z-20 pointer-events-none bg-[#090d1f]/90 border border-cyan-400 px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md animate-fade-in">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">{hoveredBuilding.name}</span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">District: <span className="text-cyan-300">{hoveredBuilding.district}</span></p>
        </div>
      )}

      {/* Selected Building Details Drawer */}
      {selectedBuilding && (
        <div className="absolute top-16 right-4 z-20 w-80 bg-[#090d1f]/95 border border-cyan-500/40 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in">
          <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-3">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">STRUCTURE INSPECTION</span>
              <h3 className="text-base font-bold text-white">{selectedBuilding.name}</h3>
              <p className="text-xs text-slate-400 font-mono">{selectedBuilding.district} • {selectedBuilding.type}</p>
            </div>
            <button 
              onClick={() => setSelectedBuilding(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">HEIGHT / FLOORS</span>
              <span className="text-white font-bold text-sm">{selectedBuilding.floors} Floors</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">OCCUPANCY</span>
              <span className="text-emerald-400 font-bold text-sm">{selectedBuilding.occupancy}</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">POWER CONSUMPTION</span>
              <span className="text-amber-400 font-bold text-sm">{selectedBuilding.energy}</span>
            </div>
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">WATER FLOW</span>
              <span className="text-blue-400 font-bold text-sm">{selectedBuilding.water}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 mb-3">
            <span className="text-slate-400">Indoor Air Quality:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Wind className="w-3.5 h-3.5" /> AQI {selectedBuilding.aqi} (Optimal)
            </span>
          </div>

          <button className="w-full btn-primary text-xs justify-center">
            <Activity className="w-3.5 h-3.5" />
            <span>Open Real-Time Diagnostics</span>
          </button>
        </div>
      )}
    </div>
  );
};
