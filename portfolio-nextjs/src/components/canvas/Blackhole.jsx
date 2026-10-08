'use client';
/*
Procedural Blackhole — replaced the old Sketchfab GLB (15+ animated meshes,
several simultaneous skeletons, ~750KB download) with a lightweight, fully
procedural version:

  • Canvas-generated accretion disk texture (additive, rotating)
  • Thin hot "photon ring" just outside the event horizon
  • Solid black event-horizon sphere
  • Soft glowing halo sprite

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

export function Blackhole(props) {
  const diskRef = useRef();
  const photonRef = useRef();

  const diskTexture = useMemo(() => makeDiskTexture(), []);
  const glowTexture = useMemo(() => makeGlowTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (diskRef.current) {
      diskRef.current.rotation.z += delta * 0.22;
    }
    if (photonRef.current) {
      photonRef.current.rotation.z += delta * 0.09;
    }
    // Gentle precession so it never looks static
    if (props.precession !== false && diskRef.current) {
      diskRef.current.rotation.x = -0.12 + Math.sin(t * 0.15) * 0.05;
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* HALO */}
      <sprite scale={[7, 7, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.55}
          toneMapped={false}
        />
      </sprite>

      {/* EVENT HORIZON */}
      <mesh>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* ACCRETION DISK (tilted) */}
      <group>
        <mesh ref={diskRef} rotation={[-Math.PI / 2, 0, 0]}>
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
        <mesh ref={photonRef} rotation={[-Math.PI / 2, 0, 0]}>
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
