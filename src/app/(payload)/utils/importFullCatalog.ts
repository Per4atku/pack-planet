import type { CategoryNode } from '@/utils/parseExcel';
import { db } from '@/db/drizzle';
import { categories, products } from '@/schema';

type ProductInput = {
  name: string;
  description: string;
  price: string;
  unit: string;
  sku: string;
  quantity: number;
  categoryId: number | null;
};

type FlatCategory = {
  name: string;
  parentName: string | null;
  tempId: string;
  parentTempId: string | null;
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

  // Вставляем категории пачками и получаем реальные ID
  const categoryIdMap = new Map<string, number>();
  const chunkSize = 500;

  for (let i = 0; i < allCategories.length; i += chunkSize) {
    const chunk = allCategories.slice(i, i + chunkSize);

    // Преобразуем tempId → parentId на основе карты
    const inserted = await Promise.all(
      chunk.map(async (cat) => {
        const parentId = cat.parentTempId
          ? (categoryIdMap.get(cat.parentTempId) ?? null)
          : null;

        const [insertedCategory] = await db
          .insert(categories)
          .values({
            name: cat.name,
            categoryId: parentId
          })
          .returning();

        if (insertedCategory) {
          categoryIdMap.set(cat.tempId, insertedCategory.id);
        }

        return insertedCategory;
      })
    );

    console.log(
      `✅ Вставлено категорий: ${i + inserted.length}/${allCategories.length}`
    );
  }

  // Подменяем categoryId у продуктов на реальный
  const preparedProducts = allProducts.map((p) => ({
    ...p,
    quantity: p.quantity.toString(), // если quantity — текстовое поле
    categoryId:
      p.categoryId !== null
        ? (categoryIdMap.get(p.categoryId as any) ?? null)
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
          categoryId: parentTempId // это будет сопоставлено потом
        });
      }

      continue;
    }

    const tempId = `${key}_${depth}_${Math.random().toString(36).slice(2, 6)}`;
    categoriesList.push({
      name: key,
      parentName: parentTempId,
      tempId,
      parentTempId
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
