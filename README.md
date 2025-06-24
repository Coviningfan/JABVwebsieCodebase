JABV Labs - Portfolio Website

Description

This is a full-stack web application for JABV Labs, a web and mobile app development company based in Reno, Nevada. The application features a modern, dark-themed portfolio website with a contact form and showcases the company's services and projects. Designed with an Apple-inspired aesthetic, the site uses a red and black color palette with professional animations, offering a clean, responsive interface for businesses and individuals seeking custom mobile app development (iOS/Android), interactive websites, and website redesigns. Hosted securely with a wildcard SSL certificate, the site is live at https://jabvlabs.com, with full subdomain (www.jabvlabs.com) functionality pending DNS propagation (expected by June 24-25, 2025). This project emphasizes bespoke development solutions, steering clear of AI-generated or template-based services, and is poised to attract US clients with optimized content and local SEO strategies.

Overview

JABV Labs is committed to delivering innovative digital solutions through custom web and mobile app development. This portfolio website serves as a showcase of our expertise, featuring a sleek dark theme with red accents, infinite-scrolling project carousels, and detailed service pages. The site is built to engage visitors with a self-guiding layout, leveraging psychological design principles for a premium user experience.

System Architecture

Frontend Architecture

Framework: React 18 with TypeScript for type safety and scalability.

Styling: Tailwind CSS with shadcn/ui components for a utility-first, customizable design.

Routing: Wouter for lightweight client-side navigation.

State Management: TanStack Query (React Query) for efficient server state handling.

Form Handling: React Hook Form with Zod validation for robust form management.

Build Tool: Vite for fast development and production builds.

Backend Architecture

Runtime: Node.js with Express.js for a lightweight server.
Language: TypeScript with ES modules for type-safe code.
Database: PostgreSQL with Drizzle ORM for structured, type-safe queries.
Database Provider: Neon Database (serverless PostgreSQL) for scalability.
Validation: Zod schemas for data integrity.
Development: Hot module replacement with Vite integration.
UI Component System
Design System: shadcn/ui with Radix UI primitives for accessible, reusable components.
Theme: Dark theme with red accent colors, inspired by Apple’s modern design.
Typography: Inter font family for clean, professional text.
Icons: Font Awesome and Lucide React for elegant, precise visuals.
Responsive Design: Mobile-first approach using Tailwind breakpoints.

Key Components
Database Schema:
Users Table: Basic authentication (id, username, password).
Contacts Table: Stores form submissions (id, name, email, projectType, message, createdAt).
Location: Defined in shared/schema.ts with Drizzle ORM.
Storage Layer:
Interface: IStorage for CRUD operations.
Implementation: MemStorage class for in-memory storage (development).
Location: server/storage.ts.

Frontend Pages:

Home Page: Features navigation, hero section, portfolio carousel, services, about, and contact sections.
404 Page: Custom not found page for user guidance.
API Structure:
Routes: Defined in server/routes.ts (currently empty, ready for expansion).
Prefix: All routes use /api prefix.
Error Handling: Global middleware for robust error management.
Data Flow:
Client Requests: React components use TanStack Query for API calls.
API Layer: Express.js handles requests with route handlers.
Storage Layer: Abstracts database operations via the storage interface.
Database: PostgreSQL with Drizzle ORM.
Response: JSON sent back to the client.
State Management: TanStack Query handles caching and synchronization.
External Dependencies

Core Dependencies:
@neondatabase/serverless: Serverless PostgreSQL driver.
drizzle-orm: Type-safe SQL query builder.
@tanstack/react-query: Server state management.
react-hook-form: Form handling.
@hookform/resolvers: Form validation resolvers.
zod: Schema validation.
wouter: Lightweight routing.
UI Dependencies:
@radix-ui/*: Accessible UI primitives.
tailwindcss: Utility-first CSS framework.
class-variance-authority: CSS class variants.
clsx: Conditional class names.
lucide-react: Icon library.
Development Dependencies:
vite: Build tool and dev server.
typescript: Type checking.
tsx: TypeScript execution.
esbuild: Fast bundling for production.

Deployment Strategy
Development
Command: npm run dev.
Port: 5000 (configured for local testing).
Hot Reload: Vite HMR for frontend, tsx for backend.
Production Build
Frontend: vite build outputs to dist/public.
Backend: esbuild bundles server to dist/index.js.



Start: npm run start runs the production build.

Database Management

Migrations: Drizzle Kit for schema migrations.

Push: npm run db:push applies schema changes.

Environment: DATABASE_URL required for database connection.

Platform Configuration

Deployment Target: Autoscale-capable hosting platform.

Modules: nodejs-20, web, postgresql-16.

Port Mapping: 5000 (internal) → 80 (external).

Changelog


June 24, 2025 - Initial Setup: Established core architecture with React, Node.js, and PostgreSQL.
June 24, 2025 - Enhanced Design:

Added carousel-style technology showcases with scrolling animations.

Implemented background animations with floating particles.

Updated contact info to (775) 800-5850 and contact@jabvlabs.com.

Emphasized custom development, avoiding AI/template references.

Created a separate Contact page with premium glass effects.

Enhanced portfolio carousel with infinite scroll and 10 project examples.

Updated copyright to © 2025 JABV Holdings LLC.

Added comprehensive technology categories (40+ languages, frameworks, cloud, ML/AI).

User Preferences


Communication Style: Simple, everyday language for clear guidance.


Marketing Focus: Highlight custom development, avoid AI or template service mentions.

Contact: Phone (775) 800-5850, Email contact@jabvlabs.com.

Company: JABV Holdings LLC (© 2025).

Design Preference: Apple-inspired, red/black theme, professional animations.

Next Steps

Monitor DNS Propagation: Confirm www.jabvlabs.com CNAME resolves (expected by June 24-25, 2025) using www.whatsmydns.net.

Test Fully: Verify https://jabvlabs.com and https://www.jabvlabs.com load with padlock icons.

SEO Implementation:

Research keywords (e.g., “Reno app development,” “Reno web design”).

Optimize titles, meta descriptions, and content.

Set up Google Search Console and Business Profile.

Maintenance: Regularly update content and monitor performance with analytics tools.

Contributing

Guidelines: Suggest enhancements via issues or pull requests (if using version control).

Contact: Reach out at contact@jabvlabs.com or (775) 800-5850 for collaboration.

Note: Maintain a professional image by focusing on custom solutions in all communications.

License

© 2025 JABV Holdings LLC. All rights reserved.
