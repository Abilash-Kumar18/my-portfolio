// src/components/SkillAsteroids.jsx

import React, { useRef, useState } from 'react';
import { useGLTF, Html, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiC, SiN8N } from 'react-icons/si';

// 1. SCATTERED POSITIONS (Zig-Zag Pattern down the scroll)
// Y values range from -4 (Top) to -18 (Bottom near planets)
const SKILLS = [
  { name: 'Python', icon: FaPython, color: '#3776AB', pos: [-8, -4, 0] },     // Top Left
  { name: 'Java', icon: FaJava, color: '#007396', pos: [8, -6, 2] },          // Top Right
  { name: 'React', icon: FaReact, color: '#61dafb', pos: [-5, -9, 4] },       // Mid Left (Close)
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', pos: [6, -11, -2] }, // Mid Right (Far)
  { name: 'HTML', icon: FaHtml5, color: '#E34F26', pos: [-9, -13, -5] },      // Lower Left (Far)
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6', pos: [0, -14, 5] },       // Center Low (Close)
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', pos: [9, -16, 0] },    // Bottom Right
  { name: 'n8n', icon: SiN8N, color: '#FF6B6B', pos: [-7, -18, 3] },          // Bottom Left
  { name: 'C', icon: SiC, color: '#A8B9CC', pos: [4, -19, -3] },              // Bottom Center
];

function SkillAsteroid({ skill, scene }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      // Tumble the asteroid randomly
      ref.current.rotation.x += 0.002;
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={skill.pos}>
      {/* Float animation makes it bob gently in place */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        
        <primitive 
          object={scene.clone()} 
          ref={ref}
          scale={hovered ? 1.0 : 0.8} // Pop up slightly on hover
          onClick={(e) => e.stopPropagation()}
          onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        />

        {/* THE HOLOGRAPHIC ICON & LABEL */}
        {/* 'sprite' mode helps text stick to 3D position better than 'div' */}
        <Html 
          position={[0, 1.5, 0]} // Float slightly above rock
          center 
          distanceFactor={10} 
          style={{ 
            pointerEvents: 'none', 
            transition: 'opacity 0.2s ease-in-out',
            opacity: hovered ? 1 : 0, // <--- HIDDEN UNTIL HOVER
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
          }}>
            {/* The Icon */}
            <div style={{
              color: skill.color,
              fontSize: '30px',
              filter: `drop-shadow(0 0 10px ${skill.color})`, // Glow effect
              background: 'rgba(0,0,0,0.8)',
              borderRadius: '50%',
              padding: '10px',
              border: `1px solid ${skill.color}`,
              boxShadow: `0 0 15px ${skill.color}40`
            }}>
              <skill.icon />
            </div>
            
            {/* The Name Label */}
            <span style={{
              color: '#fff',
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '12px',
              textTransform: 'uppercase',
              textShadow: '0 0 5px black',
              background: 'rgba(0,0,0,0.8)',
              padding: '4px 8px',
              borderRadius: '4px',
              border: `1px solid rgba(255,255,255,0.2)`
            }}>
              {skill.name}
            </span>
          </div>
        </Html>

      </Float>
    </group>
  );
}

function SkillAsteroids() {
  const { scene } = useGLTF('/models/asteroid.glb');

  return (
    <group>
      {SKILLS.map((skill, index) => (
        <SkillAsteroid key={index} skill={skill} scene={scene} />
      ))}
    </group>
  );
}

useGLTF.preload('/models/asteroid.glb');

export default SkillAsteroids;