// src/pages/Contact.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import AnimatedBackground from '../components/AnimatedBackground';

function Contact() {
  // 2. Set up state for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 3. Create the submit handler
  const handleSubmit = (event) => {
    // 4. Stop the page from reloading!
    event.preventDefault();

    // Now you have the data!
    console.log("Form submitted with:");
    console.log({ name, email, message });

    // You can add logic here to send this data to a backend
    // For now, let's just alert the user and clear the form
    alert('Message sent! (Check the console)');
    setName('');
    setEmail('');
    setMessage('');
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      
      <section className={styles.contact}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>
        <motion.p 
          className={styles.subtext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          I welcome opportunities for collaboration, professional inquiries, and meaningful connections. 
          Let's discuss how we can work together to create innovative solutions.
        </motion.p>
        
        <motion.form 
          className={styles.form} 
          onSubmit={handleSubmit}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </motion.div>

          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </motion.div>

          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </motion.div>

          <motion.button 
            type="submit" 
            className={styles.submitBtn}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>
    </>
  );
}

export default Contact;