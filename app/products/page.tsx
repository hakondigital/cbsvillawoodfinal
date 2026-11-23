import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ProductsContent from './ProductsContent'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse the full CBS product catalogue.',
}

// Every stocked brand. h = tile height; squarer marks run taller. Brands with no catalogue products link out to their own site.
const BRAND_LOGOS: { src: string; alt: string; href: string; bg?: string; h?: number; external?: boolean }[] = [
  { src: '/images/ace-logo-orange.webp', alt: 'ACE', href: '/products?brand=ACE', h: 38 },
  { src: '/images/ace-moulding-logo.webp', alt: 'ACE Mouldings', href: '/products?category=Mouldings', h: 44 },
  { src: '/images/Mac-Render.webp', alt: 'Melbacrylic', href: '/products?brand=Melbacrylic', h: 44 },
  { src: '/images/FINALLOGONOVATEX.webp', alt: 'Novatex', href: '/products?brand=Novatex' },
  { src: '/images/Euromix.webp', alt: 'Euromix', href: '/products?brand=Euromix' },
  { src: '/images/unitex-logo.svg', alt: 'Unitex', href: '/products?brand=Unitex' },
  // White artwork — needs a dark tile to be visible
  { src: '/images/builders-emporium-logo.svg', alt: 'Builders Emporium', href: '/products?brand=Builders+Emporium', bg: 'bg-ink px-1' },
  { src: '/images/astec-wallmaster-logo.webp', alt: 'Astec Wallmaster', href: '/products?brand=Astec' },
  { src: '/images/trademark-wholesale-logo.webp', alt: 'TradeMark', href: 'https://www.trademarkwholesale.com.au/', external: true },
  { src: '/images/iquip-logo.webp', alt: 'iQuip', href: 'https://www.iquip.com.au/', h: 44, external: true },
]

export default function ProductsPage() {
  return (
    <>
      <section className="bg-ink" style={{ padding: '60px 0 50px' }}>
        <div className="container-site">
          <h1 className="text-white">{products.length} products. In stock. Factory direct.</h1>
        </div>
      </section>

      {/* Brand logo quick-nav bar */}
      <div className="bg-white" style={{ borderBottom: '1px solid #e8e5e0', padding: '20px 0' }}>
        <div className="container-site flex items-center gap-6 flex-wrap">
          <span className="font-heading text-ink/30" style={{ fontSize: 12, letterSpacing: '0.12em' }}>SHOP BY BRAND</span>
          {BRAND_LOGOS.map((l) => {
            const cls = `relative flex-shrink-0 hover:opacity-70 transition-opacity ${l.bg || ''}`
            const style = { height: l.h ?? 28, width: 'clamp(60px, 12vw, 90px)' }
            const img = <Image src={l.src} alt={l.alt} fill className="object-contain p-0.5" sizes="90px" />
            return l.external ? (
              <a key={l.alt} href={l.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{img}</a>
            ) : (
              <Link key={l.alt} href={l.href} className={cls} style={style}>{img}</Link>
            )
          })}
        </div>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-body-text">Loading&hellip;</div>}>
        <ProductsContent />
      </Suspense>
    </>
  )
}
