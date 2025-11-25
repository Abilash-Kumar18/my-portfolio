// src/components/Profile.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from "react-typed";
import styles from './Profile.module.css';
import ScrollArrow from '../components/ScrollArrow';


function Profile() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.main 
      className={styles.profile}
      initial="hidden"
      animate="visible"
    >
      {/* 1. BIG IMPACT TEXT */}
      <motion.div variants={textVariants} className={styles.heroContent}>
        <h1 className={styles.name}>
          ABILASH KUMAR R
        </h1>
        
        <div className={styles.typingWrapper}>
          <span className={styles.staticText}>IS A </span>
          <ReactTyped
            strings={[
              "FULL STACK DEV",
              "WORKFLOW ARCHITECT"
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
            className={styles.typingText}
          />
        </div>
      </motion.div>

      {/* 2. SCROLL HINT */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        style={{ position: 'absolute', bottom: '15%' }}
      >
        <p style={{ color: '#f5c542', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '10px', textTransform: 'uppercase' }}>
          
        </p>
        <ScrollArrow />
      </motion.div>
           
    </motion.main>
  );
}

export default Profile;