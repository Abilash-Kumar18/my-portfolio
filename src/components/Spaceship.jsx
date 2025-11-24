// src/components/Spaceship.jsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Spaceship() {
  const { scene } = useGLTF('/models/spaceship.glb');
  const shipRef = useRef();
  const engineRef = useRef();

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    const { camera, mouse, clock } = state;

    // --- 1. POSITION: LOCK TO CAMERA (The "Wingman" Logic) ---
    // We want the ship to always be in front of the camera, regardless of where it flies.
    
    // Start at camera position
    shipRef.current.position.copy(camera.position);
    shipRef.current.quaternion.copy(camera.quaternion);

    // Move it "Forward" (Z), "Down" (Y), and "Right" (X) relative to where camera is looking
    // Adjust these numbers to frame the ship nicely in the corner
    shipRef.current.translateZ(-3);   // 3 units in front of lens
    shipRef.current.translateY(-1.2); // 1.2 units down (bottom of screen)
    shipRef.current.translateX(0);    // Center

    // --- 2. ROTATION: MOUSE FOLLOW (Fixed Directions) ---
    // Mouse X (-1 to 1) -> Rotation Y (Yaw)
    // Mouse Y (-1 to 1) -> Rotation X (Pitch)
    
    // We invert the inputs to fix "Opposite" looking
    const targetRotationY = -mouse.x * 0.8;  // Negative = Follow Right
    const targetRotationX = mouse.y * 0.5;   // Positive = Follow Up
    const targetRotationZ = -mouse.x * 0.4;  // Bank/Roll into the turn

    // Apply these rotations ON TOP of the camera's rotation
    // We use a temporary Euler to smooth the movement
    shipRef.current.rotateY(targetRotationY * 0.1); // Smooth factor
    shipRef.current.rotateX(targetRotationX * 0.1);
    shipRef.current.rotateZ(targetRotationZ * 0.1);

    // Reset rotation slightly every frame to create the "Spring" back to center effect
    // (This is a simple trick to mix Camera rotation + Mouse rotation)
    shipRef.current.rotation.setFromVector3(
        new THREE.Vector3(
            shipRef.current.rotation.x * 0.95 + (camera.rotation.x + targetRotationX) * 0.05,
            shipRef.current.rotation.y * 0.95 + (camera.rotation.y + targetRotationY) * 0.05,
            shipRef.current.rotation.z * 0.95 + (camera.rotation.z + targetRotationZ) * 0.05
        )
    );

    // --- 3. IDLE ANIMATION ---
    // Subtle hover breathing
    shipRef.current.translateY(Math.sin(clock.elapsedTime * 2) * 0.05);

    // --- 4. ENGINE PULSE ---
    if (engineRef.current) {
        engineRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 15) * 1 + Math.random() * 0.5;
    }
  });

  return (
    <group ref={shipRef} scale={0.15}> {/* Reduce scale if it hits camera too close */}
      <primitive object={scene} />

      {/* Engine Lights - Attached to ship so they move with it */}
      <pointLight 
        ref={engineRef}
        position={[0, 0.5, 3.5]} // Adjust Z to find your exhaust pipe
        distance={3} 
        color="#00eaff" 
        intensity={3} 
      />
    </group>
  );
}

useGLTF.preload('/models/spaceship.glb');

export default Spaceship;