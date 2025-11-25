// src/components/AsteroidBelt.jsx

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function AsteroidBelt() {
  // Load your "Group" model
  const { scene } = useGLTF('/models/asteroid.glb');

  // Create 5 layers of asteroid clouds to fill the scroll space
  const clouds = [
    { y: -2, scale: 0.8, speed: 0.01, rotateY: 0 },    // Top layer (near Black Hole)
    { y: -7, scale: 1.2, speed: -0.01, rotateY: 6 }, // Middle layer
    { y: -12, scale: 1.0, speed: 0.02, rotateY: 3 },   // Lower layer
    { y: -16, scale: 1.5, speed: -0.01, rotateY: 4.5 }, // Deep layer
    { y: -20, scale: 0.9, speed: 0.015, rotateY: 2 }   // Bottom layer (near Planets)
  ];

  return (
    <group>
      {clouds.map((data, i) => (
        <RotatingCloud key={i} scene={scene} data={data} />
      ))}
    </group>
  );
}

// Helper to spin each cloud group slowly
function RotatingCloud({ scene, data }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      // Rotate the whole group slowly
      ref.current.rotation.y += data.speed;
    }
  });

  return (
    <group 
      ref={ref} 
      position={[0, data.y, 0]} // Stack them vertically
      rotation={[0, data.rotateY, 0]} // Initial random rotation
      scale={data.scale}
    >
      {/* Clone the 3D model so we can use it multiple times */}
      <primitive object={scene.clone()} />
    </group>
  );
}

useGLTF.preload('/models/asteroid.glb');

export default AsteroidBelt;