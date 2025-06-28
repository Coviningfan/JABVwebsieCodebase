// client/elevenlabs-redirect-to-form.js
import { Conversation } from '@11labs/client';

// Function to handle the webhook response
export const handleWebhookResponse = (response) => {
  if (response.redirect_url) {
    window.location.href = response.redirect_url; // Redirects to https://jabvlabs.com/contact
  }
};

// Initialize the webhook listener
export const initializeWebhookListener = async () => {
  try {
    const conversation = await Conversation.startSession({
      agentId: 'agent_01jynfyb8neqkby2q4esd71ybw', // Provided Agent ID
      clientTools: {
        Redirect_To_Contact_Form: async () => {
          handleWebhookResponse({ redirect_url: 'https://jabvlabs.com/contact' });
          return 'Redirect initiated';
        },
      },
    });
  } catch (error) {
    console.error('Error initializing ElevenLabs conversation:', error);
  }
};
