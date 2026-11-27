'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'
import { products, type ProductCategory, type ProductBrand, type Product } from '@/data/products'
import ProductDrawer from '@/components/ui/ProductDrawer'
import { medium, thumb, PRIMARY_STORE } from '@/lib/utils'

const CATS: ProductCategory[] = ['Foam', 'Render', 'Texture', 'Mouldings', 'Paint', 'Tiling', 'Waterproofing', 'Angles', 'Mesh', 'Tools', 'Accessories']
// Sidebar order — also the order brand groups appear in when a category is selected
const BRAND_NAMES: ProductBrand[] = ['ACE', 'MAC Render', 'Unitex', 'Novatex', 'Euromix', 'Builders Emporium', 'Astec']
type Filter = 'All' | ProductCategory

const normBrand = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
/** Resolve a ?brand= param ("ACE", "novatex", "builders-emporium", "Builders Emporium") to its canonical brand name */
const resolveBrand = (b: string | null): ProductBrand | null => (b ? BRAND_NAMES.find((n) => normBrand(n) === normBrand(b)) ?? null : null)

export default function ProductsContent() {
  const sp = useSearchParams()
  const router = useRouter()
  const urlCat = sp.get('category') as ProductCategory | null
  const urlBrand = sp.get('brand')
  const [active, setActive] = useState<Filter>(urlCat && CATS.includes(urlCat) ? urlCat : 'All')
  const [activeBrand, setActiveBrand] = useState<ProductBrand | null>(resolveBrand(urlBrand))
  const [sel, setSel] = useState<Product | null>(null)

  const change = useCallback((c: Filter) => {
    setActive(c)
    setActiveBrand(null)
    const p = new URLSearchParams()
    if (c !== 'All') p.set('category', c)
    router.replace(`/products${p.toString() ? `?${p}` : ''}`, { scroll: false })
  }, [router])

  const changeBrand = useCallback((b: ProductBrand | null) => {
    setActiveBrand(b)
    setActive('All')
    const p = new URLSearchParams()
    if (b) p.set('brand', b)
    router.replace(`/products${p.toString() ? `?${p}` : ''}`, { scroll: false })
  }, [router])

  useEffect(() => {
    const c = sp.get('category') as ProductCategory | null
    const b = resolveBrand(sp.get('brand'))
    if (b) {
      setActiveBrand(b)
      setActive('All')
    } else {
      setActiveBrand(null)
      setActive(c && CATS.includes(c) ? c : 'All')
    }
  }, [sp])

  let list = products
  if (activeBrand) {
    list = products.filter((p) => p.brand === activeBrand)
  } else if (active !== 'All') {
    list = products.filter((p) => p.category === active)
  }

  return (
    <>
      <section className="bg-white" style={{ padding: '50px 0 80px' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside>
              <h3 className="font-heading text-ink/40 mb-4" style={{ fontSize: 13, letterSpacing: '0.12em' }}>CATEGORIES</h3>
              <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0.5">
                <li>
                  <FilterButton active={!activeBrand && active === 'All'} onClick={() => change('All')}>All ({products.length})</FilterButton>
                </li>
                {CATS.map((c) => (
                  <li key={c}>
                    <FilterButton active={!activeBrand && active === c} onClick={() => change(c)}>
                      {c} ({products.filter((p) => p.category === c).length})
                    </FilterButton>
                  </li>
                ))}
              </ul>

              <h3 className="font-heading text-ink/40 mt-6 lg:mt-8 mb-4" style={{ fontSize: 13, letterSpacing: '0.12em' }}>BRANDS</h3>
              <ul className="flex flex-wrap gap-2 lg:block lg:space-y-0.5">
                {BRAND_NAMES.map((b) => {
                  const count = products.filter((p) => p.brand === b).length
                  if (count === 0) return null
                  const isActive = activeBrand === b
                  return (
                    <li key={b}>
                      <FilterButton active={isActive} onClick={() => changeBrand(isActive ? null : b)}>{b} ({count})</FilterButton>
                    </li>
                  )
                })}
              </ul>
            </aside>

            {/* Product listing */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-ink" style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 800 }}>
                  {activeBrand ? activeBrand : active === 'All' ? 'All Products' : active}
                </h2>
                <span className="font-body text-body-text" style={{ fontSize: 14 }}>{list.length} products</span>
              </div>

              {/* Showroom Gallery for Tools & Accessories - shown above product list */}
              {(active === 'Tools' || active === 'Accessories') && !activeBrand && (
                <>
                  <ShowroomGallery category={active} />
                  <div className="mt-10 mb-4 flex items-center gap-4">
                    <div style={{ height: 1, flex: 1, background: '#e0ddd8' }} />
                    <span className="font-heading text-ink/40 flex-shrink-0" style={{ fontSize: 12, letterSpacing: '0.12em' }}>PRODUCT CATALOGUE</span>
                    <div style={{ height: 1, flex: 1, background: '#e0ddd8' }} />
                  </div>
                </>
              )}

              {(() => {
                const shouldGroup = !activeBrand && active !== 'All'
                if (shouldGroup) {
                  const groups = BRAND_NAMES
                    .map((brand) => ({ brand, items: list.filter((p) => p.brand === brand) }))
                    .filter((g) => g.items.length > 0)
                  return (
                    <div className="space-y-6">
                      {groups.map((g) => (
                        <div key={g.brand}>
                          <div className="flex items-center gap-3 py-3" style={{ borderBottom: '2px solid #014BAD' }}>
                            <span className="font-heading text-ink" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{g.brand}</span>
                            <span className="font-body" style={{ fontSize: 13, color: 'rgba(26,26,24,0.3)' }}>{g.items.length} products</span>
                          </div>
                          {g.items.map((p) => <ProductRow key={p.id} product={p} onClick={setSel} />)}
                        </div>
                      ))}
                    </div>
                  )
                }
                return (
                  <div style={{ borderTop: '1px solid #eee' }}>
                    {list.map((p) => <ProductRow key={p.id} product={p} onClick={setSel} />)}
                  </div>
                )
              })()}

              {list.length === 0 && <p className="text-center py-20" style={{ color: 'rgba(26,26,24,0.4)' }}>No products found.</p>}

              {/* Bottom CTA - shown for Tools & Accessories */}
              {(active === 'Tools' || active === 'Accessories') && !activeBrand && (
                <div className="mt-8 p-5" style={{ background: '#f5f2ee', border: '1px solid #e8e5e0' }}>
                  <p className="font-body text-center" style={{ fontSize: 14, color: 'rgba(26,26,24,0.5)' }}>
                    All {active.toLowerCase()} are available in-store at our {PRIMARY_STORE.name} showroom. Visit us for the full range or contact us for pricing.
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                    <a href={`tel:${PRIMARY_STORE.phone}`} className="font-heading font-bold text-white px-5 py-2.5" style={{ background: '#014BAD', fontSize: 13 }}>Call {PRIMARY_STORE.phone}</a>
                    <a href="/contact#enquiry" className="font-heading font-bold text-ink px-5 py-2.5" style={{ border: '2px solid #1a1a18', fontSize: 13 }}>Send Enquiry</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <ProductDrawer product={sel} onClose={() => setSel(null)} />
    </>
  )
}

const TOOLS_GALLERY: { src: string; label: string; wide?: boolean }[] = [
  { src: '/images/villawood-mixers-paddles.webp', label: 'Mixing Paddles & Power Mixers' },
  { src: '/images/B8D7F79F-C2F8-4930-9811-F3407C6F1D3D.webp', label: 'Trowels & Floats' },
  { src: '/images/9FE9E2AE-97E6-457D-93BE-4A5AFA4F9E09.webp', label: 'Rendering Trowels' },
  { src: '/images/36D25167-EFEF-4B0C-AAEB-065AF7D68884.webp', label: 'Notched Trowels & Floats' },
  { src: '/images/57067684-FAFB-42BC-92DF-D2BD63B5F27B.webp', label: 'Shovels, Buckets & Mixers' },
  { src: '/images/0CF328BB-963C-4366-AE4A-513F3111ADF1.webp', label: 'Sponge Floats & Pads' },
  { src: '/images/b7301bc9-c877-4ef3-ad72-220e85df522d.webp', label: 'Hawks & Hand Tools' },
  { src: '/images/5B40E28F-5DFF-4333-B0DE-DF0C034A2D23.webp', label: 'Plastering Tools' },
  { src: '/images/mouldingssample.webp', label: 'Straight Edges & Rules' },
  { src: '/images/BBC5B34C-D7A2-4F57-908E-DA4DA477DD11.webp', label: 'Safety Gear & PPE' },
  { src: '/images/foamgunsafetygear.webp', label: 'Expansion Foam / Foam Guns / Safety Gear', wide: true },
]

const ACCESSORIES_GALLERY: { src: string; label: string; wide?: boolean }[] = [
  { src: '/images/villawood-fixings-shelving.webp', label: 'Screws, Washers & Fixings' },
  { src: '/images/villawood-mesh-angles.webp', label: 'Render Mesh & Angles' },
  { src: '/images/edges.webp', label: 'Mouldings Sample Board' },
  { src: '/images/BBC5B34C-D7A2-4F57-908E-DA4DA477DD11.webp', label: 'Primers, Tape & Supplies' },
  { src: '/images/b7301bc9-c877-4ef3-ad72-220e85df522d.webp', label: 'Hawks & Rendering Tools' },
  { src: '/images/mouldingssample.webp', label: 'Straight Edges & Rules' },
]

function ShowroomGallery({ category }: { category: string }) {
  const items = category === 'Tools' ? TOOLS_GALLERY : ACCESSORIES_GALLERY
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null)
  return (
    <div>
      <p className="font-body mb-6" style={{ fontSize: 15, color: 'rgba(26,26,24,0.5)', lineHeight: 1.6 }}>
        Browse our {category.toLowerCase()} range at the {PRIMARY_STORE.name} showroom. Visit us in-store to see the full selection and get expert advice from our team.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
        {items.map((item) => (
          <div key={item.label} className={`relative overflow-hidden group cursor-pointer ${item.wide ? 'col-span-2 md:col-span-3' : ''}`} style={{ height: item.wide ? 'clamp(180px, 30vw, 260px)' : 'clamp(160px, 28vw, 220px)' }} onClick={() => setLightbox(item)}>
            <Image src={medium(item.src)} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes={item.wide ? '100vw' : '(max-width: 768px) 50vw, 33vw'} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <span className="absolute bottom-2.5 left-3 text-white font-heading" style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white font-heading" style={{ fontSize: 32, lineHeight: 1 }} onClick={() => setLightbox(null)}>&times;</button>
          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox.src} alt={lightbox.label} fill className="object-contain" sizes="90vw" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-heading px-4 py-2 bg-black/50 rounded" style={{ fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {lightbox.label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

/** Sidebar filter: a compact chip on phones/tablets (where the sidebar stacks above the list), a left-bordered list item on desktop */
function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-body transition-colors px-3 py-1.5 border lg:border-0 lg:border-l-[3px] lg:w-full lg:text-left lg:px-0 lg:pl-3 lg:py-2 ${
        active
          ? 'bg-ink text-white border-ink lg:bg-transparent lg:text-ink lg:font-semibold lg:border-cbs'
          : 'text-body-text border-[#e0ddd8] hover:text-ink lg:border-transparent'
      }`}
    >
      {children}
    </button>
  )
}

function ProductRow({ product: p, onClick }: { product: Product; onClick: (p: Product) => void }) {
  return (
    <button onClick={() => onClick(p)} className="w-full text-left flex items-center gap-4 group" style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
      <div className="flex-shrink-0 relative overflow-hidden bg-[#f5f2ee]" style={{ width: 72, height: 72 }}>
        {p.imagePath ? (
          <Image src={thumb(p.imagePath)} alt={p.name} fill className="object-cover" sizes="72px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff size={20} strokeWidth={1} className="text-ink/10" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-ink line-clamp-2 group-hover:text-cbs transition-colors" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.2 }}>
          {p.name}
        </h3>
        <p className="font-body mt-0.5 truncate" style={{ fontSize: 13, color: 'rgba(26,26,24,0.4)' }}>
          {p.brand} &middot; {p.category}
        </p>
      </div>
      <span className="font-body text-cbs flex-shrink-0 hidden sm:inline" style={{ fontSize: 13, borderBottom: '1px solid currentColor', paddingBottom: 1 }}>
        View details &rarr;
      </span>
    </button>
  )
}
