# Gmail SMTP Setup Guide

## Overview
The registration form now sends confirmation emails via Gmail SMTP when users submit the form. This guide will help you generate the required Gmail app password.

## Prerequisites
- Google Account with 2-Factor Authentication (2FA) enabled
- Access to designlazyyy@gmail.com

## Steps to Generate Gmail App Password

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", enable **2-Step Verification** if not already enabled
4. Follow the prompts to complete setup

### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your device type)
3. Click **Generate**
4. Google will display a 16-character password (example: `xxxx xxxx xxxx xxxx`)
5. Copy this password (without spaces)

### Step 3: Update Environment Variable
1. Open `.env.local` in your project
2. Find this section:
   ```
   # Gmail SMTP Configuration (for registration emails)
   GMAIL_USER=designlazyyy@gmail.com
   GMAIL_APP_PASSWORD=
   ```
3. Paste the 16-character app password after the equals sign:
   ```
   GMAIL_APP_PASSWORD=xxxxxxxxxxxxxxxx
   ```

### Step 4: Test Email Delivery
1. Stop your dev server (Ctrl+C)
2. Clear cache and restart:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. Open http://localhost:3000
4. Scroll to the registration form
5. Fill out and submit the form with test data:
   - Name: Test User
   - Email: your-email@gmail.com
   - Phone: 0812345678
   - Line ID: test_user
6. Check:
   - Your test email inbox for confirmation
   - designlazyyy@gmail.com inbox for admin notification

## Email Behavior

### Admin Email (sent to designlazyyy@gmail.com)
- Contains applicant information
- Includes: Name, Email, Phone, Line ID
- Shows submission timestamp in Thai format

### User Confirmation Email (sent to applicant)
- Thai language confirmation message
- Course details: 6-month, 192-hour course
- Start date: December 1, 2025
- Early Bird pricing: 29,000 THB
- Contact information

## Fallback Behavior
If Gmail SMTP fails:
1. System attempts to send via Resend (alternative email service)
2. If both email services fail, data is automatically saved to JSON files in `/registrations` folder
3. Registration data is always saved to Supabase database

## Troubleshooting

### Issue: Email not sending
- Verify 2FA is enabled on Google Account
- Verify app password is correctly copied (16 characters, no spaces)
- Check environment variable is set in `.env.local`
- Restart dev server after updating `.env.local`

### Issue: "Invalid login credentials"
- Ensure app password is NOT the main Google account password
- App password must be from [App Passwords](https://myaccount.google.com/apppasswords) page
- Re-generate app password if uncertain

### Issue: "Less secure app access" error
- This is normal with app passwords - Google understands this is secure
- The app password method is the recommended approach

## Security Notes
- Never commit `.env.local` to Git
- `.env.local` is already in `.gitignore`
- App passwords are tied to specific apps and can be revoked anytime
- If compromised, simply delete the app password in Google Account settings

## Files Modified
- `app/api/register/route.ts` - Added Gmail SMTP integration
- `.env.local` - Added GMAIL_USER and GMAIL_APP_PASSWORD variables
- `package.json` - Added nodemailer and @types/nodemailer dependencies
