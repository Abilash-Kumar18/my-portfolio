// src/components/Chatbot.jsx

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

function Chatbot() {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://ak356.app.n8n.cloud/webhook/823e83c0-17d3-44eb-bbff-55eb1e3d1be6/chat',
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
	--chat--color--primary: #ffde22ff;
	--chat--color--primary-shade-50: #ffd118ff;
	--chat--color--primary--shade-100: #ffb811ff;
	--chat--color--secondary: #20b69e;
  --chat--color--third: #ff7b00ff;
	--chat--color-secondary-shade-50: #1ca08a;
	--chat--color-white: #ffffff;
	--chat--color-light: #f2f4f8;
  --chat--color-black: #000000ff;
	--chat--color-light-shade-50: #e6e9f1;
	--chat--color-light-shade-100: #c2c5cc;
	--chat--color-medium: #d2d4d9;
	--chat--color-dark: #ff7b00ff;
	
	--chat--color-typing: #ffffffff;

	--chat--spacing: 1rem;
	--chat--border-radius: 0.25rem;
	--chat--transition-duration: 0s;

	--chat--window--width: 400px;
	--chat--window--height: 500px;

	--chat--header-height: 10px;
	--chat--header--padding: var(--chat--spacing);
	--chat--header--background: var(--chat--color-dark);
	--chat--header--color: var(--chat--color-light);
	--chat--header--border-top: none;
	--chat--header--border-bottom: none;
	--chat--header--border-bottom: none;
	--chat--header--border-bottom: none;
	--chat--heading--font-size: 2em;
	--chat--header--color: var(--chat--color-light);
	--chat--subtitle--font-size: inherit;
	--chat--subtitle--line-height: 1.8;

	--chat--textarea--height: 50px;

	--chat--message--font-size: 1rem;
	--chat--message--padding: var(--chat--spacing);
	--chat--message--border-radius: var(--chat--border-radius);
	--chat--message-line-height: 1.8;
	--chat--message--bot--background: var(--chat--color-white);
	--chat--message--bot--color: black;
	--chat--message--bot--border: none;
	--chat--message--user--background: var(--chat--color--third);
	--chat--message--user--color: var(--chat--color-white);
  --chat--message--user--typing--color: var(--chat--color-black);
	--chat--message--user--border: none;
	--chat--message--pre--background: rgba(0, 0, 0, 0.05);

	--chat--toggle--background: var(--chat--color--primary);
	--chat--toggle--hover--background: var(--chat--color--primary-shade-50);
	--chat--toggle--active--background: var(--chat--color--primary--shade-100);
	--chat--toggle--color: var(--chat--color-white);
	--chat--toggle--size: 60px;
}
      `;
      document.head.appendChild(style);
    };

    // Apply styles multiple times to ensure they catch the render
    setTimeout(applyCustomStyles, 100);
    setTimeout(applyCustomStyles, 500);
    setTimeout(applyCustomStyles, 1500);

  }, []);

  return <div id="n8n-chat"></div>;
}

export default Chatbot;