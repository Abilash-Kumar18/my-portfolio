// src/pages/Home.jsx

import React from 'react';
import { motion } from 'framer-motion';
import Profile from './Profile';
import AnimatedBackground from '../components/AnimatedBackground';

function Home() {
  return (
    <>
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Profile />
      </motion.div>
    </>
  );
}

export default Home;