// src/components/Profile.jsx

import React from 'react';
import styles from './Profile.module.css'; // We'll create this next
// You can import an image of yourself here later
// import profilePic from '../assets/profile-pic.png'; 

function Profile() {
  return (
    <main className={styles.profile}>
      {/* <img src={profilePic} alt="My Profile Picture" className={styles.pic} /> */}
      
      <h2 className={styles.name}>Abilash Kumar R</h2>
      <p className={styles.bio}>
        Welcome to my portfolio! I'm a student and developer passionate about 
        building cool things with React and AI.
      </p>

      <h3>My Skills</h3>
      <ul className={styles.skills}>
        <li>JavaScript</li>
        <li>React</li>
        <li>Python</li>
        <li>LangChain</li>
        <li>n8n</li>
      </ul>
    </main>
  );
}

export default Profile;