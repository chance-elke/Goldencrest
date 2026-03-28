-- Page views tracking table
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Page info
  page_url TEXT,
  page_path TEXT,
  referrer TEXT,
  -- Visitor identity
  session_id TEXT,        -- random ID stored in sessionStorage (not persistent across sessions)
  ip_address TEXT,
  -- Geo (derived server-side from IP)
  country TEXT,
  country_code TEXT,
  region TEXT,
  city TEXT,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  timezone TEXT,
  -- Device / browser (derived from user-agent server-side)
  user_agent TEXT,
  browser TEXT,
  browser_version TEXT,
  os TEXT,
  device_type TEXT,       -- 'desktop', 'mobile', 'tablet'
  -- Client-side extras (sent from browser)
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT,
  -- UTM
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (tracking fires client-side)
CREATE POLICY "Anyone can insert page views" ON page_views
  FOR INSERT WITH CHECK (TRUE);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read page views" ON page_views
  FOR SELECT USING (auth.role() = 'authenticated');

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views (country);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views (page_path);
