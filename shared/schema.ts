import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

<<<<<<< HEAD
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
=======
// Update the contact schema to include phone
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
>>>>>>> 012843c7200ee2de4fc0bc1f576bcb17a48a5ddb
  projectType: z.string().min(1, "Project type is required"),
  message: z.string().min(1, "Message is required"),
});

<<<<<<< HEAD
export type InsertUser = z.infer<typeof insertUserSchema>;
=======
export type InsertContact = z.infer<typeof insertContactSchema>;
export type User = typeof users.$inferSelect;
>>>>>>> 012843c7200ee2de4fc0bc1f576bcb17a48a5ddb
export type InsertContact = z.infer<typeof insertContactSchema>;
export type User = typeof users.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
