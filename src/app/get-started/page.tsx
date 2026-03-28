import type { Metadata } from 'next'
import { Shield } from 'lucide-react'
import LeadForm from './LeadForm'

export const metadata: Metadata = {
  title: 'Get Your Free Gold IRA Guide',
  description:
    'Get a free gold IRA guide and speak with a specialist about protecting your retirement savings with precious metals. No obligation, 100% free.',
}

export default function GetStartedPage() {
  return (
    <>
      <section className="bg-navy pt-24 lg:pt-32 pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-5">
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium">100% Free, No Obligation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Get Your Free Gold IRA Guide
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            Enter your contact info and a specialist will reach out with
            personalized information for your situation.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-10 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <LeadForm />
        </div>
      </section>
    </>
  )
}
