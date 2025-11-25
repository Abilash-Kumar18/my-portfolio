// src/components/BackgroundUFO.jsx

import React, { useRef } from 'react';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function BackgroundUFO() {
  const { scene } = useGLTF('/models/ufo.glb'); // Reusing your UFO model
  const ref = useRef();
  const scroll = useScroll();

  useFrame((state) => {
    if (!ref.current) return;

    // 1. SCROLL DRIVEN MOVEMENT (Timeline Logic)
    // scroll.offset goes from 0 (Top) to 1 (Bottom)
    const scrollPos = scroll.offset;

    // Fly across the background:
    // Starts at X: -20 (Left), Ends at X: 20 (Right)
    ref.current.position.x = -20 + (scrollPos * 40);
    
    // Dip down and up:
    // Uses Sine wave based on scroll position
    ref.current.position.y = Math.sin(scrollPos * Math.PI) * 5;

    // 2. INDEPENDENT SPIN
    // It spins regardless of scroll
    ref.current.rotation.y += 0.02;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2; // Banking
  });

  return (
    <group ref={ref} position={[-20, 0, -10]} scale={0.5}>
      <primitive object={scene} />
      {/* Engine Glow */}
      <pointLight position={[0, -0.5, 0]} color="#00ff88" intensity={2} distance={5} />
    </group>
  );
}

export default BackgroundUFO;