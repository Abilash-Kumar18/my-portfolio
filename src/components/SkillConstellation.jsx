// src/components/SkillConstellation.jsx

import React, { useState, useRef } from 'react';
import { Html, Float, Dodecahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// 1. WIDE TUNNEL POSITIONS
const SKILLS = [
  { name: 'Python', color: '#3776AB', pos: [-10, -2, 0] },
  { name: 'Java', color: '#007396', pos: [10, -4, 2] },
  { name: 'React', color: '#f5c542', pos: [-8, -7, 4] },
  { name: 'JavaScript', color: '#F7DF1E', pos: [8, -10, -2] },
  { name: 'HTML', color: '#E34F26', pos: [-9, -13, -5] },
  { name: 'CSS', color: '#1572B6', pos: [0, -15, 5] },
  { name: 'MongoDB', color: '#47A248', pos: [11, -17, 0] },
  { name: 'n8n', color: '#FF6B6B', pos: [-10, -20, 3] },
  { name: 'C', color: '#A8B9CC', pos: [5, -22, -3] },
];

function AsteroidNode({ skill }) {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  // Random rotation speed for tumbling effect
  const xSpeed = Math.random() * 0.02;
  const ySpeed = Math.random() * 0.02;

  useFrame(() => {
    if (meshRef.current) {
      // Spin the rock
      meshRef.current.rotation.x += xSpeed;
      meshRef.current.rotation.y += ySpeed;
    }
  });

  return (
    <group position={skill.pos}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        
        {/* THE ASTEROID (Dodecahedron looks like a low-poly rock) */}
        <Dodecahedron 
          ref={meshRef}
          args={[0.8, 0]} // Size 0.8, Detail 0 (Sharp edges)
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
          scale={hovered ? 1.2 : 1}
        >
          {/* Rocky Material + Colored Wireframe for Tech look */}
          <meshStandardMaterial 
            color="#2a2a2a" // Dark Rock Color
            roughness={0.8} 
            metalness={0.2} 
          />
        </Dodecahedron>

        {/* COLORED WIREFRAME OVERLAY (Makes it look high-tech) */}
        <Dodecahedron args={[0.85, 0]} scale={hovered ? 1.2 : 1}>
           <meshBasicMaterial color={skill.color} wireframe transparent opacity={0.3} />
        </Dodecahedron>

        {/* ENERGY LIGHT (The core glows with the skill color) */}
        <pointLight distance={3} intensity={hovered ? 5 : 2} color={skill.color} />

        {/* THE LABEL (Only visible on hover) */}
        <Html 
          position={[1.2, 0, 0]} // Label floats to the right
          center 
          distanceFactor={15} 
          style={{ pointerEvents: 'none' }}
        >
          <div style={{ 
            opacity: hovered ? 1 : 0, // Invisible until hover
            transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
            transition: 'all 0.3s ease',
            background: 'rgba(0,0,0,0.8)',
            padding: '2px 2px',
            borderRadius: '1px',
            borderLeft: `1px solid ${skill.color}`, // Colored accent bar
            color: '#fff',
            fontWeight: 'bold',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            boxShadow: `0 0 15px ${skill.color}40`
          }}>
            {skill.name}
          </div>
        </Html>
      </Float>
    </group>
  );
}

function SkillConstellation() {
  return (
    <group>
      {SKILLS.map((skill, i) => (
        <AsteroidNode key={i} skill={skill} />
      ))}
    </group>
  );
}

export default SkillConstellation;