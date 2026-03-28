-- Allow service role to bypass RLS for all admin operations
-- The service role key automatically bypasses RLS in Supabase,
-- so this migration adds additional policies for completeness
-- and documents the intent.

-- Allow service role full access to companies
CREATE POLICY "Service role can manage all companies" ON companies
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow service role full access to leads
CREATE POLICY "Service role can manage all leads" ON leads
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow service role to insert leads without consent check
-- (for admin-created leads)
CREATE POLICY "Service role can insert any lead" ON leads
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Add index on leads for common query patterns
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_companies_slug ON companies(slug);
CREATE INDEX IF NOT EXISTS idx_companies_display_order ON companies(display_order);
CREATE INDEX IF NOT EXISTS idx_companies_featured ON companies(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_companies_active ON companies(is_active) WHERE is_active = TRUE;
