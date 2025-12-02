// src/App.jsx
import React, { useState, Suspense, lazy } from 'react'; // Added 'lazy'
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from '@react-three/drei';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpaceScene from './components/SpaceScene.jsx';
import Chatbot from './components/Chatbot.jsx';

// OPTIMIZATION: Lazy load these pages so the 3D scene loads faster
const About = lazy(() => import('./pages/About.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

function App() {
  const [currentView, setCurrentView] = useState('home');

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { duration: 0.8, delay: 0.5 } 
    },
    exit: { opacity: 0, scale: 1.1, duration: 0.3 }
  };

  return (
    <>
      <SpaceScene currentView={currentView} setView={setCurrentView} />

      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100vh',
        zIndex: 10, pointerEvents: 'none', display: 'flex',
        justifyContent: 'center', alignItems: 'center',
      }}>
        <AnimatePresence mode="wait">
          
          {/* ABOUT VIEW */}
          {currentView === 'about' && (
            <motion.div 
              key="about" variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ pointerEvents: 'auto', width: '90%', maxWidth: '1000px' }}
            >
              <button onClick={() => setCurrentView('home')} className="back-btn">← RETURN TO ORBIT</button>
              {/* Suspense is required for lazy loaded components */}
              <Suspense fallback={<div className="text-gold">Loading Data...</div>}>
                <About />
              </Suspense>
            </motion.div>
          )}
         
          {/* PROJECTS VIEW */}
          {currentView === 'projects' && (
            <motion.div 
              key="projects" variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ pointerEvents: 'auto', width: '90%' }}
            >
              <button onClick={() => setCurrentView('home')} className="back-btn">← RETURN TO ORBIT</button>
              <Suspense fallback={<div className="text-gold">Loading Projects...</div>}>
                <Projects />
              </Suspense>
            </motion.div>
          )}

          {/* CONTACT VIEW */}
          {currentView === 'contact' && (
            <motion.div 
              key="contact" variants={overlayVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{ pointerEvents: 'auto', width: '90%', maxWidth: '800px' }}
            >
              <button onClick={() => setCurrentView('home')} className="back-btn">← RETURN TO ORBIT</button>
              <Suspense fallback={<div className="text-gold">Opening Comms...</div>}>
                <Contact />
              </Suspense>
            </motion.div>
          )}
        
        </AnimatePresence>
      </div>

      <Loader 
        containerStyles={{ background: '#000000', zIndex: 99999 }}
        innerStyles={{ width: '300px', height: '10px', background: '#333' }}
        barStyles={{ background: '#f5c542', height: '100%' }}
        dataStyles={{ color: '#f5c542', fontSize: '14px', fontFamily: '"Courier New", monospace', fontWeight: 'bold' }}
      />

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
        .text-gold { color: #f5c542; font-family: monospace; text-align: center; width: 100%; }
      `}</style>
    </>
  );
}

export default App;