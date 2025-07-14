'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

export default function DownloadPrice() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/price-list?limit=1&sort=-createdAt`,
          { cache: 'no-store' }
        );

        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        const url = data?.docs?.[0]?.url;

        if (url) {
          setFileUrl(url);
        } else {
          setError(true);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    fetchPrice();
  }, []);

  if (error) {
    return (
      <>
        <Button variant={'destructive'}>Ошибка при загрузке прайс-листа</Button>
      </>
    );
  }

  if (!fileUrl) {
    return (
      <Button
        size='lg'
        disabled
        className='bg-gray-300 text-gray-600 py-6 text-lg font-semibold rounded-lg shadow cursor-not-allowed'
      >
        Загрузка...
      </Button>
    );
  }

  return (
    <Link
      href={fileUrl}
      className={cn(
        buttonVariants({ size: 'lg' }),
        'bg-eco-green hover:bg-eco-green/90 hover-scale cursor-pointer text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
      )}
    >
      <Download className='text-white size-5' />
      Скачать Прайс-Лист
    </Link>
  );
}
