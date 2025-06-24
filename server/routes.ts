import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, projectType, message } = req.body;
      
      // Log the contact form submission (in production, save to database)
      console.log('Contact form submission:', { name, email, projectType, message });
      
      res.json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you within 24 hours." 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
