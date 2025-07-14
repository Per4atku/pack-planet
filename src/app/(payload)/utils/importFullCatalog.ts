import type { CategoryNode } from '@/utils/parseExcel';
import { db } from '@/db/drizzle';
import { categories, products } from '@/schema';
import { v4 as uuidv4 } from 'uuid';

type ProductInput = {
  name: string;
  description: string;
  price: string;
  unit: string;
  sku: string;
  quantity: number;
  categoryId: string | null; // используем tempId пока
};

type FlatCategory = {
  name: string;
  parentTempId: string | null;
  tempId: string;
  hasProducts: boolean;
  slug?: string;
  level: number;
};

export async function importFullCatalog(tree: CategoryNode) {
  console.log('⏳ Удаление всех продуктов и категорий...');
  await db.delete(products);
  await db.delete(categories);
  console.log('✅ Очистка завершена. Начинаю импорт...');

  const allCategories: FlatCategory[] = [];
  const allProducts: ProductInput[] = [];

  collectData(tree, null, allCategories, allProducts);

  console.log(`📁 Категорий для вставки: ${allCategories.length}`);
  console.log(`📦 Товаров для вставки: ${allProducts.length}`);

  // Сопоставление tempId -> реальный ID
  const categoryIdMap = new Map<string, number>();
  const chunkSize = 500;

  for (let i = 0; i < allCategories.length; i += chunkSize) {
    const chunk = allCategories.slice(i, i + chunkSize);

    let insertedCount = 0;

    for (const cat of chunk) {
      const parentId = cat.parentTempId
        ? (categoryIdMap.get(cat.parentTempId) ?? null)
        : null;

      const [insertedCategory] = await db
        .insert(categories)
        .values({
          name: cat.name,
          parentId,
          hasProducts: cat.hasProducts,
          slug: uuidv4(),
          level: cat.level
        })
        .returning();

      if (insertedCategory) {
        categoryIdMap.set(cat.tempId, insertedCategory.id);
        insertedCount++;
      }

      console.log(
        `➕ Категория "${cat.name}" добавлена с ID ${insertedCategory?.id} (parentId: ${parentId})`
      );
    }

    console.log(
      `✅ Вставлено категорий: ${i + insertedCount}/${allCategories.length}`
    );
  }

  const preparedProducts = allProducts.map((p) => ({
    ...p,
    quantity: p.quantity.toString(),
    categoryId:
      p.categoryId !== null && categoryIdMap.has(p.categoryId)
        ? categoryIdMap.get(p.categoryId)!
        : null
  }));

  for (let i = 0; i < preparedProducts.length; i += chunkSize) {
    const chunk = preparedProducts.slice(i, i + chunkSize);
    await db.insert(products).values(chunk);
    console.log(
      `✅ Вставлено товаров: ${i + chunk.length}/${allProducts.length}`
    );
  }

  console.log('🎉 Импорт завершён.');
}

function collectData(
  node: CategoryNode,
  parentTempId: string | null,
  categoriesList: FlatCategory[],
  productList: ProductInput[],
  depth: number = 0
): void {
  for (const [key, value] of Object.entries(node)) {
    if (key === '_products') {
      const prods = value as any[];

      for (const product of prods) {
        const quantityNumber =
          typeof product.quantity === 'string'
            ? parseFloat(product.quantity.replace(/,/g, ''))
            : product.quantity;

        productList.push({
          ...product,
          quantity: quantityNumber,
          categoryId: parentTempId
        });
      }

      continue;
    }

    const tempId = `${key}_${depth}_${Math.random().toString(36).slice(2, 6)}`;

    const hasProducts = '_products' in value!;

    categoriesList.push({
      name: key,
      parentTempId,
      tempId,
      hasProducts,
      level: depth
    });

    collectData(
      value as CategoryNode,
      tempId,
      categoriesList,
      productList,
      depth + 1
    );
  }
}
