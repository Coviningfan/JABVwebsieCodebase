# Git Branch Strategy for JABV Labs Portal

## Recommended Branch Structure

### Main Repository: JABVwebsieCodebase
- **main** - Main JABV Labs website
- **ThePortal** - Client portal (portal.jabvlabs.com)

## Benefits of Separate Portal Branch

### 1. Clean Separation
- Portal code isolated from main website
- Independent development cycles
- No risk of portal changes affecting main site

### 2. Simplified Deployment
- Render.com can deploy directly from portal branch
- Root directory becomes `.` instead of `attached_assets/client_portal`
- Cleaner build process

### 3. Better Version Control
- Portal releases independent of main website
- Easier to track portal-specific changes
- Simplified code reviews for portal features

## Migration Steps

### 1. Create Portal Branch
```bash
git checkout -b ThePortal
```

### 2. Move Portal Files to Root
```bash
# Move all files from attached_assets/client_portal/ to root
mv attached_assets/client_portal/* .
mv attached_assets/client_portal/.* . 2>/dev/null || true
rm -rf attached_assets/
```

### 3. Update Render.com Settings
- **Branch**: portal
- **Root Directory**: *(empty - use root)*
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run serve`

### 4. Portal Branch Structure
```
portal branch/
├── package.json
├── vite.config.mjs
├── render.yaml
├── src/
├── public/
├── supabase/
└── README.md
```

## Deployment Configuration

### Render.com Settings for Portal Branch
```
Repository: JABVwebsieCodebase
Branch: ThePortal
Root Directory: (empty)
Build Command: npm install && npm run build
Start Command: npm run serve
Environment: Static Site
```

## Workflow Benefits

### Development
- Work on portal features without affecting main site
- Independent testing and staging
- Cleaner repository navigation

### Deployment
- Auto-deploy from portal branch to portal.jabvlabs.com
- Main branch deploys to jabvlabs.com
- No file path conflicts

### Maintenance
- Portal updates don't require main website rebuilds
- Easier rollbacks for portal-specific issues
- Independent dependency management

## Commands to Execute

```bash
# Switch to ThePortal branch
git checkout ThePortal

# Move portal files to root
mv attached_assets/client_portal/* .
mv attached_assets/client_portal/.* . 2>/dev/null || true
rm -rf attached_assets/

# Commit the restructure
git add .
git commit -m "Move portal to dedicated branch root"

# Push ThePortal branch
git push origin ThePortal
```

This strategy provides much cleaner organization and deployment for your client portal.