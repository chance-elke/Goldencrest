import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const leadSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  state: z.string().min(2),
  investment_interest: z.array(z.string()).optional().default([]),
  investment_timeline: z.string().optional().default(''),
  investment_amount: z.string().optional().default(''),
  current_accounts: z.array(z.string()).optional().default([]),
  consent_given: z.literal(true),
  consent_text: z.string().min(10),
  referring_page: z.string().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Extract IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp ?? 'unknown'

    // Extract user agent
    const userAgent = request.headers.get('user-agent') ?? 'unknown'

    const supabase = createServiceClient()

    const { data: inserted, error } = await supabase.from('leads').insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      state: data.state,
      investment_interest: data.investment_interest,
      investment_timeline: data.investment_timeline,
      investment_amount: data.investment_amount,
      current_accounts: data.current_accounts,
      consent_given: data.consent_given,
      consent_text: data.consent_text,
      consent_timestamp: new Date().toISOString(),
      ip_address: ip,
      user_agent: userAgent,
      utm_source: data.utm_source ?? null,
      utm_medium: data.utm_medium ?? null,
      utm_campaign: data.utm_campaign ?? null,
      referring_page: data.referring_page ?? '',
      status: 'new',
    }).select('id').single()

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error))
      return NextResponse.json(
        { error: 'Failed to save your information. Please try again.', debug: { message: error.message, code: error.code, details: error.details, hint: error.hint } },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, lead_id: inserted?.id ?? null }, { status: 201 })
  } catch (err) {
    console.error('Lead submission error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
