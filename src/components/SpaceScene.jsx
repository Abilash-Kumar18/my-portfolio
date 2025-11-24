// src/components/SpaceScene.jsx

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import BlackHole3D from './BlackHole3D';

function SpaceScene() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 0, /* CHANGED from -1 to 0 so it can receive clicks */
      background: '#050505'
    }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#f5c542" />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#4272f5" />

        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Suspense fallback={null}>
          <BlackHole3D scale={1.5} position={[0, 0, 0]} />
        </Suspense>

        {/* CONTROLS: Enabled dragging/rotating */}
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true} /* It will spin slowly, but you can grab it to override */
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default SpaceScene;