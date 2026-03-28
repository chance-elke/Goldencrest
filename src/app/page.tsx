import Link from 'next/link'
import { ArrowRight, ShieldCheck, TrendingUp, BarChart3, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getFeaturedCompanies } from '@/lib/company-data'
import type { Company } from '@/types'
import CompanyCard from '@/components/companies/CompanyCard'
import TrustBadges from '@/components/ui/TrustBadges'
import GoldSpotPrice from '@/components/ui/GoldSpotPrice'

async function getFeaturedCompaniesFromDB(): Promise<Company[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('featured', true)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(3)

    if (error || !data || data.length === 0) {
      return getFeaturedCompanies() as unknown as Company[]
    }
    return data
  } catch {
    return getFeaturedCompanies() as unknown as Company[]
  }
}

const whyGoldCards = [
  {
    icon: TrendingUp,
    title: 'Inflation Hedge',
    description:
      "Gold has historically maintained its purchasing power over long periods of time. As paper currencies lose value to inflation, gold often rises, protecting your wealth's real value.",
  },
  {
    icon: ShieldCheck,
    title: 'Portfolio Diversification',
    description:
      'Gold typically moves independently of stocks and bonds, providing true diversification. When markets crash, gold often holds or increases in value, smoothing portfolio volatility.',
  },
  {
    icon: BarChart3,
    title: 'Tangible Asset',
    description:
      "Unlike stocks or bonds, gold is a physical asset you can hold. It carries no counterparty risk — it won't go to zero because a company failed or a government defaulted.",
  },
]

export default async function HomePage() {
  const featuredCompanies = await getFeaturedCompaniesFromDB()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy-gradient pt-24 lg:pt-32 pb-16 lg:pb-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-sm font-medium">2026 Rankings Updated</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Compare the Best{' '}
              <span className="text-gradient-gold">Gold IRA Companies</span>{' '}
              for 2026
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
              Independent reviews and expert analysis of the top gold IRA providers. Find the right
              company to protect your retirement savings with precious metals — without the sales
              pressure.
            </p>

            {/* Gold spot price widget */}
            <div className="mb-8">
              <GoldSpotPrice />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-started"
                className="btn-gold text-base px-8 py-4 btn-gold-shimmer font-bold"
              >
                Get Your Free Gold IRA Guide
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/reviews"
                className="btn-outline-gold text-base px-8 py-4"
              >
                Compare Companies
              </Link>
            </div>

            <p className="text-gray-500 text-sm mt-4">
              Free, no obligation. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 lg:py-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-gold text-sm font-medium">Top Rated</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our Top Gold IRA Picks for 2026
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These companies earned the highest marks across customer satisfaction, fees,
              educational resources, and overall transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredCompanies.map((company, index) => (
              <CompanyCard
                key={company.id ?? company.slug}
                company={company}
                rank={index + 1}
                featured
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
            >
              View All 8 Companies
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Gold Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Why Invest in Gold for Retirement?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Precious metals have protected wealth for thousands of years. Here&apos;s why smart
              investors are adding gold to their retirement portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyGoldCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{card.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/guide" className="btn-navy text-sm px-6 py-3">
              Read Our Complete Gold IRA Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-navy mb-2">
              Our Commitment to You
            </h2>
            <p className="text-gray-500 text-sm">
              We&apos;re dedicated to providing honest, unbiased information to help you make the best
              decision.
            </p>
          </div>
          <TrustBadges />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Protect Your Retirement Savings?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get our free gold IRA guide and speak with a specialist about the best options
            for your situation. No pressure, no obligation.
          </p>
          <Link
            href="/get-started"
            className="btn-gold text-base px-10 py-4 btn-gold-shimmer font-bold"
          >
            Get Your Free Guide Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            Takes less than 2 minutes. 100% free.
          </p>
        </div>
      </section>
    </>
  )
}
