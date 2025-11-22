// src/components/VideoBackground.jsx

import React from 'react';
import styles from './VideoBackground.module.css';

const VideoBackground = () => {
  return (
    <div className={styles.backgroundContainer}>
      {/* The Overlay makes the video darker so text is readable */}
      <div className={styles.overlay}></div>
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.video}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;