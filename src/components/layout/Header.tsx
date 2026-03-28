'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/guide', label: 'Gold IRA Guide' },
  { href: '/get-started', label: 'Get Started' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-navy',
        isScrolled ? 'shadow-lg shadow-navy/20' : ''
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Gold Investments Guide Home"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/20 border border-gold/40 group-hover:bg-gold/30 transition-colors">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <span className="font-bold text-lg lg:text-xl">
              <span className="text-gold">Gold Investments</span>
              <span className="text-white"> Guide</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-gold bg-gold/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/get-started"
              className="btn-gold text-sm px-5 py-2.5 btn-gold-shimmer"
            >
              Get Free Guide
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="border-t border-white/10 px-4 py-4 space-y-1 bg-navy">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                pathname === link.href
                  ? 'text-gold bg-gold/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/get-started"
              className="btn-gold w-full justify-center text-sm py-3"
            >
              Get Free Guide
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
