# JABV Labs - Portfolio Website

## Overview

This is a full-stack web application for JABV Labs, a web and mobile app development company based in Reno, Nevada. The application features a modern, dark-themed portfolio website with a contact form and showcases the company's services and projects.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for data validation
- **Development**: Hot module replacement with Vite integration

### UI Component System
- **Design System**: shadcn/ui with Radix UI primitives
- **Theme**: Dark theme with red accent colors
- **Typography**: Inter font family
- **Icons**: Font Awesome and Lucide React icons
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contacts Table**: Contact form submissions (id, name, email, projectType, message, createdAt)
- **Schema Location**: `shared/schema.ts` with Drizzle ORM definitions

### Storage Layer
- **Interface**: `IStorage` interface for CRUD operations
- **Implementation**: `MemStorage` class for in-memory storage (development)
- **Location**: `server/storage.ts`

### Frontend Pages
- **Home Page**: Complete portfolio website with navigation, hero, portfolio carousel, services, about, and contact sections
- **404 Page**: Custom not found page

### API Structure
- **Routes**: Defined in `server/routes.ts` (currently empty, ready for implementation)
- **Prefix**: All API routes use `/api` prefix
- **Error Handling**: Global error handling middleware

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js handles HTTP requests with route handlers
3. **Storage Layer**: Storage interface abstracts database operations
4. **Database**: PostgreSQL with Drizzle ORM for type-safe queries
5. **Response**: JSON responses sent back to client
6. **State Management**: TanStack Query manages caching and synchronization

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: CSS class variants
- **clsx**: Conditional class names
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution
- **esbuild**: Fast bundling for production

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite HMR for frontend, tsx for backend

### Production Build
- **Frontend**: `vite build` outputs to `dist/public`
- **Backend**: `esbuild` bundles server to `dist/index.js`
- **Start**: `npm run start` runs production build

### Database Management
- **Migrations**: Drizzle Kit for schema migrations
- **Push**: `npm run db:push` applies schema changes
- **Environment**: `DATABASE_URL` required for database connection

### Platform Configuration
- **Replit**: Autoscale deployment target
- **Modules**: nodejs-20, web, postgresql-16
- **Port Mapping**: 5000 (internal) → 80 (external)

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
- June 24, 2025. Enhanced website with Apple-inspired design:
  - Added carousel-style technology showcases with scrolling animations
  - Implemented background animations with floating particles
  - Updated contact information (775-800-5850, contact@jabvlabs.com)
  - Added anti-template messaging emphasizing custom development
  - Created separate Contact page with premium glass effects
  - Enhanced portfolio carousel with infinite scroll functionality
  - Updated copyright to 2025 JABV Holdings LLC
  - Added comprehensive technology categories (40+ languages, frameworks, cloud, ML/AI)
- June 26, 2025. Added detailed service pages:
  - Created Mobile App Development page with process breakdown and tech stack
  - Created Interactive Websites page with comprehensive service details
  - Created Website Redesigns page with transformation focus
  - Fixed hero section export/import issues for build compatibility
  - Added routing for all service pages with proper linking
  - Moved CSS animations to main stylesheet for better maintainability
- June 26, 2025. Enhanced animations and user experience:
  - Accelerated loading screen from ~3.5s to ~2s duration
  - Added dramatic fade-in animation for hero content after typewriter completion
  - Implemented ElevenLabs conversational AI widget integration
  - Styled Contact button in navigation with red gradient matching hero CTA
  - Updated portfolio carousel subtitle to "Some of the services we offer"
  - Fixed About section image with custom SVG illustration (Nevada mountains + tech elements)
  - Enhanced services section with shiny hover effects and symmetric button alignment
  - Added collapsible technology carousel section with dropdown toggle
  - Improved infinite scroll behavior for portfolio carousel
  - Fixed all text alignment issues across service pages
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Marketing focus: Emphasize custom development, avoid AI/template references.
Contact: Phone (775) 800-5850, Email contact@jabvlabs.com
Company: JABV Holdings LLC (2025)
Design preference: Apple-inspired, red/black theme, professional animations
```