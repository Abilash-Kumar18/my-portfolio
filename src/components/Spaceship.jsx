// src/components/Spaceship.jsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
// Remove useGLTF from here, we don't need it anymore!
import { SpaceshipModel } from './SpaceshipModel.jsx' 

function Spaceship() {
  const shipRef = useRef();

  useFrame((state) => {
    if (!shipRef.current) return;
    const { camera, mouse } = state;

    // --- LOGIC ---
    // 1. Lock Position to Camera
    shipRef.current.position.copy(camera.position);
    shipRef.current.quaternion.copy(camera.quaternion);

    // 2. Offset (Put it in front of the camera)
    shipRef.current.translateZ(-2.5); 
    shipRef.current.translateY(-0.8); 

    // 3. Mouse Rotation (Cockpit Feel)
    shipRef.current.rotateX(mouse.y * 0.2); // Tilt Up/Down
    shipRef.current.rotateY(-mouse.x * 0.3); // Turn Left/Right
    shipRef.current.rotateZ(-mouse.x * 0.3); // Bank (Roll)
  });

  return (
    // WE APPLY THE REF HERE
    <group ref={shipRef}>
      {/* Scale the model down if it's huge. 
         Draco models sometimes have different default scales.
      */}
      <SpaceshipModel scale={0.1} rotation={[0, Math.PI, 0]} /> 
    </group>
  );
}

export default Spaceship;