// src/components/WarpScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Stars } from '@react-three/drei';
import * as THREE from 'three';

function WarpStars() {
  const ref = useRef();
  const scroll = useScroll();

  useFrame((state, delta) => {
    // Get scroll progress (0 to 1)
    const scrollOffset = scroll.offset;
    
    // Rotate the stars faster as you scroll down
    ref.current.rotation.z += delta * 0.1;
    ref.current.rotation.x += delta * 0.1;

    // Move camera "forward" based on scroll
    // The '-50' means we fly 50 units deep into space
    state.camera.position.z = 5 - (scrollOffset * 50);
  });

  return (
    <group ref={ref}>
      {/* Creates a huge field of stars */}
      <Stars 
        radius={100} // Radius of the star sphere
        depth={50}   // Depth of star field
        count={5000} // How many stars
        factor={4}   // Size of stars
        saturation={0} 
        fade 
        speed={1} 
      />
    </group>
  );
}

export default function WarpScene() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* Pages = 5 means the scroll area is 5x the screen height */}
        <ScrollControls pages={5} damping={0.2}>
          <WarpStars />
        </ScrollControls>
      </Canvas>
    </div>
  );
}