// src/components/TechOrbit.jsx

import React, { useRef } from 'react';
import { useInView } from 'framer-motion'; // Import this
import styles from './TechOrbit.module.css';
import { FaPython, FaJava, FaHtml5, FaCss3Alt, FaReact } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiC } from 'react-icons/si';

const skills = [
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#007396' },
  { name: 'React', icon: FaReact, color: '#f5c542' }, // Gold to match theme
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'HTML', icon: FaHtml5, color: '#E34F26' },
  { name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
];

function TechOrbit() {
  const ref = useRef(null);
  // Detect if component is in view. 
  // margin: "-100px" means it triggers only when it's well onto the screen
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div ref={ref} className={styles.orbitContainer}>
      <h3 className={styles.centerText}>My Skills</h3>
      
      {/* Logic: If NOT in view, add the 'paused' class */}
      <div className={`${styles.orbitRing} ${isInView ? '' : styles.paused}`}>
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const angle = (360 / skills.length) * index; 
          
          return (
            <div 
              key={skill.name} 
              className={styles.orbitItem}
              style={{ '--angle': `${angle}deg`, '--color': skill.color }}
            >
              {/* Logic: Pause the counter-spin icons too */}
              <div className={`${styles.iconWrapper} ${isInView ? '' : styles.paused}`}>
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