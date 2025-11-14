// src/components/ProjectCard.jsx

import React from 'react';
import styles from './ProjectCard.module.css';

function ProjectCard({ title, description, link }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {/* We only show the link if it's provided */}
      {link && (
        <a href={`{link}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
          View Project
        </a>
      )}
    </div>
  );
}

export default ProjectCard;