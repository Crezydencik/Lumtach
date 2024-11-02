import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          DO YOU WANT TO KNOW ABOUT THE COSTS?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Get in touch with us to discuss your project requirements and receive a detailed quote.
        </p>
        <Button className="bg-lime-400 text-black hover:bg-lime-500 text-lg px-8 py-6">
          Contact Us
        </Button>
      </div>
    </section>
  );
}