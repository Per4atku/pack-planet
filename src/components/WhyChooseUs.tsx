import {
  CheckCircle,
  Clock,
  Truck,
  Leaf,
  DollarSign,
  Users
} from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Широкий ассортимент',
      description: 'Более 4000 товаров: от упаковки до хозяйственных товаров '
    },
    {
      icon: DollarSign,
      title: 'Конкурентные цены',
      description:
        'Гибкая система скидок и специальные предложения для постоянных клиентов'
    },
    {
      icon: Users,
      title: 'Решения для любого бизнеса',
      description:
        'Работаем с HoReCa, пищевым производством, розничной торговлей'
    },
    {
      icon: Truck,
      title: 'Быстрая доставка',
      description:
        'Доставка по Владивостоку и Приморскому краю в кратчайшие сроки'
    },
    {
      icon: Clock,
      title: 'Забота о клиентах',
      description:
        'Персональный менеджер и техническая поддержка на всех этапах'
    },
    {
      icon: Leaf,
      title: 'Экологичные материалы',
      description: 'Большой выбор биоразлагаемой и перерабатываемой упаковки'
    }
  ];

  return (
    <section className='py-20 bg-eco-light-green/30'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
            Почему выбирают{' '}
            <span className='text-eco-green border-b-4 border-eco-green '>
              Нас
            </span>{' '}
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-6 shadow-lg hover-scale fade-in'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='flex items-start space-x-4'>
                <div className='flex-shrink-0'>
                  <div className='w-12 h-12 bg-eco-green/10 rounded-lg flex items-center justify-center'>
                    <benefit.icon className='w-6 h-6 text-eco-green' />
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-foreground mb-2'>
                    {benefit.title}
                  </h3>
                  <p className='text-muted-foreground'>{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-16'>
          <div className='bg-white rounded-xl p-8 max-w-3xl mx-auto shadow-lg'>
            <h3 className='text-2xl font-bold text-eco-green mb-4'>
              Планета Упаковки
            </h3>
            <p className='text-muted-foreground text-lg leading-relaxed'>
              Ваш надежный поставщик упаковки и расходных материалов для HoReCa,
              пищевой промышленности и розничной торговли. Наша гибкая ценовая
              политика и широкий ассортимент помогают каждому бизнесу
              процветать.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
