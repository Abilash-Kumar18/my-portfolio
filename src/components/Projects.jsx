// src/components/Projects.jsx

import React from 'react';
import ProjectCard from './ProjectCard.jsx'; // Import the card
import styles from './Projects.module.css';

// Let's define your project data here for now
const myProjects = [
  {
    title: "AI Farmer Chatbot",
    description: "An AI chatbot for Kerala farmers using Streamlit and Python, providing tips and weather suggestions.",
    link: "#" // Add your GitHub link here later
  },
  {
    title: "LangChain RAG Bot",
    description: "A chatbot built with LangChain, Pinecone, and n8n to answer questions from custom documents.",
    link: "https://abilash-kumar18.github.io/n8n_chatbot/"
  },
  {
    title: "Portfolio Website",
    description: "This very website, built from scratch using React and Vite.",
    link: "#"
  }
];

function Projects() {
  return (
    <section className={styles.projects}>
      <h2 className={styles.heading}>My Projects</h2>
      <div className={styles.container}>
        {/* We loop over the project data and create a card for each one */}
        {myProjects.map((project, index) => (
          <ProjectCard
            key={index} // 'key' is important for React lists
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;