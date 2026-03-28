import Link from 'next/link'
import { Check, ExternalLink, Award } from 'lucide-react'
import type { Company } from '@/types'
import StarRating from '@/components/ui/StarRating'
import { formatCurrency } from '@/lib/utils'

interface CompanyCardProps {
  company: Company
  rank?: number
  featured?: boolean
}

function CompanyInitials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
      <span className="text-gold font-bold text-lg">{initials}</span>
    </div>
  )
}

export default function CompanyCard({ company, rank, featured }: CompanyCardProps) {
  return (
    <div className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient rounded-t-xl" />
      )}
      {rank && rank <= 3 && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-full border border-gold/20">
            <Award className="w-3 h-3" />
            #{rank}
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          {company.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logo_url}
              alt={`${company.name} logo`}
              className="w-16 h-16 object-contain rounded-xl border border-gray-100"
            />
          ) : (
            <CompanyInitials name={company.name} />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-navy text-lg leading-tight mb-1 pr-8">
              {company.name}
            </h3>
            <StarRating rating={company.star_rating} size="sm" />
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-gray-500">BBB:</span>
              <span className="badge-gold">{company.bbb_rating}</span>
              {company.bca_rating && (
                <>
                  <span className="text-xs text-gray-500">BCA:</span>
                  <span className="badge-gold">{company.bca_rating}</span>
                </>
              )}
              <span className="text-xs text-gray-500">
                Est. {company.founded_year}
              </span>
            </div>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-0.5">Min. Investment</p>
            <p className="font-bold text-navy text-sm">
              {formatCurrency(company.minimum_investment)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-0.5">Annual Fees</p>
            <p className="font-bold text-navy text-sm leading-tight">
              {company.annual_fees.length > 20
                ? company.annual_fees.slice(0, 20) + '…'
                : company.annual_fees}
            </p>
          </div>
        </div>

        {/* Metals offered */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Metals Offered</p>
          <div className="flex flex-wrap gap-1.5">
            {company.metals_offered.map((metal) => (
              <span key={metal} className="badge-navy text-xs">
                {metal}
              </span>
            ))}
          </div>
        </div>

        {/* Key selling point */}
        <div className="bg-gold/5 border border-gold/20 rounded-lg p-3 mb-5">
          <p className="text-xs font-medium text-gold mb-1">Why Choose Them</p>
          <p className="text-xs text-gray-700 leading-relaxed">
            {company.key_selling_point}
          </p>
        </div>

        {/* Best for */}
        <div className="flex items-start gap-2 mb-5">
          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600">
            <span className="font-medium text-navy">Best for: </span>
            {company.best_for}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/get-started"
            className="btn-gold w-full justify-center text-sm py-2.5"
          >
            Get Free Information
          </Link>
          <Link
            href={`/reviews/${company.slug}`}
            className="flex items-center justify-center gap-1 text-navy text-sm font-medium hover:text-gold transition-colors py-1"
          >
            Read Full Review
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
