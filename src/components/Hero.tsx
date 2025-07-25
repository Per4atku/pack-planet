import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Hero = () => {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0'>
        <Image
          src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80'
          alt='Background'
          fill
          priority
          className='object-cover opacity-10'
        />
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 text-center py-6'>
        <div className='max-w-4xl mx-auto animate-fade-in'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight'>
            Ваш надежный поставщик
            <span className='text-eco-green'> упаковки</span>
          </h1>

          <p className='text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto'>
            Одноразовая посуда и упаковка для HoReCa, пищевого производства и
            розничной торговли. Широкий ассортимент, приятные цены, быстрая
            доставка.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
            <a
              href='/products'
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-eco-green cursor-pointer hover:bg-eco-green/90 text-white px-8 py-6 text-lg'
              )}
            >
              Перейти к товарам
            </a>
            <a
              href='#contact'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-eco-green text-eco-green hover:bg-eco-green hover:text-white px-8 py-6 text-lg hover-scale'
              )}
            >
              Контакты
            </a>
          </div>

          {/* Quick Contact Info */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm'>
            <div className='bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mx-12 md:mx-0 '>
              <h3 className='font-bold text-lg text-eco-green mb-2'>
                📞 Телефоны
              </h3>
              <p>8 (800) 234-78-75</p>
              <p>+7 (423) 244-65-55</p>
            </div>
            <div className='bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mx-12 md:mx-0'>
              <h3 className='font-bold text-lg text-eco-green mb-2'>
                📍 Адрес
              </h3>
              <p>Океанский проспект, 54</p>
              <p>2 этаж, Владивосток</p>
            </div>
            <div className='bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mx-12 md:mx-0'>
              <h3 className='font-bold text-lg text-eco-green mb-2'>
                🕙 Режим работы
              </h3>
              <p>Пн-Пт: 10:00–18:00</p>
              <p>Сб-Вс: 10:00–17:00</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
