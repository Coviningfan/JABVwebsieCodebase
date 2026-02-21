import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: result.error.errors,
        });
      }

      const contact = await storage.createContact(result.data);

      res.json({
        success: true,
        message:
          "Thank you for your message. We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    }
  });

  app.post("/api/elevenlabs-redirect", async (req, res) => {
    try {
      console.log(
        "ElevenLabs webhook received:",
        JSON.stringify(req.body, null, 2)
      );

      res.json({
        success: true,
        message:
          "User will be redirected to the JABV Labs contact form for a personalized consultation.",
        redirect_url: "https://jabvlabs.com/contact",
        tool_response: {
          status: "completed",
          redirect_url: "https://jabvlabs.com/contact",
          message:
            "User will be redirected to the JABV Labs contact form for a personalized consultation.",
        },
      });
    } catch (error) {
      console.error("ElevenLabs redirect error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to handle redirect",
      });
    }
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
