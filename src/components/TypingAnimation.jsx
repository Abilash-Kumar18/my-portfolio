// src/components/TypingAnimation.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './TypingAnimation.module.css';

const words = [
  { text: 'Developer', font: 'Inter' },
  { text: 'AI Enthusiast', font: 'Poppins' },
  { text: 'Student', font: 'Montserrat' },
  { text: 'Problem Solver', font: 'Inter' },
  { text: 'Innovator', font: 'Poppins' },
  { text: 'Coder', font: 'Montserrat' }
];

function TypingAnimation() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex].text;
    let timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds before deleting
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, 100);
      } else {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentWordIndex]);

  const currentWord = words[currentWordIndex];

  return (
    <span className={styles.typingContainer}>
      <span className={styles.typingText} style={{ fontFamily: currentWord.font }}>
        {displayText}
      </span>
      <motion.span
        className={styles.cursor}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        |
      </motion.span>
    </span>
  );
}

export default TypingAnimation;

