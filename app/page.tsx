import Hero from '@/components/hero';
import AboutCompany from '@/components/about-company';
import Stats from '@/components/stats';
import ProductStages from '@/components/product-stages';
import MobileApp from '@/components/mobile-app';
import Features from '@/components/features';
import Reasons from '@/components/reasons';
import FAQ from '@/components/faq';
import CTA from '@/components/cta';
import Partn from '../components/partn';

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <AboutCompany />
      {/* <Stats /> */}
      <Partn/>
      <ProductStages />
      <MobileApp />
      <Features />
      <Reasons />
      <CTA />
      <FAQ />
    </div>
  );
}