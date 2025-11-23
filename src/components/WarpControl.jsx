// src/components/WarpControl.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaRadiation, FaUndo } from 'react-icons/fa';

function WarpControl({ isSuckedIn, toggleWarp }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: '30px', // Bottom Left corner
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }}>
      
      {/* The Button */}
      <motion.button
        onClick={toggleWarp}
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px #f5c542" }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: isSuckedIn ? '#ff4d4d' : 'rgba(245, 197, 66, 0.1)', // Red if sucked in, Glass Gold if normal
          border: '2px solid #f5c542',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#f5c542',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 0 10px rgba(245, 197, 66, 0.2)'
        }}
      >
        {isSuckedIn ? (
          <FaUndo size={24} style={{ color: 'white' }} />
        ) : (
          <FaRadiation size={24} className="spin-icon" />
        )}
      </motion.button>

      {/* The Label */}
      <motion.span
        initial={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        style={{
          color: '#f5c542',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: 'bold',
          textShadow: '0 0 5px black'
        }}
      >
        {isSuckedIn ? "RESTORE REALITY" : "INITIATE SINGULARITY"}
      </motion.span>

      {/* CSS for the icon spin */}
      <style>{`
        .spin-icon { animation: spin-slow 10s linear infinite; }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default WarpControl;