'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Loader2, CheckCircle } from 'lucide-react'
import { cn, US_STATES } from '@/lib/utils'

const CONSENT_TEXT =
  "I understand that by submitting this form, my information is being provided to the operator of this website — an independent party unaffiliated with any of the gold investment companies listed on this site. I consent to being contacted by this site's operator via phone, email, or text regarding gold investment opportunities. I acknowledge that this site's operator may share my information with selected partners or contact me directly. I have read and agree to the Privacy Policy and Terms of Service."

// Step 1 schema — required fields only
const contactSchema = z.object({
  full_name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\d\s\-\(\)\+]{10,}$/, 'Please enter a valid phone number'),
  state: z.string().min(1, 'Please select your state'),
  consent_given: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms to continue' }),
  }),
})

type ContactData = z.infer<typeof contactSchema>

const investmentInterestOptions = [
  { value: 'gold_ira', label: 'Gold IRA' },
  { value: 'silver_ira', label: 'Silver IRA' },
  { value: 'platinum_palladium', label: 'Platinum / Palladium IRA' },
  { value: 'physical_delivery', label: 'Physical Delivery (at-home storage)' },
]

const timelineOptions = [
  { value: 'immediately', label: "Immediately — I'm ready to get started" },
  { value: '1_3_months', label: 'Within 1–3 months' },
  { value: '3_6_months', label: 'Within 3–6 months' },
  { value: 'researching', label: 'Just researching for now' },
]

const amountOptions = [
  { value: 'under_10k', label: 'Under $10,000' },
  { value: '10k_25k', label: '$10,000 – $25,000' },
  { value: '25k_50k', label: '$25,000 – $50,000' },
  { value: '50k_100k', label: '$50,000 – $100,000' },
  { value: 'over_100k', label: '$100,000+' },
]

const accountOptions = [
  { value: '401k', label: '401(k)' },
  { value: 'traditional_ira', label: 'Traditional IRA' },
  { value: 'roth_ira', label: 'Roth IRA' },
  { value: 'tsp', label: 'Thrift Savings Plan (TSP)' },
  { value: 'other', label: 'Other Retirement Account' },
  { value: 'none', label: 'None / Starting fresh' },
]

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
}

// Steps: 1 = contact/consent, 2-5 = optional follow-ups
const TOTAL_STEPS = 5

export default function LeadForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Optional follow-up state
  const [investmentInterest, setInvestmentInterest] = useState<string[]>([])
  const [investmentTimeline, setInvestmentTimeline] = useState('')
  const [investmentAmount, setInvestmentAmount] = useState('')
  const [currentAccounts, setCurrentAccounts] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      state: '',
      consent_given: undefined,
    },
  })

  const advance = () => {
    setDirection(1)
    setStep((s) => s + 1)
  }

  const patchAndFinish = async () => {
    if (leadId) {
      const updates: Record<string, unknown> = {}
      if (investmentInterest.length) updates.investment_interest = investmentInterest
      if (investmentTimeline) updates.investment_timeline = investmentTimeline
      if (investmentAmount) updates.investment_amount = investmentAmount
      if (currentAccounts.length) updates.current_accounts = currentAccounts

      if (Object.keys(updates).length > 0) {
        // Fire-and-forget — don't block redirect on this
        fetch(`/api/leads/${leadId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        }).catch(() => {})
      }
    }
    router.push('/thank-you')
  }

  const onContactSubmit = async (data: ContactData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          consent_text: CONSENT_TEXT,
          referring_page: window.location.href,
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }),
      })

      const json = await res.json()

      if (res.ok) {
        setLeadId(json.lead_id ?? null)
        advance()
      } else {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleArray = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value])
  }

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Progress bar */}
      <div className="bg-gray-100 h-2">
        <div
          className="bg-gold h-2 transition-all duration-500 ease-out"
          style={{ width: `${Math.max(progress, step === 1 ? 5 : progress)}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={cn(
                'rounded-full transition-all duration-300',
                i + 1 < step
                  ? 'w-2 h-2 bg-gold'
                  : i + 1 === step
                  ? 'w-3 h-3 bg-gold border-2 border-gold/30'
                  : 'w-2 h-2 bg-gray-200'
              )}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">
          {step === 1 ? 'Step 1 of 5' : `Step ${step} of 5 — Optional`}
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.25 }}
        >
          {/* ── STEP 1: Contact Info + Consent ── */}
          {step === 1 && (
            <form onSubmit={handleSubmit(onContactSubmit)}>
              <div className="px-6 pb-6 min-h-[320px]">
                <h2 className="text-xl font-bold text-navy mb-1">Your contact information</h2>
                <p className="text-sm text-gray-500 mb-5">
                  We&apos;ll send your free guide here and have a specialist reach out.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="label">Full Name</label>
                    <input
                      {...register('full_name')}
                      type="text"
                      placeholder="Jane Smith"
                      className="input-field"
                      autoComplete="name"
                    />
                    {errors.full_name && <p className="error-text">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="jane@example.com"
                      className="input-field"
                      autoComplete="email"
                    />
                    {errors.email && <p className="error-text">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="input-field"
                      autoComplete="tel"
                    />
                    {errors.phone && <p className="error-text">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="label">State</label>
                    <select
                      {...register('state')}
                      className="input-field"
                      autoComplete="address-level1"
                    >
                      <option value="">Select your state...</option>
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    {errors.state && <p className="error-text">{errors.state.message}</p>}
                  </div>

                  {/* Consent */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-xs text-amber-900 leading-relaxed mb-3">{CONSENT_TEXT}</p>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('consent_given')}
                        className="mt-0.5 w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold cursor-pointer flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-navy transition-colors">
                        I agree to the terms above
                      </span>
                    </label>
                    {errors.consent_given && (
                      <p className="error-text mt-1">{errors.consent_given.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{submitError}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full justify-center py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Free Gold IRA Guide
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ── OPTIONAL FOLLOW-UPS (steps 2-5) ── */}
          {step >= 2 && (
            <div>
              <div className="px-6 pb-6 min-h-[320px]">
                {/* Success indicator */}
                <div className="flex items-center gap-2 mb-4 text-green-600">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    You&apos;re all set! A specialist will contact you soon.
                  </span>
                </div>
                <div className="bg-navy/5 border border-navy/10 rounded-xl p-3 mb-5">
                  <p className="text-sm text-navy font-medium">
                    Optional: Help us match you with the best option
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Answer a few quick questions or skip — your info is already saved.
                  </p>
                </div>

                {/* Step 2: Investment Interest */}
                {step === 2 && (
                  <div>
                    <h2 className="text-lg font-bold text-navy mb-1">What are you interested in?</h2>
                    <p className="text-sm text-gray-500 mb-4">Select all that apply.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {investmentInterestOptions.map((opt) => {
                        const selected = investmentInterest.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleArray(investmentInterest, setInvestmentInterest, opt.value)}
                            className={cn(
                              'text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                              selected
                                ? 'border-gold bg-gold/5 text-navy'
                                : 'border-gray-200 text-gray-600 hover:border-gold/40 hover:bg-gray-50'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center',
                                  selected ? 'border-gold bg-gold' : 'border-gray-300'
                                )}
                              >
                                {selected && (
                                  <svg className="w-2.5 h-2.5 text-navy" viewBox="0 0 10 10" fill="none">
                                    <path d="M1 5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </span>
                              {opt.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Timeline */}
                {step === 3 && (
                  <div>
                    <h2 className="text-lg font-bold text-navy mb-1">What&apos;s your timeline?</h2>
                    <p className="text-sm text-gray-500 mb-4">When are you looking to invest?</p>
                    <div className="space-y-3">
                      {timelineOptions.map((opt) => {
                        const selected = investmentTimeline === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setInvestmentTimeline(opt.value)}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                              selected
                                ? 'border-gold bg-gold/5 text-navy'
                                : 'border-gray-200 text-gray-600 hover:border-gold/40 hover:bg-gray-50'
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={cn(
                                  'w-4 h-4 rounded-full flex-shrink-0 border-2',
                                  selected ? 'border-gold bg-gold' : 'border-gray-300'
                                )}
                              />
                              {opt.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 4: Investment Amount */}
                {step === 4 && (
                  <div>
                    <h2 className="text-lg font-bold text-navy mb-1">How much are you looking to invest?</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      Helps us match you with companies that meet your needs.
                    </p>
                    <div className="space-y-3">
                      {amountOptions.map((opt) => {
                        const selected = investmentAmount === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setInvestmentAmount(opt.value)}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                              selected
                                ? 'border-gold bg-gold/5 text-navy'
                                : 'border-gray-200 text-gray-600 hover:border-gold/40 hover:bg-gray-50'
                            )}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={cn(
                                  'w-4 h-4 rounded-full flex-shrink-0 border-2',
                                  selected ? 'border-gold bg-gold' : 'border-gray-300'
                                )}
                              />
                              {opt.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Step 5: Current Accounts */}
                {step === 5 && (
                  <div>
                    <h2 className="text-lg font-bold text-navy mb-1">Which accounts do you currently have?</h2>
                    <p className="text-sm text-gray-500 mb-4">Select all that apply.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {accountOptions.map((opt) => {
                        const selected = currentAccounts.includes(opt.value)
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleArray(currentAccounts, setCurrentAccounts, opt.value)}
                            className={cn(
                              'text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                              selected
                                ? 'border-gold bg-gold/5 text-navy'
                                : 'border-gray-200 text-gray-600 hover:border-gold/40 hover:bg-gray-50'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center',
                                  selected ? 'border-gold bg-gold' : 'border-gray-300'
                                )}
                              >
                                {selected && (
                                  <svg className="w-2.5 h-2.5 text-navy" viewBox="0 0 10 10" fill="none">
                                    <path d="M1 5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </span>
                              {opt.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation for optional steps */}
              <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                <button
                  type="button"
                  onClick={patchAndFinish}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Skip all &rarr;
                </button>

                {step < TOTAL_STEPS ? (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => { setDirection(1); setStep((s) => s + 1) }}
                      className="text-sm text-gray-500 hover:text-navy transition-colors px-3 py-2"
                    >
                      Skip
                    </button>
                    <button
                      type="button"
                      onClick={() => { setDirection(1); setStep((s) => s + 1) }}
                      className="btn-gold text-sm py-2.5 px-6"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={patchAndFinish}
                    className="btn-gold text-sm py-2.5 px-6"
                  >
                    Finish
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
