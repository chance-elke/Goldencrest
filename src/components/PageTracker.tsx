'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function generateSessionId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function getOrCreateSessionId(): string {
  try {
    let id = sessionStorage.getItem('_sid')
    if (!id) {
      id = generateSessionId()
      sessionStorage.setItem('_sid', id)
    }
    return id
  } catch {
    return generateSessionId()
  }
}

export default function PageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Skip admin routes
    if (pathname.startsWith('/admin')) return

    const params = new URLSearchParams(searchParams.toString())

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_url: window.location.href,
        page_path: pathname,
        referrer: document.referrer || null,
        session_id: getOrCreateSessionId(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        language: navigator.language,
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
      }),
    }).catch(() => {}) // silently ignore errors — never affect UX
  }, [pathname, searchParams])

  return null
}
