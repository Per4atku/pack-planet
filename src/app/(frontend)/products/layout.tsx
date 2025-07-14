import CategoryList from '@/components/CategoryList';
import CategoryTree from '@/components/CategoryTree';
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
import { ChevronDown, ChevronRight, MenuSquareIcon } from 'lucide-react';

import React, { ReactNode, Suspense } from 'react';
import LoadingProducts from './loading';

interface ProductsLayoutProps {
  children: ReactNode;
}

const ProductsLayout = ({ children }: ProductsLayoutProps) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='ghost'
            className='fixed w-screen rounded-none text-white bg-sidebar-foreground hover:bg-sidebar-foreground/90 hover:text-white  py-6 px-12'
          >
            <MenuSquareIcon />
            Категории
            <ChevronDown />
          </Button>
        </SheetTrigger>

        <SheetContent side='top' className='max-h-screen overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Выбор Категорий</SheetTitle>
            <SheetDescription>
              Категории товаров, которые вы можете выбрать для вашего продукта.
            </SheetDescription>
          </SheetHeader>
          <div className='grid flex-1 auto-rows-min gap-6 px-4'>
            <CategoryList>
              <CategoryTree />
            </CategoryList>
          </div>
        </SheetContent>
      </Sheet>
      <div>
        <Suspense fallback={<LoadingProducts />}>{children}</Suspense>
      </div>
    </>
  );
};

export default ProductsLayout;
