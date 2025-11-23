// src/components/BlackHoleTransition.jsx

import React from 'react';
import { motion } from 'framer-motion';

const blackHoleVariants = {
  // Standard Route Entry
  initial: { scale: 0, opacity: 0, rotate: -180 },
  
  // Normal Visible State
  visible: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 1.5, ease: [0.34, 1.3, 0.64, 1] }
  },
  
  // Route Exit
  exit: { 
    scale: 0, 
    opacity: 0, 
    rotate: 180, 
    transition: { duration: 0.6, ease: "anticipate" }
  },

  // GAME MODE: Sucked In Manually
  suckedIn: {
    scale: 0,
    opacity: 0,
    rotate: 360, // Spin wildly
    transition: { duration: 0.8, ease: "anticipate" }
  }
};

// Accepts an 'isSuckedIn' prop to trigger the game effect
function BlackHoleTransition({ children, isSuckedIn = false }) {
  return (
    <motion.div
      variants={blackHoleVariants}
      initial="initial"
      // If game is active (isSuckedIn), use 'suckedIn' variant, otherwise 'visible'
      animate={isSuckedIn ? "suckedIn" : "visible"} 
      exit="exit"
style={{ 
  width: '100%', 
  transformOrigin: 'center center',
  overflow: 'hidden',
  
  // ADD THESE LINES FOR GPU ACCELERATION:
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  transform: 'translateZ(0)' 
}}
    >
      {children}
    </motion.div>
  );
}

export default BlackHoleTransition;