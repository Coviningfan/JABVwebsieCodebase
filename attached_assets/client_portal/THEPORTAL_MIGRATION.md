# ThePortal Branch Migration Guide

## Current Status
✅ "ThePortal" branch created  
⏳ Portal files need to be moved to root level  
⏳ Render.com needs to be reconfigured  

## Next Steps

### 1. Switch to ThePortal Branch and Restructure
```bash
# Switch to ThePortal branch
git checkout ThePortal

# Move all portal files to root level
mv attached_assets/client_portal/* .
mv attached_assets/client_portal/.* . 2>/dev/null || true

# Remove the attached_assets directory
rm -rf attached_assets/

# Add all changes
git add .

# Commit the restructure
git commit -m "Move client portal to root of ThePortal branch"

# Push to GitHub
git push origin ThePortal
```

### 2. Update Render.com Configuration

**New Render.com Settings:**
- Repository: `JABVwebsieCodebase`
- Branch: `ThePortal`
- Root Directory: *(leave empty)*
- Build Command: `npm install && npm run build`
- Start Command: `npm run serve`
- Publish Directory: `build`

### 3. Expected ThePortal Branch Structure
```
ThePortal branch (root level):
├── package.json
├── package-lock.json
├── vite.config.mjs
├── render.yaml
├── jsconfig.json
├── postcss.config.js
├── tailwind.config.js
├── .env.example
├── .env.production
├── public/
├── src/
└── supabase/
```

### 4. Environment Variables (unchanged)
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_APP_URL=https://portal.jabvlabs.com
VITE_APP_NAME=JABV Labs Client Portal
VITE_COMPANY_NAME=JABV Holdings LLC
VITE_SUPPORT_EMAIL=support@jabvlabs.com
VITE_COMPANY_PHONE=(775) 800-5850
```

### 5. Benefits After Migration
- Clean deployment with root directory as base
- Independent portal development
- No subdirectory complications
- Simplified build process

### 6. Verification Commands
After migration, verify structure:
```bash
# Check you're on ThePortal branch
git branch --show-current

# Verify files are at root level
ls -la package.json src/ public/

# Check build works
npm install
npm run build
```

## Ready for Deployment
Once files are moved to root level in ThePortal branch, Render.com deployment will be much cleaner and more reliable.