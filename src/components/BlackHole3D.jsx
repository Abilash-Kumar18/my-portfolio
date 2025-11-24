// src/components/BlackHole3D.jsx

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

function BlackHole3D(props) {
  const group = useRef();
  // Load the model
  const { scene, animations } = useGLTF('/models/blackhole.glb');
  // Extract animations
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // play EVERY animation found in the file
    Object.values(actions).forEach((action) => {
      action.reset().fadeIn(0.5).play();
    });
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/blackhole.glb');

export default BlackHole3D;