import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import {
  users,
  contacts,
  type User,
  type InsertUser,
  type InsertContact,
  type Contact,
} from "@shared/schema";

// Initialize Neon + Drizzle connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [result] = await db.insert(contacts).values({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || null,
      projectType: contact.projectType,
      message: contact.message,
    }).returning();
    return result;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts);
  }
}

export const storage = new DatabaseStorage();
