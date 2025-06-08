import React from 'react';

const AboutSection = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900'>
              Ваш надежный партнер по упаковке во Владивостоке
            </h2>
            <p className='text-xl text-gray-600 leading-relaxed'>
              «Планета Упаковки» работает в Дальневосточном регионе уже более 15
              лет, предлагая комплексные упаковочные решения для ресторанов,
              кафе, пищевых производств и розничной торговли предприятий
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 pt-8'>
            <div className='text-center space-y-3'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-blue-600 text-2xl font-bold'>🏢</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900'>
                HoReCa Решения
              </h3>
              <p className='text-gray-600'>
                Упаковочные решения для отелей, кафе, ресторанов и сетей
                фаст-фуда всех форматов
              </p>
            </div>

            <div className='text-center space-y-3'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-green-600 text-2xl font-bold'>🏭</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900'>
                Пищевое Производство
              </h3>
              <p className='text-gray-600'>
                Профессиональные упаковочные материалы для производителей и
                переработчиков продуктов питания
              </p>
            </div>

            <div className='text-center space-y-3'>
              <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-orange-600 text-2xl font-bold'>🏪</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900'>
                Розничная торговля и офисы
              </h3>
              <p className='text-gray-600'>
                Упаковочные решения и хозяйственные товары для розничных
                магазинов и офисов
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
