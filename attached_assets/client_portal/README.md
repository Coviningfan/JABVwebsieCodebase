# JABV Labs Client Portal

A comprehensive client portal built with React, Vite, and Supabase for portal.jabvlabs.com.

## Features

- **Secure Authentication** - Supabase Auth integration
- **Project Management** - Real-time project tracking and communication
- **Invoice System** - Invoice viewing and payment status tracking
- **Support Tickets** - Integrated help desk functionality
- **Responsive Design** - Mobile-first design with JABV Labs branding

## Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase project
- Environment variables configured

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Database Setup
Run the migration in `supabase/migrations/20241216150000_jabv_client_portal.sql`

## Deployment
Configured for Render.com deployment - see `RENDER_DEPLOYMENT_GUIDE.md` for complete instructions.

## Environment Variables
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_APP_URL=https://portal.jabvlabs.com
```

## Support
- Email: support@jabvlabs.com
- Phone: (775) 800-5850

Built by JABV Holdings LLC © 2025