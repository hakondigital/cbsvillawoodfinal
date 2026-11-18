'use client'

import Link from 'next/link'
import Image from 'next/image'

const BRANDS = [
  { name: 'ACE Polystyrene', logo: '/images/ace-logo-orange.webp', bg: '', href: '/products?brand=ACE' },
  { name: 'ACE Mouldings', logo: '/images/ace-moulding-logo.webp', bg: '', href: '/products?category=Mouldings' },
  { name: 'Euromix', logo: '/images/Euromix.webp', bg: '', href: '/products?brand=Euromix' },
  { name: 'Novatex', logo: '/images/FINALLOGONOVATEX.webp', bg: '', href: '/products?brand=Novatex' },
  { name: 'Melbacrylic', logo: '/images/Mac-Render.webp', bg: '', href: '/products?brand=Melbacrylic' },
  { name: 'Unitex', logo: '/images/unitex-logo.svg', bg: '', href: '/products?brand=Unitex' },
  // White artwork — rendered on a dark tile
  { name: 'Builders Emporium', logo: '/images/builders-emporium-logo.svg', bg: 'bg-ink', href: '/products?brand=Builders+Emporium' },
  { name: 'TradeMark', logo: '/images/trademark-wholesale-logo.webp', bg: '', href: '/brands#trademark' },
]

export default function ShopByBrand() {
  return (
    <section style={{ backgroundColor: '#f5f2ee' }} className="py-12 md:py-20">
      <div className="container-site">
        <h2 className="text-ink mb-2">Shop by Brand</h2>
        <p className="text-body-text mb-8" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)' }}>
          Browse products from the brands we stock.
        </p>

        {/* Three wide cards per row on desktop (two on phones); the logo fills the card above its label. */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {BRANDS.map((b) => (
            <Link key={b.name} href={b.href}
              className={`group flex flex-col items-center p-3 md:p-4 transition-shadow hover:shadow-md aspect-[4/3] md:aspect-[3/2] shrink-0 grow-0 basis-[calc(50%_-_6px)] md:basis-[calc(33.333%_-_11px)] ${b.bg || 'bg-white'}`}
              style={{ border: '1px solid #e8e5e0' }}>
              <div className="relative w-full flex-1 min-h-0 mb-2 md:mb-3">
                <Image src={b.logo} alt={b.name} fill className="object-contain" sizes="(max-width: 768px) 50vw, 420px" />
              </div>
              <span className="font-body text-center group-hover:text-cbs transition-colors" style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', fontWeight: 600, color: b.bg ? '#fff' : '#1a1a18' }}>
                {b.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
