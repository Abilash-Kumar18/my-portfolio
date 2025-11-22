// src/components/ScrollArrow.jsx
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ScrollArrow() {
  return (
    <motion.div
      style={{
        marginTop: '20px',
        color: '#c0c0c0',
        fontSize: '24px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
      }}
      initial={{ y: 0 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span style={{ fontSize: '0.8em', letterSpacing: '1px' }}>Scroll</span>
      <FaChevronDown />
    </motion.div>
  );
}

export default ScrollArrow;