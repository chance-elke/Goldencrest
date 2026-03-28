import { NextResponse } from 'next/server'

const FALLBACK_PRICE = {
  price: 2345.67,
  currency: 'USD',
  change: 12.4,
  changePercent: 0.53,
  timestamp: Date.now(),
  source: 'fallback',
}

// Simple in-memory cache
let cachedData: typeof FALLBACK_PRICE | null = null
let cacheTime: number = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET() {
  try {
    const now = Date.now()

    // Return cache if valid
    if (cachedData && now - cacheTime < CACHE_TTL) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      })
    }

    // Fetch from metals.live
    const res = await fetch('https://api.metals.live/v1/spot/gold', {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      throw new Error(`metals.live returned ${res.status}`)
    }

    const raw = await res.json()

    // metals.live returns an array like [{ gold: price }]
    let price: number | null = null
    if (Array.isArray(raw) && raw.length > 0) {
      price = raw[0]?.gold ?? null
    } else if (typeof raw === 'object' && raw?.gold) {
      price = raw.gold
    } else if (typeof raw === 'number') {
      price = raw
    }

    if (!price || typeof price !== 'number') {
      throw new Error('Could not parse gold price from response')
    }

    const responseData = {
      price,
      currency: 'USD',
      change: FALLBACK_PRICE.change,
      changePercent: FALLBACK_PRICE.changePercent,
      timestamp: now,
      source: 'metals.live',
    }

    // Update cache
    cachedData = responseData
    cacheTime = now

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    })
  } catch (err) {
    console.warn('Gold price fetch failed, using fallback:', err)

    return NextResponse.json(
      { ...FALLBACK_PRICE, timestamp: Date.now() },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60',
        },
      }
    )
  }
}
