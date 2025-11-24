// src/components/Spaceship.jsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Spaceship() {
  const { scene } = useGLTF('/models/spaceship.glb');
  const shipRef = useRef();

  // Engine Light Refs (to make them pulse)
  const engineRef = useRef();

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    // 1. MOUSE FOLLOW PHYSICS
    // We use 'lerp' (Linear Interpolation) to make the movement smooth, not jerky
    const mouseX = state.mouse.x; // -1 to 1
    const mouseY = state.mouse.y; // -1 to 1

    // Rotation targets (Tilt based on mouse position)
    const targetRotationX = -mouseY * 0.5; // Tilt Up/Down
    const targetRotationY = mouseX * 0.5;  // Turn Left/Right
    const targetRotationZ = -mouseX * 0.2; // Bank (Roll) slightly when turning

    // Apply smooth rotation
    shipRef.current.rotation.x = THREE.MathUtils.lerp(shipRef.current.rotation.x, targetRotationX, 0.1);
    shipRef.current.rotation.y = THREE.MathUtils.lerp(shipRef.current.rotation.y, targetRotationY, 0.1);
    shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, targetRotationZ, 0.1);

    // 2. IDLE FLOATING (Breathing effect)
    // Uses sine wave based on time
    shipRef.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime) * 0.1;

    // 3. ENGINE PULSE
    if (engineRef.current) {
        // Random flicker effect for engines
        engineRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.5 + Math.random() * 0.5;
    }
  });

  return (
    <group ref={shipRef} position={[0, -1.5, 3]} scale={0.3}>
      {/* The 3D Model */}
      <primitive object={scene} />

      {/* ENGINE LIGHTS (Blue Ion Thrusters) */}
      {/* You might need to adjust the [x, y, z] position to match the engines of your specific model */}
      <pointLight 
        ref={engineRef}
        position={[0, 0.5, 2]} 
        distance={4} 
        color="#00eaff" 
        intensity={3} 
      />
    </group>
  );
}

useGLTF.preload('/models/spaceship.glb');

export default Spaceship;