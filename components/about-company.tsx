'use client';
import '../app/styles/button.scss'
import { Button } from '@/components/ui/button';

export default function AboutCompany() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Основной контейнер */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Левая часть */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="text-[#96E072] font-mono text-sm tracking-wider mb-4">ABOUT COMPANY</div>
            <h2 className="text-6xl font-mono font-bold leading-tight mb-8">
              WHERE<br />
              TECHNOLOGIES<br />
              <span className="text-gray-500">BECOME REALITY</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Lumtech is a modern, young IT company whose mission is to create innovative and functional technological solutions. Our team of talented developers, designers, and data analysis specialists works diligently to offer products that meet the needs of the modern market.
            </p>
            <div className="flex justify-start">
              <Button className="button button--secondary">
                Discuss the project
              </Button>
            </div>
          </div>

          {/* Правая часть (Объединенная сетка чисел) */}
          <div className="grid grid-cols-2 gap-0 md:w-[45%]">
            {[{ number: '12', text: 'projects' }, { number: '12', text: 'projects' }, { number: '12', text: 'projects' }, { number: '72', text: 'projects' }].map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-gray-900  p-8 flex flex-col items-center justify-center text-center h-[150px] w-full border border-black tekstdecor"
                >
                  <div className="text-6xl font-mono font-bold text-white mb-2">{item.number}</div>
                  <div className="text-gray-500 text-sm uppercase">{item.text}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
