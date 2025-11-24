// src/components/Header.jsx

import React, { useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './Header.module.css';

// --- 1. THE MAGNETIC LETTER COMPONENT ---
// This handles the physics for a single character
const MagneticLetter = ({ children }) => {
  const ref = useRef(null);
  
  // Motion values for X and Y offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics: Low damping = bouncy, High stiffness = snappy
  const springConfig = { damping: 10, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      // Find center of this specific letter
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from mouse to letter
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // "Repulsion Radius": Only move if mouse is within 80px
      if (distance < 80) {
        // Strength of repulsion (closer = stronger push)
        const force = (80 - distance) / 80; 
        
        // Move AWAY from mouse (Negative multiplier)
        // Multiply by 30 to determine max pixel movement
        x.set(distanceX * -1 * force * 0.8);
        y.set(distanceY * -1 * force * 0.8);
      } else {
        // Snap back to original position
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      style={{ 
        x: springX, 
        y: springY, 
        display: 'inline-block', // Essential for transform to work on spans
        willChange: 'transform'  // Optimization
      }}
    >
      {children}
    </motion.span>
  );
};

// --- 2. MAIN HEADER COMPONENT ---
function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Navigation Hover Logic
  const handleMouseEnter = (path) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      navigate(path);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <header className={styles.header}>
      
      <div className={styles.headerContent}>
        {/* Split the title into individual letters */}
        <h1 className={styles.title}>
          {title.split("").map((letter, index) => (
            <MagneticLetter key={index}>
              {letter === " " ? "\u00A0" : letter}
            </MagneticLetter>
          ))}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <nav className={styles.nav}>
        {['/','/about','/projects','/contact'].map((path) => {
          const name = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
          return (
            <NavLink 
              key={path}
              to={path} 
              className={({ isActive }) => isActive ? styles.active : undefined}
              onMouseEnter={() => handleMouseEnter(path)}
              onMouseLeave={handleMouseLeave}
            >
              {name}
            </NavLink>
          );
        })}
      </nav>

    </header>
  );
}

export default Header;