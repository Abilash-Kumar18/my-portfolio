// src/components/Header.jsx

import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ title, subtitle }) {
  const navigate = useNavigate();
  const timerRef = useRef(null); // To store the timer ID

  // Start the timer when hovering
  const handleMouseEnter = (path) => {
    // Clear any existing timer just in case
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set a new timer for 600ms (0.6 seconds)
    timerRef.current = setTimeout(() => {
      navigate(path);
    }, 600);
  };

  // Cancel the timer if the mouse leaves before 500ms
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <header className={styles.header}>
      
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <nav className={styles.nav}>
        {['/', '/about', '/projects', '/resume', '/contact'].map((path) => {
          // Extract the name from the path (e.g., '/about' -> 'About')
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