'use client'

import Link from 'next/link'

const POINTS = [
  { title: 'Factory-direct foam pricing', desc: 'ACE Polystyrene foam panels at factory-direct pricing. Full range of thicknesses, custom sizing available, no markup.' },
  { title: 'Four render systems, one supplier', desc: 'Euromix, Novatex, Melbacrylic, and Unitex under one roof. Spec the right product for any substrate.' },
  { title: 'Open 6AM, stocked by the pallet', desc: 'Walk in early with a big order. We keep serious stock so your crew leaves with a full load.' },
  { title: 'Expert trade advice', desc: 'Our team knows rendering. We\u2019ll match you to the right system for your substrate and application.' },
]

export default function TradeValue() {
  return (
    <section style={{ backgroundColor: '#2a2520' }} className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="px-4 sm:px-8 lg:px-12 py-12 md:py-20 flex flex-col justify-center">
          <h2 className="text-white mb-8 md:mb-10" style={{ fontSize: 'clamp(24px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.05 }}>
            Why the trade chooses CBS.
          </h2>

          <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
            {POINTS.map((p) => (
              <div key={p.title} className="flex gap-3">
                <span className="text-cbs flex-shrink-0 mt-0.5" style={{ fontSize: 16 }}>&#10003;</span>
                <p className="text-white" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', lineHeight: 1.7 }}>
                  <strong>{p.title}</strong> &mdash; {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link href="/products" className="btn-white">Browse Products</Link>
            <Link href="/contact" className="btn-outline-white">Get in Touch</Link>
          </div>
        </div>

        <div className="relative min-h-[250px] md:min-h-[350px] lg:min-h-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/villawood-foam-cube.webp)' }} />
      </div>
    </section>
  )
}
