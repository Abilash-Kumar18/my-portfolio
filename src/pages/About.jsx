// src/pages/About.jsx

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import AnimatedBackground from '../components/AnimatedBackground';
import collegeImage from '../assets/college.jpg';

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
          ref={(el) => (sectionRefs.current['school'] = el)}
          variants={sectionVariants}
          initial="hidden"
          animate={isVisible['school'] ? 'visible' : 'hidden'}
          className={styles.section}
        >
          <h2>School Education</h2>
          <div className={styles.education}>
            <h3>Higher Secondary School</h3>
            <p><strong>School:</strong> [Your School Name]</p>
            <p><strong>Board:</strong> [Board Name - e.g., State Board/CBSE]</p>
            <p><strong>Year of Completion:</strong> [Year]</p>
            <p><strong>Percentage/Grade:</strong> [Percentage or Grade]</p>
          </div>
          <div className={styles.education}>
            <h3>Secondary School</h3>
            <p><strong>School:</strong> [Your School Name]</p>
            <p><strong>Board:</strong> [Board Name - e.g., State Board/CBSE]</p>
            <p><strong>Year of Completion:</strong> [Year]</p>
            <p><strong>Percentage/Grade:</strong> [Percentage or Grade]</p>
          </div>
        </motion.section>

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
                alt="KSR College of Engineering"
                className={styles.collegeImage}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
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
            I am a dedicated second-year Computer Science and Engineering student at KSR College of Engineering, 
            with a focused passion for Generative AI and workflow automation technologies, particularly n8n. 
            My professional trajectory is oriented toward artificial intelligence, where I aim to synthesize 
            expertise in machine learning, automation engineering, and full-stack development to architect 
            transformative solutions. I am committed to developing projects that address tangible challenges 
            and maintain a continuous learning mindset, staying current with emerging innovations in the 
            artificial intelligence ecosystem.
          </p>
        </motion.section>
      </div>
    </>
  );
}

export default About;