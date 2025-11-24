// src/App.jsx

import React, { useState, Suspense, lazy } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './pages/Header.jsx';
import Footer from './pages/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import VideoBackground from './components/VideoBackground.jsx';
import BlackHoleTransition from './components/BlackHoleTransition.jsx';
import WrapControl from './components/WarpControl.jsx';
import SpaceScene from './components/SpaceScene.jsx';


// Lazy Import Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

// Simple Loading Spinner
const Loading = () => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    color: '#f5c542',
    fontSize: '1.5em',
    fontFamily: 'Inter, sans-serif'
  }}>
    Loading...
  </div>
);

function App() {
  const location = useLocation();
  const [isSuckedIn, setIsSuckedIn] = useState(false);

  // RENAMED VARIANTS to avoid conflict with page transitions
  const gameVariants = {
    gameNormal: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: [0.34, 1.3, 0.64, 1] } 
    },
    gameSucked: { 
      scale: 0, 
      opacity: 0, 
      rotate: 720, 
      filter: "blur(10px)", 
      transition: { duration: 0.8, ease: "anticipate" } 
    }
  };

return (
    <>
      <SpaceScene />
      \

      {/* THE ANIMATION WRAPPER */}
      <motion.div
        variants={gameVariants}
        initial="gameNormal"
        animate={isSuckedIn ? "gameSucked" : "gameNormal"}
        style={{ 
          width: '100%', 
          minHeight: '100vh',
          transformOrigin: 'center 40%',
          willChange: 'transform, opacity'
        }}
      >
        <Header title="Portfolio" subtitle="" textAlign="center" />

        <main className="main-content">
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<BlackHoleTransition> <About /> </BlackHoleTransition>} />
                <Route path="/projects" element={<BlackHoleTransition> <Projects /> </BlackHoleTransition>} />
                <Route path="/contact" element={<BlackHoleTransition> <Contact /> </BlackHoleTransition>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        <Footer />
      </motion.div> 
      {/* ^^^ CLOSED THE ANIMATION WRAPPER HERE */}
      

      {/* CHATBOT IS NOW OUTSIDE (Stays fixed to screen) */}
      {/* Pass 'isSuckedIn' if you want to hide it during the game */}
      <div style={{ opacity: isSuckedIn ? 0 : 1, transition: 'opacity 0.5s' }}>
        <WrapControl isSuckedIn={isSuckedIn} setIsSuckedIn={setIsSuckedIn} />
        
        <Chatbot />
      </div>
    </>
  );
}

export default App;