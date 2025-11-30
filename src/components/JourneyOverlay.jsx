// src/components/JourneyOverlay.jsx

import React from 'react';

function JourneyOverlay() {
  return (
    <>
      {/* --- PIXEL JOURNEY STORY --- */}
      
      {/* STAGE 1: THE BEGINNING */}
      <div style={{ position: 'absolute', top: '130vh', right: '15%', width: '350px', textAlign: 'right' }}>
        <h3 style={headingStyle}>THE BEGINNING</h3>
        <p style={descStyle}>
          My journey started with a curiosity for how things work. 
          I dove into <span style={highlight}>Python and Logic</span>, building my first scripts and solving problems.
        </p>
      </div>

      {/* STAGE 2: FULL STACK EXPANSION */}
      <div style={{ position: 'absolute', top: '230vh', left: '15%', width: '350px', textAlign: 'left' }}>
        <h3 style={headingStyle}>FULL STACK EXPANSION</h3>
        <p style={descStyle}>
          I expanded my universe into Web Development, mastering 
          <span style={highlight}> React Node.js</span>, and modern UI libraries.
        </p>
      </div>

      {/* STAGE 3: THE AI FRONTIER */}
      <div style={{ position: 'absolute', top: '350vh', right: '15%', width: '350px', textAlign: 'right' }}>
        <h3 style={headingStyle}>THE AI FRONTIER</h3>
        <p style={descStyle}>
          Now, I am exploring the event horizon of <span style={highlight}>Generative AI</span> 
          and <span style={highlight}>Workflow Automation</span>.
        </p>
      </div>


      {/* --- NAVIGATION SECTION (The Bottom) --- */}
      
      {/* THE HEADER MESSAGE */}
      <div style={{ 
        position: 'absolute', 
        top: '630vh', // Placed after the asteroid belt
        width: '100%', 
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <h2 style={{
          color: '#f5c542',
          fontSize: '3rem',
          fontFamily: '"Inter", sans-serif',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '5px',
          textShadow: '0 0 20px rgba(245, 197, 66, 0.6)',
          margin: 0
        }}>
          NAVIGATION SYSTEMS ONLINE
        </h2>
        <p style={{ color: '#fff', fontSize: '1rem', letterSpacing: '2px', opacity: 0.8 }}>
          SELECT A DESTINATION
        </p>
      </div>

      {/* NAVIGATION LABELS (Aligned with 3D Models) */}
      <div style={{ position: 'absolute', top: '670vh', width: '100%', height: '100vh' }}>
        
        {/* ABOUT LABEL (Left) */}
        <div style={{ position: 'absolute', left: '15%', top: '10%', textAlign: 'center', width: '200px' }}>
          <h4 style={navLabelStyle}>ABOUT</h4>
          <div style={navSubStyle}>IDENTITY // BIO</div>
          <div style={lineStyle}></div>
        </div>

        {/* PROJECTS LABEL (Center) */}
        <div style={{ position: 'absolute', left: '50%', top: '25%', transform: 'translateX(-50%)', textAlign: 'center', width: '200px' }}>
          <h4 style={navLabelStyle}>PROJECTS</h4>
          <div style={navSubStyle}>ARCHIVES // CODE</div>
          <div style={lineStyle}></div>
        </div>

        {/* CONTACT LABEL (Right) */}
        <div style={{ position: 'absolute', right: '15%', top: '10%', textAlign: 'center', width: '200px' }}>
          <h4 style={navLabelStyle}>CONTACT</h4>
          <div style={navSubStyle}>SIGNAL // SEND</div>
          <div style={lineStyle}></div>
        </div>

      </div>
    </>
  );
}

// --- STYLES ---
const headingStyle = {
  color: '#f5c542',
  fontSize: '2rem',
  fontFamily: '"Inter", sans-serif',
  fontWeight: '800',
  textTransform: 'uppercase',
  margin: '0 0 10px 0',
  textShadow: '0 0 10px rgba(245, 197, 66, 0.5)'
};

const descStyle = {
  color: '#e0e0e0',
  fontSize: '1.1rem',
  lineHeight: '1.6',
  fontFamily: '"Inter", sans-serif',
  background: 'rgba(0,0,0,0.6)',
  padding: '15px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  backdropFilter: 'blur(5px)'
};

const highlight = { color: '#f5c542', fontWeight: 'bold' };

const navLabelStyle = {
  color: '#fff',
  fontSize: '1.5rem',
  fontFamily: '"Inter", sans-serif',
  fontWeight: '900',
  letterSpacing: '2px',
  margin: 0,
  textShadow: '0 0 10px #f5c542'
};

const navSubStyle = {
  color: '#f5c542',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
  marginTop: '5px'
};

const lineStyle = {
  width: '2px',
  height: '30px',
  background: 'linear-gradient(to bottom, #f5c542, transparent)',
  margin: '10px auto'
};

export default JourneyOverlay;