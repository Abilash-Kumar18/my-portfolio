// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. Import Link
import styles from './Header.module.css';

function Header({ title, subtitle }) {
  return (
    <header className={styles.header}>
      
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* 2. Add your navigation links */}
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </nav>

    </header>
  );
}

// ... (your defaultProps are fine)

export default Header;