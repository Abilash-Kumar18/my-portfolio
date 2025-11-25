// src/App.jsx

import React, { useState, Suspense } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

import SpaceScene from './components/SpaceScene.jsx';
import Chatbot from './components/Chatbot.jsx';

// Content Pages
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
// Note: Profile is no longer imported here!

function App() {
  const [currentView, setCurrentView] = useState('home');

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.5 } 
    },
    exit: { opacity: 0, scale: 1.1, duration: 0.3 }
  };

  return (
    <>
      <SpaceScene currentView={currentView} setView={setCurrentView} />

      <div style={{ 
        position: 'absolute', 
        top: 0, left: 0, width: '100%', minHeight: '100vh',
        zIndex: 10,
        pointerEvents: 'none', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW: EMPTY HERE (Handled by SpaceScene Scroll) */}

          {/* ABOUT VIEW */}
          {currentView === 'about' && (
            <motion.div 
              key="about"
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ pointerEvents: 'auto', width: '90%', maxWidth: '1000px' }}
            >
              <button onClick={() => setCurrentView('home')} className="back-btn">← RETURN TO ORBIT</button>
              <About />
            </motion.div>
          )}

          {/* PROJECTS VIEW */}
          {currentView === 'projects' && (
            <motion.div 
              key="projects"
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ pointerEvents: 'auto', width: '90%' }}
            >
              <button onClick={() => setCurrentView('home')} className="back-btn">← RETURN TO ORBIT</button>
              <Projects />
            </motion.div>
          )}

          {/* CONTACT VIEW */}
          {currentView === 'contact' && (
            <motion.div 
              key="contact"
              variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ pointerEvents: 'auto', width: '90%', maxWidth: '800px' }}
            >
              <button onClick={() => setCurrentView('home')} className="back-btn">← RETURN TO ORBIT</button>
              <Contact />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <Chatbot />
      
      <style>{`
        .back-btn {
          position: fixed; top: 20px; left: 20px;
          background: rgba(0,0,0,0.7); border: 1px solid #f5c542;
          color: #f5c542; padding: 10px 20px; border-radius: 30px;
          cursor: pointer; font-weight: bold; z-index: 100;
          backdrop-filter: blur(5px); transition: all 0.3s;
        }
        .back-btn:hover { background: #f5c542; color: #000; }
      `}</style>
    </>
  );
}

export default App;