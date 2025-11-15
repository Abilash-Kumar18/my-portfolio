// src/components/Profile.jsx

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Profile.module.css';

// TODO: Add your profile photo here
import profilePic from '../assets/profile.jpg'; 

// Technology logos - using CDN URLs for open source logos
const technologyLogos = {
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  C: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  'Front end': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  n8n: 'https://raw.githubusercontent.com/n8n-io/n8n/master/packages/design-system/src/assets/images/n8n-icon.svg'
};

const skills = ['Python', 'Java', 'C', 'Front end', 'n8n'];

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
      <motion.img 
        src={profilePic} 
        alt="Abilash Kumar R" 
        className={styles.pic}
        variants={profileImageVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      />
      
      <motion.h2 className={styles.name} variants={itemVariants}>
        Abilash Kumar R
      </motion.h2>
      
      <motion.p className={styles.bio} variants={itemVariants}>
        A dedicated Computer Science and Engineering student specializing in Generative AI and workflow automation. 
        Passionate about leveraging cutting-edge technologies to build intelligent solutions that drive innovation 
        and solve complex challenges in the artificial intelligence domain.
      </motion.p>

      <motion.h3 variants={itemVariants}>My Skills</motion.h3>
      <motion.ul className={styles.skills} variants={containerVariants}>
        {skills.map((skill, index) => (
          <motion.li 
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.15, rotate: 5 }}
            className={styles.skillItem}
          >
            <img 
              src={technologyLogos[skill]} 
              alt={skill}
              className={styles.techLogo}
              onError={(e) => {
                // Fallback to text if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span className={styles.techName} style={{ display: 'none' }}>{skill}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.main>
  );
}

export default Profile;