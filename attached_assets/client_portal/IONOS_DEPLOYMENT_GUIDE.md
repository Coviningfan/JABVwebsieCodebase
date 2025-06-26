# JABV Labs Client Portal - IONOS Deployment Guide

## Overview
This guide will help you deploy the client portal to portal.jabvlabs.com on IONOS hosting.

## Prerequisites
- IONOS hosting account with subdomain access
- Supabase project with database configured
- Node.js and npm installed locally for building

## Step 1: Supabase Configuration

### Required Supabase Information:
1. **Project URL**: Found in Supabase Dashboard → Settings → API
   - Format: `https://[your-project-id].supabase.co`
2. **Anon Key**: Found in Supabase Dashboard → Settings → API
   - This is the public key (safe for frontend use)

### Supabase Database Setup:
Ensure your Supabase project has the following tables configured:
- `users` - Client user accounts
- `projects` - Client projects
- `invoices` - Client invoicing
- `tickets` - Support tickets

## Step 2: Local Build Process

### 1. Install Dependencies
```bash
cd client_portal
npm install
```

### 2. Configure Environment
Create `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_APP_URL=https://portal.jabvlabs.com
```

### 3. Build for Production
```bash
npm run build
```

This creates a `build` folder with all static files ready for deployment.

## Step 3: IONOS Configuration

### Subdomain Setup:
1. Log into IONOS control panel
2. Navigate to Domains & SSL
3. Add subdomain: `portal.jabvlabs.com`
4. Set document root to subdomain folder

### Upload Files:
1. Upload ALL contents of the `build` folder to portal.jabvlabs.com document root
2. Ensure `.htaccess` file is uploaded (handles React routing)
3. Verify file permissions are set correctly (755 for folders, 644 for files)

### Environment Variables in IONOS:
If IONOS supports environment variables:
1. Add `VITE_SUPABASE_URL`
2. Add `VITE_SUPABASE_ANON_KEY`

**Note**: Since this is a static build, environment variables are embedded during build time.

## Step 4: DNS Configuration

### IONOS DNS Settings:
1. Ensure A record points portal.jabvlabs.com to IONOS server IP
2. Add CNAME if using IONOS managed DNS
3. Enable SSL certificate for portal.jabvlabs.com

## Step 5: Testing Deployment

### Verification Checklist:
- [ ] Portal loads at https://portal.jabvlabs.com
- [ ] Login functionality works
- [ ] Navigation between pages works (no 404 errors)
- [ ] Supabase connection established
- [ ] SSL certificate active
- [ ] Mobile responsive design working

### Common Issues:

**404 on page refresh:**
- Ensure `.htaccess` file is uploaded and working
- Check Apache mod_rewrite is enabled

**Supabase connection errors:**
- Verify environment variables in build
- Check Supabase project is active
- Confirm API keys are correct

**Styling issues:**
- Check all CSS/JS files uploaded correctly
- Verify asset paths are correct

## Step 6: Production Security

### Recommended Settings:
1. Enable HTTPS redirect in .htaccess
2. Set security headers (already configured)
3. Configure Supabase RLS (Row Level Security)
4. Set up proper CORS in Supabase

### Supabase Security:
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Example RLS policy (users can only see their own data)
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid() = id);
```

## Maintenance

### Regular Updates:
1. Update npm dependencies monthly
2. Rebuild and redeploy when changes made
3. Monitor Supabase usage and billing
4. Backup Supabase data regularly

### Monitoring:
- Set up Supabase alerts for usage limits
- Monitor portal performance with IONOS tools
- Regular security audits

## Support

For IONOS-specific issues:
- Contact IONOS support for hosting problems
- Check IONOS documentation for advanced configurations

For portal functionality:
- Check browser console for JavaScript errors
- Verify Supabase dashboard for backend issues
- Test with different browsers and devices

## File Structure After Deployment

```
portal.jabvlabs.com/
├── index.html
├── .htaccess
├── assets/
│   ├── index.[hash].js
│   ├── index.[hash].css
│   └── vendor.[hash].js
├── manifest.json
├── robots.txt
└── favicon.ico
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_SUPABASE_URL | Supabase project URL | https://abc123.supabase.co |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous key | eyJ0eXAiOiJKV1Q... |
| VITE_APP_URL | Portal domain | https://portal.jabvlabs.com |

## Contact

For deployment assistance, contact JABV Labs technical team.