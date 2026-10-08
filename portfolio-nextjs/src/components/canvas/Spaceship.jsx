'use client';
// src/components/canvas/Spaceship.jsx
//
// The ship is rendered as a child of the *camera object*, so it is always
// inside the view frustum. This eliminates the disappearing/flickering ship
// during movement (previously hacked with a one-time `frustumCulled` patch in
// useFrame). Motion is fully damped so changes are smooth and never snap.
//
// Engine audio is loaded manually (THREE.AudioLoader) instead of drei's
// <PositionalAudio>, because drei's version throws an UNCAUGHT error when the
// audio file is missing or corrupt — which previously crashed the whole Canvas
// and black-screened the site. Here a failed load silently disables the sound.

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { SpaceshipModel } from './SpaceshipModel.jsx';
import * as THREE from 'three';

function Spaceship({ isWarping }) {
  const shipRef = useRef();
  const engineAudioRef = useRef();
  const lastScroll = useRef(0);

  // Smoothed motion state – damping removes snap/jitter during movement
  const motion = useRef({ tilt: 0, mouseX: 0, mouseY: 0, warp: 0 });

  // Parent the ship directly to the camera: always in view, zero follow latency,
  // no frustum culling, and it survives every camera transition.
  const camera = useThree((state) => state.camera);
  const scroll = useScroll();

  // --- Engine audio: load in the background, never crash on failure ---
  useEffect(() => {
    let cancelled = false;

    // The listener must live on the camera because the ship is camera-parented
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audio = new THREE.PositionalAudio(listener);
    const loader = new THREE.AudioLoader();

    loader.load(
      '/sounds/engine-loop.mp3',
      (buffer) => {
        if (cancelled) return;
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(0.5);
        audio.setRefDistance(6);
        engineAudioRef.current = audio;
      },
      undefined,
      () => {
        // File missing or un-decodable → disable engine audio quietly.
        // The site must keep running even with no sound file present.
        if (!cancelled) {
          audio.disconnect();
        }
      }
    );

    return () => {
      cancelled = true;
      if (audio.isPlaying) audio.stop();
      audio.disconnect();
      camera.remove(listener);
    };
  }, [camera]);

  // Browsers block audio before the first user interaction, so start on click
  useEffect(() => {
    const startAudio = () => {
      const audio = engineAudioRef.current;
      if (audio && !audio.isPlaying) {
        audio.play();
      }
    };
    window.addEventListener('click', startAudio);
    return () => window.removeEventListener('click', startAudio);
  }, []);

  useFrame((state, delta) => {
    const group = shipRef.current;
    if (!group) return;

    const { mouse, clock } = state;
    const time = clock.elapsedTime;

    // --- Scroll-driven tilt (subtle, clamped so it can never flip) ---
    const scrollChange = scroll.offset - lastScroll.current;
    lastScroll.current = scroll.offset;
    const targetTilt = THREE.MathUtils.clamp(scrollChange * 100, -0.25, 0.25);

    // Damp everything so the ship glides instead of snapping frame-to-frame
    const m = motion.current;
    m.tilt = THREE.MathUtils.damp(m.tilt, targetTilt, 8, delta);
    m.mouseX = THREE.MathUtils.damp(m.mouseX, mouse.x, 8, delta);
    m.mouseY = THREE.MathUtils.damp(m.mouseY, mouse.y, 8, delta);

    // Ramp warp in/out smoothly (no pop at the start/end of a transition)
    m.warp = THREE.MathUtils.damp(m.warp, isWarping ? 1 : 0, 10, delta);

    // Deterministic shake – sine waves instead of Math.random() white noise.
    // This fixes the shimmery/flickery look the ship had while moving.
    const shakeX = Math.sin(time * 60) * 0.04 * m.warp;
    const shakeY = Math.cos(time * 52) * 0.04 * m.warp;
    const shakeZ = Math.sin(time * 70) * 0.08 * m.warp;

    // --- Position (camera-local space) ---
    const bobY = -0.8 - m.tilt * 0.1;
    group.position.set(shakeX, bobY + shakeY, -2.5 + shakeZ);

    // --- Orientation (relative to the camera) ---
    group.rotation.set(
      m.mouseY * 0.2 - m.tilt,
      -m.mouseX * 0.3,
      -m.mouseX * 0.3
    );

    // --- Engine audio pitch (only if a buffer successfully loaded) ---
    const audio = engineAudioRef.current;
    if (audio) {
      const isMovingFast = Math.abs(scrollChange) > 0.0001;
      const targetRate = isWarping || isMovingFast ? 1.2 : 1.0;
      audio.setPlaybackRate(
        THREE.MathUtils.lerp(audio.playbackRate, targetRate, 0.1)
      );
    }
  });

  return (
    // Rendering the ship under the camera object keeps it permanently inside
    // the view frustum – the root cause of the ship vanishing on movement.
    <primitive object={camera}>
      <group ref={shipRef}>
        <SpaceshipModel scale={0.1} rotation={[0, Math.PI, 0]} />
        {/* Engine glow – gives the ship a readable neon core while moving */}
        <pointLight
          position={[0, 0, 1.2]}
          color="#00aaff"
          intensity={isWarping ? 6 : 2.5}
          distance={4}
        />
      </group>
    </primitive>
  );
}

export default Spaceship;
