import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, X, ArrowRight, ExternalLink, Building2, Calendar, DollarSign, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getCompanyBySlug, getAllCompanies, COMPANY_SEED_DATA } from '@/lib/company-data'
import type { Company } from '@/types'
import StarRating from '@/components/ui/StarRating'
import CompanyCard from '@/components/companies/CompanyCard'
import { formatCurrency } from '@/lib/utils'

interface PageProps {
  params: { slug: string }
}

async function getCompanyFromDB(slug: string): Promise<Company | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      const fallback = getCompanyBySlug(slug)
      return fallback as unknown as Company | null
    }
    return data
  } catch {
    const fallback = getCompanyBySlug(slug)
    return fallback as unknown as Company | null
  }
}

async function getRelatedCompanies(currentSlug: string): Promise<Company[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('is_active', true)
      .neq('slug', currentSlug)
      .order('display_order', { ascending: true })
      .limit(3)

    if (error || !data || data.length === 0) {
      return getAllCompanies()
        .filter((c) => c.slug !== currentSlug)
        .slice(0, 3) as unknown as Company[]
    }
    return data
  } catch {
    return getAllCompanies()
      .filter((c) => c.slug !== currentSlug)
      .slice(0, 3) as unknown as Company[]
  }
}

export async function generateStaticParams() {
  return COMPANY_SEED_DATA.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = await getCompanyFromDB(params.slug)

  if (!company) {
    return { title: 'Company Not Found' }
  }

  return {
    title: `${company.name} Review 2026 – Ratings, Fees & Pros/Cons`,
    description: `Read our in-depth ${company.name} review. See ratings, fees, minimum investment ($${company.minimum_investment.toLocaleString()}), pros, cons, and whether it's right for you.`,
    openGraph: {
      title: `${company.name} Review 2026`,
      description: `In-depth review of ${company.name}. Rating: ${company.star_rating}/5, BBB: ${company.bbb_rating}, Min: $${company.minimum_investment.toLocaleString()}`,
    },
  }
}

export default async function CompanyReviewPage({ params }: PageProps) {
  const [company, relatedCompanies] = await Promise.all([
    getCompanyFromDB(params.slug),
    getRelatedCompanies(params.slug),
  ])

  if (!company) {
    notFound()
  }

  const descriptionParagraphs = company.full_description.split('\n\n').filter(Boolean)

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-24 lg:pt-32 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-2 text-gray-400 text-sm mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/reviews" className="hover:text-gold transition-colors">Reviews</Link>
            <span>/</span>
            <span className="text-gold">{company.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="flex-1">
              {company.featured && (
                <span className="inline-flex items-center gap-1.5 bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full border border-gold/30 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  Top Pick
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {company.name} Review 2026
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <StarRating rating={company.star_rating} size="lg" />
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">BBB:</span>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-500/20 text-green-400 font-bold text-sm border border-green-500/30">
                    {company.bbb_rating}
                  </span>
                </div>
                {company.bca_rating && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">BCA:</span>
                    <span className="badge-gold">{company.bca_rating}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Est. {company.founded_year}</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                {company.key_selling_point}
              </p>
            </div>

            <div className="lg:w-72">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-center mb-4">
                  {company.logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={company.logo_url} alt={company.name} className="h-16 mx-auto object-contain" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gold/20 border border-gold/30 flex items-center justify-center mx-auto">
                      <span className="text-gold font-bold text-2xl">
                        {company.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  href="/get-started"
                  className="btn-gold w-full justify-center text-sm py-3 mb-3"
                >
                  Get Free Information
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Visit Website
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Grid */}
      <section className="py-8 bg-[#f8f9fa] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-500 font-medium">Min. Investment</span>
              </div>
              <p className="font-bold text-navy text-lg">
                {formatCurrency(company.minimum_investment)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-500 font-medium">Annual Fees</span>
              </div>
              <p className="font-bold text-navy text-sm leading-tight">{company.annual_fees}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-gold" />
                <span className="text-xs text-gray-500 font-medium">Storage</span>
              </div>
              <p className="font-bold text-navy text-sm leading-tight">
                {company.storage_facilities}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 font-medium">Metals Offered</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {company.metals_offered.map((metal: string) => (
                  <span key={metal} className="badge-gold text-xs">{metal}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  {company.name} Overview
                </h2>
                <div className="space-y-4">
                  {descriptionParagraphs.map((para: string, idx: number) => (
                    <p key={idx} className="text-gray-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Pros & Cons
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      Pros
                    </h3>
                    <ul className="space-y-3">
                      {company.pros.map((pro: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                      <X className="w-5 h-5 text-red-600" />
                      Cons
                    </h3>
                    <ul className="space-y-3">
                      {company.cons.map((con: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">Fee Breakdown</h2>
                <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="text-left px-5 py-3 font-semibold">Fee Type</th>
                        <th className="text-left px-5 py-3 font-semibold">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200 bg-white">
                        <td className="px-5 py-3 font-medium text-navy">Annual Fees</td>
                        <td className="px-5 py-3 text-gray-600">{company.annual_fees}</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50">
                        <td className="px-5 py-3 font-medium text-navy">Custodians</td>
                        <td className="px-5 py-3 text-gray-600">{company.custodians}</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-white">
                        <td className="px-5 py-3 font-medium text-navy">Storage Facilities</td>
                        <td className="px-5 py-3 text-gray-600">{company.storage_facilities}</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-gray-50">
                        <td className="px-5 py-3 font-medium text-navy">Buyback Policy</td>
                        <td className="px-5 py-3 text-gray-600">{company.buyback_policy}</td>
                      </tr>
                      <tr className="border-t border-gray-200 bg-white">
                        <td className="px-5 py-3 font-medium text-navy">Minimum Investment</td>
                        <td className="px-5 py-3 text-gray-600">
                          {formatCurrency(company.minimum_investment)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-navy rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Interested in {company.name}?
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Get matched with the best gold IRA option for your specific situation. Our specialists
                  will help you compare {company.name} with other top providers.
                </p>
                <Link href="/get-started" className="btn-gold px-8 py-3 font-bold">
                  Get Free Information
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-navy mb-4">Quick Facts</h3>
                <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Founded</span>
                      <span className="text-sm font-semibold text-navy">{company.founded_year}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">BBB Rating</span>
                      <span className="text-sm font-semibold text-green-700">{company.bbb_rating}</span>
                    </div>
                    {company.bca_rating && (
                      <div className="px-4 py-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">BCA Rating</span>
                        <span className="text-sm font-semibold text-green-700">{company.bca_rating}</span>
                      </div>
                    )}
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Our Rating</span>
                      <StarRating rating={company.star_rating} size="sm" />
                    </div>
                    <div className="px-4 py-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Min. Investment</span>
                      <span className="text-sm font-semibold text-navy">
                        {formatCurrency(company.minimum_investment)}
                      </span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-sm text-gray-500">Best For</span>
                      <p className="text-sm font-medium text-navy mt-1">{company.best_for}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-navy mb-4">Related Companies</h3>
                <div className="space-y-4">
                  {relatedCompanies.map((related) => (
                    <div key={related.id ?? related.slug} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Link
                          href={`/reviews/${related.slug}`}
                          className="font-semibold text-navy text-sm hover:text-gold transition-colors"
                        >
                          {related.name}
                        </Link>
                        <StarRating rating={related.star_rating} size="sm" showLabel={false} />
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        Min: {formatCurrency(related.minimum_investment)}
                      </p>
                      <Link
                        href={`/reviews/${related.slug}`}
                        className="text-xs text-gold hover:underline font-medium"
                      >
                        Read Review →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
