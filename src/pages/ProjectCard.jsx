// src/components/ProjectCard.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

function ProjectCard({ title, description, link, image }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {image && (
        <div className={styles.imageContainer}>
          {!imageLoaded && (
            <div className={styles.imagePlaceholder}>Loading...</div>
          )}
          <img 
            src={image} 
            alt={title}
            className={styles.projectImage}
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
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