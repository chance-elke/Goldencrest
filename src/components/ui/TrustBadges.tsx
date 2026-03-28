import { Lock, Shield, Star } from 'lucide-react'

const badges = [
  {
    icon: Lock,
    title: '256-bit SSL Encrypted',
    description: 'Your data is transmitted with bank-level encryption',
  },
  {
    icon: Shield,
    title: 'Your Data Is Never Sold to Listed Companies',
    description: 'We do not share your information with the companies we review',
  },
  {
    icon: Star,
    title: 'Independent Reviews',
    description: 'Unbiased analysis based on research, not paid placements',
  },
]

interface TrustBadgesProps {
  className?: string
  variant?: 'light' | 'dark'
}

export default function TrustBadges({ className = '', variant = 'light' }: TrustBadgesProps) {
  const isDark = variant === 'dark'

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 ${className}`}>
      {badges.map((badge) => {
        const Icon = badge.icon
        return (
          <div
            key={badge.title}
            className={`flex flex-col items-center text-center p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${
              isDark
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-white border-gray-100 shadow-sm'
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                isDark ? 'bg-gold/20' : 'bg-gold/10'
              }`}
            >
              <Icon className="w-6 h-6 text-gold" />
            </div>
            <h3
              className={`font-semibold text-sm mb-2 ${
                isDark ? 'text-white' : 'text-navy'
              }`}
            >
              {badge.title}
            </h3>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {badge.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}
