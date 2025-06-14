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

export async function importFullCatalog(tree: CategoryNode) {
  console.log('⏳ Удаление всех продуктов и категорий...');
  await db.delete(products);
  await db.delete(categories);
  console.log('✅ Очистка завершена. Начинаю импорт...');

  const allProducts: ProductInput[] = [];

  await importTree(tree, null, allProducts);

  console.log(`📦 Всего товаров для вставки: ${allProducts.length}`);
  const chunkSize = 500;

  for (let i = 0; i < allProducts.length; i += chunkSize) {
    const chunk = allProducts.slice(i, i + chunkSize).map((product) => ({
      ...product,
      quantity: product.quantity != null ? String(product.quantity) : null
    }));
    await db.insert(products).values(chunk);
    console.log(
      `✅ Вставлено товаров: ${i + chunk.length}/${allProducts.length}`
    );
  }

  console.log('🎉 Импорт завершён.');
}

async function importTree(
  node: CategoryNode,
  parentCategoryId: number | null,
  productAccumulator: ProductInput[]
): Promise<void> {
  for (const [key, value] of Object.entries(node)) {
    if (key === '_products') {
      const prods = value as any[];

      for (const product of prods) {
        const quantityNumber =
          typeof product.quantity === 'string'
            ? parseFloat(product.quantity.replace(/,/g, ''))
            : product.quantity;

        productAccumulator.push({
          ...product,
          quantity: quantityNumber,
          categoryId: parentCategoryId
        });
      }
      continue;
    }

    const [createdCategory] = await db
      .insert(categories)
      .values({
        name: key,
        categoryId: parentCategoryId
      })
      .returning();

    console.log(`📂 Создана категория: ${createdCategory?.name}`);

    if (createdCategory && createdCategory.id !== undefined) {
      await importTree(
        value as CategoryNode,
        createdCategory.id,
        productAccumulator
      );
    } else {
      throw new Error('Не удалось создать категорию или отсутствует id');
    }
  }
}
