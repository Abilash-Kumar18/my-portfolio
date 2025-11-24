// src/components/EventHorizon.jsx

import React from 'react';
import { motion } from 'framer-motion';
import styles from './EventHorizon.module.css';

function EventHorizon() {
  return (
    <div className={styles.horizonWrapper}>
      <div className={styles.scene}>
        {/* The Ring spins continuously. 
           duration: 40 -> The speed of the text (Lower = Faster)
        */}
        <motion.div 
          className={styles.ring}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg className={styles.textRing} viewBox="0 0 500 500">
            <defs>
              {/* This defines the invisible circular path for the text to follow */}
              <path 
                id="circlePath" 
                d="M 250, 250 m -200, 0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0" 
              />
            </defs>
            
            <text fill="#f5c542">
              {/* textPath forces the text to curve along the circlePath defined above */}
              <textPath href="#circlePath" className={styles.textPath}>
                GENERATIVE AI • WORKFLOW AUTOMATION • FULL STACK DEVELOPER • ABILASH KUMAR R • 
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

export default EventHorizon;