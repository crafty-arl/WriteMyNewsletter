'use client';

import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function Home() {
  useEffect(() => {
    createChat({
      webhookUrl: '',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'My name is Nathan. How can I assist you today?',
        'Feel free to ask me anything about our services!',
        'You can also type "help" for assistance.'
      ],
      i18n: {
        en: {
          title: 'Welcome to Our Chat!',
          subtitle: "We're here to help you 24/7. How can we assist you today?",
          footer: 'Thank you for reaching out!',
          getStarted: 'Start a New Conversation',
          inputPlaceholder: 'Type your message here...',
        },
      },
    });
  }, []);

  return (
    <div>
      <div id="n8n-chat"></div>
    </div>
  );
}
