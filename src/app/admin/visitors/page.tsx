'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDate, cn } from '@/lib/utils'
import { Monitor, Smartphone, Tablet, Globe, Clock } from 'lucide-react'

interface PageView {
  id: string
  created_at: string
  page_path: string
  referrer: string | null
  country: string | null
  country_code: string | null
  region: string | null
  city: string | null
  browser: string | null
  browser_version: string | null
  os: string | null
  device_type: string | null
  screen_width: number | null
  screen_height: number | null
  language: string | null
  timezone: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  ip_address: string | null
}

interface Counts {
  [key: string]: number
}

function countBy(rows: PageView[], key: keyof PageView): Counts {
  return rows.reduce((acc, row) => {
    const val = (row[key] as string) || 'Unknown'
    acc[val] = (acc[val] ?? 0) + 1
    return acc
  }, {} as Counts)
}

function topN(counts: Counts, n = 6): [string, number][] {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
}

const DEVICE_ICON: Record<string, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
}

export default function VisitorsPage() {
  const [views, setViews] = useState<PageView[]>([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState<'24h' | '7d' | '30d'>('7d')
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      setLoading(true)
      const hours = range === '24h' ? 24 : range === '7d' ? 168 : 720
      const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()

      const { data } = await supabase
        .from('page_views')
        .select('*')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(2000)

      setViews(data ?? [])
      setLoading(false)
    }
    load()
  }, [range]) // eslint-disable-line react-hooks/exhaustive-deps

  const totalViews = views.length
  const uniqueSessions = new Set(views.map((v) => v.ip_address)).size

  const byCountry = topN(countBy(views, 'country'))
  const byBrowser = topN(countBy(views, 'browser'))
  const byOS = topN(countBy(views, 'os'))
  const byDevice = topN(countBy(views, 'device_type'), 3)
  const byPage = topN(countBy(views, 'page_path'))
  const byReferrer = topN(
    views.reduce((acc, v) => {
      const ref = v.referrer ? new URL(v.referrer).hostname : 'Direct'
      acc[ref] = (acc[ref] ?? 0) + 1
      return acc
    }, {} as Counts)
  )

  const maxPageCount = byPage[0]?.[1] ?? 1

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy">Visitor Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time data from your site visitors</p>
        </div>
        <div className="flex gap-2">
          {(['24h', '7d', '30d'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                range === r
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {r === '24h' ? 'Last 24h' : r === '7d' ? 'Last 7 days' : 'Last 30 days'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy" />
        </div>
      ) : (
        <>
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Page Views', value: totalViews },
              { label: 'Unique Visitors', value: uniqueSessions },
              { label: 'Countries', value: Object.keys(countBy(views, 'country')).length },
              {
                label: 'Mobile %',
                value:
                  totalViews > 0
                    ? Math.round(
                        (views.filter((v) => v.device_type === 'mobile').length / totalViews) * 100
                      ) + '%'
                    : '—',
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-2xl font-bold text-navy">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top pages */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold" /> Top Pages
              </h2>
              {byPage.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {byPage.map(([path, count]) => (
                    <div key={path}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-mono truncate max-w-[200px]">{path || '/'}</span>
                        <span className="text-gray-500 font-medium ml-2 flex-shrink-0">{count}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-gold h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(count / maxPageCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top countries */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-navy mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold" /> Top Countries
              </h2>
              {byCountry.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No geo data yet</p>
              ) : (
                <div className="space-y-2">
                  {byCountry.map(([country, count]) => (
                    <div key={country} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{country}</span>
                      <span className="text-gray-500 font-medium">{count} views</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Browsers */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-navy mb-4">Browsers</h2>
              <div className="space-y-2">
                {byBrowser.map(([browser, count]) => (
                  <div key={browser} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{browser}</span>
                    <span className="text-gray-500 font-medium">
                      {count} ({totalViews > 0 ? Math.round((count / totalViews) * 100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* OS + Device */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
              <div>
                <h2 className="font-semibold text-navy mb-3">Operating Systems</h2>
                <div className="space-y-2">
                  {byOS.map(([os, count]) => (
                    <div key={os} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{os}</span>
                      <span className="text-gray-500 font-medium">
                        {count} ({totalViews > 0 ? Math.round((count / totalViews) * 100) : 0}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-navy mb-3">Device Type</h2>
                <div className="flex gap-4">
                  {byDevice.map(([type, count]) => {
                    const Icon = DEVICE_ICON[type] ?? Monitor
                    return (
                      <div key={type} className="flex items-center gap-2 text-sm">
                        <Icon className="w-4 h-4 text-gold" />
                        <span className="capitalize text-gray-700">{type}</span>
                        <span className="text-gray-500 font-medium">
                          {totalViews > 0 ? Math.round((count / totalViews) * 100) : 0}%
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Traffic sources */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-navy mb-4">Traffic Sources</h2>
              <div className="space-y-2">
                {byReferrer.map(([ref, count]) => (
                  <div key={ref} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 truncate max-w-[200px]">{ref}</span>
                    <span className="text-gray-500 font-medium ml-2">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent visits table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-navy flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" /> Recent Visits
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Page</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Browser</th>
                    <th className="px-4 py-3 font-medium">OS</th>
                    <th className="px-4 py-3 font-medium">Device</th>
                    <th className="px-4 py-3 font-medium">Language</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {views.slice(0, 50).map((v) => {
                    const DeviceIcon = DEVICE_ICON[v.device_type ?? 'desktop'] ?? Monitor
                    return (
                      <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          <span className="block text-xs text-gray-400">
                            {new Date(v.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-700 max-w-[150px] truncate">
                          {v.page_path || '/'}
                        </td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                          {v.city && v.country ? `${v.city}, ${v.country}` : v.country || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {v.browser ?? '—'}
                          {v.browser_version && (
                            <span className="text-gray-400 text-xs ml-1">v{v.browser_version.split('.')[0]}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700">{v.os ?? '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-gray-500 capitalize">
                            <DeviceIcon className="w-3.5 h-3.5" />
                            {v.device_type ?? '—'}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{v.language ?? '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {views.length === 0 && (
                <p className="text-center text-gray-400 py-12">No visits recorded yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
