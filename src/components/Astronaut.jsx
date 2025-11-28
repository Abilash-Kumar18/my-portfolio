// src/components/Astronaut.jsx

import React, { useRef, useState } from 'react';
import { useGLTF, Html, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function Astronaut() {
  const { scene } = useGLTF('/models/astronaut.glb');
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  // Animation: Gentle floating space walk
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; // Slow spin
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Tilted drift
      ref.current.position.y = -2 + Math.sin(state.clock.elapsedTime) * 0.1; // Bobbing
    }
  });

  const handleChatOpen = (e) => {
    e.stopPropagation();
    // TRIGGER THE N8N CHAT
    // We look for the default n8n button and click it via code
    const toggleBtn = document.querySelector('.n8n-chat-toggle-button');
    if (toggleBtn) {
      toggleBtn.click();
    } else {
      console.warn("Chat button not found!");
    }
  };

  return (
    <group position={[4, -2, 3]}> {/* Positioned to the Right, close to camera */}
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        
        {/* GLOW ON HOVER */}
        <pointLight distance={3} intensity={hovered ? 5 : 0} color="#f5c542" />

        <primitive 
          object={scene} 
          ref={ref}
          scale={hovered ? 0.6 : 0.5} // Pops up on hover
          onClick={handleChatOpen}
          onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
        />

        {/* SPEECH BUBBLE */}
        <Html 
          position={[0, 2, 0]} 
          center 
          distanceFactor={10} 
          style={{ pointerEvents: 'none' }}
        >
          <div style={{ 
            opacity: hovered ? 1 : 0, 
            transform: hovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.8)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#000',
            padding: '8px 16px',
            borderRadius: '20px 20px 20px 0px', // Speech bubble shape
            fontFamily: '"Inter", sans-serif',
            fontWeight: 'bold',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 15px rgba(245, 197, 66, 0.5)'
          }}>
            Need Help? 🤖
          </div>
        </Html>

      </Float>
    </group>
  );
}

useGLTF.preload('/models/astronaut.glb');

export default Astronaut;