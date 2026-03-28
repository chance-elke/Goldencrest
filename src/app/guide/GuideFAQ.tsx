'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How much does it cost to open a gold IRA?',
    answer:
      'Setup costs vary by company. Most reputable gold IRA companies charge between $50–$300 for account setup. Annual fees for storage and custody typically range from $150–$300 per year. Some companies waive fees for the first year or for accounts over a certain size (e.g., $100,000+).',
  },
  {
    question: 'Can I roll over my 401(k) to a gold IRA without penalty?',
    answer:
      'Yes, if done correctly. A direct rollover from a 401(k) to a gold IRA is a non-taxable event. The funds move directly from your 401(k) custodian to your new gold IRA custodian without you touching the money. An indirect rollover (where you receive the funds first) must be completed within 60 days or taxes and penalties apply. You can only do one indirect rollover per year.',
  },
  {
    question: 'What are the contribution limits for a gold IRA?',
    answer:
      'Gold IRA contribution limits are the same as traditional IRA limits. For 2025, you can contribute up to $7,000 per year ($8,000 if you\'re age 50 or older). Note that these limits apply if you\'re rolling over a new contribution — rollovers from existing retirement accounts do not count against this limit.',
  },
  {
    question: 'Can I take physical possession of my gold IRA metals?',
    answer:
      'Not while the metals are in your IRA. Taking physical possession of IRA metals triggers a distribution, which would be taxable income (plus a 10% early withdrawal penalty if under age 59½). Once you reach retirement age, you can take distributions "in-kind" (receiving the actual metal) or sell the metal and receive cash.',
  },
  {
    question: 'What happens to my gold IRA if the custodian goes bankrupt?',
    answer:
      'Your precious metals are held in your name at a separate depository — they are not assets of the custodian. If the custodian fails, another custodian takes over the accounts. Your metals, which are insured by the depository, remain yours. This is different from a brokerage account, where your assets might be pooled with others.',
  },
  {
    question: 'Is a gold IRA a good investment?',
    answer:
      'This depends on your individual financial situation and goals. Gold can provide portfolio diversification and act as a hedge against inflation and currency devaluation. However, gold doesn\'t pay dividends or interest, can be volatile in the short term, and has fees associated with storage and custody. Most financial advisors recommend limiting precious metals to 5–15% of a retirement portfolio. Consult a qualified financial advisor for personalized advice.',
  },
  {
    question: 'How do I choose the best gold IRA company?',
    answer:
      'Key factors to evaluate: (1) Reputation — check BBB rating and customer reviews on Google and Trustpilot; (2) Fees — compare all-in annual fees for custody and storage; (3) Minimum investment — ensure it matches your budget; (4) Metals selection — gold and silver at minimum, ideally platinum and palladium too; (5) Customer service — are they educational and not high-pressure? (6) Buyback program — what happens when you want to sell?',
  },
  {
    question: 'What are Required Minimum Distributions (RMDs) for a gold IRA?',
    answer:
      'Traditional Gold IRAs are subject to RMDs starting at age 73 (per SECURE 2.0 Act). You must take a minimum distribution each year based on your account balance and life expectancy. If you have gold in your IRA, you can either sell some to generate the cash for the distribution or take an in-kind distribution of physical metal (you\'ll still owe taxes on the value). Roth Gold IRAs are NOT subject to RMDs during the owner\'s lifetime.',
  },
]

export default function GuideFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === idx}
          >
            <span className="font-semibold text-navy text-sm pr-4">{faq.question}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-gold flex-shrink-0 transition-transform duration-200',
                openIndex === idx && 'rotate-180'
              )}
            />
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              openIndex === idx ? 'max-h-96' : 'max-h-0'
            )}
          >
            <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
              <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
