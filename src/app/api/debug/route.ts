import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'NOT SET'
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  const serviceKeyPrefix = process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20) ?? 'NOT SET'
  const anonKeyPrefix = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) ?? 'NOT SET'

  return NextResponse.json({
    supabase_url: url,
    has_service_key: hasServiceKey,
    service_key_starts_with: serviceKeyPrefix,
    anon_key_starts_with: anonKeyPrefix,
  })
}
