'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100)
    const t2 = setTimeout(() => setPhase('out'), 1600)
    const t3 = setTimeout(() => setPhase('done'), 2400)
    document.body.style.overflow = 'hidden'
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.body.style.overflow = '' }
  }, [])

  useEffect(() => { if (phase === 'done') document.body.style.overflow = '' }, [phase])
  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: '#ffffff', opacity: phase === 'out' ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <div style={{ opacity: phase === 'in' ? 0 : 1, transform: phase === 'in' ? 'translateY(12px)' : 'translateY(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
        <div className="relative" style={{ width: 'clamp(260px, 80vw, 400px)', height: 'clamp(100px, 30vw, 160px)' }}>
          <Image src="/images/cbs-logo.webp" alt="Central Building Supplies" fill className="object-contain" priority />
        </div>
      </div>
    </div>
  )
}
