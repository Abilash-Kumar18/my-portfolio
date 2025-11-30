// src/pages/Contact.jsx

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      'service_wzvid34',
      'template_292e9ny',
      form.current,
      '--r7IuLjsl4H_PmlT'
    )
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        alert('Message Sent Successfully!');
        e.target.reset();
      }, (error) => {
        console.log(error.text);
        setStatus('error');
        alert('Failed to send message. Please try again.');
      });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
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
          ref={form}
          className={styles.form}
          onSubmit={sendEmail}
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="user_name">Name</label>
            <input
              type="text"
              name="user_name"
              required
              placeholder="Your Name"
            />
          </motion.div>

          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              name="user_email"
              required
              placeholder="Your Email"
            />
          </motion.div>

          <motion.div className={styles.formGroup} variants={itemVariants}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Write your message..."
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            className={styles.submitBtn}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {/* --- SOCIAL LINKS SECTION --- */}
        <motion.div
          className={styles.socialContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className={styles.connectText}>Or connect with me directly:</p>
          <div className={styles.iconsWrapper}>
            <a
              href="https://github.com/Abilash-Kumar18"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/abilashkumar-"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>

      </section>
    </>
  );
}

export default Contact;