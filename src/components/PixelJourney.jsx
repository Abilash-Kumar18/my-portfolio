// src/components/PixelJourney.jsx

import React, { useRef, useState, useMemo } from 'react';
import { useGLTF, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// ONLY POSITIONS FOR MODELS
const MODEL_STAGES = [
  {
    id: 1,
    model: '/models/pixel_planet_1.glb', 
    scale: 0.6, 
    position: [-5, -9, 0],   // Left Side
  },
  {
    id: 2,
    model: '/models/pixel_planet_2.glb',
    scale: 0.6,
    position: [5, -18, 0],   // Right Side
  },
  {
    id: 3,
    model: '/models/pixel_planet_3.glb',
    scale: 0.6,
    position: [-5, -27, 0],  // Left Side
  }
];

function PlanetNode({ stage, scene }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  
  // Clone scene for each planet
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; // Constant spin
    }
  });

  return (
    <group position={stage.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <primitive 
          object={clonedScene} 
          ref={ref}
          scale={hovered ? stage.scale * 1.1 : stage.scale} 
          onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        />
        {/* Simple light to illuminate the model */}
        <pointLight distance={5} intensity={2} color="#ffffff" position={[2, 2, 2]} />
      </Float>
    </group>
  );
}

function PixelJourney() {
  const planet1 = useGLTF('/models/pixel_planet_1.glb');
  const planet2 = useGLTF('/models/pixel_planet_2.glb');
  const planet3 = useGLTF('/models/pixel_planet_3.glb');

  return (
    <group>
      <PlanetNode stage={MODEL_STAGES[0]} scene={planet1.scene} />
      <PlanetNode stage={MODEL_STAGES[1]} scene={planet2.scene} />
      <PlanetNode stage={MODEL_STAGES[2]} scene={planet3.scene} />
    </group>
  );
}

useGLTF.preload('/models/pixel_planet_1.glb');
useGLTF.preload('/models/pixel_planet_2.glb');
useGLTF.preload('/models/pixel_planet_3.glb');

export default PixelJourney;