'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { cn, US_STATES } from '@/lib/utils'

const CONSENT_TEXT =
  "I understand that by submitting this form, my information is being provided to the operator of this website — an independent party unaffiliated with any of the gold investment companies listed on this site. I consent to being contacted by this site's operator via phone, email, or text regarding gold investment opportunities. I acknowledge that this site's operator may share my information with selected partners or contact me directly. I have read and agree to the Privacy Policy and Terms of Service."

const schema = z.object({
  investment_interest: z.array(z.string()).min(1, 'Please select at least one option'),
  investment_timeline: z.string().min(1, 'Please select a timeline'),
  investment_amount: z.string().min(1, 'Please select an investment amount'),
  current_accounts: z.array(z.string()).min(1, 'Please select at least one option'),
  full_name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[\d\s\-\(\)\+]{10,}$/, 'Please enter a valid phone number'),
  state: z.string().min(1, 'Please select your state'),
  consent_given: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms to continue' }),
  }),
})

type FormData = z.infer<typeof schema>

const TOTAL_STEPS = 6

const investmentInterestOptions = [
  { value: 'gold_ira', label: 'Gold IRA' },
  { value: 'silver_ira', label: 'Silver IRA' },
  { value: 'platinum_palladium', label: 'Platinum / Palladium IRA' },
  { value: 'physical_delivery', label: 'Physical Delivery (at-home storage)' },
]

const timelineOptions = [
  { value: 'immediately', label: 'Immediately — I\'m ready to get started' },
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

const stepTitles = [
  { step: 1, title: 'What are you interested in?' },
  { step: 2, title: 'What\'s your timeline?' },
  { step: 3, title: 'How much are you looking to invest?' },
  { step: 4, title: 'Which accounts do you currently have?' },
  { step: 5, title: 'Your contact information' },
  { step: 6, title: 'Almost done!' },
]

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
}

export default function LeadForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      investment_interest: [],
      investment_timeline: '',
      investment_amount: '',
      current_accounts: [],
      full_name: '',
      email: '',
      phone: '',
      state: '',
      consent_given: undefined,
    },
  })

  const watchedValues = watch()

  const toggleArrayValue = (field: 'investment_interest' | 'current_accounts', value: string) => {
    const current = watchedValues[field] as string[]
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value), { shouldValidate: true })
    } else {
      setValue(field, [...current, value], { shouldValidate: true })
    }
  }

  const stepFieldMap: Record<number, (keyof FormData)[]> = {
    1: ['investment_interest'],
    2: ['investment_timeline'],
    3: ['investment_amount'],
    4: ['current_accounts'],
    5: ['full_name', 'email', 'phone', 'state'],
    6: ['consent_given'],
  }

  const goNext = async () => {
    const fields = stepFieldMap[currentStep]
    const valid = await trigger(fields)
    if (valid) {
      setDirection(1)
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: FormData) => {
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

      if (res.ok) {
        router.push('/thank-you')
      } else {
        const err = await res.json()
        setSubmitError(err.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Progress bar */}
      <div className="bg-gray-100 h-2">
        <div
          className="bg-gold h-2 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
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
                i + 1 < currentStep
                  ? 'w-2 h-2 bg-gold'
                  : i + 1 === currentStep
                  ? 'w-3 h-3 bg-gold border-2 border-gold/30 shadow-gold'
                  : 'w-2 h-2 bg-gray-200'
              )}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">
          Step {currentStep} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 pb-6 min-h-[320px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.25 }}
            >
              {/* Step 1: Investment Interest */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-1">{stepTitles[0].title}</h2>
                  <p className="text-sm text-gray-500 mb-5">Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {investmentInterestOptions.map((opt) => {
                      const selected = watchedValues.investment_interest?.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleArrayValue('investment_interest', opt.value)}
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
                                <svg className="w-2.5 h-2.5 text-navy" viewBox="0 0 10 10" fill="currentColor">
                                  <path d="M1 5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            {opt.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  {errors.investment_interest && (
                    <p className="error-text mt-2">{errors.investment_interest.message}</p>
                  )}
                </div>
              )}

              {/* Step 2: Timeline */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-1">{stepTitles[1].title}</h2>
                  <p className="text-sm text-gray-500 mb-5">When are you looking to invest?</p>
                  <div className="space-y-3">
                    {timelineOptions.map((opt) => {
                      const selected = watchedValues.investment_timeline === opt.value
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setValue('investment_timeline', opt.value, { shouldValidate: true })}
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
                  {errors.investment_timeline && (
                    <p className="error-text mt-2">{errors.investment_timeline.message}</p>
                  )}
                </div>
              )}

              {/* Step 3: Amount */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-1">{stepTitles[2].title}</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    This helps us match you with companies that meet your needs.
                  </p>
                  <div className="space-y-3">
                    {amountOptions.map((opt) => {
                      const selected = watchedValues.investment_amount === opt.value
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setValue('investment_amount', opt.value, { shouldValidate: true })}
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
                  {errors.investment_amount && (
                    <p className="error-text mt-2">{errors.investment_amount.message}</p>
                  )}
                </div>
              )}

              {/* Step 4: Current Accounts */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-1">{stepTitles[3].title}</h2>
                  <p className="text-sm text-gray-500 mb-5">Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {accountOptions.map((opt) => {
                      const selected = watchedValues.current_accounts?.includes(opt.value)
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleArrayValue('current_accounts', opt.value)}
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
                                <svg className="w-2.5 h-2.5 text-navy" viewBox="0 0 10 10" fill="currentColor">
                                  <path d="M1 5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            {opt.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  {errors.current_accounts && (
                    <p className="error-text mt-2">{errors.current_accounts.message}</p>
                  )}
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-1">{stepTitles[4].title}</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    We&apos;ll use this to send your free guide and follow up.
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
                      {errors.full_name && (
                        <p className="error-text">{errors.full_name.message}</p>
                      )}
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
                      {errors.email && (
                        <p className="error-text">{errors.email.message}</p>
                      )}
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
                      {errors.phone && (
                        <p className="error-text">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="label">State</label>
                      <select {...register('state')} className="input-field" autoComplete="address-level1">
                        <option value="">Select your state...</option>
                        {US_STATES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="error-text">{errors.state.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Consent */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-xl font-bold text-navy mb-1">{stepTitles[5].title}</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Please review and agree to the following before submitting.
                  </p>

                  {/* Summary */}
                  <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-4 mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Your answers:
                    </p>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-500">Interests:</span>
                        <span className="text-navy font-medium">
                          {watchedValues.investment_interest?.join(', ')}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Timeline:</span>
                        <span className="text-navy font-medium">
                          {timelineOptions.find((o) => o.value === watchedValues.investment_timeline)?.label}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Amount:</span>
                        <span className="text-navy font-medium">
                          {amountOptions.find((o) => o.value === watchedValues.investment_amount)?.label}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Name:</span>
                        <span className="text-navy font-medium">{watchedValues.full_name}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-500">Email:</span>
                        <span className="text-navy font-medium">{watchedValues.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                    <p className="text-xs text-amber-900 leading-relaxed">{CONSENT_TEXT}</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('consent_given')}
                      className="mt-0.5 w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-navy transition-colors">
                      I agree to the terms above and consent to be contacted by GoldenCrest Metals.
                    </span>
                  </label>
                  {errors.consent_given && (
                    <p className="error-text mt-2">{errors.consent_given.message}</p>
                  )}

                  {submitError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{submitError}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentStep === 1}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              currentStep === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-500 hover:text-navy hover:bg-gray-200'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              className="btn-gold text-sm py-2.5 px-6"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold text-sm py-2.5 px-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Free Guide
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
