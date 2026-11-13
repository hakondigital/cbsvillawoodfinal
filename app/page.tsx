import Hero from '@/components/home/Hero'
import IntroSection from '@/components/home/IntroSection'
import AboutPreview from '@/components/home/AboutPreview'
import BrandStrip from '@/components/home/BrandStrip'
import CategoryCards from '@/components/home/CategoryCards'
import ShopByBrand from '@/components/home/ShopByBrand'
import TradeValue from '@/components/home/TradeValue'
import StorePreview from '@/components/home/StorePreview'
import CtaBanner from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <AboutPreview />
      <BrandStrip />
      <CategoryCards />
      <ShopByBrand />
      <TradeValue />
      <StorePreview />
      <CtaBanner />
    </>
  )
}
