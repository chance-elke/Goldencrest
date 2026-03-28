'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Company } from '@/types'

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchCompanies = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/companies')
      const data = await res.json()
      setCompanies(data)
    } catch {
      console.error('Failed to fetch companies')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const handleToggleActive = async (company: Company) => {
    try {
      const res = await fetch(`/api/admin/companies/${company.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !company.is_active }),
      })
      if (res.ok) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === company.id ? { ...c, is_active: !c.is_active } : c))
        )
      }
    } catch {
      alert('Failed to update company')
    }
  }

  const handleToggleFeatured = async (company: Company) => {
    try {
      const res = await fetch(`/api/admin/companies/${company.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !company.featured }),
      })
      if (res.ok) {
        setCompanies((prev) =>
          prev.map((c) => (c.id === company.id ? { ...c, featured: !c.featured } : c))
        )
      }
    } catch {
      alert('Failed to update company')
    }
  }

  const handleMoveOrder = async (company: Company, direction: 'up' | 'down') => {
    const sorted = [...companies].sort((a, b) => a.display_order - b.display_order)
    const idx = sorted.findIndex((c) => c.id === company.id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1

    if (swapIdx < 0 || swapIdx >= sorted.length) return

    const swapCompany = sorted[swapIdx]
    const tempOrder = company.display_order
    const swapOrder = swapCompany.display_order

    try {
      await Promise.all([
        fetch(`/api/admin/companies/${company.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_order: swapOrder }),
        }),
        fetch(`/api/admin/companies/${swapCompany.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_order: tempOrder }),
        }),
      ])
      setCompanies((prev) =>
        prev.map((c) => {
          if (c.id === company.id) return { ...c, display_order: swapOrder }
          if (c.id === swapCompany.id) return { ...c, display_order: tempOrder }
          return c
        })
      )
    } catch {
      alert('Failed to reorder')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company? This cannot be undone.')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/companies/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCompanies((prev) => prev.filter((c) => c.id !== id))
      } else {
        alert('Failed to delete company')
      }
    } catch {
      alert('Failed to delete company')
    } finally {
      setDeletingId(null)
    }
  }

  const sorted = [...companies].sort((a, b) => a.display_order - b.display_order)

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Companies</h1>
          <p className="text-gray-500 text-sm mt-0.5">{companies.length} companies</p>
        </div>
        <Link
          href="/admin/companies/new/edit"
          className="btn-gold text-sm py-2.5 px-5"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Min. Invest</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">Loading...</td>
                </tr>
              ) : sorted.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">No companies yet</td>
                </tr>
              ) : (
                sorted.map((company) => (
                  <tr key={company.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400 w-4">{company.display_order}</span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => handleMoveOrder(company, 'up')}
                            className="p-0.5 hover:text-gold text-gray-400 transition-colors"
                            title="Move up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(company, 'down')}
                            className="p-0.5 hover:text-gold text-gray-400 transition-colors"
                            title="Move down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-navy">{company.name}</p>
                        <p className="text-xs text-gray-400">{company.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        <span className="font-medium text-navy">{company.star_rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      ${company.minimum_investment?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleActive(company)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                          company.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        )}
                        title={company.is_active ? 'Click to deactivate' : 'Click to activate'}
                      >
                        {company.is_active ? (
                          <><Eye className="w-3 h-3" /> Active</>
                        ) : (
                          <><EyeOff className="w-3 h-3" /> Inactive</>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleFeatured(company)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
                          company.featured
                            ? 'bg-gold/20 text-gold-700 border border-gold/30 hover:bg-gold/30'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        )}
                        title={company.featured ? 'Click to unfeature' : 'Click to feature'}
                      >
                        <Star className={cn('w-3 h-3', company.featured && 'fill-gold-600')} />
                        {company.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/companies/${company.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(company.id)}
                          disabled={deletingId === company.id}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
