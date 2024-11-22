import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section
      className="py-20 relative overflow-hidden rounded-lg w-[90%] "
      style={{
        background: 'linear-gradient(90deg, #A6EB53 0%, #7561FF 100%)', margin: '0 auto', 
      }}
    >
      <div className="relative z-10  mx-auto px-6 flex items-center justify-between h-24" >
        {/* Текстовый блок */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-4">
            DO YOU WANT TO KNOW ABOUT THE COST?
          </h2>
          <p className="text-gray-800 mb-6">
            Establish an account, finalize identity verification, and obtain 100 USDT complimentary.
          </p>
          <Button className="button button--tertiary">
            Contact us
          </Button>
        </div>

        {/* Изображение или графика */}
        <div className="relative w-1/2">
          <img
            src="/images/cta_IMG.png"
            alt="Illustration"
            className="absolute right-0  h-auto lg:max-w-[150%] lg:-mt-[17REM] "
          />
        </div>
      </div>
      <div className="absolute inset-0 opacity-500">
        <img
          src="/images/background_block.png"
          alt="Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
