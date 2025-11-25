// src/components/SolarSystem.jsx

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import BlackHole3D from './BlackHole3D';

// --- 1. DEFINE DESTINATIONS ---
const PLANETS = [
  { id: 'about', label: 'ABOUT ME', position: [-8, 0, 0], color: '#0088ff', camPos: [-8, 0, 4] },
  { id: 'projects', label: 'PROJECTS', position: [8, 0, 0], color: '#ff4400', camPos: [8, 0, 4] },
  { id: 'contact', label: 'CONTACT', position: [0, 3, -2], color: '#00ff88', camPos: [0, 5, 2] },
];

// --- 2. THE FLIGHT CONTROLLER ---
function FlightController({ target, setView }) {
  // Default Home Position (Looking at Black Hole)
  const defaultPos = new THREE.Vector3(0, 1, 10);
  const defaultLook = new THREE.Vector3(0, 0, 0);

  useFrame((state, delta) => {
    // Determine where to fly
    let targetPos = defaultPos;
    let lookAtPos = defaultLook;

    if (target) {
      const planet = PLANETS.find(p => p.id === target);
      if (planet) {
        targetPos = new THREE.Vector3(...planet.camPos); // Fly to front of planet
        lookAtPos = new THREE.Vector3(...planet.position); // Look at planet
      }
    }

    // Smooth Flight (Lerp)
    state.camera.position.lerp(targetPos, delta * 1.5);
    
    // Smooth Rotation (Slerp-like lookAt)
    const currentLook = new THREE.Vector3();
    state.camera.getWorldDirection(currentLook);
    const targetDirection = new THREE.Vector3().subVectors(lookAtPos, state.camera.position).normalize();
    const smoothDirection = currentLook.lerp(targetDirection, delta * 2);
    state.camera.lookAt(state.camera.position.clone().add(smoothDirection));
  });

  return null;
}

// --- 3. INTERACTIVE PLANET COMPONENT ---
// Inside src/components/SolarSystem.jsx

function Planet({ data, onClick }) {
  const ref = useRef();
  
  useFrame((state) => {
    if(ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x += 0.005;
    }
  });

  return (
    <group position={data.position}>
      <mesh 
        ref={ref} 
        onClick={() => onClick(data.id)}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        {/* Icosahedron looks techy/low-poly */}
        <icosahedronGeometry args={[1.8, 0]} /> 
        <meshStandardMaterial 
          color={data.color} 
          emissive={data.color}
          emissiveIntensity={2}
          wireframe={true} // WIREFRAME MODE makes it look like a hologram!
        />
      </mesh>
      
      {/* Inner Core Glow */}
      <mesh>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.2} />
      </mesh>

      {/* Label */}
      <Html position={[0, 2.5, 0]} center distanceFactor={15}>
        <div style={{ 
          color: data.color, 
          fontFamily: 'Inter', 
          fontWeight: '800', 
          letterSpacing: '2px',
          textShadow: `0 0 10px ${data.color}`,
          pointerEvents: 'none'
        }}>
          {data.label}
        </div>
      </Html>
    </group>
  );
}
// --- 4. MAIN SCENE ---
function SolarSystem({ currentView, setView }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050505' }}>
      <Canvas camera={{ position: [0, 1, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={5} color="#f5c542" distance={20} />
        <Stars radius={300} depth={50} count={2000} fade speed={1} />

        {/* Black Hole in Center (Home) - Clicking it resets view */}
        <group onClick={() => setView('home')}>
           {/* Re-using your existing BlackHole component */}
           <BlackHole3D scale={2} position={[0, 0, 0]} /> 
        </group>

        {/* Navigation Planets */}
        {PLANETS.map(p => (
          <Planet key={p.id} data={p} onClick={setView} />
        ))}

        {/* Controls the Camera */}
        <FlightController target={currentView === 'home' ? null : currentView} setView={setView} />
      </Canvas>
    </div>
  );
}

export default SolarSystem;