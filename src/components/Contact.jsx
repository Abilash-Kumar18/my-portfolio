

import React, { useState } from 'react'; // <-- 1. Import useState
import styles from './Contact.module.css';

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

  return (
    <section className={styles.contact}>
      <h2 className={styles.heading}>Contact Me</h2>
      <p className={styles.subtext}>
        Have a question or want to work together?
      </p>
      
      {/* 5. Connect the handler to the form's onSubmit event */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          {/* 6. Connect the input to state with 'value' and 'onChange' */}
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          {/* 6. Connect the input to state with 'value' and 'onChange' */}
          <input 
            type="email" 
            id="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          {/* 6. Connect the input to state with 'value' and 'onChange' */}
          <textarea 
            id="message" 
            name="message" 
            rows="5" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;