// src/components/SpaceScene.jsx

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, Html, Sparkles, ScrollControls, useScroll, Scroll, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- CORRECTED IMPORTS (Using relative paths as requested) ---
import BlackHole3D from '../components/BlackHole3D'; // Assuming these are in the same folder
import Spaceship from '../components/Spaceship';
import BackgroundUFO from '../components/BackgroundUFO';
import Profile from '../pages/Profile'; // Changed from pages to components if Profile is just a component
import SkillAsteroids from './SkillAsteroids';

// --- VIEW ANGLES ---
const VIEW_ANGLES = {
  'home':     { pos: [0, 0, 12], lookAt: [0, 0, 0] },
  'about':    { pos: [-5, -2, 6], lookAt: [-5, -3, 0] }, 
  'projects': { pos: [0, -3, 8], lookAt: [0, -5, 2] },   
  'contact':  { pos: [5, -2, 6], lookAt: [5, -3, 0] }    
};

// --- NAV MODEL COMPONENT ---
function NavModel({ position, modelPath, label, onClick, color, scale = 1, isProcedural = false }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  
  const gltf = isProcedural ? null : useGLTF(modelPath);

  useFrame((state) => {
    if(ref.current) {
      ref.current.rotation.y += hovered ? 0.03 : 0.005;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <pointLight distance={4} intensity={hovered ? 8 : 0} color={color} />

      <group 
        ref={ref}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        // Scaling logic using the passed prop
        scale={hovered ? scale * 1.2 : scale}
      >
        {isProcedural ? (
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} wireframe={true} emissive={color} emissiveIntensity={2} />
          </mesh>
        ) : (
          <primitive object={gltf.scene} />
        )}
      </group>

      <Html position={[0, -2, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div style={{ 
          opacity: hovered ? 1 : 0, 
          transform: hovered ? 'translateY(0)' : 'translateY(10px)',
          color: '#fff', fontFamily: 'Inter', fontWeight: '800', letterSpacing: '2px',
          textTransform: 'uppercase', background: `linear-gradient(135deg, ${color} 0%, #000 100%)`,
          padding: '8px 16px', borderRadius: '20px', border: `1px solid ${color}`,
          transition: 'all 0.3s ease', whiteSpace: 'nowrap', fontSize: '12px',
          boxShadow: `0 0 20px ${color}`
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

// --- CAMERA CONTROLLER ---
function CameraController({ currentView }) {
  const scroll = useScroll(); 
  
  useFrame((state, delta) => {
    if (currentView === 'home') {
      const scrollY = scroll.offset * -10; 
      
      const targetPos = new THREE.Vector3(0, scrollY, 12);
      const targetLook = new THREE.Vector3(0, scrollY - 2, 0);
      
      state.camera.position.lerp(targetPos, delta * 2);
      state.camera.lookAt(targetLook);
    } else {
      const targetConfig = VIEW_ANGLES[currentView];
      const targetPos = new THREE.Vector3(...targetConfig.pos);
      const targetLook = new THREE.Vector3(...targetConfig.lookAt);

      state.camera.position.lerp(targetPos, delta * 1.5);
      
      const cameraLookDir = new THREE.Vector3();
      state.camera.getWorldDirection(cameraLookDir);
      const desiredLookDir = new THREE.Vector3().subVectors(targetLook, state.camera.position).normalize();
      const smoothedLook = cameraLookDir.lerp(desiredLookDir, delta * 2);
      state.camera.lookAt(state.camera.position.clone().add(smoothedLook));
    }
  });
  return null;
}

// --- MAIN SCENE ---
function SpaceScene({ currentView, setView }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050505' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 2]}>
        
        <ambientLight intensity={2.0} /> 
        <pointLight position={[10, 10, 10]} intensity={3} color="#f5c542" />
        <Stars radius={300} count={1000} fade speed={1} />
        <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.5} />
        <Environment preset="city" />

        <ScrollControls pages={3} damping={0.3} enabled={currentView === 'home'}>
          
          <Scroll html style={{ width: '100%', height: '100%' }}>
            {currentView === 'home' && (
              <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Profile />
              </div>
            )}
          </Scroll>

          <Suspense fallback={null}>
            <group onClick={() => setView('home')} rotation={[0.2, 0, 0]}>
               <BlackHole3D scale={6} position={[0, 2, -15]} />
            </group>
            
            <Spaceship />
            
            <BackgroundUFO />
            <SkillAsteroids />

            {/* --- NAVIGATION MODELS (FIXED SCALE 0.5) --- */}
            
            {/* ABOUT (Left) */}
            <NavModel 
              position={[-15, -12, -15]} 
              label="ABOUT" 
              onClick={() => setView('about')} 
              color="#0088ff" 
              modelPath="/models/planet.glb" 
              scale={0.8} /* FIXED SCALE */
            />

            {/* PROJECTS (Center) */}
            <NavModel 
              position={[-12, -7, -23]} 
              label="PROJECTS" 
              onClick={() => setView('projects')} 
              color="#ff4400" 
              modelPath="/models/satellite.glb" 
              scale={0.08} /* FIXED SCALE (Was 0.09) */
            />

            {/* CONTACT (Right) */}
            <NavModel 
              position={[20, -12, -35]} 
              label="CONTACT" 
              onClick={() => setView('contact')} 
              color="#00ff88" 
              modelPath="/models/station.glb" 
              scale={0.6} /* FIXED SCALE (Was 0.8) */
            />

            <CameraController currentView={currentView} />
          </Suspense>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/planet.glb');
useGLTF.preload('/models/satellite.glb');
useGLTF.preload('/models/station.glb');
useGLTF.preload('/models/ufo.glb');

export default SpaceScene;