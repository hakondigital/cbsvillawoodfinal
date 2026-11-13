'use client'

import Link from 'next/link'
import Image from 'next/image'
import { medium, thumb } from '@/lib/utils'

const CATS = [
  { label: 'Foam Panels', image: '/images/ace-grey-foam-panels-gallery.webp', href: '/products?category=Foam' },
  { label: 'Render Systems', image: '/images/23a7777e-5c66-48ee-9d1d-f93619e7f1c5.webp', href: '/products?category=Render' },
  { label: 'Texture Coatings', image: '/images/7fd79032-3cfc-4476-b6c3-bd837ad8c159.webp', href: '/products?category=Texture' },
  { label: 'Mouldings', image: '/images/edges.webp', href: '/products?category=Mouldings' },
  { label: 'Paint', image: '/images/BBC5B34C-D7A2-4F57-908E-DA4DA477DD11.webp', href: '/products?category=Paint' },
  { label: 'Tiling', image: '/images/products/novatex-e-lite-white.webp', href: '/products?category=Tiling' },
  { label: 'Waterproofing', image: '/images/products/mac-wpm440.webp', href: '/products?category=Waterproofing' },
  { label: 'Angles', image: '/images/products/be-acrylic-render-pre-meshed-angle-4mm-mesh.webp', href: '/products?category=Angles' },
  { label: 'Mesh', image: '/images/0C448B52-4AFF-49AC-8174-764A73588C59.webp', href: '/products?category=Mesh' },
  { label: 'Tools', image: '/images/B8D7F79F-C2F8-4930-9811-F3407C6F1D3D.webp', href: '/products?category=Tools' },
  { label: 'Accessories', image: '/images/0422F1F0-C754-460B-BB0B-CC1A407C924B.webp', href: '/products?category=Accessories' },
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
