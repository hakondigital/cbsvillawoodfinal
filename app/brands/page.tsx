'use client'

import Link from 'next/link'
import Image from 'next/image'
import { brands } from '@/data/brands'
import { products } from '@/data/products'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
/** Brand ids (e.g. 'builders-emporium') map onto product brand names (e.g. 'Builders Emporium') once punctuation and case are ignored */
const hasProducts = (brandId: string) => products.some((p) => norm(p.brand) === norm(brandId))

export default function BrandsPage() {
  const sorted = [...brands.filter((b) => b.inHouse), ...brands.filter((b) => !b.inHouse && b.featured), ...brands.filter((b) => !b.inHouse && !b.featured)]

  return (
    <>
      <section className="bg-ink" style={{ padding: '60px 0 50px' }}>
        <div className="container-site">
          <h1 className="text-white">One supplier. Every system you need.</h1>
        </div>
      </section>

      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="container-site" style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {sorted.map((brand, i) => (
            <div key={brand.id} id={brand.id} className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: 48 }}>
              {/* Logo + text */}
              <div className={i % 2 === 1 ? 'order-2' : ''}>
                <div className={`relative mb-5 ${brand.logoOnDark ? 'bg-[#0a0a18] px-1' : ''}`} style={{ height: 72, width: 200 }}>
                  <Image src={brand.logoPath} alt={brand.name} fill className="object-contain object-left p-1" sizes="200px" />
                </div>
                <h2 className="text-ink mb-4" style={{ fontSize: 40, fontWeight: 800 }}>{brand.name}</h2>
                {brand.inHouse && <p className="font-heading text-cbs mb-3" style={{ fontSize: 13, letterSpacing: '0.1em' }}>CBS-OWNED FACTORY</p>}
                <p className="text-body-text mb-6" style={{ fontSize: 16, lineHeight: 1.8 }}>{brand.shortBlurb}</p>
                <div className="flex gap-3 flex-wrap">
                  {(brand.productsHref || hasProducts(brand.id)) && (
                    <Link href={brand.productsHref ?? `/products?brand=${brand.id}`} className="btn-brand text-[13px]">View Products</Link>
                  )}
                  {brand.websiteUrl && <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark text-[13px]">Brand Site</a>}
                </div>
              </div>

              {/* Stock list */}
              <div className={i % 2 === 1 ? 'order-1' : ''}>
                <h3 className="font-heading text-ink/40 mb-4" style={{ fontSize: 13, letterSpacing: '0.12em' }}>CBS STOCKS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1" style={{ fontSize: 15, color: '#444', lineHeight: 1.8 }}>
                  {brand.productTypes.map((t) => <p key={t}>{t}</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
