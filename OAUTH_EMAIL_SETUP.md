# OAuth 2.0 Gmail API Integration - Complete Guide

## Overview

This system uses **OAuth 2.0 Refresh Tokens** to securely send emails via Gmail API. This approach is:
- ✅ **Secure**: No credentials stored in `.env`
- ✅ **User-controlled**: Users authorize once, system operates
- ✅ **Scalable**: Works for production environments
- ✅ **Industry-standard**: Used by major platforms

## Architecture

### Email Flow

```
User Submits Registration Form
        ↓
    [OPTION 1] User NOT authorized yet
        ↓
    "Please authorize to send email"
    → User clicks "Login with Google"
    → Redirects to Google OAuth consent
    → User authorizes access
    → Refresh token stored in Supabase
        ↓
    [OPTION 2] User IS authorized (has refresh token)
        ↓
    Registration endpoint exchanges refresh token for access token
        ↓
    Sends email via Gmail API
        ↓
    If Gmail API fails → Falls back to Resend
        ↓
    Registration data saved to Supabase + JSON backup
```

## Setup Steps

### Step 1: OAuth Credentials (Already Done ✅)

**Status**: Created in Google Cloud Console

```
Client ID: 197708805461-imktsc5but1nun79d3rgqvkeohtuc58d.apps.googleusercontent.com
Authorized Origins:
- https://www.designlazyyy.com

Redirect URIs:
- https://designlazyyy.com/api/auth/callback
- http://localhost:3000/api/auth/callback (local testing)
```

### Step 2: Environment Variables (Already Done ✅)

**Status**: Set in `.env.local`

```
GOOGLE_CLIENT_ID=197708805461-imktsc5but1nun79d3rgqvkeohtuc58d.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=[Get from Google Cloud Console - Clients > Client secrets]
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

⚠️ **Important**: Never commit `GOOGLE_CLIENT_SECRET` to version control. It should only be in `.env.local` which is in `.gitignore`.

### Step 3: Supabase Table (Already Done ✅)

**Status**: Created table `oauth_tokens`

```sql
-- Stores refresh tokens from authorized users
oauth_tokens:
  - id (TEXT, PRIMARY KEY) - unique user identifier
  - refresh_token (TEXT) - Google refresh token
  - access_token (TEXT) - Current access token
  - expires_at (TIMESTAMP) - When access token expires
  - created_at (TIMESTAMP) - When authorized
  - updated_at (TIMESTAMP) - Last used
```

## API Endpoints

### 1. Authorization Endpoint

**Endpoint**: `GET /api/auth/authorize`

**Purpose**: Redirects user to Google OAuth consent screen

**Usage**:
```html
<a href="/api/auth/authorize">
  Login with Google to Enable Email
</a>
```

**What happens**:
1. Redirects to Google OAuth
2. User sees permission request
3. User clicks "Allow"
4. Redirects to `/api/auth/callback`

### 2. Callback Endpoint

**Endpoint**: `GET /api/auth/callback?code=AUTH_CODE`

**Purpose**: Handles OAuth redirect from Google

**What happens**:
1. Receives authorization code
2. Exchanges code for refresh token
3. Stores refresh token in Supabase
4. Redirects back to home page with user ID

**Response**:
```
GET /api/auth/callback?code=4/0AY0...
  ↓
Stores: refresh_token, access_token, expires_at
  ↓
Redirects to /?auth=success&user_id=gmail_user_1234567890
```

### 3. Registration Endpoint

**Endpoint**: `POST /api/register`

**Required body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0812345678",
  "lineId": "john_doe",
  "userId": "gmail_user_1234567890"  // ← From OAuth callback
}
```

**What happens**:
1. Validates form data
2. Saves registration to Supabase
3. If `userId` provided:
   - Retrieves refresh token for that user
   - Gets fresh access token
   - Sends emails via Gmail API
4. Falls back to Resend if Gmail fails
5. Returns success response

## Testing Locally

### Test Flow (Development)

```bash
# 1. Start dev server (already running)
npm run dev

# 2. Visit http://localhost:3000

# 3. Click "Login with Google" (or direct link to /api/auth/authorize)

# 4. In Google dialog:
#    - Sign in with Gmail account
#    - Grant permission to access Gmail

# 5. Redirected back to form with user_id in URL

# 6. Fill registration form:
#    - Name: John Doe
#    - Email: your-email@example.com
#    - Phone: 0812345678
#    - Line ID: john_doe

# 7. Click "สมัครตอนนี้!"

# 8. Check:
#    - Server console for "Emails sent successfully via Gmail API"
#    - Your email inbox for confirmation
#    - Supabase table `registrations` for saved data
```

## Email Behavior

### Primary: Gmail API
- Uses OAuth refresh token
- Sends from: `designlazyyy@gmail.com`
- Success log: `"Emails sent successfully via Gmail API"`

### Fallback 1: Resend
- Used if Gmail API fails
- Sends from: `AI Design System <onboarding@resend.dev>`
- Success log: `"Emails sent successfully via Resend"`

### Fallback 2: Database + JSON
- Data always saved regardless of email
- JSON backup in `/registrations` folder
- Supabase table `registrations` for permanent storage

## Security Considerations

### ✅ What's Secure

1. **No hardcoded credentials**
   - Refresh tokens only in Supabase
   - Never in `.env` or source code
   - Never sent to client

2. **OAuth 2.0 Standard**
   - User explicitly authorizes
   - Limited scopes (`gmail.send` only)
   - Tokens can be revoked anytime

3. **Encrypted Transport**
   - All requests to Google over HTTPS
   - Tokens stored in Supabase (encrypted at rest)
   - Client Secret never exposed to browser

4. **Minimal Permissions**
   - Only `gmail.send` scope requested
   - Cannot read emails
   - Cannot access other Gmail features

### ⚠️ Security Notes

1. **Lost Refresh Token**
   - If Supabase compromised, tokens could be exposed
   - Solution: Rotate credentials, invalidate tokens
   - Ask users to re-authorize

2. **Client Secret Exposure**
   - Currently visible in `.env.local`
   - Solution: In production, use environment variables in deployment platform
   - Never commit `.env.local` to Git (already in `.gitignore`)

3. **Access Token Expiration**
   - Refresh token automatically gets new access token
   - If refresh fails, falls back to Resend
   - No manual intervention needed

## Troubleshooting

### Issue: "Invalid grant" error

**Cause**: Refresh token expired or revoked

**Solution**:
1. Delete token from Supabase
2. User must authorize again via `/api/auth/authorize`
3. New refresh token will be stored

### Issue: "Insufficient permissions" error

**Cause**: Gmail API scope not granted

**Solution**:
1. Verify `gmail.send` scope in `/api/auth/authorize/route.ts`
2. User must re-authorize
3. Check Google Cloud scopes are correct

### Issue: Emails not sending, no error

**Cause**: Access token refresh failed silently

**Solution**:
1. Check server logs for errors
2. Verify refresh token exists in Supabase
3. Test with direct `/api/auth/authorize` link

### Issue: "Rate limit exceeded"

**Cause**: Too many email sends in short time

**Solution**:
1. Wait 24 hours (Gmail limit resets)
2. Use Resend fallback (separate rate limit)
3. Implement request queuing for production

## Production Deployment

### Required Changes

1. **Update `GOOGLE_REDIRECT_URI`**
   ```
   Production: https://www.designlazyyy.com/api/auth/callback
   Local: http://localhost:3000/api/auth/callback
   ```

2. **Set OAuth Authorized Origins** in Google Cloud
   ```
   https://www.designlazyyy.com
   https://designlazyyy.com
   ```

3. **Environment Variables**
   ```
   Set in deployment platform (Vercel/Cloudflare dashboard):
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - GOOGLE_REDIRECT_URI
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - RESEND_API_KEY (fallback)
   ```

4. **Database**
   - Supabase already configured
   - Tables: `registrations`, `oauth_tokens`

## Code Structure

```
/app
├── /api
│   ├── /auth
│   │   ├── /authorize
│   │   │   └── route.ts          ← Generates OAuth URL
│   │   └── /callback
│   │       └── route.ts          ← Handles OAuth response
│   └── /register
│       └── route.ts              ← Registration + email sending
├── /page.tsx                      ← Main page
└── /layout.tsx

/supabase
└── /migrations
    └── create_oauth_tokens.sql   ← Table creation script
```

## Files Modified

- ✅ `app/api/auth/authorize/route.ts` - New OAuth auth endpoint
- ✅ `app/api/auth/callback/route.ts` - New OAuth callback endpoint
- ✅ `app/api/register/route.ts` - Updated with Gmail API + OAuth
- ✅ `.env.local` - Added OAuth credentials
- ✅ `supabase/migrations/create_oauth_tokens.sql` - New table
- ✅ `package.json` - Added `googleapis` library

## Testing Checklist

- [ ] OAuth authorize endpoint accessible
- [ ] Google OAuth dialog appears
- [ ] After authorization, redirected to home
- [ ] User ID in URL after auth callback
- [ ] Registration form accepts userId parameter
- [ ] Emails sent via Gmail API (check console logs)
- [ ] Confirmation email received
- [ ] Admin email to designlazyyy@gmail.com received
- [ ] Data saved in Supabase registrations table
- [ ] JSON backup created in `/registrations` folder

## Next Steps

1. **Test locally** following the "Testing Locally" section above
2. **Verify emails** are being received
3. **Check Supabase** data is being stored
4. **Deploy to production** with correct environment variables
5. **Monitor logs** for any OAuth or email errors

## Support

For issues or questions:
1. Check server console logs
2. Review Supabase oauth_tokens table
3. Verify Google Cloud Console settings
4. Ensure .env.local has correct credentials
