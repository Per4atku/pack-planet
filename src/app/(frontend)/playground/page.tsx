// app/catalog/page.tsx

import CatalogAccordion from '@/components/CatalogAccordion';
import type { Category, Product } from '@/payload-types';

export default async function CatalogPage() {
  // Получаем категории с родителями
  const { docs: rawCategories } = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?depth=2`,
    { cache: 'no-store' }
  ).then((res) => res.json());

  // Получаем все товары
  const { docs: rawProducts } = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products?limit=10000`,
    { cache: 'no-store' }
  ).then((res) => res.json());

  // Построение карты категорий
  const categoryMap = new Map<
    number,
    Category & { children: Category[]; products: Product[] }
  >();

  rawCategories.forEach((cat: any) => {
    categoryMap.set(cat.id, { ...cat, children: [], products: [] });
  });

  const rootCategories: (typeof categoryMap.values)[] = [];

  for (const cat of categoryMap.values()) {
    if (cat.parent?.id) {
      const parent = categoryMap.get(cat.parent.id);
      parent?.children.push(cat);
    } else {
      rootCategories.push(cat);
    }
  }

  // Привязка товаров к категориям
  rawProducts.forEach((p: any) => {
    const cat = categoryMap.get(p.category.id);
    cat && cat.products.push(p);
  });

  return <CatalogAccordion categories={rootCategories} />;
}
