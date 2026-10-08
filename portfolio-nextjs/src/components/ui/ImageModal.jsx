'use client';
// src/components/ui/ImageModal.jsx

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageModal.module.css';

function ImageModal({ image, title, isOpen, onClose }) {
  
  // LOCK BODY SCROLL when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'unset'; // Re-enable scrolling
    }
    
    // Cleanup function to ensure scroll returns if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Resolve image src — handles both Next.js imported image objects and plain strings
  const imageSrc = image && typeof image === 'object' ? image.src : image;

  // Use React Portal to break out of the carousel
  // In Next.js, document is only available client-side, so we guard it
  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay} 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} 
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Close Button */}
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
            
            {imageSrc && (
              <img 
                src={imageSrc} 
                alt={title} 
                className={styles.fullImage} 
              />
            )}
            
            <div className={styles.caption}>
              <h3>{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default ImageModal;
