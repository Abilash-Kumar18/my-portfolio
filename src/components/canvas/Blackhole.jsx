'use client';
/*
Procedural Blackhole — replaced the old Sketchfab GLB (15+ animated meshes,
several simultaneous skeletons, ~750KB download) with a lightweight, fully
procedural version:

  • Canvas-generated accretion disk texture (additive, rotating)
  • Thin hot "photon ring" just outside the event horizon
  • Solid black event-horizon sphere
  • Soft glowing halo sprite
  • Disk tilted ~86° (nearly edge-on) so orbiting matter reads as a real
    rotating black hole rather than a flat face-on wheel

Costs: 1 texture + 4 draw calls vs ~20. No GLB fetch, no animation mixer.
*/
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Radial gradient "disc" with random luminous streaks — looks like a
// glowing accretion disk when mapped onto a flat ring.
function makeDiskTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const R = size / 2;

  // Base radial gradient: transparent core -> white-hot -> orange -> fading red
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0.00, 'rgba(0,0,0,0)');
  grad.addColorStop(0.20, 'rgba(255,255,255,0.95)');
  grad.addColorStop(0.32, 'rgba(255,214,140,0.85)');
  grad.addColorStop(0.50, 'rgba(255,150,60,0.55)');
  grad.addColorStop(0.72, 'rgba(255,90,40,0.30)');
  grad.addColorStop(1.00, 'rgba(255,60,30,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Luminous streaks / dust lanes
  for (let i = 0; i < 64; i++) {
    const angle = Math.random() * Math.PI * 2;
    const inner = (0.16 + Math.random() * 0.16) * R;
    const mid = inner + (0.22 + Math.random() * 0.28) * R;
    const sweep = 0.02 + Math.random() * 0.07;
    const alpha = 0.04 + Math.random() * 0.14;
    ctx.strokeStyle = `rgba(255,222,180,${alpha})`;
    ctx.lineWidth = 0.8 + Math.random() * 2.4;
    ctx.beginPath();
    ctx.arc(cx, cy, mid, angle, angle + sweep);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  return tex;
}

// Soft radial glow used for the halo sprite
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0.0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,170,110,0.55)');
  grad.addColorStop(0.7, 'rgba(255,110,60,0.18)');
  grad.addColorStop(1.0, 'rgba(255,80,40,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Disk tilt: rotation.x goes from 0 (face-on to camera) to -PI/2 (edge-on).
// ~86° keeps the ring nearly edge-on so almost no "top" of the disk shows.
const TILT_BASE = -1.47;

export function Blackhole(props) {
  const diskRef = useRef();
  const photonRef = useRef();
  const tiltRef = useRef();

  const diskTexture = useMemo(() => makeDiskTexture(), []);
  const glowTexture = useMemo(() => makeGlowTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Matter orbiting the hole: both rings spin about the tilted disk's own
    // axis, so the streaks visibly swing around the dark sphere.
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 0.25;
    }
    if (photonRef.current) {
      photonRef.current.rotation.z += delta * 0.1;
    }
    // Gentle tilt drift so the orientation never looks frozen.
    // Base tilt sits near -1.5 (~86°, edge-on) and only wobbles a few
    // degrees — it can never drift back toward face-on.
    if (tiltRef.current && props.precession !== false) {
      tiltRef.current.rotation.x = TILT_BASE + Math.sin(t * 0.12) * 0.03;
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* HALO — subtle; a sprite always faces the camera, so keep it faint
          so it doesn't read as a bright "face-on top" of the disk */}
      <sprite scale={[7, 7, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.4}
          toneMapped={false}
        />
      </sprite>

      {/* EVENT HORIZON */}
      <mesh>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* ACCRETION DISK — tilted hard (~86°, nearly edge-on) like a real
          black hole. The ring is fixed at its tilt in the JSX; useFrame
          only wobbles it a few degrees so it never drifts toward face-on. */}
      <group ref={tiltRef} rotation={[TILT_BASE, 0, 0]}>
        <mesh ref={diskRef}>
          <ringGeometry args={[0.7, 2.3, 96, 1]} />
          <meshBasicMaterial
            map={diskTexture}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        {/* PHOTON RING — thin hot rim */}
        <mesh ref={photonRef}>
          <ringGeometry args={[0.63, 0.7, 96, 1]} />
          <meshBasicMaterial
            color="#fff6e0"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

export default Blackhole;
