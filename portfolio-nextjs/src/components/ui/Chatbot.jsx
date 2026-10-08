'use client';
// src/components/ui/Chatbot.jsx

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

function Chatbot() {
  useEffect(() => {
    // createChat returns a Vue app instance — we must unmount it on cleanup,
    // otherwise React StrictMode's double-invoke stacks a second Vue app on
    // the same #n8n-chat container ("already an app instance mounted").
    const app = createChat({
      webhookUrl: 'https://ak365.app.n8n.cloud/webhook/823e83c0-17d3-44eb-bbff-55eb1e3d1be6/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: false,
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
      // Fallback theme config
      theme: {
        primaryColor: '#f5c542', 
        secondaryColor: '#E07A30',
        backgroundColor: '#1a1a1a',
        textColor: '#ff0000ff',
        fontFamily: 'Inter, sans-serif'
      }
    });

    const applyCustomStyles = () => {
      const existingStyle = document.getElementById('n8n-chat-custom-styles');
      if (existingStyle) existingStyle.remove();

      const style = document.createElement('style');
      style.id = 'n8n-chat-custom-styles';
      
      // WE USE 'body' AND '#n8n-chat' TO INCREASE SPECIFICITY (make our rules stronger)
      style.textContent = `
        /* 1. VARIABLES - Override Defaults */
:root {
\t--chat--color--primary: #ffde22ff;
\t--chat--color--primary-shade-50: #ffd118ff;
\t--chat--color--primary--shade-100: #ffb811ff;
\t--chat--color--secondary: #20b69e;
  --chat--color--third: #ff7b00ff;
\t--chat--color-secondary-shade-50: #1ca08a;
\t--chat--color-white: #ffffff;
\t--chat--color-light: #f2f4f8;
  --chat--color-black: #000000ff;
\t--chat--color-light-shade-50: #e6e9f1;
\t--chat--color-light-shade-100: #c2c5cc;
\t--chat--color-medium: #d2d4d9;
\t--chat--color-dark: #ff7b00ff;
\t
\t--chat--color-typing: #ffffffff;

\t--chat--spacing: 1rem;
\t--chat--border-radius: 0.25rem;
\t--chat--transition-duration: 0s;

\t--chat--window--width: 400px;
\t--chat--window--height: 500px;

\t--chat--header-height: 10px;
\t--chat--header--padding: var(--chat--spacing);
\t--chat--header--background: var(--chat--color-dark);
\t--chat--header--color: var(--chat--color-light);
\t--chat--header--border-top: none;
\t--chat--header--border-bottom: none;
\t--chat--heading--font-size: 2em;
\t--chat--header--color: var(--chat--color-light);
\t--chat--subtitle--font-size: inherit;
\t--chat--subtitle--line-height: 1.8;

\t--chat--textarea--height: 50px;

\t--chat--message--font-size: 1rem;
\t--chat--message--padding: var(--chat--spacing);
\t--chat--message--border-radius: var(--chat--border-radius);
\t--chat--message-line-height: 1.8;
\t--chat--message--bot--background: var(--chat--color-white);
\t--chat--message--bot--color: black;
\t--chat--message--bot--border: none;
\t--chat--message--user--background: var(--chat--color--third);
\t--chat--message--user--color: var(--chat--color-white);
  --chat--message--user--typing--color: var(--chat--color-black);
\t--chat--message--user--border: none;
\t--chat--message--pre--background: rgba(0, 0, 0, 0.05);

\t--chat--toggle--background: var(--chat--color--primary);
\t--chat--toggle--hover--background: var(--chat--color--primary-shade-50);
\t--chat--toggle--active--background: var(--chat--color--primary--shade-100);
\t--chat--toggle--color: var(--chat--color-white);
\t--chat--toggle--size: 60px;
}
      `;
      document.head.appendChild(style);
    };

    const t1 = setTimeout(applyCustomStyles, 100);
    const t2 = setTimeout(applyCustomStyles, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      const existingStyle = document.getElementById('n8n-chat-custom-styles');
      if (existingStyle) existingStyle.remove();
      // Unmount the Vue app so it can mount cleanly again (StrictMode safe)
      if (app && typeof app.unmount === 'function') {
        app.unmount();
      }
    };
  }, []);

  return <div id="n8n-chat"></div>;
}

export default Chatbot;
