import CategoryList from '@/components/CategoryList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import React, { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}

const ProductsLayout = ({ children }: ProductsLayoutProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline'>Open</Button>
        </SheetTrigger>

        <SheetContent side='left' className='max-h-screen overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Выбор Категорий</SheetTitle>
            <SheetDescription>
              Категории товаров, которые вы можете выбрать для вашего продукта.
            </SheetDescription>
          </SheetHeader>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <CategoryList />
          </div>
          <SheetFooter>
            <Button type='submit'>Save changes</Button>
            <SheetClose asChild>
              <Button variant='outline'>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div>{children}</div>
    </>
  );
};

export default ProductsLayout;
