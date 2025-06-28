// client/elevenlabs-redirect-to-form.js
export const handleWebhookResponse = (response) => {
  if (response.redirect_url) {
    window.location.href = response.redirect_url; // Redirects to https://jabvlabs.com/contact
  }
};

export const initializeWebhookListener = async () => {
  try {
    window.ElevenLabs.onWebhookResponse('Redirect_To_Contact_Form', handleWebhookResponse);
  } catch (error) {
    console.error('Error initializing ElevenLabs webhook:', error);
  }
};
