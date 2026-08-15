import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap' // <--- Import this

export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
        hostname: 'https://my-portfolio-theta-plum-8uceafob31.vercel.app/' // <--- REPLACE THIS with your real link
    })
  ],
})