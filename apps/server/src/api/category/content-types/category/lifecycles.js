"use strict";

/**
 * category lifecycles
 */
module.exports = {
  // после обновления категории — синхронизируем поле category у товаров, которые в этой категории
  async afterUpdate(event) {
    const { result } = event;
    const categoryId = result.id;
    const productsField = result.products || []; // массив объектов или id

    // получим список id продуктов, которые должны быть в этой категории
    const productIds = productsField.map((p) => (p.id ? p.id : p));

    // 1) Убедимся, что у всех этих продуктов стоит category = эта категория
    for (const pid of productIds) {
      const product = await strapi.entityService.findOne(
        "api::product.product",
        pid,
        { populate: ["category"] }
      );
      const currentCatId = product.category
        ? product.category.id || product.category
        : null;
      if (String(currentCatId) !== String(categoryId)) {
        await strapi.entityService.update("api::product.product", pid, {
          data: { category: categoryId },
        });
      }
    }

    // 2) Найдём продукты, у которых стоит category = эта категория, но которые не включены в products[] — и уберём связь
    const productsPointingToThisCategory = await strapi.entityService.findMany(
      "api::product.product",
      {
        populate: ["category"],
        filters: { "category.id": categoryId },
      }
    );

    for (const prod of productsPointingToThisCategory) {
      if (!productIds.map(String).includes(String(prod.id))) {
        // обнуляем category у товара (или устанавливаем null)
        await strapi.entityService.update("api::product.product", prod.id, {
          data: { category: null },
        });
      }
    }
  },

  // после создания категории — если в теле были продукты, синхронизируем их
  async afterCreate(event) {
    const { result } = event;
    const categoryId = result.id;
    const productsField = result.products || [];
    const productIds = productsField.map((p) => (p.id ? p.id : p));
    for (const pid of productIds) {
      const product = await strapi.entityService.findOne(
        "api::product.product",
        pid,
        { populate: ["category"] }
      );
      const currentCatId = product.category
        ? product.category.id || product.category
        : null;
      if (String(currentCatId) !== String(categoryId)) {
        await strapi.entityService.update("api::product.product", pid, {
          data: { category: categoryId },
        });
      }
    }
  },

  // после удаления категории — у всех продуктов убрать ссылку на эту категорию
  async afterDelete(event) {
    const { result } = event;
    const categoryId = result.id;

    const products = await strapi.entityService.findMany(
      "api::product.product",
      {
        populate: ["category"],
        filters: { "category.id": categoryId },
      }
    );

    for (const p of products) {
      await strapi.entityService.update("api::product.product", p.id, {
        data: { category: null },
      });
    }
  },
};
