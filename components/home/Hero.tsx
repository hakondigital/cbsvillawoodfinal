'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { PRIMARY_STORE_PHOTO } from '@/lib/utils'

const SLIDES = [
  {
    image: PRIMARY_STORE_PHOTO,
    heading: 'Western & South West Sydney\u2019s Trade Render & Foam Supplier',
    sub: 'Factory-direct ACE polystyrene foam, plus Euromix, Novatex, Melbacrylic & Unitex render systems. Two locations.',
  },
  {
    image: '/images/cbs-villawood-sign.webp',
    heading: 'Villawood — Where CBS Began',
    sub: 'Our original store at 203 Woodville Rd, Villawood. Supplying the trade since the early 2000s. Open 6am Monday to Saturday.',
  },
  {
    image: '/images/villawood-render-pallets.webp',
    heading: 'Backed by Australia\u2019s Most Trusted Render Brands',
    sub: 'We distribute the render systems that professional renderers specify. Full range in stock.',
  },
  {
    image: '/images/villawood-foam-cube.webp',
    heading: 'ACE Polystyrene \u2014 Factory-Direct Foam',
    sub: 'Graphite EPS foam panels, mouldings, and sun hoods \u2014 factory-direct pricing from ACE Polystyrene.',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  // Only the first slide is fetched up front; the rest are pulled in once the page has settled,
  // so the hero image does not compete with the rest of the page on a phone connection.
  const [loaded, setLoaded] = useState<number[]>([0])
  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), [])
  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t) }, [next])

  useEffect(() => {
    setLoaded((p) => (p.includes(current) ? p : [...p, current]))
    // Warm the following slide well before it is shown, but only after the current one has had time to paint.
    const upcoming = (current + 1) % SLIDES.length
    const t = setTimeout(() => setLoaded((p) => (p.includes(upcoming) ? p : [...p, upcoming])), 2000)
    return () => clearTimeout(t)
  }, [current])

  return (
    <section className="relative overflow-hidden bg-ink" style={{ height: 'calc(100vh - 72px)', minHeight: 480, maxHeight: 800 }}>
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[2000ms]" style={{ opacity: i === current ? 1 : 0 }}>
          <div className="absolute inset-0 bg-cover bg-center" style={loaded.includes(i) ? { backgroundImage: `url(${s.image})` } : undefined} />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-white mb-4 md:mb-5" style={{ fontSize: 'clamp(28px, 6vw, 88px)', fontWeight: 800, lineHeight: 1.05 }}>
            {SLIDES[current].heading}
          </h1>
          <p className="text-white/85 mx-auto mb-6 md:mb-8" style={{ fontSize: 'clamp(14px, 2vw, 18px)', maxWidth: 500 }}>
            {SLIDES[current].sub}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/products" className="btn-brand">Browse Products</Link>
            <Link href="/contact" className="btn-outline-white">Get a Quote</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="w-2.5 h-2.5 rounded-full transition-colors" style={{ backgroundColor: i === current ? '#014BAD' : 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
    </section>
  )
}
