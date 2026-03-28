import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Gold Investments Guide privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  const lastUpdated = 'March 1, 2026'

  return (
    <>
      <section className="bg-navy pt-24 lg:pt-32 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose-custom">
          <div className="space-y-10 text-gray-600">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">1. About This Policy</h2>
              <p className="leading-relaxed">
                This website is operated by an independent party unaffiliated with any of the gold IRA
                companies reviewed or listed herein (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                We operate <strong>this website</strong> as a lead generation and information platform.
                This Privacy Policy explains how we collect, use, disclose, and protect your personal
                information when you visit our website or submit information through our forms.
              </p>
              <p className="leading-relaxed mt-3">
                By using this website, you agree to the practices described in this policy. If you do
                not agree, please do not use this website or submit any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed mb-3">We collect the following types of information:</p>
              <div className="space-y-4">
                <div className="bg-[#f8f9fa] rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-navy mb-2">Information You Provide Directly</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Full name, email address, phone number</li>
                    <li>State of residence</li>
                    <li>Investment interests, timeline, and estimated investment amount</li>
                    <li>Existing retirement account types</li>
                    <li>Consent records including timestamp and consent text</li>
                  </ul>
                </div>
                <div className="bg-[#f8f9fa] rounded-xl p-5 border border-gray-200">
                  <h3 className="font-bold text-navy mb-2">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>IP address and general geographic location (city/state level)</li>
                    <li>Browser type and device information (user agent)</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring URL and UTM campaign parameters</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li>To contact you directly via phone, email, or text about gold IRA investment opportunities</li>
                <li>To provide you with educational materials and resources you requested</li>
                <li>To share your information with selected partner companies (see Section 4)</li>
                <li>To analyze and improve our website and lead generation processes</li>
                <li>To comply with legal obligations and enforce our terms</li>
                <li>To track attribution for marketing campaigns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">4. How We Share Your Information</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
                <p className="text-amber-900 text-sm font-semibold mb-2">Important Notice:</p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  When you submit your information through this site, your information is provided to{' '}
                  <strong>this site&apos;s operator directly</strong> — NOT to the gold IRA companies
                  reviewed on this site. We are an independent, unaffiliated party. Submitting a form
                  here does not create a relationship with Augusta Precious Metals, American Hartford
                  Gold, or any other reviewed company.
                </p>
              </div>
              <p className="leading-relaxed mb-3">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
                <li><strong>Selected partner companies:</strong> We may share your information with vetted precious metals investment companies who can service your inquiry. You consented to this when submitting the form.</li>
                <li><strong>Service providers:</strong> Companies that help us operate (CRM platforms, email services, analytics providers) under strict data processing agreements.</li>
                <li><strong>Legal requirements:</strong> When required by law, court order, or government authority.</li>
                <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We do not sell your personal information to data brokers or unrelated third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">5. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes
                described in this policy, typically for a period of 36 months from the date of
                collection. After this period, data is either anonymized or securely deleted.
                You may request earlier deletion as described in Section 7.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">6. Data Security</h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures including 256-bit SSL encryption for
                data transmission, encrypted database storage, access controls limiting who can view
                your data, and regular security audits. However, no method of transmission over the
                Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">7. Your Rights (including CCPA)</h2>
              <p className="leading-relaxed mb-3">
                Depending on your state of residence, you may have the following rights:
              </p>
              <div className="space-y-3">
                {[
                  { right: 'Right to Know', desc: 'Request information about the personal data we have collected about you' },
                  { right: 'Right to Delete', desc: 'Request deletion of your personal information, subject to certain exceptions' },
                  { right: 'Right to Opt-Out', desc: 'Opt out of the sale or sharing of your personal information' },
                  { right: 'Right to Correct', desc: 'Request correction of inaccurate personal information' },
                  { right: 'Right to Non-Discrimination', desc: 'We will not discriminate against you for exercising your privacy rights' },
                ].map((item) => (
                  <div key={item.right} className="flex gap-3">
                    <span className="text-gold font-bold text-sm flex-shrink-0 mt-0.5">•</span>
                    <div>
                      <span className="font-semibold text-navy text-sm">{item.right}:</span>{' '}
                      <span className="text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed mt-4 text-sm">
                California residents have additional rights under the California Consumer Privacy Act
                (CCPA). To exercise any of these rights, contact us at privacy@goldinvestmentsguide.com
                or the address below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">8. Cookies</h2>
              <p className="leading-relaxed">
                We use cookies and similar technologies to improve your experience, analyze traffic,
                and track marketing campaigns. You can control cookie preferences through your browser
                settings. Disabling certain cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">9. Children&apos;s Privacy</h2>
              <p className="leading-relaxed">
                This website is not directed at individuals under 18 years of age. We do not knowingly
                collect personal information from children. If you believe we have collected information
                from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">10. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                For privacy-related inquiries, to exercise your rights, or to opt out of communications:
              </p>
              <div className="bg-[#f8f9fa] rounded-xl p-5 border border-gray-200 text-sm space-y-1">
                <p><strong>Site Operator (Independent Party)</strong></p>
                <p>Email: privacy@goldinvestmentsguide.com</p>
                <p>Or use the contact form on our website</p>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                We will respond to all privacy requests within 30 days.
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6 text-sm text-gray-500">
              <p>
                This policy may be updated from time to time. The &quot;Last updated&quot; date at the top
                reflects the most recent version.{' '}
                <Link href="/terms" className="text-gold hover:underline">View Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
