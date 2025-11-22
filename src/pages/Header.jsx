// src/components/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom'; // <-- Change Import to NavLink
import styles from './Header.module.css';

function Header({ title, subtitle }) {
  return (
    <header className={styles.header}>
      
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <nav className={styles.nav}>
        {/* Use NavLink with a function to apply the active class */}
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Home
        </NavLink>

        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          About
        </NavLink>

        <NavLink 
          to="/projects" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Projects
        </NavLink>

        <NavLink 
          to="/resume" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Resume
        </NavLink>

        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? styles.active : undefined}
        >
          Contact
        </NavLink>
      </nav>

    </header>
  );
}

export default Header;