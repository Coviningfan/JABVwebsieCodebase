# GitHub Repository Structure for Render.com Deployment

## Required Repository Structure

Your GitHub repository should have this exact structure:

```
JABVwebsieCodebase/
├── attached_assets/
│   └── client_portal/
│       ├── package.json ✓
│       ├── package-lock.json ✓
│       ├── vite.config.mjs ✓
│       ├── render.yaml ✓
│       ├── README.md ✓
│       ├── jsconfig.json ✓
│       ├── postcss.config.js ✓
│       ├── tailwind.config.js ✓
│       ├── .env.example ✓
│       ├── .env.production ✓
│       ├── public/
│       │   ├── index.html
│       │   ├── favicon.ico
│       │   ├── manifest.json ✓
│       │   └── robots.txt
│       ├── src/
│       │   ├── App.jsx ✓
│       │   ├── Routes.jsx ✓
│       │   ├── index.jsx
│       │   ├── components/
│       │   ├── contexts/
│       │   ├── pages/
│       │   ├── services/ ✓
│       │   ├── styles/
│       │   └── utils/
│       └── supabase/
│           └── migrations/
│               └── 20241216150000_jabv_client_portal.sql ✓
```

## Render.com Configuration

**Service Settings:**
- Service Type: Static Site
- Root Directory: `attached_assets/client_portal`
- Build Command: `npm install && npm run build`
- Start Command: `npm run serve`
- Publish Directory: `build`

## Environment Variables to Set in Render.com

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_APP_URL=https://portal.jabvlabs.com
VITE_APP_NAME=JABV Labs Client Portal
VITE_COMPANY_NAME=JABV Holdings LLC
VITE_SUPPORT_EMAIL=support@jabvlabs.com
VITE_COMPANY_PHONE=(775) 800-5850
```

## Pre-Deployment Checklist

- [ ] All files committed and pushed to GitHub
- [ ] Repository structure matches the layout above
- [ ] Supabase project created
- [ ] Database migration executed
- [ ] Environment variables ready
- [ ] Custom domain portal.jabvlabs.com configured

## Commands to Verify Structure

Run these commands to verify your repository is ready:

```bash
# Check main portal files exist
ls attached_assets/client_portal/package.json
ls attached_assets/client_portal/render.yaml
ls attached_assets/client_portal/vite.config.mjs

# Check source structure
ls attached_assets/client_portal/src/
ls attached_assets/client_portal/src/services/

# Check database migration
ls attached_assets/client_portal/supabase/migrations/
```

## Troubleshooting

If deployment fails:
1. Verify the exact file path structure
2. Check all files are committed to GitHub
3. Ensure package.json is in the correct location
4. Verify environment variables are set

## Next Steps After Deployment

1. Test login with sample credentials
2. Verify Supabase connection
3. Configure custom domain
4. Set up SSL certificate
5. Test all portal features

Your repository structure is now ready for Render.com deployment!