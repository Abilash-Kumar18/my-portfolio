# 🌌 Interactive 3D Space Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-Workflow_AI-FF6B6B?style=for-the-badge&logo=n8n&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

An immersive, responsive, 3D space-themed personal portfolio website built for **Abilash Kumar R** (Full Stack Developer & Workflow Architect). Powered by **Next.js 16 (App Router)**, **React 19**, **Three.js / React Three Fiber**, **Framer Motion**.

[🌐 Live Demo](https://my-portfolio-theta-plum-8uceafob31.vercel.app/) • [📫 Contact Me](#-contact--connect)

</div>

---

## 🚀 Key Features

- **🪐 Immersive 3D Space Scene**: Interactive orbital canvas containing dynamic GLTF models (Blackhole, Space Station, Satellites, UFOs, and Asteroid belts).
- **⚡ Camera Orbit & Warp Speed Navigation**: Smooth camera transitions with warp effects when navigating between *Orbit*, *About*, *Projects*, and *Contact* views.
- **☄️ Interactive Skill Asteroids**: Interactive 3D skill nodes floating in space with dynamic hover lighting and labels.
- **🐙 Dynamic GitHub Contributions**: Real-time GitHub contribution graph visualization.
- **📜 Personal Journey & Interactive Overlays**: Scroll-driven journey milestones and downloadable resume actions.
- **📱 Responsive & Adaptive Design**: Automatic mobile/desktop layout adaptation and adaptive DPR canvas optimization.
- **⚙️ Next.js App Router**: Server-rendered shell with metadata/SEO, while the 3D experience runs as a client component.

---

## 📁 Project Architecture

```
my-portfolio/
├── public/
│   ├── images/                # Personal & Educational Images (used by About page)
│   ├── projects/              # Project Portfolio Thumbnails
│   ├── models/                # 3D GLTF/GLB Compressed Models (blackhole, station, satellite, ufo, etc.)
│   ├── resume/                # PDF Resume Document
│   ├── sitemap.xml            # SEO Sitemap
│   └── *.svg                  # Static SVGs
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.js          # Root layout (metadata, fonts, JSON-LD, viewport)
│   │   ├── page.js            # Home route — hosts the 3D scene + view overlays ('use client')
│   │   ├── globals.css        # Global typography & base styles
│   │   └── favicon.ico
│   ├── assets/                # Source image assets
│   ├── components/            # Reusable Application Components
│   │   ├── canvas/            # Three.js / React Three Fiber 3D Canvas Components
│   │   │   ├── BackgroundUFO.jsx
│   │   │   ├── Blackhole.jsx
│   │   │   ├── PixelJourney.jsx
│   │   │   ├── Pixel_planet_1.jsx
│   │   │   ├── Planet.jsx
│   │   │   ├── Satellite.jsx
│   │   │   ├── SkillAsteroids.jsx
│   │   │   ├── SpaceScene.jsx
│   │   │   ├── Spaceship.jsx
│   │   │   ├── SpaceshipModel.jsx
│   │   │   └── Station.jsx
│   │   └── ui/                # 2D UI Widgets, Cards, Modals & Overlays
│   │       ├── Chatbot.jsx
│   │       ├── GithubContributions.jsx
│   │       ├── ImageModal.jsx & ImageModal.module.css
│   │       ├── JourneyOverlay.jsx
│   │       ├── Profile.jsx & Profile.module.css
│   │       ├── ProjectCard.jsx & ProjectCard.module.css
│   │       ├── ResumeActions.jsx
│   │       ├── ScrollArrow.jsx
│   │       └── TypingAnimation.jsx & TypingAnimation.module.css
│   ├── pages/                 # Top-Level View Components (rendered inside the 3D overlay)
│   │   ├── About.jsx & About.module.css
│   │   ├── Contact.jsx & Contact.module.css
│   │   └── Projects.jsx & Projects.module.css
│   └── utils/                 # Utility Helpers & GLTF Fix Loaders
│       └── gltfFix.js
├── .env.example               # Environment Variables Template
├── eslint.config.mjs          # ESLint (eslint-config-next)
├── jsconfig.json              # `@/*` path alias
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies & Scripts
└── README.md                  # Project Documentation
```

---

## 🛠️ Technology Stack

| Category | Technologies / Libraries |
| :--- | :--- |
| **Core Framework** | Next.js 16 (App Router), React 19 |
| **3D & Canvas** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **UI & Animations** | Framer Motion, React Icons, React Typed |
| **AI & Workflows** | n8n RAG Chatbot Integration (`@n8n/chat`) |
| **Form Handling** | EmailJS (`@emailjs/browser`) |
| **SEO** | Next.js Metadata API, JSON-LD structured data, `public/sitemap.xml` |

---

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.18 or higher) installed on your system.

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

Create a `.env.local` file in the root directory based on `.env.example`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 5. Build for Production

```bash
npm run build
npm run start
```

---

## 📬 Contact & Connect

- **Author**: Abilash Kumar R
- **GitHub**: [@Abilash-Kumar18](https://github.com/Abilash-Kumar18)
- **LinkedIn**: [Abilash Kumar](https://www.linkedin.com/in/abilashkumar-)
- **Live Portfolio**: [my-portfolio.vercel.app](https://my-portfolio-theta-plum-8uceafob31.vercel.app/)
