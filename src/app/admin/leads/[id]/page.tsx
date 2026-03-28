'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { formatDateTime, cn } from '@/lib/utils'
import type { Lead, LeadStatus } from '@/types'

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'qualified', label: 'Qualified', color: 'bg-purple-100 text-purple-700' },
  { value: 'sold', label: 'Sold', color: 'bg-green-100 text-green-700' },
  { value: 'dead', label: 'Dead', color: 'bg-gray-100 text-gray-500' },
]

const AMOUNT_LABELS: Record<string, string> = {
  under_10k: 'Under $10,000',
  '10k_25k': '$10,000 – $25,000',
  '25k_50k': '$25,000 – $50,000',
  '50k_100k': '$50,000 – $100,000',
  over_100k: '$100,000+',
}

export default function LeadDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [lead, setLead] = useState<Lead | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<LeadStatus>('new')
  const [notes, setNotes] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await fetch(`/api/admin/leads/${params.id}`)
        if (!res.ok) {
          router.push('/admin/leads')
          return
        }
        const data: Lead = await res.json()
        setLead(data)
        setStatus(data.status)
        setNotes(data.notes ?? '')
      } catch {
        router.push('/admin/leads')
      } finally {
        setIsLoading(false)
      }
    }
    fetchLead()
  }, [params.id, router])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    try {
      const res = await fetch(`/api/admin/leads/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      })
      if (res.ok) {
        const updated: Lead = await res.json()
        setLead(updated)
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch {
      alert('Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!lead) return null

  const currentStatusOption = STATUS_OPTIONS.find((s) => s.value === lead.status)

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg border border-gray-200 hover:border-navy text-gray-500 hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-navy">{lead.full_name}</h1>
          <p className="text-gray-500 text-sm">{formatDateTime(lead.created_at)}</p>
        </div>
        <div className="ml-auto">
          <span className={cn('px-3 py-1.5 rounded-full text-sm font-medium', currentStatusOption?.color)}>
            {currentStatusOption?.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Lead details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Contact info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Full Name</p>
                <p className="font-medium text-navy">{lead.full_name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Email</p>
                <a href={`mailto:${lead.email}`} className="text-gold hover:underline font-medium">{lead.email}</a>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Phone</p>
                <a href={`tel:${lead.phone}`} className="text-gold hover:underline font-medium">{lead.phone}</a>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">State</p>
                <p className="font-medium text-navy">{lead.state}</p>
              </div>
            </div>
          </div>

          {/* Investment details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Investment Profile</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Investment Interest</p>
                <p className="font-medium text-navy">{(lead.investment_interest ?? []).join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Timeline</p>
                <p className="font-medium text-navy">{lead.investment_timeline}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Investment Amount</p>
                <p className="font-bold text-navy">{AMOUNT_LABELS[lead.investment_amount] ?? lead.investment_amount}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Current Accounts</p>
                <p className="font-medium text-navy">{(lead.current_accounts ?? []).join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Marketing / Technical */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Technical Details</h2>
            <div className="space-y-2 text-sm">
              {[
                { label: 'IP Address', value: lead.ip_address },
                { label: 'UTM Source', value: lead.utm_source ?? 'none' },
                { label: 'UTM Medium', value: lead.utm_medium ?? 'none' },
                { label: 'UTM Campaign', value: lead.utm_campaign ?? 'none' },
                { label: 'Referring Page', value: lead.referring_page },
                { label: 'Consent Timestamp', value: lead.consent_timestamp ? formatDateTime(lead.consent_timestamp) : 'N/A' },
              ].map((item) => (
                <div key={item.label} className="flex gap-2">
                  <span className="text-gray-500 w-36 flex-shrink-0">{item.label}:</span>
                  <span className="text-navy font-medium break-all">{item.value}</span>
                </div>
              ))}
            </div>
            <details className="mt-4">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-navy transition-colors">User Agent</summary>
              <p className="text-xs text-gray-500 mt-2 break-all leading-relaxed">{lead.user_agent}</p>
            </details>
            <details className="mt-3">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-navy transition-colors">Consent Text</summary>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">{lead.consent_text}</p>
            </details>
          </div>
        </div>

        {/* Right: Status & Notes */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 className="font-bold text-navy mb-4">Update Lead</h2>

            <div className="mb-4">
              <label className="label">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="input-field"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="label">Internal Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="input-field resize-none"
                placeholder="Add notes about this lead..."
              />
            </div>

            {saveSuccess && (
              <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">Changes saved successfully.</p>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-gold w-full justify-center py-2.5 text-sm"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
