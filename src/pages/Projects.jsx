
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import ImageModal from '../components/ImageModal';
import styles from './Projects.module.css';
import AnimatedBackground from '../components/AnimatedBackground';
import googleFormFiller from '../assets/projects/Agf.png';
import n8nChatbot from '../assets/projects/n8n.png';
import krishiSakhi from '../assets/projects/Krishi.png';


const myProjects = [
  {
    title: "Google Form Auto Filler By Extension",
    description: "A sophisticated Chrome extension engineered to streamline form-filling workflows through intelligent automation. Leverages persistent storage mechanisms to maintain user profile data, enabling rapid completion of repetitive form submissions. Designed with efficiency in mind, this solution significantly reduces time investment for students and professionals managing high-volume form processes.",
    link: "https://github.com/Abilash-Kumar18/Google-Form_Filler.git",
    image: googleFormFiller 
  },
  {
    title: "RAG Chatbot For Semester Material Helper Using N8N",
    description: "An advanced conversational AI system powered by Retrieval-Augmented Generation (RAG) architecture, integrated with n8n workflow automation platform. Delivers intelligent document retrieval and contextual question-answering capabilities, enabling students to efficiently access and comprehend semester-specific educational materials through natural language interactions.",
    link: "https://abilash-kumar18.github.io/n8n_chatbot/",
    image: n8nChatbot 
  },
  {
    title: "Krishi Sakhi Website For Farmers Deployed On Streamlit Cloud",
    description: "A comprehensive agricultural technology platform designed to empower farming communities with data-driven insights. Delivers real-time weather analytics, crop management recommendations, and agricultural best practices through an intuitive web interface. Built with Python and Streamlit framework, deployed on cloud infrastructure for scalable accessibility.",
    link: "https://github.com/Abilash-Kumar18/Google-Form_Filler.git",
    image: krishiSakhi 
  }
  
];

function Projects() {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleImageClick = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalImage(null);
      setModalTitle('');
    }, 300);
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
        <div className={styles.carouselWrapper}>
          <motion.div 
            className={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* First set of cards */}
            {myProjects.map((project, index) => (
              <ProjectCard
                key={`firstSet-${index}`}
                title={project.title}
                description={project.description}
                link={project.link}
                image={project.image}
                onImageClick={handleImageClick}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {myProjects.map((project, index) => (
              <ProjectCard
                key={`secoundSet-${index}`}
                title={project.title}
                description={project.description}
                link={project.link}
                image={project.image}
                onImageClick={handleImageClick}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <ImageModal
        image={modalImage}
        title={modalTitle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

export default Projects;