'use client'

import Link from 'next/link'
import Image from 'next/image'
import { medium } from '@/lib/utils'

export default function AboutPreview() {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container-site">
        {/* Mobile: single column. Desktop: side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          {/* Shopfront photo supplied by the client, 26 Nov 2026 */}
          <div className="relative overflow-hidden" style={{ height: 'clamp(200px, 32vw, 420px)' }}>
            <Image src={medium('/images/villawood-shopfront-wide.webp')} alt="CBS Villawood shopfront on Woodville Road" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>

          <div>
            <h2 className="text-ink mb-4">About Central Building Supplies</h2>
            <div className="space-y-3" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', lineHeight: 1.8, color: '#444' }}>
              <p>CBS has been serving the rendering and building trade across Western &amp; South West Sydney since the early 2000s. What started as a single supply shop in Villawood has grown into a three-location operation with deep stock, expert staff, and factory-direct supply.</p>
              <p>We specialise exclusively in render, foam, mouldings, and the tools and accessories that go with them. Every product we carry is selected for the professional renderer.</p>
            </div>
            <Link href="/about" className="btn-outline-dark mt-5 inline-flex text-[13px]">Learn more about CBS &rarr;</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
