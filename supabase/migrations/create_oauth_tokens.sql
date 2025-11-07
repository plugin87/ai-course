-- Create oauth_tokens table for storing Google OAuth refresh tokens
CREATE TABLE IF NOT EXISTS oauth_tokens (
  id TEXT PRIMARY KEY,
  refresh_token TEXT NOT NULL,
  access_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_oauth_tokens_created_at ON oauth_tokens(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE oauth_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for server-side operations)
CREATE POLICY "Allow service role to insert" ON oauth_tokens
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow updates (for server-side operations)
CREATE POLICY "Allow service role to update" ON oauth_tokens
  FOR UPDATE
  USING (true);

-- Create policy to allow selects (for server-side operations)
CREATE POLICY "Allow service role to select" ON oauth_tokens
  FOR SELECT
  USING (true);
