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
  app.post("/api/elevenlabs-redirect", async (req, res) => {
    try {
      const { action } = req.body;
      
      if (!action) {
        return res.status(400).json({
          success: false,
          message: "Action is required",
        });
      }

      const result = await supabaseService.handleElevenLabsRedirect(action);
      
      if (result.success) {
        res.json(result.data);
      } else {
        res.status(500).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error('ElevenLabs redirect error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to handle redirect",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
