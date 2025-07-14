import { revalidateTag } from 'next/cache';
import { CollectionConfig, CollectionSlug } from 'payload';

export const Product: CollectionConfig = {
  slug: 'products',
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'price', type: 'number', required: true },
    { name: 'unit', type: 'text' },
    { name: 'sku', type: 'text' },
    { name: 'quantity', type: 'number' },
    // связь с категорией (one-to-many)
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      hasMany: false,
      required: true
    }
  ],
  admin: {
    useAsTitle: 'name'
  },
  access: {
    read: () => true // доступ для чтения всем
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidateTag('products');
      }
    ]
  }
};
