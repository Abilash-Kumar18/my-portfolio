// src/components/AnimatedBackground.jsx

import React from 'react';
import styles from './AnimatedBackground.module.css';

function AnimatedBackground() {
  return (
    <div className={styles.animatedBackground}>
      <div className={styles.gradient}></div>
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
    </div>
  );
}

export default AnimatedBackground;

