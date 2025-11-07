# Gmail SMTP Setup - Quick Start Guide

## 🚀 Current Status

✅ **Gmail SMTP integration fully implemented**
- Nodemailer installed and configured
- API endpoint ready and tested
- Website running at http://localhost:3000
- Build passes with zero errors

## ⚡ 3-Step Setup

### Step 1: Generate Gmail App Password (5 minutes)

```bash
# Open this link:
https://myaccount.google.com/apppasswords

# Select: Mail | Your Device
# Google gives you a 16-character password like: xxxx xxxx xxxx xxxx
# Copy this password
```

**Important:** This is NOT your main Google password!

### Step 2: Add to .env.local (1 minute)

```bash
# Open: .env.local
# Find this line:
GMAIL_APP_PASSWORD=

# Add your password:
GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
```

### Step 3: Restart Dev Server (2 minutes)

```bash
# Stop current server (Ctrl+C)
# Then run:
rm -rf .next
npm run dev

# Wait for "ready started server on 0.0.0.0:3000"
```

## ✅ Test It

1. Open http://localhost:3000
2. Scroll to registration form
3. Fill in:
   - Name: Test User
   - Email: your-email@gmail.com
   - Phone: 0812345678
   - Line ID: testuser
4. Click "สมัครตอนนี้!"
5. Check your email inbox for confirmation
6. Check designlazyyy@gmail.com for admin notification

## 📊 Email Flow

```
Form Submission
    ↓
Supabase Database (saved ✓)
    ↓
Gmail SMTP (send emails)
    ├─→ Admin email to designlazyyy@gmail.com
    └─→ Confirmation email to user
    ↓
If Gmail fails → Fallback to Resend
If all email fails → Data in /registrations JSON
```

## 🔧 Requirements

- [ ] Google Account
- [ ] 2-Factor Authentication enabled
- [ ] 5 minutes of your time

## 📚 Full Documentation

- **Gmail Setup Details:** `GMAIL_SETUP.md`
- **Email Architecture:** `EMAIL_SETUP_STATUS.md`
- **API Code:** `app/api/register/route.ts`

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid login credentials" | Use app password, not main password |
| Email not sending | Restart dev server after .env.local change |
| 2FA required | Enable on Google Account first |
| Still not working? | See detailed guide in GMAIL_SETUP.md |

## 📝 Environment Variables

```
GMAIL_USER=designlazyyy@gmail.com          ← Already set
GMAIL_APP_PASSWORD=                        ← You need to add this
RESEND_API_KEY=re_92LuxW27_...            ← Already set (fallback)
NEXT_PUBLIC_SUPABASE_URL=...              ← Already set
NEXT_PUBLIC_SUPABASE_ANON_KEY=...         ← Already set
```

## 🎯 What Happens After Setup

1. **User Submits Form**
   - Data saved to Supabase instantly
   - JSON backup file created in `/registrations`

2. **Admin Gets Notified**
   - Email to designlazyyy@gmail.com with all applicant details
   - Includes submission timestamp

3. **User Gets Confirmed**
   - Thai-language confirmation email
   - Shows course details and contact info

4. **Everything Logged**
   - Console shows: "Gmail emails sent successfully"
   - Or fallback: "Resend emails sent successfully"

## 🚀 Next: Production Deployment

After testing locally:

```bash
# Build for production
npm run build

# Deploy to Cloudflare Workers or Vercel
# Set environment variables in deployment dashboard
```

---

**Questions?** See the detailed guides in `GMAIL_SETUP.md`
