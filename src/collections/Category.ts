import type { CollectionConfig, CollectionSlug } from 'payload';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'; // если нужен nested UI

export const Category: CollectionConfig = {
  slug: 'categories',
  fields: [
    { name: 'isRoot', type: 'checkbox' },
    { name: 'hasProducts', type: 'checkbox' },
    { name: 'name', type: 'text', required: true },
    // родительская категория
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      hasMany: false
    },
    // связь дети
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      hasMany: true
    },
    // связь продукты
    {
      name: 'products',
      type: 'join',
      collection: 'products' as CollectionSlug,
      on: 'category',
      hasMany: true
    }
  ],
  admin: {
    useAsTitle: 'name'
  }
};
