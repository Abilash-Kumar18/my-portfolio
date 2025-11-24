// src/components/SpaceScene.jsx

import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useLocation } from 'react-router-dom'; 
import * as THREE from 'three'; 
import BlackHole3D from './BlackHole3D';

// --- CINEMATIC ANGLES (Unchanged) ---
const CAMERA_ANGLES = [
  { label: 'Standard Front', pos: [0, 1, 6] },
  { label: 'Top Down', pos: [0, 6, 2] },
  { label: 'Side Profile', pos: [7, 0, 0] },
  { label: 'Low Angle', pos: [0, -2, 5] },
  { label: 'Zoomed In', pos: [0, 0.5, 3.5] },
  { label: 'Far Out', pos: [0, 2, 10] },
  { label: 'Isometric', pos: [4, 4, 4] }
];

function CinematicCameraRig() {
  const location = useLocation();
  const targetPosition = useRef(new THREE.Vector3(0, 1, 6));

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CAMERA_ANGLES.length);
    const selectedAngle = CAMERA_ANGLES[randomIndex];
    
    targetPosition.current.set(
      selectedAngle.pos[0], 
      selectedAngle.pos[1], 
      selectedAngle.pos[2]
    );
  }, [location.pathname]); 

  useFrame((state, delta) => {
    // SMOOTH LERP: Reduced speed slightly (1.5) for smoother, less jerky movement
    state.camera.position.lerp(targetPosition.current, delta * 1.5);
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
      {/* PERFORMANCE FIX 1: dpr caps resolution to save GPU */}
      {/* PERFORMANCE FIX 2: powerPreference requests the strong GPU */}
      <Canvas 
        dpr={[1, 2]} 
        gl={{ powerPreference: "high-performance", antialias: false }}
        camera={{ position: [0, 1, 6], fov: 45 }}
      >
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f5c542" />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#4272f5" />

        {/* PERFORMANCE FIX 3: Reduced stars from 5000 -> 1500 */}
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