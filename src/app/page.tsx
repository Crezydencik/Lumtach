import Hero from '@/components/landing/hero';
import AboutCompany from '@/components/landing/about-company';
import Stats from '@/components/landing/stats';
import ProductStages from '@/components/landing/product-stages';
import MobileApp from '@/components/landing/mobile-app';
import Features from '@/components/landing/features';
import Reasons from '@/components/landing/reasons';
import FAQ from '@/components/landing/faq';
import CTA from '@/components/landing/cta';
import Partn from '@/components/landing/partn';

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <AboutCompany />
      {/* <Stats /> */}
      <Partn />
      <ProductStages />
      <MobileApp />
      <Features />
      <Reasons />
      <CTA />
      <FAQ />
    </div>
  );
}
