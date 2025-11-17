// src/pages/Resume.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import styles from './Resume.module.css';
import AnimatedBackground from '../components/AnimatedBackground';

function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pdfExists, setPdfExists] = useState(false);
  // Use public folder for PDF - place resume.pdf in public folder
  const pdfUrl = '/resume.pdf';

  useEffect(() => {
    // Check if PDF exists
    const checkPdfExists = async () => {
      try {
        const response = await fetch(pdfUrl, { method: 'HEAD' });
        if (response.ok) {
          setPdfExists(true);
          setIsLoading(false);
        } else {
          setPdfExists(false);
          setIsLoading(false);
          setHasError(true);
        }
      } catch (error) {
        console.error('Error checking PDF:', error);
        setPdfExists(false);
        setIsLoading(false);
        setHasError(true);
      }
    };
    checkPdfExists();
  }, [pdfUrl]);

  const handleDownload = async () => {
    if (!pdfExists) {
      alert('Resume PDF not found. Please ensure resume.pdf is placed in the public folder.');
      return;
    }

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('PDF not found');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Abilash_Kumar_R_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Unable to download resume. Please check if resume.pdf exists in the public folder.');
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <>
      <AnimatedBackground />
      <section className={styles.resume}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className={styles.title}>My Resume</h1>
            <motion.button
              className={styles.downloadBtn}
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className={styles.downloadIcon} />
              Download PDF
            </motion.button>
          </motion.div>

          <motion.div
            className={styles.viewerContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading resume...</p>
              </div>
            ) : hasError || !pdfExists ? (
              <div className={styles.error}>
                <div className={styles.errorIcon}>📄</div>
                <h3>Resume PDF Not Found</h3>
                <p>
                  The resume PDF file is not available. To enable the resume page:
                </p>
                <ol className={styles.instructions}>
                  <li>Create or obtain your resume PDF file</li>
                  <li>Place it in the <code>public</code> folder</li>
                  <li>Name it exactly: <code>resume.pdf</code></li>
                  <li>Refresh this page</li>
                </ol>
                <p className={styles.note}>
                  <strong>Note:</strong> The file should be located at: <code>public/resume.pdf</code>
                </p>
                {pdfExists && (
                  <motion.button
                    className={styles.downloadBtn}
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaDownload className={styles.downloadIcon} />
                    Try Download
                  </motion.button>
                )}
              </div>
            ) : (
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className={styles.pdfViewer}
                title="Resume PDF Viewer"
                onLoad={handleLoad}
                onError={handleIframeError}
              />
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default Resume;

