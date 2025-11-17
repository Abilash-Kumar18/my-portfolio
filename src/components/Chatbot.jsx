// src/components/Chatbot.jsx

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import './Chatbot.module.css';

function Chatbot() {
  useEffect(() => {
    createChat({
      webhookUrl: 'http://localhost:5678/webhook/2a421af6-ac4c-45e5-8193-9193e31838e0/chat',
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
        'Hello! 👋 Welcome to my portfolio!',
        'I\'m your AI assistant here to help you learn more about this website and Abilash Kumar R.',
        'You can ask me about:',
        '• Projects and work experience',
        '• Skills and technologies',
        '• Education and background',
        '• How to get in touch',
        'What would you like to know?'
      ],
      i18n: {
        en: {
          title: 'Portfolio AI Assistant 🤖',
          subtitle: 'Ask me anything about this portfolio, projects, skills, or experience!',
          footer: 'Powered by n8n & AI',
          getStarted: 'Start Conversation',
          inputPlaceholder: 'Ask about projects, skills, or experience...',
        },
      },
      enableStreaming: false,
      theme: {
        primaryColor: '#61dafb',
        secondaryColor: '#00a8d8',
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff',
        fontFamily: 'Inter, sans-serif'
      }
    });

    // Apply custom styles after chat is created
    const applyCustomStyles = () => {
      // Remove any existing custom style
      const existingStyle = document.getElementById('n8n-chat-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }

      const style = document.createElement('style');
      style.id = 'n8n-chat-custom-styles';
      style.textContent = `
        /* Chatbot container */
        #n8n-chat {
          font-family: 'Inter', sans-serif !important;
        }
        
        /* Chat window */
        #n8n-chat [class*="window"],
        #n8n-chat [class*="chat-window"],
        #n8n-chat [class*="container"] {
          background: rgba(26, 26, 26, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(97, 218, 251, 0.2) !important;
          border-radius: 16px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Header */
        #n8n-chat [class*="header"],
        #n8n-chat [class*="title"] {
          background: linear-gradient(135deg, rgba(97, 218, 251, 0.1) 0%, rgba(0, 168, 216, 0.1) 100%) !important;
          color: #61dafb !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          border-bottom: 1px solid rgba(97, 218, 251, 0.2) !important;
        }
        
        /* Input fields */
        #n8n-chat input[type="text"],
        #n8n-chat textarea,
        #n8n-chat [class*="input"],
        #n8n-chat [class*="text-input"] {
          background: rgba(42, 42, 42, 0.8) !important;
          color: #ffffff !important;
          border: 2px solid #3e3e3e !important;
          border-radius: 8px !important;
          font-family: 'Inter', sans-serif !important;
          padding: 12px 16px !important;
          transition: all 0.3s ease !important;
        }
        
        #n8n-chat input[type="text"]:focus,
        #n8n-chat textarea:focus,
        #n8n-chat [class*="input"]:focus {
          outline: none !important;
          border-color: #61dafb !important;
          box-shadow: 0 0 0 4px rgba(97, 218, 251, 0.15) !important;
          background: rgba(42, 42, 42, 1) !important;
        }
        
        /* Buttons */
        #n8n-chat button[type="submit"],
        #n8n-chat [class*="send-button"],
        #n8n-chat [class*="submit"],
        #n8n-chat [class*="send"] {
          background: linear-gradient(135deg, #61dafb 0%, #00a8d8 100%) !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 8px !important;
          font-family: 'Inter', sans-serif !important;
          font-weight: 600 !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
        }
        
        #n8n-chat button[type="submit"]:hover,
        #n8n-chat [class*="send-button"]:hover {
          background: linear-gradient(135deg, #00a8d8 0%, #61dafb 100%) !important;
          box-shadow: 0 4px 12px rgba(97, 218, 251, 0.3) !important;
          transform: translateY(-2px) !important;
        }
        
        /* Toggle button */
        #n8n-chat [class*="toggle"],
        #n8n-chat [class*="chat-button"] {
          background: linear-gradient(135deg, #61dafb 0%, #00a8d8 100%) !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 12px rgba(97, 218, 251, 0.4) !important;
          transition: all 0.3s ease !important;
        }
        
        #n8n-chat [class*="toggle"]:hover {
          box-shadow: 0 6px 20px rgba(97, 218, 251, 0.5) !important;
          transform: scale(1.1) !important;
        }
        
        /* Messages */
        #n8n-chat [class*="message"] {
          font-family: 'Inter', sans-serif !important;
        }
        
        /* User messages */
        #n8n-chat [class*="user-message"],
        #n8n-chat [class*="user"] {
          background: rgba(97, 218, 251, 0.2) !important;
          color: #ffffff !important;
          border: 1px solid rgba(97, 218, 251, 0.3) !important;
        }
        
        /* Bot messages */
        #n8n-chat [class*="bot-message"],
        #n8n-chat [class*="assistant"] {
          background: rgba(42, 42, 42, 0.8) !important;
          color: #c0c0c0 !important;
          border: 1px solid rgba(62, 62, 62, 0.5) !important;
        }
        
        /* Scrollbar */
        #n8n-chat ::-webkit-scrollbar {
          width: 8px !important;
        }
        
        #n8n-chat ::-webkit-scrollbar-track {
          background: rgba(26, 26, 26, 0.5) !important;
          border-radius: 4px !important;
        }
        
        #n8n-chat ::-webkit-scrollbar-thumb {
          background: rgba(97, 218, 251, 0.3) !important;
          border-radius: 4px !important;
        }
        
        #n8n-chat ::-webkit-scrollbar-thumb:hover {
          background: rgba(97, 218, 251, 0.5) !important;
        }
        
        /* Links */
        #n8n-chat a {
          color: #61dafb !important;
        }
        
        #n8n-chat a:hover {
          color: #00a8d8 !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Apply styles after delays to ensure chat is fully rendered
    setTimeout(applyCustomStyles, 500);
    setTimeout(applyCustomStyles, 1000);
    setTimeout(applyCustomStyles, 2000);
  }, []);

  return <div id="n8n-chat"></div>;
}

export default Chatbot;

