// src/components/TechOrbit.jsx

import React from 'react';
import styles from './TechOrbit.module.css';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiMysql, SiC } from 'react-icons/si';

const skills = [
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#007396' },
  { name: 'React', icon: FaReact, color: '#f5c542' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
];

function TechOrbit() {
  return (
    <div className={styles.orbitContainer}>
      <h3 className={styles.centerText}>My Skills</h3>
      <div className={styles.orbitRing}>
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          // Calculate position in a circle
          const angle = (360 / skills.length) * index; 
          
          return (
            <div 
              key={skill.name} 
              className={styles.orbitItem}
              style={{ '--angle': `${angle}deg`, '--color': skill.color }}
            >
              <div className={styles.iconWrapper}>
                <Icon size={30} style={{ color: skill.color }} />
                <span className={styles.tooltip}>{skill.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechOrbit;