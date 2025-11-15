// src/pages/About.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import AnimatedBackground from '../components/AnimatedBackground';

function About() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = [];
    
    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        
        observer.observe(sectionRefs.current[key]);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className={styles.about}>
        <motion.section
          ref={(el) => (sectionRefs.current['personal'] = el)}
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible['personal'] ? 'visible' : 'hidden'}
          className={styles.section}
        >
          <h2>Personal Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <strong>Name:</strong> Abilash Kumar R
            </div>
            <div className={styles.infoItem}>
              <strong>Date of Birth:</strong> 6.11.2006
            </div>
            <div className={styles.infoItem}>
              <strong>Address:</strong> Salem
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={(el) => (sectionRefs.current['education'] = el)}
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible['education'] ? 'visible' : 'hidden'}
          className={styles.section}
        >
          <h2>Education</h2>
          <div className={styles.education}>
            <h3>KSR College of Engineering, Thiruchengode</h3>
            <p><strong>Department:</strong> B.E Computer Science and Engineering</p>
            <p><strong>Year:</strong> 2nd Year</p>
            <p><strong>Current CGPA (Till 2nd Sem):</strong> 9.27</p>
          </div>
        </motion.section>

        <motion.section
          ref={(el) => (sectionRefs.current['about'] = el)}
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible['about'] ? 'visible' : 'hidden'}
          className={styles.section}
        >
          <h2>About Me</h2>
          <p>
            I am a 2nd year B.E CSE college student at KSR College of Engineering. 
            I have a strong interest in Gen AI and automation tools like n8n. 
            My goal is to pursue a career in an AI-based role, where I can leverage 
            my skills in machine learning, automation, and software development to 
            create innovative solutions. I am passionate about building projects that 
            solve real-world problems and continuously learning new technologies in 
            the field of artificial intelligence.
          </p>
        </motion.section>
      </div>
    </>
  );
}

export default About;