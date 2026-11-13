'use client'

import Link from 'next/link'
import Image from 'next/image'
import { medium } from '@/lib/utils'

const BRANDS = [
  { name: 'ACE Polystyrene', logo: '/images/ACE.webp', logoBg: '', image: '/images/6940f3ab-d6f9-4c69-b162-f026cb9cf7a1.webp', copy: 'Graphite EPS foam panels in every thickness from 10mm to 600mm \u2014 CodeMark certified, BAL-29 rated. Sun hoods, architectural mouldings, expanding foam. Factory-direct pricing, custom sizing to order.', href: '/brands#ace' },
  { name: 'Euromix', logo: '/images/Euromix.webp', logoBg: '', image: '/images/ae359aba-d3d6-4e65-a119-cae00fdff431.webp', copy: 'Australian-made in Strathfield South. Premium acrylic-modified cement renders, skim coats, and plasters formulated with specially blended mineral fillers for superior crack resistance and workability. CBS distributes the full Euromix system.', href: '/brands#euromix' },
  { name: 'Novatex', logo: '/images/FINALLOGONOVATEX.webp', logoBg: '', image: '/images/23a7777e-5c66-48ee-9d1d-f93619e7f1c5.webp', copy: 'Over 70 years in the Australian building industry. Based in Wetherill Park, Novatex manufactures the EZ101 and ER100 render lines, SPR Acrylic polymer render, texture coatings, and the Ezytex skim range.', href: '/brands#novatex' },
  { name: 'Melbacrylic', logo: '/images/Mac-Render.webp', logoBg: '', image: '/images/7fd79032-3cfc-4476-b6c3-bd837ad8c159.webp', copy: 'Specialist cement and acrylic renders backed by a 7-year manufacturer\u2019s warranty. Macrender HBS for EPS, Coarse FR for AAC, and Supaskim finishing render. Their selector system matches the right product to every substrate.', href: '/brands#melbacrylic' },
]

export default function BrandStrip() {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container-site">
        <h2 className="text-ink mb-3">Top Brands You Can Trust</h2>
        <p className="text-body-text mb-8 md:mb-16" style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', maxWidth: 640 }}>
          We partner with Australia&rsquo;s leading brands to ensure every project is built on quality and lasting performance.
        </p>

        <div className="space-y-10 md:space-y-20">
          {BRANDS.map((brand, i) => (
            <div key={brand.name}>
              {/* Image — always full width on mobile */}
              <div className={`relative overflow-hidden mb-5 lg:hidden`} style={{ height: 'clamp(200px, 50vw, 300px)' }}>
                <Image src={medium(brand.image)} alt={brand.name} fill className="object-cover" sizes="100vw" />
              </div>

              {/* Desktop: side by side. Mobile: stacked (image above, text below) */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-0 items-center">
                <div className={`relative overflow-hidden ${i % 2 === 1 ? 'order-2' : ''}`} style={{ height: 400 }}>
                  <Image src={medium(brand.image)} alt={brand.name} fill className="object-cover" sizes="50vw" />
                </div>
                <div className={i % 2 === 1 ? 'order-1 pr-10' : 'pl-10'}>
                  <div className={`relative mb-4 overflow-hidden ${brand.logoBg}`} style={{ height: 60, width: 240 }}>
                    <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain object-left p-1" sizes="240px" />
                  </div>
                  <h3 className="text-ink mb-3" style={{ fontSize: 40, fontWeight: 800 }}>{brand.name}</h3>
                  <p className="text-body-text mb-5" style={{ fontSize: 16, lineHeight: 1.8 }}>{brand.copy}</p>
                  <Link href={brand.href} className="btn-outline-dark text-[13px]">View Products &rarr;</Link>
                </div>
              </div>

              {/* Mobile: text below image */}
              <div className="lg:hidden">
                <div className={`relative mb-3 overflow-hidden ${brand.logoBg}`} style={{ height: 44, width: 'clamp(140px, 50vw, 200px)' }}>
                  <Image src={brand.logo} alt={`${brand.name} logo`} fill className="object-contain object-left p-1" sizes="200px" />
                </div>
                <h3 className="text-ink mb-2" style={{ fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800 }}>{brand.name}</h3>
                <p className="text-body-text mb-4" style={{ fontSize: 15, lineHeight: 1.7 }}>{brand.copy}</p>
                <Link href={brand.href} className="btn-outline-dark text-[13px]">View Products &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
