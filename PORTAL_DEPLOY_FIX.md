# Portal Deployment Fix

## Issue
Render.com deployment failing with "Missing script: serve" error.

## Root Cause
ThePortal branch package.json is missing the `serve` script needed for static file hosting.

## Required Fix for ThePortal Branch

Add this script to package.json in ThePortal branch:

```json
{
  "scripts": {
    "serve": "npx serve -s build -p $PORT"
  }
}
```

## Alternative Render.com Configuration

If you prefer not to modify package.json, change Render.com settings to:

**Service Type:** Static Site (not Web Service)
- Root Directory: (empty)
- Build Command: `npm install && npm run build`
- Publish Directory: `build`
- Start Command: (leave empty for static sites)

## Complete ThePortal Branch Package.json Scripts Section

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "serve": "npx serve -s build -p $PORT"
  }
}
```

## Steps to Fix

1. Switch to ThePortal branch
2. Edit package.json to add serve script
3. Commit and push changes
4. Redeploy on Render.com

The portal will then deploy successfully as a static React application.