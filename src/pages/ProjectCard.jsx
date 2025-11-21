// src/components/ProjectCard.jsx

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

function ProjectCard({ title, description, link, image, onImageClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  const handleImageClick = () => {
    if (onImageClick && image) {
      onImageClick(image, title);
    }
  };

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {image && (
        <div 
          className={styles.imageContainer}
          onClick={handleImageClick}
        >
          {!imageLoaded && (
            <div className={styles.imagePlaceholder}>Loading...</div>
          )}
          <img 
            ref={imageRef}
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
      {!image && (
        <div className={styles.imagePlaceholder}>
          <span>Project Image</span>
        </div>
      )}
      <div className={styles.cardContent}>
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
    </motion.div>
  );
}

export default ProjectCard;