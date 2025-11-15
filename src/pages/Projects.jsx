// src/pages/Projects.jsx

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import styles from './Projects.module.css';
import AnimatedBackground from '../components/AnimatedBackground';

// TODO: Add your project screenshots to src/assets/projects/ folder
// import googleFormFiller from '../assets/projects/google-form-filler.png';
// import n8nChatbot from '../assets/projects/n8n-chatbot.png';
// import krishiSakhi from '../assets/projects/krishi-sakhi.png';
// import portfolio from '../assets/projects/portfolio.png';

const myProjects = [
  {
    title: "Google Form Auto Filler By Extension",
    description: "A Chrome extension that automatically fills Google Forms using saved profile data. Save your details once and quickly complete multiple forms. Ideal for students and professionals who frequently fill forms.",
    link: "https://github.com/Abilash-Kumar18/Google-Form_Filler.git",
    image: null // TODO: Add image path when available
    // image: googleFormFiller
  },
  {
    title: "RAG Chatbot For Semester Material Helper Using N8N",
    description: "An intelligent chatbot built with RAG (Retrieval-Augmented Generation) technology using n8n automation platform. Helps students access semester materials and answer questions from custom documents efficiently.",
    link: "https://abilash-kumar18.github.io/n8n_chatbot/",
    image: null // TODO: Add image path when available
    // image: n8nChatbot
  },
  {
    title: "Krishi Sakhi Website For Farmers Deployed On Streamlit Cloud",
    description: "A comprehensive web application for farmers providing agricultural tips, weather information, and farming assistance. Built with Python and Streamlit, deployed on Streamlit Cloud for easy access.",
    link: "https://github.com/Abilash-Kumar18/Google-Form_Filler.git",
    image: null // TODO: Add image path when available
    // image: krishiSakhi
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Vite. Features animated backgrounds, smooth transitions, and a professional design showcasing projects and skills.",
    link: "https://69175e0b3d12ab3bde4a89d9--thunderous-pony-c152c0.netlify.app/",
    image: null // TODO: Add image path when available
    // image: portfolio
  }
];

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <AnimatedBackground />
      <section className={styles.projects}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
        <motion.div 
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {myProjects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
              image={project.image}
            />
          ))}
        </motion.div>
      </section>
    </>
  );
}

export default Projects;