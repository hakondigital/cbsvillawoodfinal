'use client'

import Image from 'next/image'
import Link from 'next/link'

// Every stocked brand, same order as the footer strip. Two rows of five on desktop; each logo fills its cell.
const LOGOS: { src: string; alt: string; dark?: boolean }[] = [
  { src: '/images/ace-logo-orange.webp', alt: 'ACE Polystyrene' },
  { src: '/images/ace-moulding-logo.webp', alt: 'ACE Mouldings' },
  { src: '/images/mac-render-logo.webp', alt: 'MAC Render' },
  { src: '/images/unitex-logo.svg', alt: 'Unitex' },
  { src: '/images/FINALLOGONOVATEX.webp', alt: 'Novatex' },
  { src: '/images/Euromix.webp', alt: 'Euromix' },
  // White artwork — shown on a dark tile
  { src: '/images/builders-emporium-logo.svg', alt: 'Builders Emporium', dark: true },
  { src: '/images/astec-wallmaster-logo.webp', alt: 'Astec Wallmaster' },
  { src: '/images/trademark-wholesale-logo.webp', alt: 'TradeMark' },
  { src: '/images/iquip-logo.webp', alt: 'iQuip' },
]

export default function IntroSection() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container-site">
        <p className="text-ink text-center mx-auto mb-10 md:mb-14" style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', lineHeight: 1.7, maxWidth: 900 }}>
          <strong>Central Building Supplies</strong> is Western &amp; South West Sydney&rsquo;s specialist
          trade supplier for renderers and builders. Factory-direct ACE polystyrene foam,
          four leading render systems, plus mouldings, tools, and accessories &mdash; all
          under one roof at our Villawood, Prestons and Canberra locations.
        </p>

        <div style={{ borderTop: '1px solid #e8e5e0', paddingTop: 24 }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-5 md:gap-x-10 md:gap-y-8 items-center">
            {LOGOS.map((l) => (
              <div key={l.alt} className={`relative w-full h-14 md:h-16 lg:h-20 ${l.dark ? 'bg-ink px-1' : ''}`}>
                <Image src={l.src} alt={l.alt} fill className="object-contain" sizes="(max-width: 768px) 45vw, 240px" />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center md:text-right">
            <Link href="/brands" className="font-body text-cbs" style={{ fontSize: 14, fontWeight: 600 }}>
              View all brands &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
