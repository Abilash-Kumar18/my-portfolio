// src/components/SpaceScene.jsx

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useLocation } from 'react-router-dom'; 
import * as THREE from 'three'; 
import BlackHole3D from './BlackHole3D';

// --- 1. DEFINE FIXED ANGLES FOR EACH PAGE ---
const PAGE_ANGLES = {
  "/":          [0, 1, 6],   // HOME: Standard Front View
  "/about":     [7, 0, 0],   // ABOUT: Side Profile (Edge of the disk)
  "/projects":  [0, 6, 2],   // PROJECTS: Top Down (God View)
  "/contact":   [2, 2, 5],   // CONTACT: Angled Perspective
  "/resume":    [4, 4, 4],   // RESUME: Isometric (if visited directly)
  "default":    [0, 1, 6]    // Fallback
};

function CinematicCameraRig() {
  const location = useLocation();
  const targetPosition = useRef(new THREE.Vector3(0, 1, 6));

  useEffect(() => {
    // 1. Get the current path (e.g., "/projects")
    const path = location.pathname;
    
    // 2. Pick the coordinates based on the path
    const coords = PAGE_ANGLES[path] || PAGE_ANGLES["default"];
    
    console.log(`Camera Moving to: ${path}`, coords);

    // 3. Set the new target
    targetPosition.current.set(coords[0], coords[1], coords[2]);
  }, [location.pathname]); 

  useFrame((state, delta) => {
    // SMOOTH FLYING (Lerp)
    // Speed 1.5 is a good balance of smooth vs fast
    state.camera.position.lerp(targetPosition.current, delta * 1.5);
    
    // Always look at the center of the Black Hole
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function SpaceScene() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 0, 
      background: '#050505',
      pointerEvents: 'auto' 
    }}>
      {/* PERFORMANCE SETTINGS */}
      <Canvas 
        dpr={[1, 2]} // Cap resolution at 2x (Retina) to prevent 4K lag
        gl={{ powerPreference: "high-performance", antialias: false }}
        camera={{ position: [0, 1, 6], fov: 45 }}
      >
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f5c542" />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#4272f5" />

        {/* Reduced Star Count for Performance */}
        <Stars radius={300} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <BlackHole3D scale={1.5} position={[0, 0, 0]} />
        </Suspense>

        <CinematicCameraRig />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true} 
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

export default SpaceScene;