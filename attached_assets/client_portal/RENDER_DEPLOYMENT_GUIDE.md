# JABV Labs Client Portal - Render.com Deployment Guide

## Overview
Complete deployment guide for the JABV Labs client portal on Render.com as portal.jabvlabs.com

## Prerequisites
- Render.com account
- Supabase project with database configured
- GitHub repository with portal code
- Domain portal.jabvlabs.com configured

## Step 1: Supabase Setup

### Database Migration
1. Create new Supabase project or use existing
2. Run the migration script: `supabase/migrations/20241216150000_jabv_client_portal.sql`
3. This creates all required tables:
   - user_profiles
   - clients
   - projects
   - project_messages
   - invoices
   - support_tickets
   - ticket_messages

### Required Supabase Configuration
```sql
-- Enable RLS on all tables
-- Set up authentication policies
-- Create sample data for testing
```

### Environment Variables Needed
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Step 2: Render.com Deployment

### 1. Connect Repository
- Connect your GitHub repository to Render.com
- Select the client portal repository

### 2. Configure Build Settings
```yaml
# render.yaml configuration
services:
  - type: web
    name: jabv-client-portal
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### 3. Environment Variables
Set these in Render.com dashboard:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=https://portal.jabvlabs.com
VITE_APP_NAME=JABV Labs Client Portal
VITE_COMPANY_NAME=JABV Holdings LLC
VITE_SUPPORT_EMAIL=support@jabvlabs.com
VITE_COMPANY_PHONE=(775) 800-5850
```

## Step 3: Domain Configuration

### Custom Domain Setup
1. In Render.com dashboard:
   - Go to your service settings
   - Add custom domain: portal.jabvlabs.com
   - Configure CNAME record

### DNS Configuration
Add these DNS records to your domain provider:
```
Type: CNAME
Name: portal
Value: your-service-name.onrender.com
```

### SSL Certificate
Render.com automatically provisions SSL certificates for custom domains.

## Step 4: Testing Deployment

### Verification Checklist
- [ ] Portal loads at https://portal.jabvlabs.com
- [ ] Supabase connection working
- [ ] User authentication functional
- [ ] Dashboard loads project data
- [ ] All navigation working
- [ ] Responsive design working
- [ ] SSL certificate active

### Test Login Credentials
Use the sample user created in migration:
```
Email: john.doe@company.com
Password: ClientPortal123
```

## Step 5: Production Configuration

### Supabase Security
1. Enable Row Level Security (RLS) on all tables
2. Configure authentication policies
3. Set up email templates for password reset
4. Configure CORS for portal.jabvlabs.com

### Monitoring
- Set up Render.com monitoring alerts
- Configure Supabase usage alerts
- Monitor portal performance

## Step 6: Features Overview

### Client Portal Features
1. **Authentication System**
   - Secure login/logout with Supabase Auth
   - Password reset functionality
   - Profile management

2. **Project Management**
   - View all client projects
   - Project progress tracking
   - Project messaging system
   - Real-time updates

3. **Invoice Management**
   - View invoices and payment status
   - Download invoice PDFs
   - Payment history tracking

4. **Support System**
   - Create support tickets
   - Track ticket status
   - Communicate with support team

5. **Dashboard Analytics**
   - Project statistics
   - Invoice summaries
   - Support ticket metrics
   - Real-time status updates

## Step 7: Maintenance

### Regular Updates
1. Update npm dependencies monthly
2. Monitor Supabase usage and billing
3. Review security policies quarterly
4. Backup Supabase data regularly

### Performance Optimization
- Monitor Core Web Vitals
- Optimize bundle size
- Configure CDN caching
- Regular security audits

## Troubleshooting

### Common Issues

**Build Failures:**
- Check environment variables are set
- Verify npm dependencies versions
- Review build logs in Render.com

**Authentication Issues:**
- Verify Supabase project is active
- Check CORS configuration
- Confirm environment variables

**Database Connection:**
- Test Supabase connection in dashboard
- Verify RLS policies are correct
- Check user permissions

### Support Contacts
- Render.com Support: support@render.com
- Supabase Support: support@supabase.com
- JABV Labs Technical: development@jabvlabs.com

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to repository
   - Use Render.com environment variable management
   - Rotate keys regularly

2. **Database Security**
   - Enable RLS on all tables
   - Use least-privilege access
   - Regular security audits

3. **Application Security**
   - Input validation on all forms
   - HTTPS-only communication
   - Secure session management

## Cost Optimization

### Render.com Costs
- Static site hosting: $0/month for personal projects
- Custom domain: Free
- SSL certificate: Free

### Supabase Costs
- Free tier: 500MB database, 50MB file storage
- Pro tier: $25/month for production use
- Monitor usage to avoid overages

## Deployment Commands

```bash
# Local development
npm install
npm run dev

# Production build
npm run build

# Deploy to Render.com
git push origin main  # Triggers automatic deployment
```

## File Structure

```
client_portal/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── services/
│   └── utils/
├── supabase/
│   └── migrations/
├── public/
├── render.yaml
├── package.json
└── vite.config.mjs
```

This deployment creates a professional, secure client portal for JABV Labs with comprehensive project management, invoicing, and support features.