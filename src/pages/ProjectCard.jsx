// src/components/ProjectCard.jsx

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

function ProjectCard({ title, description, link, image, onImageClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (onImageClick && image) {
      onImageClick(image, title);
    }
  };

  return (
    <motion.div
      ref={divRef}
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* THE SPOTLIGHT EFFECT */}
      <div 
        className={styles.spotlight}
        style={{
          opacity: opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(245, 197, 66, 0.15), transparent 40%)`
        }}
      />
      
      {/* THE BORDER GLOW */}
      <div 
        className={styles.borderGlow}
        style={{
          opacity: opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(245, 197, 66, 0.6), transparent 40%)`
        }}
      />

      <div className={styles.cardContent}>
        {/* Image Section */}
        {image && (
          <div className={styles.imageContainer} onClick={handleImageClick}>
            {!imageLoaded && <div className={styles.imagePlaceholder}>Loading...</div>}
            <img 
              src={image} 
              alt={title}
              className={styles.projectImage}
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            <div className={styles.imageOverlay}>
              <span className={styles.zoomIcon}>🔍</span>
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.link}
            >
              View Project
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;