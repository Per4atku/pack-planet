import { CollectionSlug, PayloadRequest } from 'payload';

async function importFullCatalog(tree: any, req: PayloadRequest) {
  console.log('⏳ Удаление всех продуктов и категорий...');

  // Удаление всех продуктов
  const existingProducts = await req.payload.find({
    collection: 'products' as CollectionSlug,
    limit: 10000
  });
  for (const prod of existingProducts.docs) {
    await req.payload.delete({
      collection: 'products' as CollectionSlug,
      id: prod.id
    });
  }

  // Удаление всех категорий
  const existingCategories = await req.payload.find({
    collection: 'categories' as CollectionSlug,
    limit: 10000
  });
  for (const cat of existingCategories.docs) {
    await req.payload.delete({
      collection: 'categories' as CollectionSlug,
      id: cat.id
    });
  }

  console.log('✅ Очистка завершена. Начинаю импорт...');

  // Импорт новой структуры

  await importTree(tree, null, req);

  console.log('✅ Импорт завершён.');
}

async function importTree(
  node: any,
  parentCategoryId: string | null = null,
  req: PayloadRequest
) {
  for (const [key, value] of Object.entries(node)) {
    console.log(`🔄 Обработка ${key}...`);
    if (key === '_products') {
      for (const product of value as any[]) {
        await req.payload.create({
          collection: 'products' as CollectionSlug,
          data: {
            ...product,
            category: parentCategoryId
          }
        });
      }
    } else {
      // создаём категорию
      const categoryDoc = await req.payload.create({
        collection: 'categories' as CollectionSlug,
        data: {
          name: key,
          category: parentCategoryId as CollectionSlug
        }
      });

      // рекурсивный вызов для подкатегорий/продуктов
      await importTree(value, categoryDoc.id, req);
    }
  }
}

export default importFullCatalog;
