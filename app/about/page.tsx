'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PRIMARY_STORE, SECONDARY_STORE, PRIMARY_STORE_PHOTO } from '@/lib/utils'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink" style={{ padding: '60px 0 50px' }}>
        <div className="container-site">
          <h1 className="text-white">About Central Building Supplies</h1>
        </div>
      </section>

      {/* Full-width hero photo */}
      <div className="relative" style={{ height: 'clamp(300px, 40vw, 520px)' }}>
        <Image src={PRIMARY_STORE_PHOTO} alt={`${PRIMARY_STORE.name} store`} fill className="object-cover" priority />
      </div>

      {/* Our Story */}
      <section className="bg-white" style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-ink mb-8">Our Story</h2>
              <div className="space-y-5" style={{ fontSize: 16, lineHeight: 1.8, color: '#444' }}>
                <p>
                  Central Building Supplies was established in the early 2000s in Villawood,
                  Western Sydney, with a clear purpose: to be the go-to trade supplier for
                  professional renderers and builders. From day one, we focused exclusively
                  on the rendering trade &mdash; not general hardware, not retail paint, not
                  weekend DIY. Render, foam, mouldings, tools, and accessories.
                </p>
                <p>
                  Over two decades, that focus has allowed us to build something most suppliers
                  can&rsquo;t match: deep product knowledge, genuine trade relationships with
                  Australia&rsquo;s best render manufacturers, and the kind of stock depth that
                  means your crew leaves with everything they need &mdash; every time.
                </p>
                <p>
                  Today, CBS operates from two Western &amp; South West Sydney locations &mdash; our original
                  Villawood store at 203 Woodville Road and our Prestons branch at Unit 1/16
                  Bernera Road. Both stores open at 6am Monday to Friday and 6am Saturday,
                  because we know the trade starts early.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ height: 480 }}>
              <Image src="/images/6940f3ab-d6f9-4c69-b162-f026cb9cf7a1.webp" alt="CBS warehouse racking" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ACE Factory — the centrepiece */}
      <section style={{ backgroundColor: '#2a2520', padding: '100px 0' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Photos */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative overflow-hidden" style={{ height: 300 }}>
                <Image src="/images/6940f3ab-d6f9-4c69-b162-f026cb9cf7a1.webp" alt="ACE factory warehouse racking" fill className="object-cover" />
              </div>
              <div className="relative overflow-hidden" style={{ height: 300 }}>
                <Image src="/images/23a7777e-5c66-48ee-9d1d-f93619e7f1c5.webp" alt="Render bags on shelving" fill className="object-cover" />
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="relative overflow-hidden mb-6" style={{ height: 44, width: 120 }}>
                <Image src="/images/ACE.webp" alt="ACE Polystyrene" fill className="object-contain object-left brightness-0 invert" sizes="120px" />
              </div>
              <h2 className="text-white mb-6">ACE Polystyrene &mdash; Factory-Direct Foam</h2>
              <div className="space-y-4" style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(245,242,238,0.6)' }}>
                <p>
                  ACE Polystyrene manufactures high-density graphite-infused
                  EPS foam panels &mdash; the insulation and cladding substrate that professional
                  renderers rely on for external wall insulation (EWI) and EIFS systems.
                </p>
                <p>
                  Their panels are CodeMark certified and BAL-29 fire rated, available in thicknesses
                  from 10mm to 600mm and lengths up to 5000mm. Factory-direct pricing means
                  custom sizing to your exact specification without the lead times or premium pricing
                  you&rsquo;d get ordering through the supply chain.
                </p>
                <p>
                  Beyond panels, ACE produces foam sun hoods, landscaping blocks, expanding PU foam,
                  and a full range of architectural mouldings &mdash; window surrounds, cornices,
                  columns, pilasters, band courses, and architraves. All supplied direct
                  to our Villawood and Prestons stores.
                </p>
              </div>
              <a href="https://www.acepolystyrene.com.au/" target="_blank" rel="noopener noreferrer"
                className="btn-outline-white mt-8 inline-flex text-[13px]">
                Visit ACE Polystyrene &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Carry */}
      <section className="bg-white" style={{ padding: '100px 0' }}>
        <div className="container-site">
          <h2 className="text-ink mb-6">What we carry</h2>
          <p className="text-body-text mb-12" style={{ fontSize: 16, lineHeight: 1.8, maxWidth: 720 }}>
            CBS stocks over 200 products across eleven product categories. Everything a renderer
            needs to complete a job &mdash; from the foam substrate through to the finished
            render coat and every tool and accessory in between.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Foam Panels & Insulation',
                desc: 'Graphite EPS panels in all thicknesses (10mm\u2013600mm), sun hoods, landscaping blocks, and expanding foam. Factory-direct from ACE Polystyrene.',
                image: '/images/6940f3ab-d6f9-4c69-b162-f026cb9cf7a1.webp',
              },
              {
                title: 'Render Systems',
                desc: 'Full render systems from Euromix, Novatex, Melbacrylic, and Unitex. Base coats, skim coats, polymer renders, texture coatings, primers, and admixtures.',
                image: '/images/23a7777e-5c66-48ee-9d1d-f93619e7f1c5.webp',
              },
              {
                title: 'Architectural Mouldings',
                desc: 'ACE foam mouldings for rendered fa\u00e7ades \u2014 window surrounds, cornices, columns, pilasters, band courses, and architraves. Custom profiles to order.',
                image: '/images/ae359aba-d3d6-4e65-a119-cae00fdff431.webp',
              },
              {
                title: 'Paint & Primers',
                desc: 'Exterior acrylic paints and primers formulated for rendered surfaces. Trade quantities available, wide colour range stocked in-store.',
                image: '/images/7fd79032-3cfc-4476-b6c3-bd837ad8c159.webp',
              },
              {
                title: 'Rendering Tools',
                desc: 'Professional-grade stainless trowels, sponge and plastic floats, aluminium hawks, mixing paddles, corner beads, and scratchers.',
                image: '/images/a7735e5d-9e1b-40a4-8462-5057567cc6db.webp',
              },
              {
                title: 'Accessories & Fixings',
                desc: 'Fibreglass render mesh, panel fixings, mushroom washers, bond admixtures, sarking, sealants, and everything else for a compliant installation.',
                image: '/images/aae48f01-4072-4c17-97fd-d65329611b85.webp',
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="relative overflow-hidden mb-4" style={{ height: 200 }}>
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="33vw" />
                </div>
                <h3 className="text-ink mb-2" style={{ fontSize: 20, fontWeight: 700 }}>{item.title}</h3>
                <p className="text-body-text" style={{ fontSize: 15, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/products" className="btn-brand text-[13px]">Browse Full Catalogue</Link>
          </div>
        </div>
      </section>

      {/* Our Brands */}
      <section style={{ backgroundColor: '#f5f2ee', padding: '80px 0' }}>
        <div className="container-site">
          <h2 className="text-ink mb-6">The brands we distribute</h2>
          <p className="text-body-text mb-10" style={{ fontSize: 16, lineHeight: 1.8, maxWidth: 720 }}>
            CBS is the authorised distributor for three of Australia&rsquo;s leading render
            manufacturers, plus ACE Polystyrene, and also stocks Unitex renders and finishes and
            Builders Emporium render accessories. Between them, these brands cover every substrate,
            every application method, and every finish type a professional renderer could need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'ACE Polystyrene', logo: '/images/ACE.webp', logoBg: '',
                desc: 'Graphite EPS foam panels, mouldings, sun hoods, and expanding foam \u2014 factory-direct pricing from ACE Polystyrene.',
              },
              {
                name: 'Euromix', logo: '/images/Euromix.webp', logoBg: '',
                desc: 'Australian-made cement and acrylic renders. Multi-purpose base coats, single-coat systems, full polymer renders for EPS, lightweight high build, cream render, skim coat, and keycoat.',
              },
              {
                name: 'Novatex', logo: '/images/FINALLOGONOVATEX.webp', logoBg: 'bg-[#0a0a18]',
                desc: '70+ years in the Australian building industry. EZ101 and ER100 render lines, SPR Acrylic smooth polymer, Valencia and Saturn texture coatings, and the Ezytex skim range.',
              },
              {
                name: 'Melbacrylic', logo: '/images/Mac-Render.webp', logoBg: '',
                desc: 'Specialist cement and acrylic renders with a 7-year manufacturer\u2019s warranty. Macrender HBS for EPS, Coarse FR for AAC, general purpose, and Supaskim finishing render.',
              },
              {
                name: 'Unitex', logo: '/images/unitex-logo.svg', logoBg: '',
                desc: 'Australian made since 1983. Base coat renders \u2014 including non-combustible and high-build options \u2014 plus trowel-on and roll-on textures, bagging finishes, and the Uni-Rock, Tanami, and Veneto decorative finishes.',
              },
              {
                name: 'Builders Emporium', logo: '/images/builders-emporium-logo.svg', logoBg: 'bg-[#0a0a18] px-1',
                desc: 'Australian-made render accessories \u2014 slimline and heavy-duty render angles, arch beads, starter trims, stop beads, expansion joints, fibreglass and expanded metal mesh, render spray guns, and hoses.',
              },
            ].map((b) => (
              <div key={b.name} className="flex gap-5 items-start">
                <div className={`relative flex-shrink-0 overflow-hidden ${b.logoBg}`} style={{ height: 48, width: 100 }}>
                  <Image src={b.logo} alt={b.name} fill className="object-contain p-1" sizes="100px" />
                </div>
                <div>
                  <h3 className="text-ink mb-2" style={{ fontSize: 18, fontWeight: 700 }}>{b.name}</h3>
                  <p className="text-body-text" style={{ fontSize: 15, lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/brands" className="btn-outline-dark text-[13px]">View all brand details &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Why Trade With CBS */}
      <section className="bg-white" style={{ padding: '100px 0' }}>
        <div className="container-site">
          <div style={{ maxWidth: 800 }}>
            <h2 className="text-ink mb-8">Why the trade chooses CBS</h2>
            <div className="space-y-6" style={{ fontSize: 16, lineHeight: 1.8, color: '#444' }}>
              <p>
                <strong>Factory-direct foam pricing.</strong> When you buy ACE Polystyrene foam
                from CBS, you get factory-direct pricing &mdash; no compromises on quality. If you need a custom panel size, ACE
                cuts it and delivers it to your site.
              </p>
              <p>
                <strong>Four render systems, one supplier.</strong> Instead of driving to four
                different suppliers to compare Euromix, Novatex, Melbacrylic, and Unitex, you come to
                CBS and spec the right system for your substrate and application. Our team can
                walk you through the differences and recommend the best product for your job.
              </p>
              <p>
                <strong>Trade hours, trade stock.</strong> We open at 6am because that&rsquo;s
                when renderers start work. We stock by the pallet because that&rsquo;s how
                renderers buy. And we keep serious depth across all categories so your crew
                doesn&rsquo;t leave empty-handed, even on the busiest mornings.
              </p>
              <p>
                <strong>20+ years of trade knowledge.</strong> Our staff aren&rsquo;t retail
                workers in hi-vis vests. They&rsquo;re people who understand rendering &mdash;
                substrates, systems, applications, and the realities of working on site. When
                you ask for advice, you get an answer that works.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 0 }}>
        {[
          { src: '/images/ae359aba-d3d6-4e65-a119-cae00fdff431.webp', l: 'Euromix Render' },
          { src: '/images/7fd79032-3cfc-4476-b6c3-bd837ad8c159.webp', l: 'Melbacrylic' },
          { src: '/images/aae48f01-4072-4c17-97fd-d65329611b85.webp', l: 'Mesh & Accessories' },
          { src: '/images/a7735e5d-9e1b-40a4-8462-5057567cc6db.webp', l: 'Tools' },
        ].map((i) => (
          <div key={i.l} className="relative overflow-hidden" style={{ height: 240 }}>
            <Image src={i.src} alt={i.l} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <span className="text-white text-sm font-heading uppercase tracking-wider">{i.l}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Locations */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="container-site">
          <h2 className="text-ink mb-10">Our locations</h2>

          {/* Primary store — featured */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="relative overflow-hidden" style={{ height: 'clamp(220px, 30vw, 340px)' }}>
              <Image src={PRIMARY_STORE_PHOTO} alt={PRIMARY_STORE.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <h3 className="text-ink mb-3" style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700 }}>{PRIMARY_STORE.name}</h3>
              <div style={{ fontSize: 15, lineHeight: 2, color: '#666' }}>
                <p>{PRIMARY_STORE.address}</p>
                {PRIMARY_STORE.mobile && <p><a href={`tel:${PRIMARY_STORE.mobile}`} className="text-ink font-semibold">{PRIMARY_STORE.mobile}</a> (mobile)</p>}
                <p><a href={`tel:${PRIMARY_STORE.phone}`} className="text-ink font-semibold">{PRIMARY_STORE.phone}</a>{PRIMARY_STORE.mobile ? ' (landline)' : ''}</p>
                <p>{PRIMARY_STORE.email}</p>
                <p>Mon&ndash;Fri {PRIMARY_STORE.hours.weekdays}</p>
                <p>Sat {PRIMARY_STORE.hours.saturday}</p>
                <p>Sun {PRIMARY_STORE.hours.sunday}</p>
              </div>
              <a href={PRIMARY_STORE.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark mt-5 inline-flex text-[13px]">Get Directions &rarr;</a>
            </div>
          </div>

          {/* Sister store — compact secondary */}
          <div className="mt-10 pt-8" style={{ borderTop: '1px solid #e8e5e0' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-heading mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,24,0.35)' }}>Also visit our {SECONDARY_STORE.suburb} store</p>
                <h4 className="text-ink mb-1" style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700 }}>{SECONDARY_STORE.name}</h4>
                <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ fontSize: 14, color: '#666' }}>
                  <span>{SECONDARY_STORE.address}</span>
                  {SECONDARY_STORE.mobile && <a href={`tel:${SECONDARY_STORE.mobile}`} className="text-ink font-semibold">{SECONDARY_STORE.mobile}</a>}
                  <a href={`tel:${SECONDARY_STORE.phone}`} className="text-ink font-semibold">{SECONDARY_STORE.phone}</a>
                  <span>{SECONDARY_STORE.email}</span>
                  <span>Mon&ndash;Fri {SECONDARY_STORE.hours.weekdays} &middot; Sat {SECONDARY_STORE.hours.saturday}</span>
                </div>
              </div>
              <a href={SECONDARY_STORE.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark inline-flex text-[13px] flex-shrink-0">Get Directions &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-cbs" style={{ padding: '60px 0' }}>
        <div className="container-site text-center">
          <h2 className="mb-4" style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 48px)' }}>Ready to order?</h2>
          <p className="text-white/80 mb-6" style={{ fontSize: 16 }}>
            Call us, visit in-store, or send a trade enquiry.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/contact" className="btn-white text-[13px]">Contact Us</Link>
            <Link href="/products" className="btn-outline-white text-[13px]">Browse Products</Link>
          </div>
        </div>
      </section>
    </>
  )
}
