import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getAllCompanies } from '@/lib/company-data'
import type { Company } from '@/types'
import CompanyCard from '@/components/companies/CompanyCard'
import CompanyTable from '@/components/companies/CompanyTable'

export const metadata: Metadata = {
  title: 'Best Gold IRA Companies for 2026 – Reviews & Ratings',
  description:
    'Compare the top 8 gold IRA companies for 2026. See ratings, fees, minimums, and expert analysis to find the best gold IRA provider for your retirement.',
}

async function getAllCompaniesFromDB(): Promise<Company[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return getAllCompanies() as unknown as Company[]
    }
    return data
  } catch {
    return getAllCompanies() as unknown as Company[]
  }
}

export default async function ReviewsPage() {
  const companies = await getAllCompaniesFromDB()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-24 lg:pt-32 pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-gold text-sm font-medium">2026 Rankings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Best Gold IRA Companies for 2026
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              We&apos;ve analyzed the top gold IRA companies on fees, customer service, reputation, and
              transparency. Here are our independent rankings to help you choose the right provider.
            </p>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              <strong>Affiliate Disclosure:</strong> This site may receive compensation
              when you click links or submit forms through this site. This does not influence our
              rankings — all reviews reflect our genuine assessment. We are an independent
              publisher, not affiliated with any listed company.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6">
            Quick Comparison Table
          </h2>
          <CompanyTable companies={companies} />
        </div>
      </section>

      {/* Company Cards */}
      <section className="py-12 lg:py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-8">
            In-Depth Company Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {companies.map((company, index) => (
              <CompanyCard
                key={company.id ?? company.slug}
                company={company}
                rank={index + 1}
                featured={company.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Not Sure Which Company Is Right for You?
          </h2>
          <p className="text-gray-300 mb-6">
            Tell us about your investment goals and we&apos;ll help you find the best match.
          </p>
          <Link href="/get-started" className="btn-gold font-bold px-8 py-3">
            Get Matched Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
