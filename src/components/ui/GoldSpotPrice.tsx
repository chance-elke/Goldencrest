'use client'

import { useState, useEffect, useCallback } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import { formatCurrencyDecimal } from '@/lib/utils'

const FALLBACK_PRICE = 2345.67
const FALLBACK_CHANGE = 12.40
const FALLBACK_CHANGE_PCT = 0.53

export default function GoldSpotPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [change, setChange] = useState<number>(FALLBACK_CHANGE)
  const [changePct, setChangePct] = useState<number>(FALLBACK_CHANGE_PCT)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchPrice = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true)

    try {
      const res = await fetch('/api/gold-price', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (data.price) {
          setPrice(data.price)
          setChange(data.change ?? FALLBACK_CHANGE)
          setChangePct(data.changePercent ?? FALLBACK_CHANGE_PCT)
          setLastUpdated(new Date())
        } else {
          setPrice(FALLBACK_PRICE)
        }
      } else {
        setPrice(FALLBACK_PRICE)
      }
    } catch {
      setPrice(FALLBACK_PRICE)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchPrice()
    const interval = setInterval(() => fetchPrice(), 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchPrice])

  const isPositive = change >= 0
  const displayPrice = price ?? FALLBACK_PRICE

  return (
    <div className="inline-flex items-center gap-3 bg-navy/60 border border-gold/30 rounded-xl px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          Gold Spot
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
        </div>
      ) : (
        <>
          <span className="text-gold font-bold text-lg">
            {formatCurrencyDecimal(displayPrice)}/oz
          </span>

          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>
              {isPositive ? '+' : ''}
              {change.toFixed(2)} ({isPositive ? '+' : ''}
              {changePct.toFixed(2)}%)
            </span>
          </div>
        </>
      )}

      <button
        onClick={() => fetchPrice(true)}
        className="text-gray-500 hover:text-gold transition-colors ml-1"
        aria-label="Refresh gold price"
        disabled={isRefreshing}
      >
        <RefreshCw
          className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
        />
      </button>

      {lastUpdated && (
        <span className="text-gray-600 text-xs hidden sm:inline">
          {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </div>
  )
}
