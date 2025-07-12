# Universal Deployment Guide - Netlify & Vercel

## 🚨 COMMON ERROR FIXED

**Error:** `sh: line 1: react-scripts: command not found`  
**Root Cause:** Platform doesn't install dependencies in the correct directory for monorepo structure.

## ✅ SOLUTION IMPLEMENTED

I've created proper configuration files for both platforms:

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  base = "client"
  publish = "build"
  command = "npm install && npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--production=false"
```

### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "name": "bajaj-finserv-chatbot",
  "buildCommand": "cd client && npm ci && npm run build",
  "outputDirectory": "client/build",
  "installCommand": "cd client && npm install",
  "devCommand": "cd client && npm start",
  "framework": null,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🚀 DEPLOYMENT STEPS

### Option 1: Netlify (Recommended)

1. **Connect Repository:**
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   - **Base directory:** `client`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `build`

3. **Deploy!**
   - The `netlify.toml` will handle the rest
   - Should build successfully now

### Option 2: Vercel

1. **Connect Repository:**
   - Go to Vercel Dashboard
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Settings:**
   - **Framework Preset:** Other
   - **Root Directory:** `client`
   - **Build Command:** `npm ci && npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

3. **Deploy!**
   - The `vercel.json` will handle routing
   - Should build successfully now

### Option 3: Manual Build + Deploy

If automated deployments still fail:

```bash
# Build locally
cd client
npm install
npm run build

# Then drag & drop the 'build' folder to either platform
```

## 🔧 TROUBLESHOOTING

### If Build Still Fails

1. **Check Node Version:**
   - Ensure platform uses Node 18+
   - Add `.nvmrc` file with content: `18`

2. **Clear Cache:**
   - Netlify: Site Settings → Build & Deploy → Post processing → Clear cache
   - Vercel: Project Settings → Functions → Clear cache

3. **Manual Environment Variables:**
   - Add `NODE_VERSION=18`
   - Add `NPM_FLAGS=--production=false`

### If 404 Errors Occur After Deployment

1. **Check SPA Routing:**
   - Netlify: `_redirects` file should be in build folder ✅
   - Vercel: `vercel.json` routes are configured ✅

2. **Test Direct URLs:**
   - Homepage should work
   - Refresh any page should work (not 404)

## 📋 DEPLOYMENT CHECKLIST

Before deploying:
- [ ] All files committed and pushed to GitHub
- [ ] `netlify.toml` and `vercel.json` are in root directory
- [ ] `client/public/_redirects` exists
- [ ] Build works locally (`npm run build` in client folder)

After deploying:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Page refresh doesn't show 404
- [ ] Chat functionality works
- [ ] Charts and analytics display properly

## 🎯 QUICK FIXES

### For Netlify Users:
```bash
# If you have Netlify CLI installed
cd client
npm run build
netlify deploy --prod --dir=build
```

### For Vercel Users:
```bash
# If you have Vercel CLI installed
cd client
npm run build
vercel --prod
```

## ⚡ RECOMMENDED APPROACH

1. **Try Netlify first** (usually more forgiving with React apps)
2. **Use manual deployment** to verify the build works
3. **Then set up automated deployment** once manual works
4. **Test thoroughly** after deployment

## 🆘 IF ALL ELSE FAILS

**Option A: Platform-Specific Setup**
- Create separate repositories for frontend only
- Deploy from `client` folder as root

**Option B: Containerized Deployment**
- Use Docker with multi-stage builds
- Deploy to platforms that support containers

Your deployment should now work on both Netlify and Vercel! 🎉
