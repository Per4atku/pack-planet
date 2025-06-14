// components/catalog/CatalogAccordion.tsx
'use client';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

type Product = {
  id: number;
  name: string;
  price?: string;
  unit?: string;
};

type Category = {
  id: number;
  name: string;
  children: Category[];
  products: Product[];
};

type Props = { categories: Category[] };

export default function CatalogAccordion({ categories }: Props) {
  return (
    <div className='space-y-2'>
      {categories.map((cat) => (
        <CategoryNode key={cat.id} category={cat} />
      ))}
    </div>
  );
}

function CategoryNode({ category }: { category: Category }) {
  return (
    <Accordion type='multiple' className='w-full'>
      <AccordionItem value={`cat-${category.id}`}>
        <AccordionTrigger>{category.name}</AccordionTrigger>
        <AccordionContent>
          {category.products.length > 0 && (
            <ul className='pl-4 list-disc text-sm text-muted-foreground'>
              {category.products.map((product) => (
                <li key={product.id}>
                  <strong>{product.name}</strong>
                  {product.price &&
                    ` – ${product.price}${product.unit ? ` ${product.unit}` : ''}`}
                </li>
              ))}
            </ul>
          )}
          {category.children.length > 0 && (
            <div className='pl-4 mt-2 space-y-2'>
              {category.children.map((child) => (
                <CategoryNode key={child.id} category={child} />
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
