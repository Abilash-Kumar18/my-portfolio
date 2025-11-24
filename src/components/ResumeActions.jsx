// src/components/ResumeActions.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye } from 'react-icons/fa';

function ResumeActions() {
  const [pdfExists, setPdfExists] = useState(false);
  const pdfUrl = '/resume/resume.pdf';

  useEffect(() => {
    const checkPdf = async () => {
      try {
        const res = await fetch(pdfUrl, { method: 'HEAD' });
        if (res.ok) setPdfExists(true);
      } catch (e) {
        console.error('Resume check failed', e);
      }
    };
    checkPdf();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Abilash_Kumar_R_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert('Unable to download resume.');
    }
  };

  const handleView = () => {
    window.open(pdfUrl, '_blank');
  };

  if (!pdfExists) return null;

  return (
    <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
      {/* DOWNLOAD BUTTON */}
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #E07A30 100%)',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          color: '#000',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(224, 122, 48, 0.3)'
        }}
      >
        <FaDownload /> Download CV
      </motion.button>

      {/* VIEW BUTTON */}
      <motion.button
        onClick={handleView}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          border: '1px solid #f5c542',
          padding: '12px 24px',
          borderRadius: '8px',
          color: '#f5c542',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <FaEye /> View Resume
      </motion.button>
    </div>
  );
}

export default ResumeActions;