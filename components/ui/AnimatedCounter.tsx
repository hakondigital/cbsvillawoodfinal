'use client'

/**
 * AnimatedCounter
 * Counts up from 0 to `value` when it enters the viewport.
 * Used in the "Trade Value" stats section on the home page.
 */

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number // ms
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()
    const startValue = 0
    const endValue = value

    function easeOut(t: number): number {
      return 1 - Math.pow(1 - t, 3)
    }

    function updateCount(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOut(progress)
      setCount(Math.round(startValue + (endValue - startValue) * easedProgress))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
