import Link from 'next/link'
import Image from 'next/image'
import { PRIMARY_STORE, SECONDARY_STORE } from '@/lib/utils'

// Order per client (Nov 2026): MAC Render takes Euromix's old slot and runs larger; Astec Wallmaster added.
// Two rows of four full-width tiles; each logo scales to fill its column.
const BRAND_LOGOS: { src: string; alt: string }[] = [
  { src: '/images/ace-logo-orange.webp', alt: 'ACE' },
  { src: '/images/Mac-Render.webp', alt: 'Melbacrylic' },
  { src: '/images/FINALLOGONOVATEX.webp', alt: 'Novatex' },
  { src: '/images/Euromix.webp', alt: 'Euromix' },
  { src: '/images/unitex-logo.svg', alt: 'Unitex' },
  { src: '/images/builders-emporium-logo.svg', alt: 'Builders Emporium' },
  { src: '/images/astec-wallmaster-logo.webp', alt: 'Astec Wallmaster' },
  { src: '/images/trademark-wholesale-logo.webp', alt: 'TradeMark' },
]

export default function Footer() {
  return (
    <footer className="bg-ink" style={{ color: 'rgba(245,242,238,0.6)' }}>
      {/* Brand logos strip at top of footer */}
      <div style={{ borderBottom: '1px solid rgba(245,242,238,0.1)', padding: '28px 0' }}>
        <div className="container-site flex flex-col gap-5">
          <p className="font-heading" style={{ fontSize: 13, letterSpacing: '0.12em', color: 'rgba(245,242,238,0.3)' }}>
            BRANDS WE STOCK
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {BRAND_LOGOS.map((l) => (
              <div key={l.alt} className="relative w-full h-16 sm:h-20 md:h-24">
                <Image src={l.src} alt={l.alt} fill className="object-contain" sizes="(max-width: 768px) 45vw, 320px" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site" style={{ paddingTop: 48, paddingBottom: 40 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="relative" style={{ height: 40, width: 140 }}>
                <Image src="/images/cbs-villawood-logo.webp" alt="CBS" fill className="object-contain object-left" />
              </div>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 2 }}>
              Factory-direct ACE polystyrene, Euromix, Novatex, Melbacrylic, and Unitex render systems. Two trade locations in Western &amp; South West Sydney.
            </p>
            {/* TODO(client): Villawood socials. The Prestons Facebook/TikTok links were dropped; this Instagram is the company account. */}
            <div className="flex items-center gap-3 mt-3">
              <a href="https://www.instagram.com/centralbuildingsupplies/" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-heading mb-4" style={{ fontSize: 13, letterSpacing: '0.12em', color: '#f5f2ee' }}>PRODUCTS</h4>
            <ul style={{ fontSize: 13, lineHeight: 2 }}>
              {['Foam', 'Render', 'Texture', 'Mouldings', 'Paint', 'Tiling', 'Waterproofing', 'Angles', 'Mesh', 'Tools', 'Accessories'].map((c) => (
                <li key={c}><Link href={`/products?category=${c}`} className="hover:text-white transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading mb-4" style={{ fontSize: 13, letterSpacing: '0.12em', color: '#f5f2ee' }}>COMPANY</h4>
            <ul style={{ fontSize: 13, lineHeight: 2 }}>
              {[['About', '/about'], ['Brands', '/brands'], ['Products', '/products'], ['Resources', '/resources'], ['Contact', '/contact']].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading mb-4" style={{ fontSize: 13, letterSpacing: '0.12em', color: '#f5f2ee' }}>STORES</h4>
            {[PRIMARY_STORE, SECONDARY_STORE].map((s) => (
              <div key={s.name} className="mb-3" style={{ fontSize: 13, lineHeight: 2 }}>
                <p style={{ color: '#f5f2ee' }} className="font-body font-semibold">{s.name}</p>
                <p>{s.address}</p>
                <a href={`tel:${s.phone}`} className="hover:text-white transition-colors block">{s.phone}</a>
                {s.mobile && <a href={`tel:${s.mobile}`} className="hover:text-white transition-colors block">{s.mobile}</a>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(245,242,238,0.1)' }}>
        <div className="container-site py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {/* TODO(client): confirm the legal entity name for the Villawood store (old site footer says Central Building Supplies Pty Ltd) */}
            <p style={{ fontSize: 11, color: 'rgba(245,242,238,0.3)' }}>&copy; {new Date().getFullYear()} Central Building Supplies Pty Ltd</p>
            <p style={{ fontSize: 11, color: 'rgba(245,242,238,0.3)' }}>
              Website by <a href="https://hakondigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: 'rgba(245,242,238,0.5)' }}>Hakon Digital</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
