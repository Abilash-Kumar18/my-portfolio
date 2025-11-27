// src/components/SpaceScene.jsx

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, Html, Sparkles, ScrollControls, useScroll, Scroll, Environment } from '@react-three/drei';
import * as THREE from 'three';

import BlackHole3D from '../components/BlackHole3D'; 
import Spaceship from '../components/Spaceship'; 
import BackgroundUFO from '../components/BackgroundUFO'; 
import Profile from '../pages/Profile'; 

import PixelJourney from '../components/PixelJourney'; 
import JourneyOverlay from '../components/JourneyOverlay';
import SkillAsteroids from './SkillAsteroids';

// --- VIEW ANGLES (Updated for Mixed Layout) ---
const VIEW_ANGLES = {
  'home':     { pos: [0, 2, 12], lookAt: [0, 2, 0] },
  'about':    { pos: [8, -28, 0], lookAt: [8, -28, 0] },   // Near Nav 1
  'projects': { pos: [6, -36, 5], lookAt: [8, -38, 0] },      // Near Nav 2
  'contact':  { pos: [0, -48, 6], lookAt: [0, -50, 0] }       // Near Nav 3
};

// --- NAV MODEL COMPONENT ---
function NavModel({ position, modelPath, label, onClick, color, scale = 1 }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if(ref.current) {
      ref.current.rotation.y += hovered ? 0.03 : 0.005;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <pointLight distance={5} intensity={hovered ? 10 : 2} color={color} />
      <primitive 
        ref={ref}
        object={scene}
        scale={hovered ? scale * 1.2 : scale} 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
      />
      <Html position={[0, -2, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div style={{ 
          opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          color: '#fff', fontFamily: 'Inter', fontWeight: '800', letterSpacing: '2px',
          textTransform: 'uppercase', background: `linear-gradient(135deg, ${color} 0%, #000 100%)`,
          padding: '8px 16px', borderRadius: '20px', border: `1px solid ${color}`,
          transition: 'all 0.3s ease', whiteSpace: 'nowrap', fontSize: '12px',
          boxShadow: `0 0 20px ${color}`
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

// --- WARP EFFECT (Speedlines) ---
function WarpEffect({ active }) {
  return (
    <Sparkles 
      count={active ? 1000 : 0} 
      scale={[20, 20, 50]} 
      size={active ? 20 : 0} 
      speed={10} 
      opacity={active ? 0.8 : 0}
      color="#fff" 
    />
  );
}

// --- CAMERA CONTROLLER ---
function CameraController({ currentView }) {
  const scroll = useScroll(); 
  
  useFrame((state, delta) => {
    if (currentView === 'home') {
      // SCROLL: -55 covers the whole journey
      const scrollY = scroll.offset * -55; 
      const targetPos = new THREE.Vector3(0, scrollY, 12);
      const targetLook = new THREE.Vector3(0, scrollY - 2, 0);
      state.camera.position.lerp(targetPos, delta * 2);
      state.camera.lookAt(targetLook);
    } else {
      const targetConfig = VIEW_ANGLES[currentView];
      const targetPos = new THREE.Vector3(...targetConfig.pos);
      const targetLook = new THREE.Vector3(...targetConfig.lookAt);
      state.camera.position.lerp(targetPos, delta * 1.5);
      
      const cameraLookDir = new THREE.Vector3();
      state.camera.getWorldDirection(cameraLookDir);
      const desiredLookDir = new THREE.Vector3().subVectors(targetLook, state.camera.position).normalize();
      const smoothedLook = cameraLookDir.lerp(desiredLookDir, delta * 2);
      state.camera.lookAt(state.camera.position.clone().add(smoothedLook));
    }
  });
  return null;
}

// --- MAIN SCENE ---
function SpaceScene({ currentView, setView }) {
  const [isWarping, setIsWarping] = useState(false);

  // WRAPPER FOR NAVIGATION CLICK
  const handleNavClick = (view) => {
    setIsWarping(true); // Start Warp
    setTimeout(() => {
      setView(view);    // Change View
      setIsWarping(false); // Stop Warp
    }, 800); // 0.8s Warp Duration
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        
        <ambientLight intensity={2.0} /> 
        <pointLight position={[10, 10, 10]} intensity={3} color="#f5c542" />
        <Stars radius={300} count={1000} fade speed={1} />
        <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.5} />
        <Environment preset="city" />

        <WarpEffect active={isWarping} />

        <ScrollControls pages={8} damping={0.3} enabled={currentView === 'home'}>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            {currentView === 'home' && (
              <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Profile />
               
              </div>
            )}
            <JourneyOverlay />
            
          </Scroll>

          <Suspense fallback={null}>
            <group onClick={() => handleNavClick('home')} rotation={[0.2, 0, 0]}>
               <BlackHole3D scale={6} position={[0, -2, -20]} />
            </group>
            
            <Spaceship />
            <BackgroundUFO />
           
            <PixelJourney />
            <SkillAsteroids />
            

            {/* --- MIXED NAVIGATION MODELS --- */}
            
            {/* 1. ABOUT PLANET (After first set of asteroids) */}
            <NavModel 
              position={[-8.7, -28, -5]} 
              label="ABOUT" 
              onClick={() => handleNavClick('about')} 
              color="#0088ff" 
              modelPath="/models/planet.glb" 
              scale={0.9} 
            />

            {/* 2. PROJECTS SATELLITE (After second set) */}
            <NavModel 
              position={[0, -29, -5]} 
              label="PROJECTS" 
              onClick={() => handleNavClick('projects')} 
              color="#ff4400" 
              modelPath="/models/satellite.glb" 
              scale={0.08} 
            />

            {/* 3. CONTACT STATION (End of line) */}
            <NavModel 
              position={[8, -29, -5]} 
              label="CONTACT" 
              onClick={() => handleNavClick('contact')} 
              color="#00ff88" 
              modelPath="/models/station.glb" 
              scale={0.6} 
            />

            <CameraController currentView={currentView} />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/planet.glb');
useGLTF.preload('/models/satellite.glb');
useGLTF.preload('/models/station.glb');

export default SpaceScene;