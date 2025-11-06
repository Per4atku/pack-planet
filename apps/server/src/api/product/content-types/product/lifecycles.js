"use strict";

/**
 * product lifecycles
 */
module.exports = {
  // после создания товара — добавляем его в категорию (если указана)
  async afterCreate(event) {
    const { result } = event; // результат создания
    const productId = result.id;
    const categoryField = result.category; // может быть id или объект

    const categoryId = categoryField && (categoryField.id || categoryField);
    if (!categoryId) return;

    const category = await strapi.entityService.findOne(
      "api::category.category",
      categoryId,
      {
        populate: ["products"],
      }
    );

    const products = (category.products || []).map((p) => (p.id ? p.id : p));
    if (!products.includes(productId)) {
      products.push(productId);
      await strapi.entityService.update("api::category.category", categoryId, {
        data: { products },
      });
    }
  },

  // после обновления товара — синхронизируем: удаляем товар из старых категорий и добавляем в новую
  async afterUpdate(event) {
    const { result } = event;
    const productId = result.id;
    const newCategoryField = result.category;
    const newCategoryId =
      newCategoryField && (newCategoryField.id || newCategoryField);

    // Получим все категории, которые сейчас ссылаются на этот товар
    const categoriesWithProduct = await strapi.entityService.findMany(
      "api::category.category",
      {
        populate: ["products"],
        filters: { "products.id": productId },
      }
    );

    // 1) Удаляем ссылку из тех категорий, которые не являются новой
    for (const cat of categoriesWithProduct) {
      if (String(cat.id) === String(newCategoryId)) continue;
      const products = (cat.products || [])
        .map((p) => (p.id ? p.id : p))
        .filter((id) => String(id) !== String(productId));
      await strapi.entityService.update("api::category.category", cat.id, {
        data: { products },
      });
    }

    // 2) Если есть новая категория — убедимся, что в ней есть продукт
    if (newCategoryId) {
      const newCat = await strapi.entityService.findOne(
        "api::category.category",
        newCategoryId,
        { populate: ["products"] }
      );
      const prodIds = (newCat.products || []).map((p) => (p.id ? p.id : p));
      if (!prodIds.includes(productId)) {
        prodIds.push(productId);
        await strapi.entityService.update(
          "api::category.category",
          newCategoryId,
          { data: { products: prodIds } }
        );
      }
    }
  },

  // после удаления товара — убрать ссылку из всех категорий
  async afterDelete(event) {
    const { result } = event;
    const productId = result.id;

    const categories = await strapi.entityService.findMany(
      "api::category.category",
      {
        populate: ["products"],
        filters: { "products.id": productId },
      }
    );

    for (const cat of categories) {
      const products = (cat.products || [])
        .map((p) => (p.id ? p.id : p))
        .filter((id) => String(id) !== String(productId));
      await strapi.entityService.update("api::category.category", cat.id, {
        data: { products },
      });
    }
  },
};
