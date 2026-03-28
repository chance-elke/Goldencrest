import Link from 'next/link'
import { Shield } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/guide', label: 'Gold IRA Guide' },
  { href: '/get-started', label: 'Get Started' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/20 border border-gold/40">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-gold">Gold Investments</span>
                <span className="text-white"> Guide</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Independent reviews and comparisons of the best gold IRA companies to help
              Americans protect their retirement savings with precious metals.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Important Disclosure:</strong>{' '}
              This website is owned and operated by an independent party unaffiliated with any
              of the gold IRA companies reviewed or listed herein. The companies reviewed on
              this site are presented for informational purposes only. Submitting your
              information through this site does not create a relationship with any reviewed
              company. The operator of this site may contact you directly or share your
              information with selected partners. This site does not provide financial advice.
              Please consult a qualified financial advisor before making investment decisions.
              Investing in precious metals involves risk and may not be suitable for all
              investors. Past performance is not indicative of future results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} Gold Investments Guide. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
