import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const menu = {
  Автотовары: [
    {
      name: 'Лопата для авто "Классика"',
      description: '6,5х19х85,5см, удобная для снега',
      price: 400
    },
    {
      name: 'Незамерзайка "Gleid" (-30)',
      description: '5л, жёлтая крышка',
      price: 180
    },
    {
      name: 'Термокружка "Вильбон"',
      description: '450мл, от прикуривателя, металл/пластик',
      price: 710
    }
  ],
  Гигиена: [
    {
      name: 'Зубочистки с ментолом',
      description: '190шт, пластиковый контейнер',
      price: 60
    },
    {
      name: 'Зубочистки бамбуковые (100шт.)',
      description: 'Упаковка У445',
      price: 70
    }
  ]
};

export default function Playground() {
  return (
    <div className='min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6'>
      <Card className='w-full max-w-4xl shadow-lg rounded-2xl'>
        <CardContent className='p-8'>
          <h1 className='text-4xl font-bold text-center mb-8'>Прайс</h1>

          <div className='space-y-8'>
            {Object.entries(menu).map(([category, items]) => (
              <div key={category}>
                <h2 className='text-2xl font-semibold mb-2'>{category}</h2>
                <Separator className='mb-4' />
                <div className='space-y-4'>
                  {items.map((item, idx) => (
                    <div key={idx} className='border-b border-muted/30 pb-3'>
                      <div className='flex justify-between'>
                        <span className='font-medium text-gray-900'>
                          {item.name}
                        </span>
                        <span className='text-gray-800'>{item.price}₽</span>
                      </div>
                      {item.description && (
                        <p className='text-sm text-gray-500 mt-1'>
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
