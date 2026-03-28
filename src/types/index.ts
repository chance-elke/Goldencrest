export interface Company {
  id: string
  created_at: string
  updated_at: string
  name: string
  slug: string
  logo_url: string | null
  founded_year: number
  bbb_rating: string
  bca_rating: string | null
  star_rating: number
  minimum_investment: number
  annual_fees: string
  metals_offered: string[]
  custodians: string
  storage_facilities: string
  buyback_policy: string
  key_selling_point: string
  best_for: string
  pros: string[]
  cons: string[]
  full_description: string
  website_url: string
  is_active: boolean
  display_order: number
  featured: boolean
}

export interface Lead {
  id: string
  created_at: string
  full_name: string
  email: string
  phone: string
  state: string
  investment_interest: string[]
  investment_timeline: string
  investment_amount: string
  current_accounts: string[]
  consent_given: boolean
  consent_text: string
  consent_timestamp: string
  ip_address: string
  user_agent: string
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referring_page: string
  status: 'new' | 'contacted' | 'qualified' | 'sold' | 'dead'
  notes: string | null
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'sold' | 'dead'

export interface FormStep {
  step: number
  title: string
  description: string
}

export interface LeadFormData {
  investment_interest: string[]
  investment_timeline: string
  investment_amount: string
  current_accounts: string[]
  full_name: string
  email: string
  phone: string
  state: string
  consent_given: boolean
}

export interface GoldPrice {
  price: number
  currency: string
  timestamp: number
  change?: number
  changePercent?: number
}

export interface PaginatedLeads {
  data: Lead[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DashboardStats {
  totalLeads: number
  newLeadsToday: number
  qualifiedLeads: number
  conversionRate: number
}
