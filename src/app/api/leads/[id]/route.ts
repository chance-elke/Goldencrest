import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const updateSchema = z.object({
  investment_interest: z.array(z.string()).optional(),
  investment_timeline: z.string().optional(),
  investment_amount: z.string().optional(),
  current_accounts: z.array(z.string()).optional(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    // Only include fields that were provided
    const updates: Record<string, unknown> = {}
    if (parsed.data.investment_interest !== undefined)
      updates.investment_interest = parsed.data.investment_interest
    if (parsed.data.investment_timeline !== undefined)
      updates.investment_timeline = parsed.data.investment_timeline
    if (parsed.data.investment_amount !== undefined)
      updates.investment_amount = parsed.data.investment_amount
    if (parsed.data.current_accounts !== undefined)
      updates.current_accounts = parsed.data.current_accounts

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: true })
    }

    const supabase = createServiceClient()
    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', params.id)

    if (error) {
      console.error('Lead update error:', error)
      return NextResponse.json({ error: 'Update failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
