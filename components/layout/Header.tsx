'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { PRIMARY_STORE } from '@/lib/utils'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Brands', href: '/brands' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const path = usePathname()

  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-ink text-white text-[13px] hidden md:block">
        <div className="container-site py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href={`tel:${PRIMARY_STORE.phone}`} className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <Phone size={12} /> {PRIMARY_STORE.phone}
            </a>
            {PRIMARY_STORE.mobile && (
              <a href={`tel:${PRIMARY_STORE.mobile}`} className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                <Phone size={12} /> {PRIMARY_STORE.mobile}
              </a>
            )}
            <a href={`mailto:${PRIMARY_STORE.email}`} className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <Mail size={12} /> {PRIMARY_STORE.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav — 72px height */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200" style={{ height: 72 }}>
        <div className="container-site h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-12 w-44 md:h-14 md:w-52">
              <Image src="/images/cbs-villawood-logo.webp" alt="Central Building Supplies" fill className="object-contain object-left" priority />
            </div>
          </Link>

          {/* Desktop nav — NRP style active state */}
          <nav className="hidden md:flex items-center gap-0 h-full">
            {NAV.map((l) => {
              const isActive = path === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="h-full flex items-center px-5 font-body transition-colors"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    backgroundColor: isActive ? '#014BAD' : 'transparent',
                    color: isActive ? '#ffffff' : '#1a1a18',
                  }}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <Link href="/contact" className="hidden md:inline-flex btn-brand text-[13px] py-2.5 px-6">
            Get a Quote
          </Link>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex items-center justify-center text-ink" aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white z-20 flex flex-col pt-20 px-6 pb-8">
            <nav className="flex flex-col">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="py-4 text-lg font-body font-semibold border-b border-gray-100 uppercase tracking-wide"
                  style={{ color: path === l.href ? '#014BAD' : '#1a1a18' }}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 space-y-3">
              <a href={`tel:${PRIMARY_STORE.phone}`} className="flex items-center gap-2 text-ink font-semibold">
                <Phone size={16} /> {PRIMARY_STORE.phone}
              </a>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-brand w-full justify-center">
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
