'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './ui/accordion';
import { SheetTrigger } from './ui/sheet';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export interface Category {
  id: string;
  name: string;
  level: number;
  hasProducts: boolean;
  parent?: string | null;
  children?: Category[];
  slug: string;
}

function CategoryAccordion({ cats }: { cats: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Accordion type='multiple' className='w-full '>
      {cats.map((cat) =>
        cat.hasProducts ? (
          /* ── Category is FINAL (has products) → render as a plain button ── */
          <div key={cat.id} className='mb-1'>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start cursor-pointer pl-2 overflow-hidden text-ellipsis '
              )}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('category', cat.id.toString());
                params.set('categoryName', cat.name);
                params.delete('page'); // сброс страницы при выборе категории
                router.push(`${pathname}?${params.toString()}`);
              }}
            >
              {cat.name}
            </SheetTrigger>
          </div>
        ) : (
          /* ── Category is NOT final → render an Accordion item ── */
          <AccordionItem
            className='pl-2 cursor-pointer   '
            style={{ marginBottom: cat.level === 0 ? '0.5rem' : '0' }}
            key={cat.id}
            value={cat.id.toString()}
          >
            <AccordionTrigger className='font-bold overflow-hidden py-2'>
              {cat.name}
            </AccordionTrigger>
            <AccordionContent>
              {cat.children && cat.children.length > 0 && (
                <ul>
                  {cat.children.map((child) => (
                    <li key={child.id}>
                      <CategoryAccordion cats={[child]} />
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        )
      )}
    </Accordion>
  );
}

export default CategoryAccordion;
