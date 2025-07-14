import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import DownloadPrice from './DownloadPrice';

const ProductCategories = async () => {
  const categories = [
    {
      title: 'Бумажные и пластиковые стаканчики',
      description: 'Стаканчики для горячих и холодных напитков разных размеров',
      icon: '☕',
      color: 'from-blue-100 to-blue-200'
    },
    {
      title: 'Одноразовая посуда',
      description: 'Тарелки, столовые приборы и аксессуары для сервировки',
      icon: '🍽️',
      color: 'from-green-100 to-green-200'
    },
    {
      title: 'Бумажная продукция',
      description: 'Профессиональные гигиенические товары',
      icon: '🧻',
      color: 'from-purple-100 to-purple-200'
    },
    {
      title: 'Эко-Продукты',
      description: 'Экологически чистые упаковочные решения',
      icon: '🌱',
      color: 'from-green-100 to-green-200'
    },
    {
      title: 'Пузырьковая пленка и упаковка ',
      description: 'Надежные упаковочные материалы',
      icon: '📦',
      color: 'from-orange-100 to-orange-200'
    },
    {
      title: 'Пластиковая мебель и столовые приборы',
      description: 'Кухонные и столовые аксессуары',
      icon: '🪑',
      color: 'from-indigo-100 to-indigo-200'
    },
    {
      title: 'Пакеты: Майка, ПВД',
      description: 'Различные виды пластиковых пакетов',
      icon: '🛍️',
      color: 'from-pink-100 to-pink-200'
    },
    {
      title: 'Хозяйственные товары',
      description: 'Корейские и китайские хозяйственные товары',
      icon: '🏠',
      color: 'from-yellow-100 to-yellow-200'
    }
  ];

  return (
    <section className='py-16 bg-gray-50' id='products'>
      <div className='container mx-auto px-4'>
        <div className='text-center space-y-4 mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900'>
            Наши категории товаров
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Все что вам нужно: от одноразовой посуды до пластиковой мебели
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {categories.map((category, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group w-xs mx-auto sm:w-sm md:w-full'
            >
              <div
                className={`h-24 bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
              >
                <span className='text-4xl'>{category.icon}</span>
              </div>
              <div className='p-6 space-y-3'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {category.title}
                </h3>
                <p className='text-gray-600 text-sm'>{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <DownloadPrice />
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
