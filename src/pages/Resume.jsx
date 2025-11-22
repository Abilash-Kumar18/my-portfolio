// src/pages/Resume.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './Resume.module.css';
import AnimatedBackground from '../components/AnimatedBackground';

// Configure the PDF worker
// This is required for react-pdf to work without extra build configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Resume() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pdfExists, setPdfExists] = useState(false);
  
  // PDF State
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(null);

  // Use public folder for PDF
  const pdfUrl = '/resume/resume.pdf';

  useEffect(() => {
    // Check if PDF exists
    const checkPdfExists = async () => {
      try {
        const response = await fetch(pdfUrl, { method: 'HEAD' });
        if (response.ok) {
          setPdfExists(true);
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

  // Responsive PDF width
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector(`.${styles.viewerContainer}`);
      if (container) {
        // Subtract padding (40px) to fit perfectly
        const width = container.clientWidth - 40; 
        // Limit max width to avoid it looking too huge on large screens
        setPageWidth(Math.min(width, 800)); 
      }
    };

    window.addEventListener('resize', updateWidth);
    // Initial check
    setTimeout(updateWidth, 100); 

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
    setHasError(true);
  };

  const handleDownload = async () => {
    if (!pdfExists) {
      alert('Resume PDF not found. Please ensure resume.pdf is placed in the public folder.');
      return;
    }

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('PDF not found');
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
      alert('Unable to download resume.');
    }
  };

  return (
    <>
      
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
            {/* Loading State */}
            {isLoading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading resume preview...</p>
              </div>
            )}

            {/* Error State */}
            {!isLoading && (hasError || !pdfExists) && (
              <div className={styles.error}>
                <div className={styles.errorIcon}>📄</div>
                <h3>Resume Not Found</h3>
                <p>The resume PDF is currently unavailable.</p>
              </div>
            )}

            {/* PDF Document */}
            {pdfExists && (
              <div className={styles.pdfWrapper}>
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={null} // We handle our own loading spinner
                  error={null} // We handle our own error message
                >
                  <Page 
                    pageNumber={pageNumber} 
                    width={pageWidth || 600} 
                    renderTextLayer={false} // Disable text selection layer for cleaner look
                    renderAnnotationLayer={false} // Disable links overlay for cleaner look
                  />
                </Document>

                {/* Page Controls (Only show if > 1 page) */}
                {!isLoading && numPages > 1 && (
                  <div className={styles.pageControls}>
                    <button 
                      disabled={pageNumber <= 1} 
                      onClick={() => setPageNumber(prev => prev - 1)}
                    >
                      <FaChevronLeft />
                    </button>
                    <span>
                      Page {pageNumber} of {numPages}
                    </span>
                    <button 
                      disabled={pageNumber >= numPages} 
                      onClick={() => setPageNumber(prev => prev + 1)}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default Resume;