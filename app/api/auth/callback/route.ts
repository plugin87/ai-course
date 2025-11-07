import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('OAuth credentials not configured')
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }).toString(),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Token exchange failed: ${error.error_description}`)
  }

  return response.json()
}

async function storeRefreshToken(userId: string, refreshToken: string, accessToken: string, expiresIn: number) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return false
  }

  try {
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString()

    const { error } = await supabase
      .from('oauth_tokens')
      .upsert(
        {
          id: userId,
          refresh_token: refreshToken,
          access_token: accessToken,
          expires_at: expiresAt,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )

    if (error) {
      console.error('Supabase upsert error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error storing refresh token:', error)
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    // Handle authorization error
    if (error) {
      console.error('Authorization error:', error)
      return NextResponse.redirect(
        new URL(`/auth-error?error=${encodeURIComponent(error)}`, request.url)
      )
    }

    if (!code) {
      return NextResponse.json(
        { error: 'No authorization code provided' },
        { status: 400 }
      )
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code)
    const { refresh_token, access_token, expires_in } = tokens

    // Generate a user ID (in production, this would come from user session)
    const userId = `gmail_user_${Date.now()}`

    // Store refresh token in Supabase
    const stored = await storeRefreshToken(userId, refresh_token, access_token, expires_in)

    if (stored) {
      console.log('Refresh token stored successfully')
      // Redirect to success page or back to form with user ID in session
      return NextResponse.redirect(
        new URL(`/?auth=success&user_id=${userId}`, request.url)
      )
    } else {
      return NextResponse.redirect(
        new URL('/?auth=error', request.url)
      )
    }
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(
      new URL(
        `/?auth=error&message=${encodeURIComponent(String(error))}`,
        request.url
      )
    )
  }
}
