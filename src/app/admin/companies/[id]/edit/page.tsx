'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Save, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const METALS_OPTIONS = ['Gold', 'Silver', 'Platinum', 'Palladium']

type CompanyForm = {
  name: string
  slug: string
  logo_url: string
  founded_year: string
  bbb_rating: string
  bca_rating: string
  star_rating: string
  minimum_investment: string
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
  display_order: string
  featured: boolean
}

const defaultForm: CompanyForm = {
  name: '',
  slug: '',
  logo_url: '',
  founded_year: '',
  bbb_rating: '',
  bca_rating: '',
  star_rating: '',
  minimum_investment: '',
  annual_fees: '',
  metals_offered: [],
  custodians: '',
  storage_facilities: '',
  buyback_policy: '',
  key_selling_point: '',
  best_for: '',
  pros: [''],
  cons: [''],
  full_description: '',
  website_url: '',
  is_active: true,
  display_order: '0',
  featured: false,
}

export default function CompanyEditPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'new'

  const [form, setForm] = useState<CompanyForm>(defaultForm)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isNew) {
      const fetch_ = async () => {
        try {
          const res = await fetch(`/api/admin/companies/${params.id}`)
          if (!res.ok) {
            router.push('/admin/companies')
            return
          }
          const data = await res.json()
          setForm({
            name: data.name ?? '',
            slug: data.slug ?? '',
            logo_url: data.logo_url ?? '',
            founded_year: String(data.founded_year ?? ''),
            bbb_rating: data.bbb_rating ?? '',
            bca_rating: data.bca_rating ?? '',
            star_rating: String(data.star_rating ?? ''),
            minimum_investment: String(data.minimum_investment ?? ''),
            annual_fees: data.annual_fees ?? '',
            metals_offered: data.metals_offered ?? [],
            custodians: data.custodians ?? '',
            storage_facilities: data.storage_facilities ?? '',
            buyback_policy: data.buyback_policy ?? '',
            key_selling_point: data.key_selling_point ?? '',
            best_for: data.best_for ?? '',
            pros: data.pros?.length ? data.pros : [''],
            cons: data.cons?.length ? data.cons : [''],
            full_description: data.full_description ?? '',
            website_url: data.website_url ?? '',
            is_active: data.is_active ?? true,
            display_order: String(data.display_order ?? 0),
            featured: data.featured ?? false,
          })
        } catch {
          router.push('/admin/companies')
        } finally {
          setIsLoading(false)
        }
      }
      fetch_()
    }
  }, [params.id, isNew, router])

  const updateField = (field: keyof CompanyForm, value: CompanyForm[keyof CompanyForm]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const updateArrayItem = (field: 'pros' | 'cons', idx: number, value: string) => {
    const arr = [...form[field]]
    arr[idx] = value
    updateField(field, arr)
  }

  const addArrayItem = (field: 'pros' | 'cons') => {
    updateField(field, [...form[field], ''])
  }

  const removeArrayItem = (field: 'pros' | 'cons', idx: number) => {
    if (form[field].length <= 1) return
    updateField(field, form[field].filter((_, i) => i !== idx))
  }

  const toggleMetal = (metal: string) => {
    if (form.metals_offered.includes(metal)) {
      updateField('metals_offered', form.metals_offered.filter((m) => m !== metal))
    } else {
      updateField('metals_offered', [...form.metals_offered, metal])
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name) errs.name = 'Name is required'
    if (!form.slug) errs.slug = 'Slug is required'
    if (!form.star_rating || isNaN(Number(form.star_rating))) errs.star_rating = 'Valid rating required'
    if (!form.minimum_investment || isNaN(Number(form.minimum_investment))) errs.minimum_investment = 'Valid amount required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setIsSaving(true)

    const payload = {
      name: form.name,
      slug: form.slug,
      logo_url: form.logo_url || null,
      founded_year: parseInt(form.founded_year) || null,
      bbb_rating: form.bbb_rating,
      bca_rating: form.bca_rating || null,
      star_rating: parseFloat(form.star_rating),
      minimum_investment: parseInt(form.minimum_investment),
      annual_fees: form.annual_fees,
      metals_offered: form.metals_offered,
      custodians: form.custodians,
      storage_facilities: form.storage_facilities,
      buyback_policy: form.buyback_policy,
      key_selling_point: form.key_selling_point,
      best_for: form.best_for,
      pros: form.pros.filter(Boolean),
      cons: form.cons.filter(Boolean),
      full_description: form.full_description,
      website_url: form.website_url,
      is_active: form.is_active,
      display_order: parseInt(form.display_order) || 0,
      featured: form.featured,
    }

    try {
      const res = await fetch(
        isNew ? '/api/admin/companies' : `/api/admin/companies/${params.id}`,
        {
          method: isNew ? 'POST' : 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (res.ok) {
        router.push('/admin/companies')
      } else {
        const err = await res.json()
        alert(err.error ?? 'Failed to save')
      }
    } catch {
      alert('Failed to save company')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  const Field = ({
    label,
    field,
    type = 'text',
    placeholder = '',
  }: {
    label: string
    field: keyof CompanyForm
    type?: string
    placeholder?: string
  }) => (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={form[field] as string}
        onChange={(e) => updateField(field, e.target.value)}
        className={cn('input-field', errors[field] && 'border-red-400 focus:ring-red-400')}
        placeholder={placeholder}
      />
      {errors[field] && <p className="error-text">{errors[field]}</p>}
    </div>
  )

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg border border-gray-200 hover:border-navy text-gray-500 hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-bold text-navy">
          {isNew ? 'Add Company' : 'Edit Company'}
        </h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
        {/* Basic Info */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-navy text-sm uppercase tracking-wider text-gray-500 mb-4">Basic Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company Name" field="name" placeholder="Augusta Precious Metals" />
            <Field label="Slug (URL)" field="slug" placeholder="augusta-precious-metals" />
          </div>
          <Field label="Logo URL (optional)" field="logo_url" placeholder="https://..." />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Founded Year" field="founded_year" type="number" placeholder="2012" />
            <Field label="Website URL" field="website_url" placeholder="https://..." />
          </div>
        </div>

        {/* Ratings */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-navy text-sm uppercase tracking-wider text-gray-500 mb-4">Ratings & Accreditation</h2>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Star Rating (0-5)" field="star_rating" type="number" placeholder="4.8" />
            <Field label="BBB Rating" field="bbb_rating" placeholder="A+" />
            <Field label="BCA Rating (optional)" field="bca_rating" placeholder="AAA" />
          </div>
        </div>

        {/* Investment Details */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-navy text-sm uppercase tracking-wider text-gray-500 mb-4">Investment Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Minimum Investment ($)" field="minimum_investment" type="number" placeholder="50000" />
            <Field label="Display Order" field="display_order" type="number" placeholder="1" />
          </div>
          <div>
            <label className="label">Annual Fees</label>
            <input
              type="text"
              value={form.annual_fees}
              onChange={(e) => updateField('annual_fees', e.target.value)}
              className="input-field"
              placeholder="$275 first year, then varies"
            />
          </div>
          <div>
            <label className="label">Metals Offered</label>
            <div className="flex gap-2 flex-wrap">
              {METALS_OPTIONS.map((metal) => (
                <button
                  key={metal}
                  type="button"
                  onClick={() => toggleMetal(metal)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors',
                    form.metals_offered.includes(metal)
                      ? 'bg-gold text-navy border-gold'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gold'
                  )}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Storage & Custodians */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-navy text-sm uppercase tracking-wider text-gray-500 mb-4">Storage & Custodians</h2>
          <Field label="Custodians" field="custodians" placeholder="Equity Trust Company" />
          <Field label="Storage Facilities" field="storage_facilities" placeholder="Delaware Depository" />
          <Field label="Buyback Policy" field="buyback_policy" placeholder="Yes, 5% spread" />
        </div>

        {/* Descriptions */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-navy text-sm uppercase tracking-wider text-gray-500 mb-4">Descriptions</h2>
          <Field label="Key Selling Point" field="key_selling_point" placeholder="Education-first approach..." />
          <Field label="Best For" field="best_for" placeholder="First-time investors..." />

          <div>
            <label className="label">Pros</label>
            {form.pros.map((pro, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={pro}
                  onChange={(e) => updateArrayItem('pros', idx, e.target.value)}
                  className="input-field"
                  placeholder="Enter a pro..."
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('pros', idx)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('pros')}
              className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-600 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Pro
            </button>
          </div>

          <div>
            <label className="label">Cons</label>
            {form.cons.map((con, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={con}
                  onChange={(e) => updateArrayItem('cons', idx, e.target.value)}
                  className="input-field"
                  placeholder="Enter a con..."
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('cons', idx)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('cons')}
              className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-600 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Con
            </button>
          </div>

          <div>
            <label className="label">Full Description (paragraphs separated by blank line)</label>
            <textarea
              value={form.full_description}
              onChange={(e) => updateField('full_description', e.target.value)}
              rows={8}
              className="input-field resize-none"
              placeholder="Write the full company description..."
            />
          </div>
        </div>

        {/* Settings */}
        <div className="p-6 space-y-4">
          <h2 className="font-bold text-navy text-sm uppercase tracking-wider text-gray-500 mb-4">Settings</h2>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => updateField('is_active', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span className="text-sm font-medium text-navy">Active (visible on site)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
              />
              <span className="text-sm font-medium text-navy">Featured (homepage)</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn-gold py-2.5 px-6 text-sm disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isNew ? 'Create Company' : 'Save Changes'}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 text-sm text-gray-500 hover:text-navy transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
