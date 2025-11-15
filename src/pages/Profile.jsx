// src/components/Profile.jsx

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Profile.module.css';

// TODO: Add your profile photo here
// import profilePic from '../assets/profile-pic.png'; 

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

  const skills = ['Python', 'Front end', 'Java', 'C'];

  return (
    <motion.main 
      className={styles.profile}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* TODO: Uncomment and add your profile photo path */}
      {/* <motion.img 
        src={profilePic} 
        alt="Abilash Kumar R" 
        className={styles.pic}
        variants={itemVariants}
      /> */}
      
      <motion.h2 className={styles.name} variants={itemVariants}>
        Abilash Kumar R
      </motion.h2>
      
      <motion.p className={styles.bio} variants={itemVariants}>
        I am a 2nd year B.E CSE student at KSR College of Engineering, interested in Gen AI and automation tools like n8n. I want to be in an AI-based role.
      </motion.p>

      <motion.h3 variants={itemVariants}>My Skills</motion.h3>
      <motion.ul className={styles.skills} variants={containerVariants}>
        {skills.map((skill, index) => (
          <motion.li 
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </motion.main>
  );
}

export default Profile;