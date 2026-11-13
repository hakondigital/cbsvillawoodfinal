'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'
import { X, ExternalLink, Phone, Download, Mail, MessageSquare } from 'lucide-react'
import { PRIMARY_STORE, thumb } from '@/lib/utils'

interface Props { product: Product | null; onClose: () => void }

export default function ProductDrawer({ product, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = product ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [product])

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-ink/50 z-40" onClick={onClose} />
          <motion.div key="dr" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="fixed top-0 right-0 h-full w-full max-w-xl bg-white z-50 overflow-y-auto" data-lenis-prevent>
            <div className="sticky top-0 bg-white flex items-center justify-between p-5 z-10" style={{ borderBottom: '1px solid #e0ddd8' }}>
              <div className="flex items-center gap-3">
                <span className="font-heading" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>{product.brand}</span>
                <span style={{ fontSize: 13, color: 'rgba(26,26,24,0.3)' }}>{product.category}</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity" style={{ border: '1px solid #e0ddd8' }} aria-label="Close"><X size={16} /></button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Product image */}
              {product.imagePath && (
                <div className="relative w-full overflow-hidden bg-[#f5f2ee]" style={{ height: 240 }}>
                  <Image src={product.imagePath} alt={product.name} fill className="object-contain p-4" sizes="500px" />
                </div>
              )}

              <h2 className="font-heading text-ink" style={{ fontSize: 24, fontWeight: 800 }}>{product.name}</h2>

              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.badges.map((b) => <span key={b} className="font-heading" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid #e0ddd8', padding: '4px 8px', color: 'rgba(26,26,24,0.5)' }}>{b}</span>)}
                </div>
              )}

              <div>
                <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>Overview</h3>
                <p style={{ fontSize: 15, color: 'rgba(26,26,24,0.6)', lineHeight: 1.7 }}>{product.shortDescription}</p>
              </div>

              {product.application && (
                <div>
                  <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>Application</h3>
                  <p style={{ fontSize: 15, color: 'rgba(26,26,24,0.6)', lineHeight: 1.7 }}>{product.application}</p>
                </div>
              )}

              {product.features.length > 0 && (
                <div>
                  <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>Features</h3>
                  <ul className="space-y-1">
                    {product.features.map((f) => <li key={f} style={{ fontSize: 15, color: 'rgba(26,26,24,0.6)', paddingLeft: 12, borderLeft: '2px solid #e0ddd8' }}>{f}</li>)}
                  </ul>
                </div>
              )}

              {product.specs && product.specs.length > 0 && (
                <div>
                  <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>Specifications</h3>
                  <div style={{ border: '1px solid #e0ddd8' }}>
                    {product.specs.map((s, i) => (
                      <div key={s.label} className="grid grid-cols-2" style={{ fontSize: 14, borderTop: i > 0 ? '1px solid #e0ddd8' : 'none' }}>
                        <div style={{ padding: '8px 12px', backgroundColor: '#f5f2ee', color: 'rgba(26,26,24,0.5)', fontWeight: 600 }}>{s.label}</div>
                        <div style={{ padding: '8px 12px', color: '#1a1a18' }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Factory colour range (tinted texture finishes) */}
              {product.colours && product.colours.length > 0 && (
                <div>
                  <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>
                    Colour Range ({product.colours.length})
                  </h3>
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {product.colours.map((c) => (
                      <div key={c.name}>
                        <div className="relative w-full overflow-hidden bg-[#f5f2ee]" style={{ aspectRatio: '1 / 1', border: '1px solid #e0ddd8' }}>
                          {/* Supplier swatch artwork carries a caption strip along its bottom edge — oversize the box so the strip is cropped out */}
                          <div className="absolute inset-x-0 top-0" style={{ height: '114%' }}>
                            <Image src={thumb(c.imagePath)} alt={`${product.name} — ${c.name}`} fill className="object-cover object-top" sizes="100px" />
                          </div>
                        </div>
                        <p className="text-center" style={{ fontSize: 11, color: 'rgba(26,26,24,0.6)', marginTop: 4, lineHeight: 1.3 }}>{c.name}</p>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(26,26,24,0.4)', marginTop: 8 }}>Swatches are indicative only — confirm colours against a physical sample in-store.</p>
                </div>
              )}

              {/* Measurement diagram for mouldings */}
              {product.diagramPath && (
                <div>
                  <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>Dimensions</h3>
                  <div className="relative w-full overflow-hidden bg-white border" style={{ height: 200, borderColor: '#e0ddd8' }}>
                    <Image src={product.diagramPath} alt={`${product.name} dimensions`} fill className="object-contain p-2" sizes="500px" />
                  </div>
                </div>
              )}

              {/* Product page link */}
              {product.externalLink && (
                <a href={product.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-cbs transition-colors font-body font-semibold" style={{ fontSize: 13 }}>
                  <ExternalLink size={13} /> View on {product.brand} website
                </a>
              )}

              {/* Downloadable resources */}
              {product.resources && product.resources.length > 0 && (
                <div>
                  <h3 className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.4)' }}>Resources &amp; Downloads</h3>
                  <div className="space-y-1">
                    {product.resources.map((r) => (
                      <a key={r.name} href={r.filePath} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink hover:text-cbs transition-colors" style={{ fontSize: 14 }}>
                        <Download size={13} /> {r.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ── CONTACT PRIMARY STORE ── */}
              <div style={{ borderTop: '2px solid #014BAD', paddingTop: 24, marginTop: 32 }}>
                <h3 className="font-heading text-ink mb-4" style={{ fontSize: 18, fontWeight: 800 }}>
                  Interested in this product?
                </h3>
                <p className="font-body mb-5" style={{ fontSize: 14, color: 'rgba(26,26,24,0.5)', lineHeight: 1.6 }}>
                  Contact {PRIMARY_STORE.name} for pricing, availability, and trade enquiries. We respond within one business day.
                </p>

                {/* Phone buttons */}
                <div className="space-y-2 mb-4">
                  <a href={`tel:${PRIMARY_STORE.phone}`} className="flex items-center justify-center gap-2 w-full font-heading font-bold text-white" style={{ background: '#014BAD', height: 48, fontSize: 15, letterSpacing: '0.03em' }}>
                    <Phone size={16} /> Call {PRIMARY_STORE.phone}
                  </a>
                  {PRIMARY_STORE.mobile && (
                    <a href={`tel:${PRIMARY_STORE.mobile}`} className="flex items-center justify-center gap-2 w-full font-heading font-bold text-ink" style={{ background: 'transparent', border: '2px solid #1a1a18', height: 48, fontSize: 15, letterSpacing: '0.03em' }}>
                      <Phone size={16} /> Call {PRIMARY_STORE.mobile}
                    </a>
                  )}
                </div>

                {/* Enquiry + Email */}
                <div className="space-y-2 mb-4" style={{ background: '#f5f2ee', padding: 16, border: '1px solid #e0ddd8' }}>
                  <p className="font-heading text-ink text-center mb-2" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em' }}>OR SEND US AN ENQUIRY</p>
                  <Link href="/contact#enquiry" onClick={onClose} className="flex items-center justify-center gap-2 w-full font-heading font-bold text-white" style={{ background: '#1a1a18', height: 48, fontSize: 14, letterSpacing: '0.03em' }}>
                    <MessageSquare size={16} /> Send a Written Enquiry
                  </Link>
                  <a href={`mailto:${PRIMARY_STORE.email}?subject=Product Enquiry: ${encodeURIComponent(product.name)}`} className="flex items-center justify-center gap-2 w-full font-heading font-bold text-ink" style={{ background: 'transparent', border: '2px solid #1a1a18', height: 48, fontSize: 14, letterSpacing: '0.03em' }}>
                    <Mail size={16} /> Email {PRIMARY_STORE.email}
                  </a>
                </div>

                {/* Store info */}
                <div style={{ fontSize: 12, color: 'rgba(26,26,24,0.4)', lineHeight: 1.8 }}>
                  <p className="font-semibold" style={{ color: 'rgba(26,26,24,0.6)' }}>{PRIMARY_STORE.name}</p>
                  <p>{PRIMARY_STORE.address}</p>
                  <p>Mon&ndash;Fri {PRIMARY_STORE.hours.weekdays} &middot; Sat {PRIMARY_STORE.hours.saturday}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
