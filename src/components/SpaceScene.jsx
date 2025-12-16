// src/components/SpaceScene.jsx

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Stars, useGLTF, Html, ScrollControls, useScroll, Scroll, Environment, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';

// --- IMPORTS ---
import { Blackhole } from './Blackhole';
import Spaceship from './Spaceship';
import { Satellite } from './Satellite';
import { Station } from './Station';
import { Planet } from './Planet';

import BackgroundUFO from '../components/BackgroundUFO';
import Profile from '../pages/Profile';
import PixelJourney from '../components/PixelJourney';
import JourneyOverlay from '../components/JourneyOverlay';
import SkillAsteroids from '../components/SkillAsteroids';

// --- 1. MOBILE RESPONSIVE LOGIC ---
// Standard Desktop Views
const DESKTOP_VIEWS = {
  'home': { pos: [0, 0, 12], lookAt: [0, 0, 0] },
  'about': { pos: [-4, -54, -4], lookAt: [-7, -56, -5] },
  'projects': { pos: [5, -58, 1], lookAt: [2, -56, -5] },
  'contact': { pos: [8, -54, -2], lookAt: [8, -56, -5] }
};

// Mobile Views (Zoomed out & Centered)
const MOBILE_VIEWS = {
  'home': { pos: [0, 0, 18], lookAt: [0, 0, 0] },     // Pulled back
  'about': { pos: [0, -54, 10], lookAt: [0, -56, 0] }, // Centered
  'projects': { pos: [0, -58, 10], lookAt: [0, -56, 0] },
  'contact': { pos: [0, -54, 12], lookAt: [0, -56, 0] }
};

// --- 2. WARP SPEED EFFECT (Lines) ---

function WarpEffect({ active }) {
  const meshRef = useRef();
  const count = 1000;
  const dummy = React.useMemo(() => new THREE.Object3D(), []);
  
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // 1. "Tunnel" Radius
      // slightly smaller radius (5 to 35) for a faster feel
      const r = 5 + Math.random() * 30; 
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * r;
      
      // 2. Y-OFFSET FIX
      // We subtract 2.0 to move the tunnel down to match the spaceship/camera view
      const y = (Math.sin(angle) * r) - 30.0; 
      
      const z = -50 + Math.random() * 100;
      const speed = 2 + Math.random() * 2;
      temp.push({ x, y, z, speed, initialZ: z });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!active) {
       if (meshRef.current) meshRef.current.visible = false;
       return;
    }

    if (meshRef.current) {
        meshRef.current.visible = true;
        particles.forEach((p, i) => {
          p.z += p.speed; 
          
          if (p.z > 20) p.z = -100; 

          dummy.position.set(p.x, p.y, p.z);
          dummy.scale.set(0.1, 0.1, 15); 
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Cyan/White Color */}
      <meshBasicMaterial color="#ccffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// --- 3. NAV MODEL WRAPPER ---
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

// --- 4. CAMERA CONTROLLER ---
function CameraController({ currentView, isMobile }) {
  const scroll = useScroll();
  // Choose the right set of angles based on device width
  const views = isMobile ? MOBILE_VIEWS : DESKTOP_VIEWS;

  useFrame((state, delta) => {
    if (currentView === 'home') {
      const scrollY = scroll.offset * -55;
      const targetPos = new THREE.Vector3(0, scrollY, views['home'].pos[2]);
      const targetLook = new THREE.Vector3(0, scrollY - 2, 0);
      state.camera.position.lerp(targetPos, delta * 2);
      state.camera.lookAt(targetLook);
    } else {
      const targetConfig = views[currentView];
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

// --- 5. MAIN SCENE ---
function SpaceScene({ currentView, setView }) {
  const [isWarping, setIsWarping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile on Mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <Environment preset="city" />
        <EffectComposer>
          {/* luminanceThreshold: Only glow things brighter than this (0-1)
            luminanceSmoothing: Softness of the glow edge
            intensity: How strong the glow is
          */}
          <Bloom 
            luminanceThreshold={0.01} 
            luminanceSmoothing={0.01} 
            intensity={0.01} 
          />
        </EffectComposer>
        

        <ScrollControls pages={8} damping={0.3} enabled={currentView === 'home'}>
          <Scroll html style={{ width: '100%', height: '100%' }}>
            {currentView === 'home' && (
              <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Profile />
              </div>
            )}
            {currentView === 'home' && <JourneyOverlay />}
          </Scroll>

          <Suspense fallback={null}>
            {/* Click Blackhole to go Home */}
            <group onClick={() => handleNavClick('home')} rotation={[0.2, 0, 0]}>
              <Blackhole scale={6} position={[0, -2, -20]} />
            </group>

            {/* Pass Warp State for Shake & Sound */}
            <Spaceship isWarping={isWarping} />
            
            <BackgroundUFO />
            <PixelJourney />
            <SkillAsteroids />

            {/* NAVIGATION MODELS */}
            <NavModel
              position={[-8.5, -28, -5]}
              label="ABOUT"
              onClick={() => handleNavClick('about')}
              color="#0088ff"
              scale={0.9}
            >
              <Planet />
            </NavModel>

            <NavModel
              position={[0, -29, -5]}
              label="PROJECTS"
              onClick={() => handleNavClick('projects')}
              color="#ff4400"
              scale={0.08}
            >
              <Satellite />
            </NavModel>

            <NavModel
              position={[8, -29, -5]}
              label="CONTACT"
              onClick={() => handleNavClick('contact')}
              color="#00ff88"
              scale={0.6}
            >
              <Station />
            </NavModel>

            {/* Pass 'isMobile' so camera knows where to look */}
            <CameraController currentView={currentView} isMobile={isMobile} />
            <Preload all />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

// Preload compressed assets
useGLTF.preload('/models/planet-transformed.glb');
useGLTF.preload('/models/satellite-transformed.glb');
useGLTF.preload('/models/station-transformed.glb');

export default SpaceScene;