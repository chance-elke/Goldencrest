import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Phone, Mail, BookOpen, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You – Your Free Guide Is On Its Way',
  description: 'Thank you for requesting your free gold IRA guide. A specialist will be in touch soon.',
  robots: { index: false, follow: false },
}

const nextSteps = [
  {
    icon: Mail,
    title: 'Check Your Email',
    description: 'We\'re sending your free gold IRA guide to the email address you provided. Check your inbox (and spam folder) within the next few minutes.',
  },
  {
    icon: Phone,
    title: 'Expect a Call',
    description: 'A Gold Investments Guide specialist will contact you within 1 business day to answer your questions and discuss your options with no pressure.',
  },
  {
    icon: BookOpen,
    title: 'Do Your Research',
    description: 'In the meantime, explore our in-depth company reviews and gold IRA guide to prepare for your conversation.',
  },
]

export default function ThankYouPage() {
  return (
    <section className="min-h-screen bg-[#f8f9fa] pt-24 lg:pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Gold top bar */}
          <div className="h-2 bg-gold-gradient" />

          <div className="p-8 sm:p-12 text-center">
            {/* Checkmark */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
              Thank You! Your Free Guide Is On Its Way
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              A Gold Investments Guide specialist will contact you within{' '}
              <strong className="text-navy">1 business day</strong> to help you find the best gold IRA
              option for your specific situation.
            </p>

            {/* What to expect */}
            <div className="text-left space-y-4 mb-8">
              <h2 className="text-center text-lg font-bold text-navy mb-5">
                What Happens Next?
              </h2>
              {nextSteps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-[#f8f9fa] rounded-xl border border-gray-100">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm mb-0.5">{step.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA links */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/reviews" className="btn-gold text-sm py-2.5 px-6">
                Compare Companies
              </Link>
              <Link href="/guide" className="btn-outline-gold text-sm py-2.5 px-6">
                Read the Guide
              </Link>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-navy text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl">
          <p className="text-xs text-gray-400 leading-relaxed text-center">
            By submitting this form, you have consented to be contacted by Gold Investments Guide.
            We will not share your information with the gold IRA companies reviewed on this site.
            You may opt out of communications at any time.
          </p>
        </div>
      </div>
    </section>
  )
}
