// src/components/ImageModal.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageModal.module.css';

function ImageModal({ image, title, isOpen, onClose }) {
  // Use React Portal to break out of the carousel
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay} 
          onClick={onClose}
          // Fade in the dark blurred background
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing if clicking the image box
            // The "Pop" Animation (Scale Up)
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
            
            {image && (
              <img 
                src={image} 
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