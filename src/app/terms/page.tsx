import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Gold Investments Guide terms of service — site usage, disclosures, and legal information.',
}

export default function TermsPage() {
  const lastUpdated = 'March 1, 2026'

  return (
    <>
      <section className="bg-navy pt-24 lg:pt-32 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-gray-600">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using this website (&quot;Site&quot;), you agree to be bound by these Terms
                of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use this Site.
                Gold Investments Guide reserves the right to modify these Terms at any time. Continued
                use of the Site after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Site Usage</h2>
              <p className="leading-relaxed mb-3">
                You may use this Site for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>Submit false or misleading information through any forms on this Site</li>
                <li>Use the Site to violate any applicable laws or regulations</li>
                <li>Attempt to access any unauthorized areas of the Site</li>
                <li>Use automated tools to scrape, crawl, or extract data from the Site</li>
                <li>Interfere with or disrupt the Site or its servers</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. Lead Generation Disclosure</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-amber-900 text-sm font-semibold mb-2">Important — Please Read:</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  This website is a lead generation platform operated by an independent party unaffiliated
                  with any of the gold IRA companies reviewed or listed on this Site. When you submit your
                  information through any form on this Site, you are providing that information to{' '}
                  <strong>this site&apos;s operator</strong>, not to the gold IRA companies reviewed or
                  listed on this Site.
                </p>
              </div>
              <p className="leading-relaxed mb-3">By submitting a form on this Site, you acknowledge and agree that:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>Your information is received by this site&apos;s operator, not by any reviewed company</li>
                <li>This site&apos;s operator may contact you directly via phone, email, or text message</li>
                <li>This site&apos;s operator may share your information with selected partner companies</li>
                <li>Submitting this form does not create a relationship with any reviewed company</li>
                <li>You consent to be contacted, including by automated dialing systems, at the phone number provided</li>
                <li>You can opt out of communications at any time by contacting us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. Not Financial Advice</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
                <p className="text-red-900 text-sm font-semibold mb-2">Disclaimer:</p>
                <p className="text-red-800 text-sm leading-relaxed">
                  Nothing on this website constitutes financial, investment, tax, or legal advice.
                  All content is for informational and educational purposes only.
                </p>
              </div>
              <p className="leading-relaxed">
                Gold Investments Guide is not a licensed financial advisor, broker-dealer, investment
                advisor, or tax professional. The reviews, ratings, and comparisons on this Site
                represent our editorial opinions based on publicly available information. You should
                not make investment decisions based solely on information from this Site.
              </p>
              <p className="leading-relaxed mt-3">
                Investing in precious metals involves risk. Gold and other precious metals can and do
                decline in value. Past performance is not indicative of future results. Always consult
                a qualified financial advisor, tax professional, or attorney before making investment
                decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Affiliate Disclosure</h2>
              <p className="leading-relaxed">
                Gold Investments Guide may receive compensation from companies featured on this Site when
                visitors click links, request information, or complete transactions. This compensation
                may influence which companies appear on the Site and the order in which they appear.
                However, it does not influence our editorial assessments, which are based on our own
                research and analysis.
              </p>
              <p className="leading-relaxed mt-3">
                Gold Investments Guide is an independent publisher and is not affiliated with any of the
                gold IRA companies reviewed on this Site. We do not act as an agent or representative
                of any reviewed company.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on this Site, including text, graphics, logos, and data, is the property
                of Gold Investments Guide or its content suppliers and is protected by applicable copyright
                and trademark laws. You may not reproduce, distribute, or create derivative works from
                any content on this Site without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">7. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Gold Investments Guide shall not be liable for
                any indirect, incidental, special, consequential, or punitive damages arising from
                your use of this Site or any decisions made based on information found on this Site.
                Our total liability for any claim arising from these Terms or your use of the Site
                shall not exceed $100.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">8. Third-Party Links</h2>
              <p className="leading-relaxed">
                This Site may contain links to third-party websites. We are not responsible for the
                content, privacy practices, or terms of those websites. Links are provided for
                convenience only and do not constitute an endorsement of the linked site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">9. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the
                United States. Any disputes arising from these Terms shall be resolved through binding
                arbitration in accordance with the American Arbitration Association&apos;s rules.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">10. Contact</h2>
              <p className="leading-relaxed">
                For questions about these Terms, contact us at legal@goldinvestmentsguide.com.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
              <p>
                <Link href="/privacy" className="text-gold hover:underline">View Privacy Policy</Link>
                {' · '}
                <Link href="/get-started" className="text-gold hover:underline">Get Started</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
