// src/components/Spaceship.jsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Spaceship() {
  const { scene } = useGLTF('/models/spaceship.glb');
  const shipRef = useRef();

  useFrame((state) => {
    if (!shipRef.current) return;
    const { camera, mouse } = state;

    // 1. LOCK POSITION
    shipRef.current.position.copy(camera.position);
    shipRef.current.quaternion.copy(camera.quaternion);

    // 2. OFFSET (Cockpit View)
    shipRef.current.translateZ(-2.5); 
    shipRef.current.translateY(-0.8); 

    // 3. ROTATION LOGIC (Corrected)
    // Negative X (Left Mouse) -> Positive Y Rotation (Turn Left)
    // Positive X (Right Mouse) -> Negative Y Rotation (Turn Right)
    
    // TILT UP/DOWN
    shipRef.current.rotateX(mouse.y * 0.2); 
    
    // TURN LEFT/RIGHT (Inverted logic to match cursor)
    shipRef.current.rotateY(-mouse.x * 0.3); 
    
    // BANK/ROLL (Adds realism)
    shipRef.current.rotateZ(-mouse.x * 0.2); 
  });

  return (
    <primitive object={scene} ref={shipRef} scale={0.18} />
  );
}

useGLTF.preload('/models/spaceship.glb');

export default Spaceship;