# JABV Labs Repository Branch Structure

## Branch Overview

### main
**Purpose**: JABV Labs main website (jabvlabs.com)
**Content**: React portfolio website with TypeScript, Tailwind CSS, and Vite
**Features**:
- Apple-inspired dark theme design
- Sequential typewriter hero animation
- Service pages (Mobile Apps, Interactive Websites, Website Redesigns)
- Contact form with backend API
- Professional portfolio showcase

### ThePortal
**Purpose**: Client portal (portal.jabvlabs.com)
**Content**: Standalone React application with Supabase authentication
**Features**:
- Login-first client experience
- Project management dashboard
- Invoice tracking system
- Support ticket management
- Secure client authentication

## Deployment Configuration

### Main Website (main branch)
- Platform: Replit
- Domain: jabvlabs.com
- Build: `npm run dev`
- Port: 5000

### Client Portal (ThePortal branch)  
- Platform: Render.com
- Domain: portal.jabvlabs.com
- Root Directory: (empty - uses branch root)
- Build Command: `npm install && npm run build`
- Start Command: `npm run serve`
- Publish Directory: `build`

## Development Workflow

### Main Website Changes
```bash
git checkout main
# Make changes to main website
git add .
git commit -m "Update main website"
git push origin main
```

### Client Portal Changes
```bash
git checkout ThePortal
# Make changes to portal
git add .
git commit -m "Update client portal"
git push origin ThePortal
```

## Repository Status
✅ Client portal files migrated to ThePortal branch  
✅ Main branch cleaned of portal references  
✅ Independent development cycles established  
✅ Deployment configurations separated  

This structure enables completely independent development and deployment of both the main website and client portal.