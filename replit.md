# JABV Labs Client Portal

## Overview

The JABV Labs Client Portal is a modern React-based web application that provides clients with secure access to their projects, communications, and files. Built with React 18, Vite, and Supabase, the portal features a dark mode design with JABV Labs branding and offers real-time project management capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with functional components and hooks
- **Build Tool**: Vite 5.0 for fast development and optimized production builds
- **Styling**: TailwindCSS with custom JABV Labs dark mode theme
- **Routing**: React Router v6 for client-side navigation
- **State Management**: React Context API for authentication state
- **Animation**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React icon library

### Backend Architecture
- **Authentication**: Supabase Auth with JWT tokens
- **Database**: PostgreSQL via Supabase with Row Level Security (RLS)
- **API**: Supabase PostgREST for automatic REST API generation
- **Real-time**: Supabase Realtime for live updates

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Supabase
- **File Storage**: Supabase Storage for project files and assets
- **Schema Design**: Normalized schema with proper foreign key relationships

## Key Components

### Authentication System
- Email/password authentication via Supabase Auth
- User profile management with role-based access (admin, manager, client)
- Password reset functionality
- Session management with automatic token refresh

### Project Management
- Project overview with status tracking and progress indicators
- Milestone timeline visualization
- Team member management
- File sharing and document management

### Communication Hub
- Real-time messaging between clients and project teams
- Message threading and conversation history
- File attachments and media sharing

### User Interface
- Responsive design optimized for desktop and mobile
- Dark mode theme with JABV Labs branding (#AB1C1C red accent)
- Component-based architecture with reusable UI elements
- Accessibility-compliant design patterns

## Data Flow

### Authentication Flow
1. User submits credentials via LoginForm component
2. AuthContext manages authentication state using Supabase Auth
3. Successful authentication redirects to dashboard
4. User profile data fetched from user_profiles table
5. Authentication state persisted across browser sessions

### Project Data Flow
1. Dashboard loads user's projects from projects table
2. Project details fetched with related data (messages, files, milestones)
3. Real-time updates via Supabase subscriptions
4. File uploads handled through Supabase Storage API

### Communication Flow
1. Messages stored in project_messages table
2. Real-time message delivery via Supabase Realtime
3. Message history paginated for performance
4. File attachments linked to messages

## External Dependencies

### Core Dependencies
- **@supabase/supabase-js**: Backend-as-a-Service integration
- **@reduxjs/toolkit**: State management (minimal usage)
- **react-router-dom**: Client-side routing
- **react-hook-form**: Form validation and management
- **framer-motion**: Animation library
- **lucide-react**: Icon system
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **@vitejs/plugin-react**: Vite React plugin
- **tailwindcss**: Utility-first CSS framework
- **autoprefixer**: CSS vendor prefixing
- **postcss**: CSS transformation tool

### Supabase Configuration
- Production URL: `https://qzfcefvusjzdzseokdla.supabase.co`
- Anonymous key for client-side access
- Row Level Security policies for data protection

## Deployment Strategy

### Development Environment
- Vite development server on port 4028
- Hot module replacement for rapid development
- Source maps enabled for debugging

### Production Build
- Vite production build with code splitting
- Assets optimization and compression
- Source maps disabled for security

### Hosting Configuration
- Replit deployment with auto-scaling
- Static asset serving via CDN
- Environment variables for configuration management

### Database Deployment
- PostgreSQL migrations in `supabase/migrations/`
- Database schema versioning
- Automated backups via Supabase

## Changelog

- June 26, 2025. Initial setup
- June 26, 2025. Migrated from Replit Agent to standard Replit environment with port configuration fix (4028 → 5000)
- June 26, 2025. Transformed from portfolio website to client portal application with login, dashboard, projects, and settings pages
- June 26, 2025. Fixed branding throughout application - "JABV" is white, "Labs" is red (matching brand guidelines)
- June 26, 2025. Removed "Create Account" functionality as customers cannot self-register
- June 26, 2025. Recreated dashboard to match professional reference design with project cards, stats, and activity feed
- June 26, 2025. Fixed sidebar styling to use black background instead of blue, maintaining design consistency
- June 26, 2025. Enhanced dashboard components with professional animations, hover effects, and improved visual hierarchy inspired by reference designs
- June 26, 2025. Completed comprehensive 360° client portal transformation with invoicing, support tickets, file management, and professional SVG icons throughout the application
- June 26, 2025. Replaced all emoji icons with professional SVG icons for enhanced visual consistency
- June 26, 2025. Added comprehensive navigation system with project-specific routing and interactive menu capabilities
- June 26, 2025. Integrated InvoicePage with detailed billing tracking, payment status, and PDF download functionality
- June 26, 2025. Created FilesPage with folder-based organization, file type recognition, upload progress tracking, and search capabilities
- June 26, 2025. Developed SupportPage with ticket management system, priority/status tracking, and conversation threading
- June 26, 2025. Implemented TasksPage with assignment system, priority management, team member allocation, and progress tracking
- June 26, 2025. Added KnowledgeBasePage with searchable articles, categorized content, helpful ratings, and comprehensive onboarding guides
- June 26, 2025. Integrated NotificationsCenter with real-time alerts, filtering, read/unread status, and action-based navigation
- June 26, 2025. Enhanced portal with feedback workflows, approval systems, time tracking capabilities, and advanced self-service features
- June 26, 2025. Implemented comprehensive AI-powered task recommendation engine using OpenAI API with intelligent project context analysis, user pattern recognition, confidence scoring, and fallback recommendations for enhanced task management automation
- June 26, 2025. Replaced business-focused dashboard with client-centric dashboard showing client's active projects, pending tasks, unread messages, and upcoming deadlines - removed revenue metrics as portal is for client organization, not business analytics

## User Preferences

Preferred communication style: Simple, everyday language.