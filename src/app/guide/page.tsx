import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import GuideFAQ from './GuideFAQ'

export const metadata: Metadata = {
  title: 'Gold IRA Guide 2026 – How to Invest in a Precious Metals IRA',
  description:
    'Everything you need to know about gold IRAs in 2026. Learn how they work, IRS rules, eligible metals, rollover steps, storage requirements, and more.',
}

const rolloverSteps = [
  {
    step: 1,
    title: 'Choose a Gold IRA Custodian',
    description:
      'Select an IRS-approved custodian that specializes in self-directed IRAs. This is typically the gold IRA company you choose — they work with a custodian partner (e.g., Equity Trust or STRATA Trust).',
  },
  {
    step: 2,
    title: 'Open Your Self-Directed IRA',
    description:
      'Complete the account application with your chosen custodian. You\'ll provide personal information, choose beneficiaries, and select account type (Traditional or Roth Gold IRA).',
  },
  {
    step: 3,
    title: 'Fund Your Account',
    description:
      'Transfer funds via direct rollover from an existing IRA, 401(k), 403(b), or other eligible retirement account. You can also make a new contribution if within IRS annual limits.',
  },
  {
    step: 4,
    title: 'Select Your Precious Metals',
    description:
      'Work with your gold IRA company to choose IRS-approved metals. Your custodian will purchase the metals on your behalf from an approved dealer.',
  },
  {
    step: 5,
    title: 'Secure Storage',
    description:
      'Your metals are shipped directly to an IRS-approved depository. You cannot take personal possession of IRA metals — they must be stored in a qualified facility.',
  },
  {
    step: 6,
    title: 'Monitor and Manage',
    description:
      'Review your account regularly. You can add more metals, diversify into different types, or eventually take distributions (taxes and penalties apply depending on age and account type).',
  },
]

export default function GuidePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-24 lg:pt-32 pb-12 lg:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-gold text-sm font-medium">Complete Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Gold IRA Guide 2026
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Everything you need to know about investing in a precious metals IRA — from the basics
            to IRS rules, eligible metals, storage requirements, and a step-by-step rollover process.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 bg-[#f8f9fa] border-b border-gray-200 sticky top-16 lg:top-20 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 flex-wrap text-sm">
            <span className="text-gray-500 mr-2">Jump to:</span>
            {['What is a Gold IRA', 'How It Works', 'Types', 'IRS Rules', 'Storage', 'Rollover Steps', 'FAQ'].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase().replace(/ /g, '-')}`}
                className="px-3 py-1 rounded-full bg-white border border-gray-200 text-navy hover:border-gold hover:text-gold transition-colors"
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="prose-custom space-y-14">

          {/* Section 1 */}
          <section id="what-is-a-gold-ira">
            <h2 className="text-3xl font-bold text-navy mb-5">What is a Gold IRA?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A Gold IRA (Individual Retirement Account) is a self-directed retirement account that
                allows you to hold physical precious metals — gold, silver, platinum, and palladium —
                as investments, rather than traditional paper assets like stocks, bonds, and mutual funds.
              </p>
              <p>
                Gold IRAs are governed by the same IRS rules as traditional IRAs, including contribution
                limits, distribution rules, and tax treatment. The key difference is that instead of
                holding paper investments through a regular brokerage, a Gold IRA holds IRS-approved
                physical metals that are stored in an approved depository on your behalf.
              </p>
              <p>
                Gold IRAs became possible after Congress passed the Taxpayer Relief Act of 1997, which
                expanded the definition of allowable IRA investments to include certain precious metals.
                Since then, they have grown in popularity — particularly during periods of economic
                uncertainty and high inflation.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 bg-gold/5 border border-gold/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-navy">Ready to explore your options?</p>
                <p className="text-sm text-gray-500">Get matched with the right gold IRA company for your needs.</p>
              </div>
              <Link href="/get-started" className="btn-gold whitespace-nowrap text-sm py-2.5 px-5">
                Get Free Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 2 */}
          <section id="how-it-works">
            <h2 className="text-3xl font-bold text-navy mb-5">How Does a Gold IRA Work?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A Gold IRA works similarly to a traditional IRA, but with precious metals as the
                underlying asset. Here&apos;s the basic flow:
              </p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>You open a self-directed IRA with an IRS-approved custodian.</li>
                <li>You fund the account via rollover from an existing retirement account or new contribution.</li>
                <li>You direct the custodian to purchase IRS-approved precious metals from an approved dealer.</li>
                <li>The metals are shipped to and stored in an IRS-approved depository.</li>
                <li>You hold the metals within the IRA, and they grow tax-deferred (or tax-free for Roth) until distribution.</li>
              </ol>
              <p>
                You never physically hold the metals while they&apos;re in an IRA — the custodian holds them
                on your behalf at an approved storage facility. This is an IRS requirement and is designed
                to maintain the tax-advantaged status of your account.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 3 */}
          <section id="types">
            <h2 className="text-3xl font-bold text-navy mb-5">Types of Gold IRAs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-navy mb-3">Traditional Gold IRA</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Contributions may be tax-deductible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Growth is tax-deferred
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Distributions taxed as ordinary income
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Required Minimum Distributions (RMDs) at age 73
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    10% penalty for withdrawal before age 59½
                  </li>
                </ul>
              </div>
              <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-navy mb-3">Roth Gold IRA</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Contributions made with after-tax dollars
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Growth is tax-free
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Qualified distributions are tax-free
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    No RMDs during owner&apos;s lifetime
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold font-bold">•</span>
                    Income limits apply for contributions
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              There is also a SEP Gold IRA for self-employed individuals and small business owners,
              which allows higher contribution limits. The right type depends on your current tax
              situation and retirement income expectations. Consult a qualified financial advisor
              to determine which type best fits your needs.
            </p>
          </section>

          <hr className="border-gray-200" />

          {/* Section 4 */}
          <section id="irs-rules">
            <h2 className="text-3xl font-bold text-navy mb-5">IRS Rules and Eligible Metals</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
              <p>
                Not all gold is IRA-eligible. The IRS has strict requirements for precious metals held
                in an IRA. Metals must meet minimum purity standards and be produced by accredited
                manufacturers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { metal: 'Gold', purity: '99.5% (0.995) fineness', examples: 'American Gold Eagle, American Gold Buffalo, Canadian Gold Maple Leaf, Austrian Gold Philharmonic' },
                { metal: 'Silver', purity: '99.9% (0.999) fineness', examples: 'American Silver Eagle, Canadian Silver Maple Leaf, Austrian Silver Philharmonic' },
                { metal: 'Platinum', purity: '99.95% (0.9995) fineness', examples: 'American Platinum Eagle, Canadian Platinum Maple Leaf' },
                { metal: 'Palladium', purity: '99.95% (0.9995) fineness', examples: 'American Palladium Eagle, Canadian Palladium Maple Leaf' },
              ].map((item) => (
                <div key={item.metal} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="font-bold text-navy mb-2">{item.metal}</h3>
                  <p className="text-xs text-gray-500 mb-2">Minimum purity: <span className="font-semibold text-navy">{item.purity}</span></p>
                  <p className="text-xs text-gray-600 leading-relaxed">Examples: {item.examples}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Collectible coins and rounds that don&apos;t meet purity
                standards are NOT eligible for Gold IRAs. Your gold IRA company and custodian will
                ensure only eligible metals are purchased.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 5 */}
          <section id="storage">
            <h2 className="text-3xl font-bold text-navy mb-5">Storage Requirements</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                IRS regulations require that precious metals held in an IRA be stored in an approved
                depository. You cannot store IRA metals at home, in a safe deposit box, or at any
                personal location. Doing so would be considered a distribution, triggering immediate
                taxes and potential penalties.
              </p>
              <p>
                Approved depositories include facilities like the Delaware Depository, Brink&apos;s Global
                Services, and International Depository Services (IDS). These facilities are:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fully insured against theft, damage, and loss</li>
                <li>Audited regularly by independent third parties</li>
                <li>Compliant with IRS and Department of Treasury regulations</li>
                <li>Equipped with 24/7 security systems</li>
              </ul>
              <p>
                Storage options include commingled storage (your metals are stored alongside other
                investors&apos; metals, though tracked separately) and segregated storage (your metals are
                kept physically separate from other investors&apos; holdings). Segregated storage typically
                costs more but provides peace of mind that you will receive the exact metals you
                purchased.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* Section 6: Rollover Steps */}
          <section id="rollover-steps">
            <h2 className="text-3xl font-bold text-navy mb-2">Step-by-Step Rollover Process</h2>
            <p className="text-gray-500 mb-8">
              Rolling over an existing 401(k) or IRA to a gold IRA is simpler than most people think.
              Here&apos;s the complete process:
            </p>
            <div className="space-y-4">
              {rolloverSteps.map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-navy font-bold text-sm flex items-center justify-center shadow-gold">
                    {item.step}
                  </div>
                  <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                    <h3 className="font-bold text-navy mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-navy rounded-2xl text-center">
              <p className="text-white font-bold text-lg mb-2">Ready to start your rollover?</p>
              <p className="text-gray-300 text-sm mb-5">
                Our specialists will guide you through every step at no charge.
              </p>
              <Link href="/get-started" className="btn-gold font-bold px-8 py-3">
                Get Free Rollover Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-3xl font-bold text-navy mb-8">Frequently Asked Questions</h2>
            <GuideFAQ />
          </section>

        </div>
      </div>
    </>
  )
}
