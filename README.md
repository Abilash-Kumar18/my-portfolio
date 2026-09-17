# 🌌 Interactive 3D Space Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-Workflow_AI-FF6B6B?style=for-the-badge&logo=n8n&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

An immersive, responsive, 3D space-themed personal portfolio website built for **Abilash Kumar R** (Full Stack Developer & Workflow Architect). Powered by **React 19**, **Three.js / React Three Fiber**, **Framer Motion**, and **n8n AI Workflows**.

[🌐 Live Demo](https://my-portfolio-theta-plum-8uceafob31.vercel.app/) • [📫 Contact Me](#-contact--connect)

</div>

---

## 🚀 Key Features

- **🪐 Immersive 3D Space Scene**: Interactive orbital canvas containing dynamic GLTF models (Blackhole, Space Station, Satellites, UFOs, and Asteroid belts).
- **⚡ Camera Orbit & Warp Speed Navigation**: Smooth camera transitions with warp effects when navigating between *Orbit*, *About*, *Projects*, and *Contact* views.
- **🤖 Integrated AI Chatbot**: Contextual AI assistance integrated via `@n8n/chat` and RAG workflows.
- **☄️ Interactive Skill Asteroids**: Interactive 3D skill nodes floating in space with dynamic hover lighting and labels.
- **🐙 Dynamic GitHub Contributions**: Real-time GitHub contribution graph visualization.
- **📜 Personal Journey & Interactive Overlays**: Scroll-driven journey milestones and downloadable resume actions.
- **📱 Responsive & Adaptive Design**: Automatic mobile/desktop layout adaptation and adaptive DPR canvas optimization.

---

## 📁 Project Architecture

```
my-portfolio/
├── public/
│   ├── models/                # 3D GLTF/GLB Compressed Models (blackhole, station, satellite, ufo, etc.)
│   ├── resume/                # PDF Resume Documents
│   ├── sitemap.xml            # SEO Sitemap
│   └── vite.svg               # Site Favicon
├── src/
│   ├── assets/                # Static Image & Icon Assets
│   │   ├── icons/             # Vector Graphics & Icons
│   │   ├── images/            # Personal & Educational WebP/JPG Images
│   │   └── projects/          # Project Portfolio Thumbnails
│   ├── components/            # Reusable Application Components
│   │   ├── canvas/            # Three.js / React Three Fiber 3D Canvas Components
│   │   │   ├── BackgroundUFO.jsx
│   │   │   ├── Blackhole.jsx
│   │   │   ├── Pixel_planet_1.jsx
│   │   │   ├── Planet.jsx
│   │   │   ├── Satellite.jsx
│   │   │   ├── SkillAsteroids.jsx
│   │   │   ├── SpaceScene.jsx
│   │   │   ├── Spaceship.jsx
│   │   │   ├── SpaceshipModel.jsx
│   │   │   └── Station.jsx
│   │   └── ui/                # 2D UI Widgets, Cards, Modals & Overlays
│   │       ├── Chatbot.css & Chatbot.jsx
│   │       ├── GithubContributions.jsx
│   │       ├── ImageModal.jsx & ImageModal.module.css
│   │       ├── JourneyOverlay.jsx
│   │       ├── PixelJourney.jsx
│   │       ├── Profile.jsx & Profile.module.css
│   │       ├── ProjectCard.jsx & ProjectCard.module.css
│   │       ├── ResumeActions.jsx
│   │       ├── ScrollArrow.jsx
│   │       └── TypingAnimation.jsx & TypingAnimation.module.css
│   ├── pages/                 # Top-Level Page Views
│   │   ├── About.jsx & About.module.css
│   │   ├── Contact.jsx & Contact.module.css
│   │   ├── Home.jsx
│   │   └── Projects.jsx & Projects.module.css
│   ├── utils/                 # Utility Helpers & GLTF Fix Loaders
│   │   └── gltfFix.js
│   ├── App.css & App.jsx      # Main Application Container & Route Overlay Manager
│   ├── index.css              # Global Typography & Base Styles
│   └── main.jsx               # Application Entry Point
├── .env.example               # Environment Variables Template
├── eslint.config.js           # ESLint Configuration
├── package.json               # Dependencies & Scripts
├── README.md                  # Project Documentation
└── vite.config.js             # Vite Build & Manual Chunking Config
```

---

## 🛠️ Technology Stack

| Category | Technologies / Libraries |
| :--- | :--- |
| **Core Framework** | React 19, Vite 7 |
| **3D & Canvas** | Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| **UI & Animations** | Framer Motion, React Icons, React Typed, React Bootstrap |
| **AI & Workflows** | n8n RAG Chatbot Integration (`@n8n/chat`) |
| **Form Handling** | EmailJS (`@emailjs/browser`) |
| **SEO & Build** | `vite-plugin-sitemap`, Rollup Manual Chunks Optimization |

---

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/Abilash-Kumar18/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the portfolio.

### 5. Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📬 Contact & Connect

- **Author**: Abilash Kumar R
- **GitHub**: [@Abilash-Kumar18](https://github.com/Abilash-Kumar18)
- **LinkedIn**: [Abilash Kumar](https://www.linkedin.com/in/abilashkumar-)
- **Live Portfolio**: [my-portfolio.vercel.app](https://my-portfolio-theta-plum-8uceafob31.vercel.app/)

---

<div align="center">
  <sub>Built with ❤️ by Abilash Kumar R</sub>
</div>
