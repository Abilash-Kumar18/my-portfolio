// src/components/Footer.jsx

import React from 'react';
import styles from './Footer.module.css'; // We'll create this file next

function Footer() {
  const currentYear = new Date().getFullYear(); // Gets the current year automatically

  return (
    <footer className={styles.footer}>
      <p>
        &copy; {currentYear} My Portfolio. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;