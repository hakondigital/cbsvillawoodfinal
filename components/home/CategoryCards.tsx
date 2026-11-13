'use client'

import Link from 'next/link'
import Image from 'next/image'
import { medium, thumb } from '@/lib/utils'

const CATS = [
  { label: 'Foam Panels', image: '/images/villawood-foam-racking.webp', href: '/products?category=Foam' },
  { label: 'Render Systems', image: '/images/villawood-render-pallets.webp', href: '/products?category=Render' },
  { label: 'Texture Coatings', image: '/images/7fd79032-3cfc-4476-b6c3-bd837ad8c159.webp', href: '/products?category=Texture' },
  { label: 'Mouldings', image: '/images/edges.webp', href: '/products?category=Mouldings' },
  { label: 'Paint', image: '/images/BBC5B34C-D7A2-4F57-908E-DA4DA477DD11.webp', href: '/products?category=Paint' },
  { label: 'Tiling', image: '/images/products/novatex-e-lite-white.webp', href: '/products?category=Tiling' },
  { label: 'Waterproofing', image: '/images/products/mac-wpm440.webp', href: '/products?category=Waterproofing' },
  { label: 'Angles', image: '/images/villawood-mesh-angles.webp', href: '/products?category=Angles' },
  { label: 'Mesh', image: '/images/villawood-mesh-rack.webp', href: '/products?category=Mesh' },
  { label: 'Tools', image: '/images/villawood-mixers-paddles.webp', href: '/products?category=Tools' },
  { label: 'Accessories', image: '/images/villawood-fixings-shelving.webp', href: '/products?category=Accessories' },
]

// Desktop: 11 tiles as a 6 + 5 layout. Mobile: 3-across on a 6-column grid, last two tiles widen to fill the final row.
const ROW_ONE = 6

export default function CategoryCards() {
  return (
    <section>
      <div className="hidden md:grid md:grid-cols-6" style={{ gap: 0 }}>
        {CATS.slice(0, ROW_ONE).map((c) => (
          <Link key={c.label} href={c.href} className="relative block group overflow-hidden" style={{ height: 240 }}>
            <Image src={medium(c.image)} alt={c.label} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="17vw" />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />
            <span className="absolute bottom-4 left-5 text-white font-heading" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>
              {c.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="hidden md:grid md:grid-cols-5" style={{ gap: 0 }}>
        {CATS.slice(ROW_ONE).map((c) => (
          <Link key={c.label} href={c.href} className="relative block group overflow-hidden" style={{ height: 240 }}>
            <Image src={medium(c.image)} alt={c.label} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="20vw" />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />
            <span className="absolute bottom-4 left-5 text-white font-heading" style={{ fontSize: 18, fontWeight: 700, textTransform: 'uppercase' }}>
              {c.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile: 6-column grid, tiles span 2 (3 per row); the last two span 3 so the final row is full */}
      <div className="grid grid-cols-6 md:hidden" style={{ gap: 0 }}>
        {CATS.map((c, i) => {
          const wide = i >= CATS.length - 2
          return (
            <Link key={c.label} href={c.href} className={`relative block group overflow-hidden ${wide ? 'col-span-3' : 'col-span-2'}`} style={{ height: 'clamp(100px, 30vw, 150px)' }}>
              <Image src={thumb(c.image)} alt={c.label} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes={wide ? '50vw' : '33vw'} />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }} />
              <span className="absolute bottom-2 left-2 text-white font-heading" style={{ fontSize: 'clamp(10px, 2.5vw, 14px)', fontWeight: 700, textTransform: 'uppercase' }}>
                {c.label}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
