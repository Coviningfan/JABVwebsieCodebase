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

  // ElevenLabs redirect endpoint - Enhanced for proper response format
  app.post("/api/elevenlabs-redirect", async (req, res) => {
    try {
      console.log('ElevenLabs webhook received:', JSON.stringify(req.body, null, 2));
      
      // Add CORS headers for ElevenLabs
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // ElevenLabs sends different data format than expected
      const { action, tool_name, conversation_id } = req.body;
      
      // Handle different possible action formats
      const actionToProcess = action || tool_name || 'redirect-contact';
      
      // Log the redirect action for analytics
      const redirectData = {
        action: actionToProcess,
        conversation_id: conversation_id || 'unknown',
        timestamp: new Date().toISOString(),
        user_agent: req.headers['user-agent'],
        source: 'elevenlabs'
      };

      console.log('Processing ElevenLabs redirect:', redirectData);

      // Return the specific response format that ElevenLabs expects
      const response = {
        success: true,
        message: "Redirect to contact form initiated successfully",
        redirect_url: "https://jabvlabs.com/contact",
        action_taken: "redirect-contact",
        timestamp: new Date().toISOString(),
        // ElevenLabs expects this specific tool_response structure
        tool_response: {
          status: "completed",
          redirect_url: "https://jabvlabs.com/contact",
          message: "User will be redirected to the JABV Labs contact form for a personalized consultation.",
          data: {
            url: "https://jabvlabs.com/contact",
            action: "redirect",
            success: true
          }
        }
      };

      res.json(response);

    } catch (error) {
      console.error('ElevenLabs redirect error:', error);
      
      // Return error response in the format ElevenLabs expects
      const errorResponse = {
        success: false,
        error: "Internal server error",
        message: error.message || "Failed to process redirect request",
        tool_response: {
          status: "failed",
          error: error.message || "Unknown error occurred"
        }
      };

      res.status(500).json(errorResponse);
    }
  });

  // CORS preflight handler for ElevenLabs
  app.options("/api/elevenlabs-redirect", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });

  // Test endpoint for ElevenLabs debugging
  app.get("/api/elevenlabs-redirect/test", (req, res) => {
    res.json({
      status: "ok",
      message: "ElevenLabs webhook endpoint is active",
      timestamp: new Date().toISOString(),
      endpoint: "https://jabvlabs.com/api/elevenlabs-redirect"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}