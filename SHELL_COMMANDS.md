# Shell Commands to Fix Portal Deployment

## Step 1: Switch to ThePortal Branch
```bash
git checkout ThePortal
```

## Step 2: Check Current Package.json
```bash
cat package.json | grep -A 10 '"scripts"'
```

## Step 3: Add Serve Script to Package.json
```bash
# Create backup first
cp package.json package.json.backup

# Add serve script using sed
sed -i '/"scripts": {/,/}/ s/}/    "serve": "npx serve -s build -p $PORT"\n  }/' package.json
```

## Alternative Step 3 (Manual Edit)
If sed doesn't work, use nano or vim:
```bash
nano package.json
# Add this line in the scripts section:
# "serve": "npx serve -s build -p $PORT"
```

## Step 4: Verify the Change
```bash
cat package.json | grep -A 15 '"scripts"'
```

## Step 5: Commit and Push
```bash
git add package.json
git commit -m "Add serve script for Render.com deployment"
git push origin ThePortal
```

## Step 6: Install serve package (optional)
```bash
npm install --save-dev serve
```

## Complete Scripts Section Should Look Like:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "serve": "npx serve -s build -p $PORT"
}
```

Run these commands in order and your portal will deploy successfully on Render.com!