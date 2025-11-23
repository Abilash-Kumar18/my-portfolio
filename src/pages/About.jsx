// src/pages/About.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
// Removed AnimatedBackground import
import collegeImage from '../assets/college.webp';
import vincentPallotti from '../assets/vincent.webp';
import jayMatriculation from '../assets/Jay.webp';

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
    return () => observers.forEach((observer) => observer.disconnect());
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
    <div className={styles.about}>
      {/* PERSONAL INFO */}
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
            <strong>Address:</strong> Salem, Tamilnadu
          </div>
        </div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section
        ref={(el) => (sectionRefs.current['education'] = el)}
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible['education'] ? 'visible' : 'hidden'}
        className={styles.section}
      >
        <h2>Higher Education</h2>
        <div className={styles.education}>
          <div className={styles.collegeImageContainer}>
            <motion.img
              src={collegeImage}
              alt="KSR College"
              className={styles.collegeImage}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className={styles.eduDetails}>
            <h3>KSR College of Engineering</h3>
            <p><strong>Department:</strong> B.E Computer Science and Engineering</p>
            <p><strong>Year:</strong> 2nd Year</p>
            <p><strong>Current CGPA:</strong> 9.27</p>
          </div>
        </div>
      </motion.section>

      {/* SCHOOLS */}
      <motion.section
        ref={(el) => (sectionRefs.current['school'] = el)}
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible['school'] ? 'visible' : 'hidden'}
        className={styles.section}
      >
        <h2>School Education</h2>
        
        {/* School 1 */}
        <div className={styles.education}>
          <div className={styles.collegeImageContainer}>
            <motion.img
              src={vincentPallotti}
              alt="Vincent Pallotti School"
              className={styles.collegeImage}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className={styles.eduDetails}>
            <h3>St. Vincent Pallotti Hr Sec School</h3>
            <p><strong>Board:</strong> State Board</p>
            <p><strong>Completion:</strong> 2024 (HSC)</p>
            <p><strong>Grade:</strong> 94%</p>
          </div>
        </div>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

        {/* School 2 */}
        <div className={styles.education}>
          <div className={styles.collegeImageContainer}>
            <motion.img
              src={jayMatriculation}
              alt="Jay Matriculation School"
              className={styles.collegeImage}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className={styles.eduDetails}>
            <h3>Jay Matriculation Hr Sec School</h3>
            <p><strong>Board:</strong> State Board</p>
            <p><strong>Completion:</strong> 2022 (SSLC)</p>
            <p><strong>Grade:</strong> 88%</p>
          </div>
        </div>
      </motion.section>

      {/* ABOUT ME */}
      <motion.section
        ref={(el) => (sectionRefs.current['about'] = el)}
        variants={sectionVariants}
        initial="hidden"
        animate={isVisible['about'] ? 'visible' : 'hidden'}
        className={styles.section}
      >
        <h2>About Me</h2>
        <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '1.1em' }}>
          I am a dedicated second-year Computer Science and Engineering student at KSR College of Engineering, 
          with a focused passion for <strong style={{color: '#f5c542'}}>Generative AI</strong> and <strong style={{color: '#f5c542'}}>workflow automation</strong> (n8n). 
          My professional trajectory is oriented toward artificial intelligence, where I aim to synthesize 
          expertise in machine learning, automation engineering, and full-stack development to architect 
          transformative solutions.
        </p>
      </motion.section>
    </div>
  );
}

export default About;