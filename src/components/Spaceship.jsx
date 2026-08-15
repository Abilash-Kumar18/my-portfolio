// src/components/Spaceship.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PositionalAudio, useScroll } from '@react-three/drei';
import { SpaceshipModel } from './SpaceshipModel.jsx';
import * as THREE from 'three';

function Spaceship({ isWarping }) {
  const shipRef = useRef();
  const cullingFixed = useRef(false);
  const engineAudioRef = useRef();
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastScroll = useRef(0);

  const scroll = useScroll();

  useEffect(() => {
    const startAudio = () => {
      setHasInteracted(true);
      if (engineAudioRef.current && !engineAudioRef.current.isPlaying) {
        engineAudioRef.current.play();
      }
    };
    window.addEventListener('click', startAudio);
    return () => window.removeEventListener('click', startAudio);
  }, []);

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    // --- Culling Fix ---
    if (!cullingFixed.current) {
      let foundMesh = false;
      shipRef.current.traverse((child) => {
        if (child.isMesh) {
          child.frustumCulled = false;
          foundMesh = true;
        }
      });
      if (foundMesh) cullingFixed.current = true;
    }

    const { camera, mouse } = state;

    // --- BASE POSITION ---
    shipRef.current.position.copy(camera.position);
    shipRef.current.quaternion.copy(camera.quaternion);

    // --- 1. CALCULATE TILT (SUBTLE VERSION) ---
    const scrollChange = scroll.offset - lastScroll.current;
    lastScroll.current = scroll.offset;

    // Reduced multiplier from 500 -> 100 for subtle movement
    let tiltStrength = scrollChange * 100; 
    
    // SAFETY CLAMP: Limit tilt to roughly 15 degrees (0.25 radians) max
    // This prevents the ship from flipping over if you scroll super fast
    tiltStrength = THREE.MathUtils.clamp(tiltStrength, -0.25, 0.25);

    // --- DYNAMIC POSITION ---
    // Slight vertical bob when moving (scaled down)
    const targetY = -0.8 - (tiltStrength * 0.1); 
    const targetZ = -2.5;

    // --- WARP SHAKE ---
    const shakeX = isWarping ? (Math.random() - 0.5) * 0.1 : 0;
    const shakeY = isWarping ? (Math.random() - 0.5) * 0.1 : 0;
    const shakeZ = isWarping ? (Math.random() - 0.5) * 0.2 : 0;

    shipRef.current.translateX(0 + shakeX);
    shipRef.current.translateY(targetY + shakeY);
    shipRef.current.translateZ(targetZ + shakeZ);

    // --- ROTATION ---
    const mouseTiltX = mouse.y * 0.2;
    const mouseTiltY = -mouse.x * 0.3;
    const mouseRoll = -mouse.x * 0.3;

    // Apply the subtle tilt
    shipRef.current.rotateX(mouseTiltX - tiltStrength); 
    shipRef.current.rotateY(mouseTiltY);
    shipRef.current.rotateZ(mouseRoll);

    // --- ENGINE AUDIO ---
    if (engineAudioRef.current) {
      const isMovingFast = Math.abs(scrollChange) > 0.0001;
      const targetPlaybackRate = isWarping || isMovingFast ? 1.2 : 1.0; // Reduced pitch spike too
      engineAudioRef.current.setPlaybackRate(
        THREE.MathUtils.lerp(engineAudioRef.current.playbackRate, targetPlaybackRate, 0.1)
      );
    }
  }, 0);

  const [audioError, setAudioError] = useState(false);

  return (
    <group ref={shipRef}>
      <SpaceshipModel scale={0.1} rotation={[0, Math.PI, 0]} />
      {hasInteracted && !audioError && (
        <PositionalAudio
          ref={engineAudioRef}
          url="/sounds/engine-loop.mp3"
          distance={10}
          loop
          autoplay
          onError={() => setAudioError(true)}
        />
      )}
    </group>
  );
}

export default Spaceship;