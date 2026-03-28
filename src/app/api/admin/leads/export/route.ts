import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import Papa from 'papaparse'

async function checkAuth() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function GET(_request: NextRequest) {
  const user = await checkAuth()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to export leads' }, { status: 500 })
  }

  const exportData = (data ?? []).map((lead) => ({
    id: lead.id,
    date: lead.created_at,
    full_name: lead.full_name,
    email: lead.email,
    phone: lead.phone,
    state: lead.state,
    investment_interest: (lead.investment_interest ?? []).join(', '),
    investment_timeline: lead.investment_timeline,
    investment_amount: lead.investment_amount,
    current_accounts: (lead.current_accounts ?? []).join(', '),
    status: lead.status,
    utm_source: lead.utm_source ?? '',
    utm_medium: lead.utm_medium ?? '',
    utm_campaign: lead.utm_campaign ?? '',
    referring_page: lead.referring_page,
    consent_given: lead.consent_given,
    consent_timestamp: lead.consent_timestamp,
    ip_address: lead.ip_address,
    notes: lead.notes ?? '',
  }))

  const csv = Papa.unparse(exportData)

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  })
}
