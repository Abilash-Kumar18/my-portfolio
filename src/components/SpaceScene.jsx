// src/components/SpaceScene.jsx

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, useGLTF, Html, Sparkles, ScrollControls, useScroll, Scroll, Environment, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';

import { Blackhole } from './Blackhole'; 
import Spaceship from './Spaceship'; 

// 1. IMPORT ALL THREE MODEL COMPONENTS
import { Satellite } from './Satellite';
import { Station } from './Station';
import { Planet } from './Planet'; // <--- Newly created file

import BackgroundUFO from '../components/BackgroundUFO';
import Profile from '../pages/Profile';
import PixelJourney from '../components/PixelJourney';
import JourneyOverlay from '../components/JourneyOverlay';
import SkillAsteroids from '../components/SkillAsteroids';

const VIEW_ANGLES = {
  'home': { pos: [0, 0, 12], lookAt: [0, 0, 0] },
  'about': { pos: [-4, -54, -4], lookAt: [-7, -56, -5] },
  'projects': { pos: [5, -58, 1], lookAt: [2, -56, -5] },
  'contact': { pos: [8, -54, -2], lookAt: [8, -56 ,-5] }
};

// 2. FIXED NAVMODEL (No usage of useGLTF here!)
function NavModel({ position, children, label, onClick, color, scale = 1 }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <pointLight distance={5} intensity={hovered ? 10 : 2} color={color} />
      
      <group
        ref={ref}
        scale={hovered ? scale * 1.2 : scale}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'auto'; }}
      >
        {/* We ONLY render children now. No conditional loading. */}
        {children}
      </group>

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

function WarpEffect({ active }) {
  return (
  <Sparkles
      count={active ? 100 : 0}
      scale={[20, 20, 50]}
      size={active ? 20 : 0}
      speed={10}
      opacity={active ? 0 : 0}
      color="#fff"
    />
  );
}

function CameraController({ currentView }) {
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (currentView === 'home') {
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

function SpaceScene({ currentView, setView }) {
  const [isWarping, setIsWarping] = useState(false);

  const handleNavClick = (view) => {
    setIsWarping(true); 
    setTimeout(() => {
      setView(view);    
      setIsWarping(false);
    }, 800); 
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#000000ff' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 1.5]}>
        
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <pointLight position={[10, 10, 10]} intensity={3} color="#f5c542" />
        <Stars radius={300} count={1000} fade speed={1} />
        <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <Environment preset="city" />

        <WarpEffect active={isWarping} />

        <ScrollControls pages={8} damping={0.3} enabled={currentView === 'home'}>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            {
              currentView === 'home' && (
                <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Profile />
                </div>
              )
            }
            {currentView === 'home' && <JourneyOverlay />}
          </Scroll>

          <Suspense fallback={null}>
            <group onClick={() => handleNavClick('home')} rotation={[0.2, 0, 0]}>
              <Blackhole scale={6} position={[0, -2, -20]} />
            </group>

            <Spaceship />
            <BackgroundUFO />
            <PixelJourney />
            <SkillAsteroids />

            {/* --- UPDATED NAVIGATION MODELS --- */}
            
            {/* 1. ABOUT PLANET (Using Component) */}
            <NavModel
              position={[-8.5, -28, -5]}
              label="ABOUT"
              onClick={() => handleNavClick('about')}
              color="#0088ff"
              scale={0.9}
            >
              <Planet />
            </NavModel>

            {/* 2. PROJECTS SATELLITE (Using Component) */}
            <NavModel
              position={[0, -29, -5]}
              label="PROJECTS"
              onClick={() => handleNavClick('projects')}
              color="#ff4400"
              scale={0.08}
            >
               <Satellite />
            </NavModel>

            {/* 3. CONTACT STATION (Using Component) */}
            <NavModel
              position={[8, -29, -5]}
              label="CONTACT"
              onClick={() => handleNavClick('contact')}
              color="#00ff88"
              scale={0.6}
            >
               <Station />
            </NavModel>

            <CameraController currentView={currentView} />
            <Preload all />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

// 3. FIX: Updated Preloads
useGLTF.preload('/models/planet-transformed.glb');
useGLTF.preload('/models/satellite-transformed.glb');
useGLTF.preload('/models/station-transformed.glb');

export default SpaceScene;