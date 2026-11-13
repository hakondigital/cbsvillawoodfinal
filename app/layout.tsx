import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/providers/LenisProvider'
import SplashScreen from '@/components/ui/SplashScreen'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO(client): confirm the Villawood domain before launch
  metadataBase: new URL('https://cbsvillawood.com.au'),
  title: {
    default: 'Central Building Supplies | Render & Foam Supply | Western Sydney',
    template: '%s | Central Building Supplies',
  },
  description:
    'Western Sydney\'s trade supplier for renderers and builders. Factory-direct ACE polystyrene foam, Euromix, Novatex, Melbacrylic, and Unitex renders.',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
      <body>
        <SplashScreen />
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
