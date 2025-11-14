// src/App.jsx

// We only import what we need now
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Profile from './components/Profile.jsx' // <-- 1. IMPORT YOUR PROFILE
import ProjectCard from './components/ProjectCard.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'



function App() {
  
  // All the 'useState' and default stuff is gone!

  return (
    <>
      <Header title="Portfolio" subtitle="My React + Vite Project" />
      
      <Profile /> {/* <-- 2. USE YOUR PROFILE COMPONENT */}

      <Projects /> {/* <-- 3. USE YOUR PROJECTS COMPONENT */}

      <Contact /> {/* <-- 4. USE YOUR CONTACT COMPONENT */}

      <Footer />
    </>
  )
}

export default App