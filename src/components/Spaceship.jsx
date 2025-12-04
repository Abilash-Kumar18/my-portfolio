// src/components/Spaceship.jsx

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PositionalAudio } from '@react-three/drei';
import { SpaceshipModel } from './SpaceshipModel.jsx';
import * as THREE from 'three';

// 1. Accept the 'isWarping' prop
function Spaceship({ isWarping }) {
  const shipRef = useRef();
  
  // Audio Refs
  const engineAudioRef = useRef();
  const [hasInteracted, setHasInteracted] = useState(false);

  // 2. Enable Audio on first click (Browsers block auto-playing audio)
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

  useFrame((state) => {
    if (!shipRef.current) return;
    const { camera, mouse } = state;

    // --- BASE MOVEMENT ---
    shipRef.current.position.copy(camera.position);
    shipRef.current.quaternion.copy(camera.quaternion);
    
    // Normal Position
    const targetX = 0;
    const targetY = -0.8;
    const targetZ = -2.5;

    // --- 3. WARP SHAKE LOGIC ---
    // If warping, add random vibration
    const shakeX = isWarping ? (Math.random() - 0.5) * 0.1 : 0;
    const shakeY = isWarping ? (Math.random() - 0.5) * 0.1 : 0;
    const shakeZ = isWarping ? (Math.random() - 0.5) * 0.2 : 0;

    // Apply Shake + Offset
    shipRef.current.translateX(targetX + shakeX);
    shipRef.current.translateY(targetY + shakeY);
    shipRef.current.translateZ(targetZ + shakeZ);

    // --- ROTATION (Cockpit Feel) ---
    shipRef.current.rotateX(mouse.y * 0.2); 
    shipRef.current.rotateY(-mouse.x * 0.3); 
    shipRef.current.rotateZ(-mouse.x * 0.3);

    // --- 4. ENGINE AUDIO PITCH ---
    // Pitch up the engine when warping
    if (engineAudioRef.current) {
      // Normal pitch: 1.0, Warp pitch: 1.5
      const targetPlaybackRate = isWarping ? 1.5 : 1.0;
      engineAudioRef.current.setPlaybackRate(
        THREE.MathUtils.lerp(engineAudioRef.current.playbackRate, targetPlaybackRate, 0.1)
      );
    }
  });

  return (
    <group ref={shipRef}>
      <SpaceshipModel scale={0.1} rotation={[0, Math.PI, 0]} />
      
      {/* 5. ADD ENGINE SOUND */}
      {/* You need an engine.mp3 in public/sounds/ */}
      {hasInteracted && (
        <PositionalAudio
          ref={engineAudioRef}
          url="/sounds/engine-loop.mp3" // <--- Make sure this file exists!
          distance={10}
          loop
          autoplay
        />
      )}
    </group>
  );
}

export default Spaceship;