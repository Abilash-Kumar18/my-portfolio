// src/components/EventHorizon.jsx

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './EventHorizon.module.css';

function EventHorizon() {
  const { scrollY } = useScroll();

  // Adjusted Timing: Appears smoother
  const opacity = useTransform(scrollY, [0, 150, 600, 900], [0, 1, 1, 0]);
  const scale = useTransform(scrollY, [0, 400], [0.8, 1.1]);

  // TILT: 75deg usually matches these "Gargantua" style black hole videos perfectly
  const rotateX = "75deg"; 

  return (
    <div className={styles.horizonWrapper}>
      <motion.div 
        className={styles.scene}
        style={{ opacity, scale }}
      >
        <motion.div 
          className={styles.ring}
          style={{ rotateX: rotateX }}
          animate={{ rotateZ: 360 }}
          // Slower duration because the ring is huge (moves faster at edges)
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <svg className={styles.textRing} viewBox="0 0 300 300">
            <defs>
              <path id="circlePath" d="M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0" />
            </defs>
            <text fill="#f5c542">
              <textPath href="#circlePath" className={styles.textPath} startOffset="0%">
                {/* REPEATED TEXT to fill the larger ring */}
                ABILASH KUMAR R • WORKFLOW AUTOMATION • ABILASH KUMAR R • WORKFLOW AUTOMATION • 
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EventHorizon;