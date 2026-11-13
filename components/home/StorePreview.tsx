'use client'

import Image from 'next/image'
import { medium, PRIMARY_STORE, SECONDARY_STORE, PRIMARY_STORE_PHOTO } from '@/lib/utils'

export default function StorePreview() {
  const p = PRIMARY_STORE
  const v = SECONDARY_STORE

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container-site">
        <h2 className="text-ink mb-2">Visit Us In-Store</h2>
        <p className="text-body-text mb-8 md:mb-12" style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}>
          {p.tagline}
        </p>

        {/* Primary store — featured with photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="relative overflow-hidden" style={{ height: 'clamp(220px, 35vw, 380px)' }}>
            <Image src={medium(PRIMARY_STORE_PHOTO)} alt={`${p.name} store`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <h3 className="text-ink mb-3" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700 }}>{p.name}</h3>
            <div style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 2, color: '#666' }}>
              <p>{p.address}</p>
              <p><a href={`tel:${p.phone}`} className="text-ink font-semibold">{p.phone}</a>{p.mobile ? ' (landline)' : ''}</p>
              {p.mobile && <p><a href={`tel:${p.mobile}`} className="text-ink font-semibold">{p.mobile}</a> (mobile)</p>}
              <p>Mon&ndash;Fri {p.hours.weekdays}</p>
              <p>Sat {p.hours.saturday}</p>
            </div>
            <a href={p.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark mt-5 inline-flex text-[13px]">Get Directions &rarr;</a>
          </div>
        </div>

        {/* Sister store — compact secondary */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid #e8e5e0' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.35)' }}>Also visit our {v.suburb} store</p>
              <h4 className="text-ink mb-1" style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700 }}>{v.name}</h4>
              <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ fontSize: 14, color: '#666' }}>
                <span>{v.address}</span>
                {v.mobile && <a href={`tel:${v.mobile}`} className="text-ink font-semibold">{v.mobile}</a>}
                <a href={`tel:${v.phone}`} className="text-ink font-semibold">{v.phone}</a>
                <span>Mon&ndash;Fri {v.hours.weekdays} &middot; Sat {v.hours.saturday}</span>
              </div>
            </div>
            <a href={v.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark inline-flex text-[13px] flex-shrink-0">Get Directions &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  )
}
