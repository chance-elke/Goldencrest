import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Parse browser name + version from user-agent string
function parseBrowser(ua: string): { browser: string; version: string } {
  if (/Edg\//.test(ua)) {
    const v = ua.match(/Edg\/([\d.]+)/)?.[1] ?? ''
    return { browser: 'Edge', version: v }
  }
  if (/OPR\/|Opera\//.test(ua)) {
    const v = ua.match(/(?:OPR|Opera)\/([\d.]+)/)?.[1] ?? ''
    return { browser: 'Opera', version: v }
  }
  if (/Chrome\//.test(ua)) {
    const v = ua.match(/Chrome\/([\d.]+)/)?.[1] ?? ''
    return { browser: 'Chrome', version: v }
  }
  if (/Firefox\//.test(ua)) {
    const v = ua.match(/Firefox\/([\d.]+)/)?.[1] ?? ''
    return { browser: 'Firefox', version: v }
  }
  if (/Safari\//.test(ua) && /Version\//.test(ua)) {
    const v = ua.match(/Version\/([\d.]+)/)?.[1] ?? ''
    return { browser: 'Safari', version: v }
  }
  return { browser: 'Other', version: '' }
}

// Parse OS from user-agent string
function parseOS(ua: string): string {
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11'
  if (/Windows NT 6/.test(ua)) return 'Windows 7/8'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Mac OS X/.test(ua)) return 'macOS'
  if (/iPhone|iPad/.test(ua)) return 'iOS'
  if (/Android/.test(ua)) return 'Android'
  if (/Linux/.test(ua)) return 'Linux'
  return 'Other'
}

// Parse device type from user-agent string
function parseDeviceType(ua: string): string {
  if (/iPad/.test(ua)) return 'tablet'
  if (/Mobi|Android|iPhone/.test(ua)) return 'mobile'
  return 'desktop'
}

// Simple in-memory geo cache to reduce external API calls
const geoCache = new Map<string, Record<string, unknown>>()

async function getGeo(ip: string): Promise<Record<string, unknown>> {
  if (!ip || ip === '127.0.0.1' || ip === '::1') return {}
  if (geoCache.has(ip)) return geoCache.get(ip)!

  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      signal: AbortSignal.timeout(2000),
    })
    if (!res.ok) return {}
    const data = await res.json()
    if (!data.success) return {}

    const geo = {
      country: data.country ?? null,
      country_code: data.country_code ?? null,
      region: data.region ?? null,
      city: data.city ?? null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      timezone: data.timezone?.id ?? null,
    }
    geoCache.set(ip, geo)
    // Evict cache if it grows large
    if (geoCache.size > 500) {
      const firstKey = geoCache.keys().next().value
      if (firstKey) geoCache.delete(firstKey)
    }
    return geo
  } catch {
    return {}
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    const userAgent = request.headers.get('user-agent') ?? ''
    const { browser, version: browserVersion } = parseBrowser(userAgent)
    const os = parseOS(userAgent)
    const deviceType = parseDeviceType(userAgent)

    const geo = await getGeo(ip)

    const supabase = createServiceClient()
    await supabase.from('page_views').insert({
      page_url: body.page_url ?? null,
      page_path: body.page_path ?? null,
      referrer: body.referrer ?? null,
      session_id: body.session_id ?? null,
      ip_address: ip,
      country: geo.country ?? null,
      country_code: geo.country_code ?? null,
      region: geo.region ?? null,
      city: geo.city ?? null,
      latitude: geo.latitude ?? null,
      longitude: geo.longitude ?? null,
      timezone: (body.timezone as string) || (geo.timezone as string) || null,
      user_agent: userAgent,
      browser,
      browser_version: browserVersion,
      os,
      device_type: deviceType,
      screen_width: body.screen_width ?? null,
      screen_height: body.screen_height ?? null,
      language: body.language ?? null,
      utm_source: body.utm_source ?? null,
      utm_medium: body.utm_medium ?? null,
      utm_campaign: body.utm_campaign ?? null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Never block the user experience for tracking errors
    return NextResponse.json({ ok: false })
  }
}
