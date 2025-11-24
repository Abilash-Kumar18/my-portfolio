// src/components/TechCloud.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiC, SiN8N } from 'react-icons/si';
import styles from './TechCloud.module.css';

const skills = [
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#007396' },
  { name: 'React', icon: FaReact, color: '#f5c542' }, // Gold
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'n8n', icon: SiN8N, color: '#FF6B6B' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
];

// Helper to generate random float ranges
const randomFloat = (min, max) => Math.random() * (max - min) + min;

function TechCloud() {
  return (
    <div className={styles.cloudContainer}>
      <h3 className={styles.centerText}>My Skills</h3>
      
      <div className={styles.cloudArea}>
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          
          // Unique random animation for each icon
          const duration = randomFloat(3, 6);
          const yOffset = randomFloat(-20, 20);
          const xOffset = randomFloat(-20, 20);
          const delay = randomFloat(0, 2);

          return (
            <motion.div
              key={skill.name}
              className={styles.floatingItem}
              // The "Zero-G" drift animation
              animate={{ 
                y: [0, yOffset, 0], 
                x: [0, xOffset, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: duration, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay
              }}
              whileHover={{ 
                scale: 1.2, 
                zIndex: 10, 
                boxShadow: `0 0 25px ${skill.color}` 
              }}
              style={{ borderColor: skill.color }} // Colored border
            >
              <Icon size={32} color={skill.color} />
              <span className={styles.tooltip} style={{ color: skill.color }}>
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default TechCloud;