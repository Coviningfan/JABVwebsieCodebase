#!/bin/bash

# Build script for IONOS deployment
echo "Building client portal for IONOS hosting..."

# Install dependencies
npm install

# Build the project
npm run build

echo "Build complete! Upload the 'build' folder contents to your IONOS portal.jabvlabs.com subdomain."
echo ""
echo "Required IONOS configuration:"
echo "1. Upload all files from 'build' folder to portal.jabvlabs.com document root"
echo "2. Set environment variables in IONOS control panel:"
echo "   - VITE_SUPABASE_URL=your_supabase_url"
echo "   - VITE_SUPABASE_ANON_KEY=your_supabase_key"
echo "3. Ensure .htaccess file is uploaded for proper routing"
echo ""
echo "Portal will be available at: https://portal.jabvlabs.com"