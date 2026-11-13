'use client'

import { PRIMARY_STORE } from '@/lib/utils'

export default function CtaBanner() {
  // Landline leads; the office mobile sits under it when the branch has one.
  const lead = PRIMARY_STORE.phone
  const second = PRIMARY_STORE.mobile

  return (
    <section className="bg-cbs text-center text-white py-10 md:py-14 px-4">
      <h2 style={{ fontSize: 'clamp(24px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.05, color: '#fff' }}>
        Ready to order?
      </h2>
      <a href={`tel:${lead}`} className="block mt-2 hover:opacity-80 transition-opacity font-heading" style={{ fontSize: 'clamp(20px, 4vw, 56px)', fontWeight: 800, color: '#fff' }}>
        {lead}
      </a>
      {second && (
        <a href={`tel:${second}`} className="block mt-1 hover:opacity-80 transition-opacity font-heading" style={{ fontSize: 'clamp(16px, 3vw, 36px)', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
          {second}
        </a>
      )}
    </section>
  )
}
