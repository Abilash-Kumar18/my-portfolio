'use client';
// src/pages/Projects.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ui/ProjectCard';
import ImageModal from '../components/ui/ImageModal';
import styles from './Projects.module.css';
import GithubContributions from '../components/ui/GithubContributions';

// Next.js uses public paths
const googleFormFiller = '/projects/Agf.webp';
const n8nChatbot = '/projects/n8n.webp';
const krishiSakhi = '/projects/Krishi.webp';
const vdockx = '/projects/vdockx.svg';
const campusConnect = '/projects/campusconnect.svg';
const portfolio = '/projects/portfolio.webp';

const myProjects = [
  {
    title: "V-DOCKX — Autonomous Robot Docking",
    description: "Vision-guided robot docking, collision evasion & telemetry platform. ArUco 6-DoF pose estimation with sub-centimeter PID visual servoing, MobileNet-SSD obstacle AI, GPS tracking and live smartphone video streaming — served by a FastAPI backend behind a Next.js mission-control dashboard, fully Dockerized with a 27-test suite.",
    link: "https://github.com/Abilash-Kumar18/V-DOCKX",
    image: vdockx,
    tech: ["Python", "FastAPI", "Next.js", "OpenCV", "Docker"]
  },
  {
    title: "CampusConnect — College Event Portal",
    description: "Full-stack event lifecycle platform (team hackathon · RWW-8). Scrollable event discovery, registrations with real-time capacity tracking, auto-issued digital tickets, cryptographically signed hall-QR attendance and organiser analytics — powered by React, TypeScript and Supabase with role-based access control enforced at the database level.",
    link: "https://github.com/Abilash-Kumar18/College-Event-Management",
    demo: "https://college-event-management-ashy.vercel.app",
    image: campusConnect,
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS"]
  },
  {
    title: "Google Form Auto-Filler (Chrome Extension)",
    description: "A free Chrome extension that autofills Google Forms from a saved profile — no manual field mapping required. Save your details once and breeze through repetitive forms, ideal for students and professionals who fill forms frequently.",
    link: "https://github.com/Abilash-Kumar18/Google-Form_Filler",
    image: googleFormFiller,
    tech: ["JavaScript", "Chrome APIs", "Storage API"]
  },
  {
    title: "RAG Study-Material Chatbot (n8n)",
    description: "A Retrieval-Augmented Generation chatbot that answers questions from semester study materials. Documents are indexed and retrieved through n8n workflows, delivering contextual answers grounded in the actual course content — deployed as a live web app.",
    link: "https://github.com/Abilash-Kumar18/n8n_chatbot",
    demo: "https://abilash-kumar18.github.io/n8n_chatbot/",
    image: n8nChatbot,
    tech: ["n8n", "RAG", "LLMs"]
  },
  {
    title: "Krishi Sakhi — AI Assistant for Farmers",
    description: "An AI-based farming assistant (deployed on Streamlit Cloud) that turns complicated agricultural data into simple, actionable guidance — giving farmers accessible, data-driven support for crops and farm decisions.",
    link: "https://github.com/Abilash-Kumar18/Krishi-sakhi-Innovix",
    image: krishiSakhi,
    tech: ["Python", "Streamlit", "AI"]
  },
  {
    title: "3D Interactive Portfolio",
    description: "This website. An immersive React Three Fiber space journey — scroll-driven camera flight through the cosmos, warp-transition navigation, a fully procedural black hole, and hardware-conscious 3D assets so it stays fast even on low-end devices.",
    link: "https://github.com/Abilash-Kumar18/my-portfolio",
    demo: "https://my-portfolio-theta-plum-8uceafob31.vercel.app",
    image: portfolio,
    tech: ["React", "Three.js", "Vite"]
  }
];

function Projects() {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Create 4 sets of projects for a smooth infinite loop
  const allProjects = [...myProjects, ...myProjects, ...myProjects, ...myProjects];

  return (
    <>

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
          {/* Removed the variants/stagger animation so cards appear instantly */}
          <div className={styles.container}>
            {allProjects.map((project, index) => (
              <ProjectCard
                key={`project-${index}`}
                title={project.title}
                description={project.description}
                link={project.link}
                demo={project.demo}
                tech={project.tech}
                image={project.image}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </div>
            <GithubContributions />
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
