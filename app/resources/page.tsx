import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { PRIMARY_STORE } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Resources & Downloads',
  description: 'Download technical data sheets, certificates, and specifications for ACE Polystyrene products.',
}

const RESOURCES = [
  {
    name: 'ACE Moulding Brochure (Feb 2026)',
    description: 'CBS ACE moulding range — profiles, dimensions, quoins, capping, and keystone details with photo references.',
    href: '/resources/CBS-ACE-Moulding-Brochure-Feb-2026.pdf',
    category: 'Product Guide',
    image: '/images/resources/doc-ace-moulding-brochure.webp',
  },
  {
    name: 'Information Booklet',
    description: 'Comprehensive product guide covering the full ACE Polystyrene range including grey foam panels, mouldings, and accessories.',
    href: 'https://www.acepolystyrene.com.au/downloads/information-booklet.html',
    category: 'Product Guide',
    image: '/images/resources/doc-information-booklet.webp',
  },
  {
    name: 'Specification Booklet',
    description: 'Detailed technical specifications for all ACE grey foam panel thicknesses, sizes, and performance data.',
    href: 'https://www.acepolystyrene.com.au/downloads/specification-booklet.html',
    category: 'Specifications',
    image: '/images/resources/doc-specification-booklet.webp',
  },
  {
    name: 'CodeMark Certification',
    description: 'CodeMark certificate of conformity for ACE Grey Foam Panels — building code compliance documentation.',
    href: 'https://www.acepolystyrene.com.au/downloads/codemark-certification.html',
    category: 'Certification',
    image: '/images/resources/doc-codemark.webp',
  },
  {
    name: 'BAL-29 Certificate',
    description: 'Bushfire Attack Level 29 (BAL-29) fire test certificate per AS1530.8.1-2007 for ACE Grey Foam Panels.',
    href: 'https://www.acepolystyrene.com.au/downloads/bal-29-certificate.html',
    category: 'Certification',
    image: '/images/resources/doc-bal29.webp',
  },
  {
    name: 'Thermal Rating Report',
    description: 'Full thermal performance assessment report for ACE Grey Foam Panels across all thicknesses.',
    href: 'https://www.acepolystyrene.com.au/downloads/thermal-rating-report.html',
    category: 'Testing',
    image: '/images/resources/doc-thermal-report.webp',
  },
  {
    name: 'Thermal Rating Results',
    description: 'Summary of thermal testing results and R-values for the ACE Grey Foam Panel range.',
    href: 'https://www.acepolystyrene.com.au/downloads/thermal-rating-results.html',
    category: 'Testing',
    image: '/images/resources/doc-thermal-results.webp',
  },
  {
    name: 'Compression Testing Results',
    description: 'Load-bearing capacity and compression test findings for ACE Grey Foam Panels.',
    href: 'https://www.acepolystyrene.com.au/downloads/compression-testing-results.html',
    category: 'Testing',
    image: '/images/resources/doc-compression.webp',
  },
  {
    // TODO(client): this PDF is the Prestons credit form — swap in the Villawood version when supplied.
    name: 'CBS 30-Day Credit Application',
    description: '30-day trade credit account application for Central Building Supplies. Includes client details, trade references, agreement, and personal guarantee.',
    href: '/resources/CBS-Credit-Application.pdf',
    category: 'Forms',
    image: '/images/resources/doc-cbs-credit-application.webp',
  },
  {
    name: 'Coating System Specifications',
    description: 'Technical requirements and specifications for protective coating systems applied over ACE Polystyrene panels.',
    href: 'https://www.acepolystyrene.com.au/downloads/coating-system-specifications.html',
    category: 'Specifications',
    image: '/images/resources/doc-coating-system.webp',
  },
  {
    name: 'Rockcote Specification for ACE Panels',
    description: 'Rockcote coating application guidelines and specifications for use with ACE Polystyrene panels.',
    href: 'https://www.acepolystyrene.com.au/downloads/rockcote-specification-for-ace-polystyrene-panels.html',
    category: 'Specifications',
    image: '/images/resources/doc-rockcote.webp',
  },
]

export default function ResourcesPage() {
  const categories = Array.from(new Set(RESOURCES.map((r) => r.category)))

  return (
    <>
      <section className="bg-ink" style={{ padding: '60px 0 50px' }}>
        <div className="container-site">
          <h1 className="text-white">Resources &amp; Downloads</h1>
          <p className="text-white/60 mt-2" style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}>
            Technical data sheets, certifications, and specifications for ACE Polystyrene products.
          </p>
        </div>
      </section>

      {/* ACE branding bar */}
      <div className="bg-white" style={{ borderBottom: '1px solid #e8e5e0', padding: '16px 0' }}>
        <div className="container-site flex items-center gap-4">
          <div className="relative" style={{ height: 36, width: 100 }}>
            <Image src="/images/ace-logo-orange.webp" alt="ACE Polystyrene" fill className="object-contain" sizes="100px" />
          </div>
          <span className="font-body" style={{ fontSize: 14, color: 'rgba(26,26,24,0.5)' }}>ACE Polystyrene Technical Resources</span>
        </div>
      </div>

      <section className="bg-white" style={{ padding: '60px 0 80px' }}>
        <div className="container-site">
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="font-heading text-ink mb-4" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '2px solid #014BAD', paddingBottom: 8, display: 'inline-block' }}>
                {cat}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {RESOURCES.filter((r) => r.category === cat).map((r) => (
                    <a
                      key={r.name}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden transition-all hover:shadow-md"
                      style={{ border: '1px solid #e8e5e0', background: '#fff' }}
                    >
                      <div className="relative" style={{ height: 220, background: '#f9f8f6' }}>
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          className="object-contain p-3"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-4" style={{ borderTop: '1px solid #e8e5e0' }}>
                        <h3 className="font-heading text-ink group-hover:text-cbs transition-colors mb-1" style={{ fontSize: 15, fontWeight: 700 }}>
                          {r.name}
                        </h3>
                        <p style={{ fontSize: 13, color: 'rgba(26,26,24,0.5)', lineHeight: 1.5 }}>
                          {r.description}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-2 text-cbs font-heading" style={{ fontSize: 12, fontWeight: 600 }}>
                          <Download size={12} /> Download
                        </span>
                      </div>
                    </a>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 text-center">
            <p className="text-body-text mb-4" style={{ fontSize: 14 }}>
              Need help choosing the right product? Contact {PRIMARY_STORE.name} for expert advice.
            </p>
            <Link href="/contact" className="btn-brand text-[13px]">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
