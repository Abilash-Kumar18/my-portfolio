// src/components/Chatbot.jsx

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

function Chatbot() {
  useEffect(() => {
    createChat({
      webhookUrl: 'http://localhost:5678/webhook/823e83c0-17d3-44eb-bbff-55eb1e3d1be6/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {
        portfolioOwner: 'Abilash Kumar R',
        websiteInfo: 'Portfolio website showcasing projects, skills, and experience'
      },
      showWelcomeScreen: true,
      defaultLanguage: 'en',
      initialMessages: [
        'Hello! 👋 I am Abilash\'s AI Assistant.',
        'Ask me about his projects, skills, or resume!'
      ],
      i18n: {
        en: {
          title: 'Portfolio Assistant',
          subtitle: '', 
          footer: '',
          getStarted: 'Start Chat',
          inputPlaceholder: 'Type your question...',
        },
      },
    });

    const applyCustomStyles = () => {
      const existingStyle = document.getElementById('n8n-chat-custom-styles');
      if (existingStyle) existingStyle.remove();

      const style = document.createElement('style');
      style.id = 'n8n-chat-custom-styles';
      
      // Here we override the CSS variables to match your Dark + Cyan Theme
      style.textContent = `
        :root {
            /* PRIMARY ACCENT (Cyan - #61dafb) - Used for Toggle Button */
            --chat--color--primary: #61dafb;
            --chat--color--primary-shade-50: #50c5e6;
            --chat--color--primary--shade-100: #40b0d1;

            /* SECONDARY ACCENT (User Bubbles) */
            --chat--color--secondary: #61dafb;
            --chat--color-secondary-shade-50: #50c5e6;

            /* BACKGROUNDS (Dark Mode) */
            --chat--color-light:rgb(255, 255, 255); /* Bot Bubble Background */
            --chat--color-light-shade-50: #333333;
            --chat--color-light-shade-100: #444444;
            --chat--color-medium: #888888;
            --chat--color-dark: #1a1a1a; /* Header & Window Background */
            --chat--color-white:rgb(255, 255, 255); /* Text Color */
            --chat--color-disabled: #555555;
            --chat--color-typing:rgb(0, 0, 0);

            /* DIMENSIONS & SPACING */
            --chat--spacing: 1rem;
            --chat--border-radius: 12px;
            --chat--window--width: 380px;
            --chat--window--height: 600px;
            --chat--header-height: auto;
            --chat--header--padding: 15px;
        }

        /* Force Dark Theme Overrides */
        .n8n-chat-window {
            background-color: var(--chat--color-dark) !important;
            border: 1px solid #333 !important;
        }

        /* Header Styling */
        .n8n-chat-header {
            background-color: var(--chat--color-dark) !important;
            border-bottom: 1px solid #333 !important;
        }
        
        .n8n-chat-header-title {
            color: var(--chat--color--primary) !important;
            font-weight: 700 !important;
        }

        /* Bot Message (Dark Grey Bubble, White Text) */
        .n8n-chat-message-bot {
            background-color: #2a2a2a !important;
            color: #e0e0e0 !important;
            border: 1px solid #3e3e3e !important;
        }

        /* User Message (Cyan Bubble, Dark Text for contrast) */
        .n8n-chat-message-user {
            background-color: var(--chat--color--primary) !important;
            color: #000000 !important; /* Black text on Cyan is easier to read */
            font-weight: 500 !important;
        }

        /* Input Area */
        .n8n-chat-input {
            background-color: #2a2a2a !important;
            color: white !important;
            border: 1px solid #3e3e3e !important;
        }
        
        .n8n-chat-input::placeholder {
            color: #888 !important;
        }

        /* Footer/Branding Removal (Optional) */
        .n8n-chat-footer {
            display: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    setTimeout(applyCustomStyles, 100);
    setTimeout(applyCustomStyles, 1000);

  }, []);

  return <div id="n8n-chat"></div>;
}

export default Chatbot;