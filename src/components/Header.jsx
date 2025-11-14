// src/components/Header.jsx

import React from 'react';
import styles from './Header.module.css'; // <-- 1. Import the CSS Module

// We'll add a 'subtitle' prop too, just for fun
function Header({ title, subtitle }) {
  return (
    // 2. Use 'styles.header' for the className
    <header className={styles.header}>
      
      {/* 3. Use 'styles.title' */}
      <h1 className={styles.title}>{title}</h1>

      {/* 4. Use 'styles.subtitle' */}
      <p className={styles.subtitle}>{subtitle}</p>

    </header>
  );
}

// Let's add a default value in case a prop isn't passed
Header.defaultProps = {
  title: "My Site",
  subtitle: "Welcome to my project"
}

export default Header;