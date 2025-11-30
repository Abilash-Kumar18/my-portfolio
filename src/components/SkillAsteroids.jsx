// src/components/SkillAsteroids.jsx

import React, { useRef, useState, useMemo } from 'react';
import { useGLTF, Float, Text, Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// 1. CAREFULLY SCATTERED POSITIONS (Zig-Zag Path)
// X is limited to -8 and 8 (screen width)
// Y goes down from -3 to -25 (filling the scroll gap)
const SKILLS = [
  { name: 'Python', color: '#3776AB', pos: [-8, -12, 0] },     // Top Left
  { name: 'Java', color: '#007396', pos: [7, -13, 2] },        // Top Right
  { name: 'React', color: '#f5c542', pos: [7, -25, 3] },      // Mid Left (Close)
  { name: 'JavaScript', color: '#F7DF1E', pos: [2, -17, -2] },// Mid Right
  { name: 'HTML', color: '#E34F26', pos: [-7, -22, -1] },     // Low Left
  { name: 'CSS', color: '#1572B6', pos: [0, -28, 4] },        // Center (Very Close)
  { name: 'MongoDB', color: '#47A248', pos: [7, -37, 0] },    // Bottom Right
  { name: 'n8n', color: '#FF6B6B', pos: [-6, -34, 2] },       // Bottom Left
  { name: 'C', color: '#A8B9CC', pos: [4, -40, -2] },         // Deep Bottom
];

function AsteroidNode({ skill, scene }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  // Clone the scene for this specific instance
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame(() => {
    if (ref.current) {
      // Slow tumble rotation
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <group position={skill.pos}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
        
        {/* THE ASTEROID MODEL */}
        <primitive 
          object={clonedScene} 
          ref={ref}
          scale={hovered ? 1.2 : 0.8} // Grow on hover
          onClick={(e) => e.stopPropagation()}
          onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        />

        {/* HOVER GLOW (Light up the rock with skill color) */}
        <pointLight 
            distance={3} 
            intensity={hovered ? 8 : 0} // Only on when hovered
            color={skill.color} 
            position={[0, 0, 0]}
        />

        {/* 3D TEXT LABEL (Only visible on hover) */}
        <Billboard
            position={[0, 1.8, 0]} // Float text above the rock
            follow={true}
            lockX={false}
            lockY={false}
            lockZ={false}
        >
            <Text
                fontSize={0.6}
                color={skill.color}
                anchorX="center"
                anchorY="middle"
                // Fade In/Out Logic
                fillOpacity={hovered ? 1 : 0} 
                outlineOpacity={hovered ? 1 : 0}
                
                // Text Styling
                outlineWidth={0.04}
                outlineColor="#000000"
            >
                {skill.name}
            </Text>
        </Billboard>

      </Float>
    </group>
  );
}

function SkillAsteroids() {
  // Load the single model once
  const { scene } = useGLTF('/models/asteroid.glb');

  return (
    <group>
      {SKILLS.map((skill, index) => (
        <AsteroidNode key={index} skill={skill} scene={scene} />
      ))}
    </group>
  );
}

useGLTF.preload('/models/asteroid.glb');

export default SkillAsteroids;