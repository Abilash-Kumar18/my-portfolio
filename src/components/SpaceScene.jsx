// src/components/SpaceScene.jsx

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import BlackHole3D from './BlackHole3D';

// 1. NEW COMPONENT: Moves camera based on website scroll
function ScrollCameraRig() {
  useFrame((state) => {
    // Get how far the user has scrolled (in pixels)
    const scrollY = window.scrollY;
    
    // Formula: Start at Z=6, move closer by 0.002 units for every pixel scrolled
    // The Math.max ensures we don't clip inside the model (stops at Z=2)
    const targetZ = Math.max(2, 6 - (scrollY * 0.003));
    
    // Smoothly interpolate current position to target position (Lerp)
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.1;
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
      background: '#050505'
    }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f5c542" />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#4272f5" />

        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <BlackHole3D scale={1.5} position={[0, 0, 0]} />
        </Suspense>

        {/* 2. ADD THE SCROLL RIG */}
        <ScrollCameraRig />

        {/* 3. CONFIGURE CONTROLS */}
        <OrbitControls 
          enableZoom={false}   /* DISABLE Mouse Wheel Zoom (Fixes Page Scroll) */
          enablePan={false}    /* Keep model centered */
          enableRotate={true}  /* Allow manual rotation */
          autoRotate={true}    /* Keep it spinning */
          autoRotateSpeed={0.5} /* Speed of spin */
          
          /* Optional: Limit manual rotation vertical angle */
          maxPolarAngle={Math.PI / 1.5} 
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

export default SpaceScene;