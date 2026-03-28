'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, TrendingUp, Award, BarChart3, ArrowRight, RefreshCw } from 'lucide-react'
import { formatDate, cn } from '@/lib/utils'
import type { Lead } from '@/types'

interface Stats {
  totalLeads: number
  newLeadsToday: number
  qualifiedLeads: number
  conversionRate: number
}

interface LeadsByAmount {
  amount: string
  count: number
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  sold: 'bg-green-100 text-green-700',
  dead: 'bg-gray-100 text-gray-500',
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeadsToday: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
  })
  const [leadsByAmount, setLeadsByAmount] = useState<LeadsByAmount[]>([])
  const [leadsPerDay, setLeadsPerDay] = useState<{ date: string; count: number }[]>([])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/leads?limit=100&sort=created_at&order=desc')
      const data = await res.json()
      const allLeads: Lead[] = data.data ?? []

      setLeads(allLeads.slice(0, 10))

      // Calculate stats
      const today = new Date().toDateString()
      const newToday = allLeads.filter(
        (l) => new Date(l.created_at).toDateString() === today
      ).length
      const qualified = allLeads.filter((l) =>
        ['qualified', 'sold'].includes(l.status)
      ).length

      setStats({
        totalLeads: data.total ?? allLeads.length,
        newLeadsToday: newToday,
        qualifiedLeads: qualified,
        conversionRate: allLeads.length > 0 ? Math.round((qualified / allLeads.length) * 100) : 0,
      })

      // By amount
      const amountMap: Record<string, number> = {}
      allLeads.forEach((l) => {
        const key = l.investment_amount ?? 'Unknown'
        amountMap[key] = (amountMap[key] ?? 0) + 1
      })
      setLeadsByAmount(
        Object.entries(amountMap)
          .map(([amount, count]) => ({ amount, count }))
          .sort((a, b) => b.count - a.count)
      )

      // Leads per day (last 7 days)
      const days: { date: string; count: number }[] = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateStr = d.toDateString()
        const count = allLeads.filter(
          (l) => new Date(l.created_at).toDateString() === dateStr
        ).length
        days.push({
          date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          count,
        })
      }
      setLeadsPerDay(days)
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData()
  }, [])

  const maxDayCount = Math.max(...leadsPerDay.map((d) => d.count), 1)

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'text-blue-600' },
    { label: 'New Today', value: stats.newLeadsToday, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Qualified', value: stats.qualifiedLeads, icon: Award, color: 'text-purple-600' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: BarChart3, color: 'text-gold' },
  ]

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Overview of your lead generation performance</p>
        </div>
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-navy transition-colors"
        >
          <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{card.label}</span>
                <Icon className={cn('w-5 h-5', card.color)} />
              </div>
              <p className="text-3xl font-bold text-navy">
                {isLoading ? '–' : card.value}
              </p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads per day chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="font-bold text-navy mb-5">Leads Per Day (Last 7 Days)</h2>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-gray-400">Loading...</div>
          ) : (
            <div className="flex items-end gap-2 h-40">
              {leadsPerDay.map((day) => (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-semibold text-navy">{day.count}</span>
                  <div
                    className="w-full bg-gold/20 rounded-t-md transition-all duration-500 hover:bg-gold"
                    style={{
                      height: `${(day.count / maxDayCount) * 100}%`,
                      minHeight: day.count > 0 ? '8px' : '4px',
                    }}
                  />
                  <span className="text-xs text-gray-400 text-center leading-tight">
                    {day.date.split(',')[0]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* By investment amount */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="font-bold text-navy mb-5">By Investment Amount</h2>
          {isLoading ? (
            <div className="h-40 flex items-center justify-center text-gray-400">Loading...</div>
          ) : leadsByAmount.length === 0 ? (
            <p className="text-sm text-gray-400">No data yet</p>
          ) : (
            <div className="space-y-3">
              {leadsByAmount.map((item) => {
                const pct = Math.round((item.count / stats.totalLeads) * 100)
                return (
                  <div key={item.amount}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 truncate">{item.amount}</span>
                      <span className="font-semibold text-navy ml-2">{item.count}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-1.5 bg-gold rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-navy">Recent Leads</h2>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-sm text-gold hover:text-gold-600 font-medium transition-colors"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No leads yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-5 py-3 font-medium text-navy">
                      <Link href={`/admin/leads/${lead.id}`} className="hover:text-gold transition-colors">
                        {lead.full_name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{lead.email}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{lead.investment_amount}</td>
                    <td className="px-5 py-3">
                      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', STATUS_COLORS[lead.status] ?? 'bg-gray-100 text-gray-600')}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
