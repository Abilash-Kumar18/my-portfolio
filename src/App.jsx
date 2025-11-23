// src/App.jsx

import { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './pages/Header.jsx';
import Footer from './pages/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import VideoBackground from './components/VideoBackground.jsx';
import BlackHoleTransition from './components/BlackHoleTransition.jsx';
import WarpControl from './components/WarpControl.jsx'; // Import the Game Button

// Import your pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Resume from './pages/Resume.jsx';

function App() {
  const location = useLocation();
  // 1. Global State for the Singularity Effect
  const [isSuckedIn, setIsSuckedIn] = useState(false);

  // 2. Animation Variants for the Whole App
  const globalVariants = {
    normal: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.34, 1.3, 0.64, 1] } // Elastic Pop Out
    },
    sucked: { 
      scale: 0, 
      opacity: 0, 
      rotate: 720, // Spin fast (2 full rotations)
      filter: "blur(10px)", // Motion blur look
      transition: { duration: 0.8, ease: "anticipate" } // Suck In
    }
  };

  return (
    <>
      {/* FIXED BACKGROUND (Never Moves) */}
      <VideoBackground />

      {/* FIXED GAME BUTTON (Always Visible) */}
      <WarpControl 
        isSuckedIn={isSuckedIn} 
        toggleWarp={() => setIsSuckedIn(!isSuckedIn)} 
      />

      {/* 3. THE WRAPPER: Everything inside this gets sucked in */}
      <motion.div
        variants={globalVariants}
        initial="normal"
        animate={isSuckedIn ? "sucked" : "normal"}
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          transformOrigin: 'center 40%', // Center of the black hole roughly
          willChange: 'transform, opacity, filter'
        }}
      >
        <Header title="Portfolio" subtitle="" textAlign="center" />

        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* We keep BlackHoleTransition here for PAGE-TO-PAGE navigation effects */}
              <Route path="/" element={<BlackHoleTransition><Home /></BlackHoleTransition>} />
              <Route path="/about" element={<BlackHoleTransition><About /></BlackHoleTransition>} />
              <Route path="/projects" element={<BlackHoleTransition><Projects /></BlackHoleTransition>} />
              <Route path="/contact" element={<BlackHoleTransition><Contact /></BlackHoleTransition>} />
              <Route path="/resume" element={<BlackHoleTransition><Resume /></BlackHoleTransition>} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        
      </motion.div>
      <Chatbot />
    </>
  );
}

export default App;