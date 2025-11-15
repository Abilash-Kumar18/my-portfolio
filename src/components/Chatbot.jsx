// src/components/Chatbot.jsx

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

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
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'My name is Study Bot. How can I assist you today?'
      ],
      i18n: {
        en: {
          title: 'Welcome To CSE 👋',
          subtitle: "Ask Anything About the Department of Computer Science & Engineering.",
          footer: 'Thank You',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      },
      enableStreaming: false,
    });
  }, []);

  return <div id="n8n-chat"></div>;
}

export default Chatbot;

