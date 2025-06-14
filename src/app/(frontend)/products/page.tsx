'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const mockCategories = ['Все', 'Упаковка', 'Посуда', 'Химия'];

const mockProducts = [
  {
    id: '1',
    name: 'Стакан бумажный 250мл',
    description: 'Одноразовый бумажный стакан для горячих напитков.',
    unit: 'шт',
    price: '2.50',
    sku: 'CUP250',
    stock: 120,
    category: 'Посуда'
  },
  {
    id: '2',
    name: 'Пакет майка 30x50',
    description: 'Прочный пластиковый пакет для покупок.',
    unit: 'шт',
    price: '1.20',
    sku: 'BAG3050',
    stock: 350,
    category: 'Упаковка'
  }
  // Добавьте другие товары по аналогии
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Все' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-4'>
      <h1 className='text-2xl font-semibold mb-4'>Товары</h1>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Input
          placeholder='Поиск по названию или описанию...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className='w-full sm:w-60'>
            <SelectValue placeholder='Категория' />
          </SelectTrigger>
          <SelectContent>
            {mockCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Accordion type='single' collapsible className='w-full'>
        {filteredProducts.map((product) => (
          <AccordionItem key={product.id} value={product.id}>
            <AccordionTrigger className='text-left'>
              <span className='font-medium'>{product.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <Card className='bg-muted'>
                <CardContent className='p-4 space-y-2'>
                  <p className='text-sm text-muted-foreground'>
                    {product.description}
                  </p>
                  <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div>
                      <Label className='text-xs'>Артикул</Label>
                      <div className='font-semibold text-primary'>
                        {product.sku}
                      </div>
                    </div>
                    <div>
                      <Label className='text-xs'>Ед. измерения</Label>
                      <div>{product.unit}</div>
                    </div>
                    <div>
                      <Label className='text-xs'>Цена</Label>
                      <div>{product.price} ₽</div>
                    </div>
                    <div>
                      <Label className='text-xs'>Остаток</Label>
                      <div>{product.stock}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
