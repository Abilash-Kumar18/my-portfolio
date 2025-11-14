// src/pages/About.jsx

import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <div className={styles.about}>
      <h2>About Me</h2>
      <p>
        This is my detailed about page! Here I can talk more about my
        journey as a developer. I am a second-year college student...
      </p>
      {/* You can add more sections here, like education, hobbies, etc. */}
    </div>
  );
}

export default About;