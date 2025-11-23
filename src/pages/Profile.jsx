// src/components/Profile.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from "react-typed";
import styles from './Profile.module.css';
import profilePic from '../assets/profile.jpg'; // Ensure this path is correct
import TechOrbit from '../components/TechOrbit';
import ScrollArrow from '../components/ScrollArrow';

function Profile() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const profileImageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: '0 0 30px rgba(97, 218, 251, 0.5)',
      transition: { duration: 0.3 }
    }
  };

  return (
<motion.main 
      className={styles.profile}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 2. ADD THE EVENT HORIZON HERE */}
      {/* It sits behind the pic because of CSS z-index */}
      

      <div className={styles.picContainer}>
        <motion.img 
          src={profilePic} 
          alt="Abilash Kumar R" 
          className={styles.pic}
          variants={profileImageVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        />
      </div>
      
      <motion.h2 className={styles.name} variants={itemVariants}>
        Hey! This is <span className={styles.nameHighlight}>Abilash Kumar R</span>
      </motion.h2>
      
      <motion.div className={styles.typingWrapper} variants={itemVariants}>
        <span className={styles.typingPrefix}>I'm a </span>
        <ReactTyped
          strings={[
            "Problem Solver",
            "Full Stack Developer",
            "Generative AI Enthusiast",
            "Workflow Automator"
          ]}
          typeSpeed={50}
          backSpeed={30}
          loop
          className={styles.typingText}
        />
      </motion.div>
      
      <motion.p className={styles.bio} variants={itemVariants}>
        A dedicated Computer Science and Engineering student specializing in 
        Generative AI and workflow automation. Passionate about leveraging 
        cutting-edge technologies to build intelligent solutions that drive 
        innovation and solve complex challenges in the artificial intelligence 
        domain.
      </motion.p>

      {/* Replaced old static skills list with the new Orbit & Arrow */}
      <motion.div variants={itemVariants}>
        <ScrollArrow />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        viewport={{ once: true }} // Only animates in once
      >
        <TechOrbit />
      </motion.div>

    </motion.main>
  );
}

export default Profile;