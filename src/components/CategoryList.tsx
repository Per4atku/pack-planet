'use client';

import React, { ReactNode } from 'react';
import CategoryTree from './CategoryTree';
import { buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import { usePathname, useSearchParams } from 'next/navigation';
import { SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const CategoryList = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const cleanedParams = new URLSearchParams(searchParams.toString());
  cleanedParams.delete('category');
  cleanedParams.delete('categoryName');
  cleanedParams.delete('page');

  const href = `${pathname}?${cleanedParams.toString()}`;

  return (
    <div className='mb-12 max-w-[calc(100vw-32px)] min-[400px]:w-full'>
      <SheetTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-full justify-start font-semibold cursor-pointer pl-2 overflow-hidden text-ellipsis'
          )}
        >
          ВСЕ ТОВАРЫ
        </Link>
      </SheetTrigger>
      <Separator className='mb-4' />
      {children}
    </div>
  );
};

export default CategoryList;
