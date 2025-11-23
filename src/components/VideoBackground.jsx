// src/components/VideoBackground.jsx

import React, { useState } from 'react';
import styles from './VideoBackground.module.css';

const VideoBackground = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className={styles.backgroundContainer}>
      {/* 1. The Dark Overlay (Critical for text readability) */}
      <div className={styles.overlay}></div>

      {/* 2. Poster Image (Shows instantly while video loads) */}
      {/* Take a screenshot of your video and save it as 'poster.jpg' */}
      <img 
        src="/videos/poster.jpg" 
        alt="Background"
        className={styles.poster}
        style={{ opacity: isVideoLoaded ? 0 : 1 }} // Fades out once video is ready
      />
      
      {/* 3. The Optimized Video Player */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        className={styles.video}
        onCanPlay={() => setIsVideoLoaded(true)} // Detects when ready
      >
        {/* Browser tries WebM first (Lighter/Faster) */}
        <source src="/videos/background.webm" type="video/webm" />
        
        {/* Fallback to MP4 for Safari/iPhone */}
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;