'use client'

import Image from 'next/image'
import Link from 'next/link'

// Same order as the footer strip: MAC Render in Euromix's old slot and taller; Astec Wallmaster added.
const LOGOS: { src: string; alt: string; dark?: boolean; h?: number }[] = [
  { src: '/images/ace-logo-orange.webp', alt: 'ACE Polystyrene', h: 72 },
  { src: '/images/Mac-Render.webp', alt: 'Melbacrylic', h: 84 },
  { src: '/images/FINALLOGONOVATEX.webp', alt: 'Novatex' },
  { src: '/images/Euromix.webp', alt: 'Euromix' },
  { src: '/images/unitex-logo.svg', alt: 'Unitex' },
  // White artwork — shown on a dark tile
  { src: '/images/builders-emporium-logo.svg', alt: 'Builders Emporium', dark: true },
  { src: '/images/astec-wallmaster-logo.webp', alt: 'Astec Wallmaster' },
  { src: '/images/trademark-wholesale-logo.webp', alt: 'TradeMark' },
]

export default function IntroSection() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container-site">
        <p className="text-ink text-center mx-auto mb-10 md:mb-14" style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', lineHeight: 1.7, maxWidth: 900 }}>
          <strong>Central Building Supplies</strong> is Western &amp; South West Sydney&rsquo;s specialist
          trade supplier for renderers and builders. Factory-direct ACE polystyrene foam,
          four leading render systems, plus mouldings, tools, and accessories &mdash; all
          under one roof at our Villawood and Prestons locations.
        </p>

        <div style={{ borderTop: '1px solid #e8e5e0', paddingTop: 24 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center justify-center sm:justify-start gap-5 md:gap-10 flex-wrap">
              {LOGOS.map((l) => (
                <div key={l.alt} className={`relative flex-shrink-0 ${l.dark ? 'bg-ink px-1' : ''}`} style={{ height: l.h ?? 56, width: 'clamp(100px, 18vw, 170px)' }}>
                  <Image src={l.src} alt={l.alt} fill className="object-contain" sizes="170px" />
                </div>
              ))}
            </div>
            <Link href="/brands" className="font-body text-cbs flex-shrink-0 text-center sm:text-right" style={{ fontSize: 14, fontWeight: 600 }}>
              View all brands &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
