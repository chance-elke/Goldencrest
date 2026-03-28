'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import type { Company } from '@/types'
import StarRating from '@/components/ui/StarRating'
import { formatCurrency, cn } from '@/lib/utils'

type SortField = 'name' | 'star_rating' | 'bbb_rating' | 'minimum_investment' | 'annual_fees'
type SortOrder = 'asc' | 'desc'

interface CompanyTableProps {
  companies: Company[]
}

function SortIcon({ field, sortField, sortOrder }: {
  field: SortField
  sortField: SortField
  sortOrder: SortOrder
}) {
  if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />
  if (sortOrder === 'asc') return <ChevronUp className="w-3.5 h-3.5 text-gold" />
  return <ChevronDown className="w-3.5 h-3.5 text-gold" />
}

export default function CompanyTable({ companies }: CompanyTableProps) {
  const [sortField, setSortField] = useState<SortField>('star_rating')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sorted = [...companies].sort((a, b) => {
    let aVal: string | number = a[sortField] as string | number
    let bVal: string | number = b[sortField] as string | number

    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const columns: { field: SortField; label: string }[] = [
    { field: 'name', label: 'Company' },
    { field: 'star_rating', label: 'Rating' },
    { field: 'bbb_rating', label: 'BBB' },
    { field: 'minimum_investment', label: 'Min. Investment' },
    { field: 'annual_fees', label: 'Annual Fees' },
  ]

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[700px] text-sm">
        <thead>
          <tr className="bg-navy text-white">
            {columns.map((col) => (
              <th key={col.field} className="text-left px-4 py-3 font-semibold">
                <button
                  onClick={() => handleSort(col.field)}
                  className="flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  {col.label}
                  <SortIcon field={col.field} sortField={sortField} sortOrder={sortOrder} />
                </button>
              </th>
            ))}
            <th className="text-left px-4 py-3 font-semibold">Metals</th>
            <th className="text-left px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((company, idx) => (
            <tr
              key={company.id ?? company.slug}
              className={cn(
                'border-t border-gray-100 transition-colors hover:bg-gold/5',
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              )}
            >
              <td className="px-4 py-4">
                <div>
                  <Link
                    href={`/reviews/${company.slug}`}
                    className="font-semibold text-navy hover:text-gold transition-colors"
                  >
                    {company.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Est. {company.founded_year}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <StarRating rating={company.star_rating} size="sm" />
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs">
                  {company.bbb_rating}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="font-semibold text-navy">
                  {formatCurrency(company.minimum_investment)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-gray-600 text-xs max-w-[160px] block leading-tight">
                  {company.annual_fees.length > 40
                    ? company.annual_fees.slice(0, 40) + '…'
                    : company.annual_fees}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {company.metals_offered.map((metal) => (
                    <span key={metal} className="badge-navy text-xs">
                      {metal}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-4">
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-gold text-navy text-xs font-semibold rounded-lg hover:bg-gold-600 transition-colors whitespace-nowrap"
                >
                  Get Info
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
