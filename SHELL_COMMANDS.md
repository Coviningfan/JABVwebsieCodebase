# Shell Commands to Fix Portal Deployment

## Step 1: Fix JSON Syntax Error
```bash
# Fix the missing comma in package.json
sed -i 's/"db:push": "drizzle-kit push"/"db:push": "drizzle-kit push",/' package.json
```

## Step 2: Verify the Fix
```bash
cat package.json | grep -A 10 '"scripts"'
```

## Step 3: Commit and Push Changes
```bash
git add package.json
git commit -m "Add serve script for Render.com deployment"
git push origin ThePortal
```

## Step 4: Alternative - Change Render.com to Static Site
If the above doesn't work, change your Render.com service settings:
- Service Type: **Static Site** (not Web Service)
- Build Command: `npm install && npm run build`
- Publish Directory: `build`
- Start Command: *(leave empty)*

## Step 5: Check Portal Files Structure
```bash
ls -la
```

## If Portal Files Are Missing, Move Them:
```bash
# If you see Express files instead of React portal files, move portal files:
mv attached_assets/client_portal/* .
mv attached_assets/client_portal/.* . 2>/dev/null || true
rm -rf attached_assets/
git add .
git commit -m "Move portal files to root"
git push origin ThePortal
```

Run these commands in order to fix the deployment!