# Deployment Guide - AI Design System Bootcamp

## Quick Start: Deploy to Cloudflare Pages (Recommended ✅)

Cloudflare Pages has native Next.js support and auto-deploys from GitHub.

### Step 1: Connect GitHub to Cloudflare Pages

1. Go to https://dash.cloudflare.com/
2. Sign in with your Cloudflare account (create one if needed - free tier available)
3. Click "Pages" in the left sidebar
4. Click "Connect to Git"
5. Select GitHub and authorize Cloudflare
6. Select the repository: `plugin87/ai-course`
7. Click "Begin setup"

### Step 2: Configure Build Settings

**Framework preset:** Next.js
**Build command:** `npm run build`
**Build output directory:** `.next`
**Root directory:** `/`

### Step 3: Add Environment Variables

In Cloudflare Pages settings, add:

```
RESEND_API_KEY=re_92LuxW27_FUFuk1zaPwvqwMWxHDbAo4b5
```

### Step 4: Deploy

Click "Save and Deploy" - Cloudflare will automatically build and deploy your site!

Your site will be live at: `https://ai-course.pages.dev` (or your custom domain)

---

## Alternative: Deploy to Vercel (Very Easy)

Vercel is the creator of Next.js and has the best Next.js support.

### Steps:

1. Go to https://vercel.com
2. Click "Import Git Repository"
3. Select `plugin87/ai-course`
4. Add environment variable: `RESEND_API_KEY`
5. Click "Deploy"

Your site will be live at: `https://ai-course.vercel.app`

---

## Alternative: Deploy to Netlify

### Steps:

1. Go to https://netlify.com
2. Click "Import an existing project"
3. Select GitHub and the `plugin87/ai-course` repo
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variable: `RESEND_API_KEY`
7. Click "Deploy"

---

## Check Deployment Status

### Cloudflare Pages
- Dashboard: https://dash.cloudflare.com/
- View logs and deployment history

### Vercel
- Dashboard: https://vercel.com/dashboard
- Real-time analytics and error tracking

### Netlify
- Dashboard: https://app.netlify.com/
- See build logs and site analytics

---

## Troubleshooting

### Build Fails: "Cannot find module"
- Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify
- Push changes to GitHub

### Emails Not Sending
- Check environment variables are set correctly
- Visit https://resend.com dashboard to see delivery status
- Check `/registrations` folder for backup data

### Site Shows 404 or Blank
- Check build output directory is correct
- Verify `next.config.js` is valid
- Check browser console for errors

---

## Production Checklist

- [ ] Environment variables set (RESEND_API_KEY)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate enabled (automatic)
- [ ] Email domain verified in Resend
- [ ] Test registration form
- [ ] Check backup registration files are created

---

## Rollback to Previous Version

If deployment breaks, you can:

1. **Cloudflare Pages:** Click "Deployments" → select previous version → click "Rollback"
2. **Vercel:** Select previous deployment in dashboard
3. **Netlify:** Deploy previews available for each push

---

## Local Build Test

Before deploying, test the build locally:

```bash
npm run build
npm start
```

Visit http://localhost:3000 to verify everything works.
