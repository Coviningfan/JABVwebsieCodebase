import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabaseService } from "./supabase-service";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint - now using Supabase
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validationResult = insertContactSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: validationResult.error.errors,
        });
      }

      const { name, email, phone, projectType, message } = validationResult.data;
      
      // Submit to Supabase edge function
      const result = await supabaseService.submitContact({
        name,
        email,
        phone,
        projectType,
        message,
      });

      if (result.success) {
        res.json({
          success: true,
          message: "Thank you for your message. We'll get back to you within 24 hours.",
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    }
  });

  // ElevenLabs redirect endpoint
// server/routes.ts - Updated ElevenLabs endpoint
app.post("/api/elevenlabs-redirect", async (req, res) => {
  try {
    console.log('ElevenLabs webhook received:', JSON.stringify(req.body, null, 2));
    
    // ElevenLabs sends the webhook data in a specific format
    const { tool_name, tool_id, conversation_id, parameters } = req.body;
    
    // The redirect tool typically sends these parameters
    if (tool_name === 'Redirect_To_Contact_Form' || tool_id === 'Redirect_To_Contact_Form') {
      // Return the expected response format for ElevenLabs
      return res.json({
        success: true,
        redirect_url: "https://jabvlabs.com/contact",
        message: "Redirecting to contact form"
      });
    }
    
    // Handle other tools if needed
    return res.status(400).json({
      success: false,
      error: "Unknown tool requested",
      tool_name: tool_name || 'not provided'
    });
    
  } catch (error) {
    console.error('ElevenLabs webhook error:', error);
    // ElevenLabs expects a specific error format
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
      details: "Failed to process webhook request"
    });
  }
});

// server/supabase-service.ts - Updated method
async handleElevenLabsRedirect(webhookData: any): Promise<SupabaseResponse> {
  try {
    // Log the webhook data for debugging
    console.log('Processing ElevenLabs webhook:', webhookData);
    
    // You can optionally log this to Supabase for analytics
    if (this.baseUrl && this.apiKey) {
      await fetch(`${this.baseUrl}/functions/v1/webhook-log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'apikey': this.apiKey,
        },
        body: JSON.stringify({
          source: 'elevenlabs',
          data: webhookData,
          timestamp: new Date().toISOString()
        }),
      }).catch(err => console.error('Failed to log webhook:', err));
    }
    
    return {
      success: true,
      message: 'Webhook processed successfully',
      data: {
        redirect_url: "https://jabvlabs.com/contact",
        processed: true
      }
    };
  } catch (error) {
    console.error('Supabase webhook processing error:', error);
    return {
      success: false,
      message: 'Failed to process webhook',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// client/elevenlabs-redirect-to-form.js - Updated to handle the response properly
export const handleWebhookResponse = (response) => {
  console.log('ElevenLabs webhook response:', response);
  
  // Handle different response formats
  if (response && response.redirect_url) {
    window.location.href = response.redirect_url;
  } else if (response && response.data && response.data.redirect_url) {
    window.location.href = response.data.redirect_url;
  } else {
    console.error('No redirect URL in response:', response);
    // Fallback redirect
    window.location.href = 'https://jabvlabs.com/contact';
  }
};

export const initializeWebhookListener = async () => {
  try {
    if (window.ElevenLabs && window.ElevenLabs.onWebhookResponse) {
      window.ElevenLabs.onWebhookResponse('Redirect_To_Contact_Form', handleWebhookResponse);
      console.log('ElevenLabs webhook listener initialized');
    } else {
      console.warn('ElevenLabs SDK not loaded yet, retrying...');
      // Retry after a delay if the SDK isn't loaded
      setTimeout(initializeWebhookListener, 1000);
    }
  } catch (error) {
    console.error('Error initializing ElevenLabs webhook:', error);
  }
};

  // Test endpoint to verify your webhook is accessible
app.get("/api/elevenlabs-redirect/test", (req, res) => {
  res.json({
    status: "ok",
    message: "ElevenLabs webhook endpoint is active",
    timestamp: new Date().toISOString(),
    expected_format: {
      tool_name: "Redirect_To_Contact_Form",
      tool_id: "string",
      conversation_id: "string",
      parameters: {}
    }
  });
});

// Log all incoming webhooks for debugging
app.post("/api/webhooks/debug", (req, res) => {
  console.log('=== Webhook Debug ===');
  console.log('Headers:', req.headers);
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Query:', req.query);
  console.log('===================');
  
  res.json({
    received: true,
    timestamp: new Date().toISOString(),
    body: req.body
  });
});
