import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  showLabel = true,
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const stars = Array.from({ length: maxStars }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating)
    const half = !filled && i < rating && rating - i >= 0.25
    return { filled, half }
  })

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((star, index) => (
          <svg
            key={index}
            className={cn(sizeClasses[size], 'flex-shrink-0')}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {star.filled ? (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#d4a843"
                stroke="#d4a843"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : star.half ? (
              <>
                <defs>
                  <linearGradient id={`half-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" stopColor="#d4a843" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#half-${index})`}
                  stroke="#d4a843"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="none"
                stroke="#d4a843"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            )}
          </svg>
        ))}
      </div>
      {showLabel && (
        <span className={cn('font-semibold text-gold', textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
