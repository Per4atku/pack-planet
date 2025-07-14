import type { CollectionConfig, CollectionSlug } from 'payload';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'; // если нужен nested UI
import { v4 as uuidv4 } from 'uuid';
import { revalidateTag } from 'next/cache';

export const Category: CollectionConfig = {
  slug: 'categories',
  fields: [
    { name: 'hasProducts', type: 'checkbox' },
    { name: 'name', type: 'text', required: true },
    // родительская категория
    { name: 'level', type: 'number', defaultValue: 0, required: true },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories' as CollectionSlug,
      hasMany: false
    },

    {
      name: 'slug',
      type: 'text',
      required: true,

      admin: { readOnly: true }
    }
  ],
  admin: {
    useAsTitle: 'name'
  },
  access: { read: () => true },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.customId) {
          data.customId = uuidv4();
        }
        return data;
      }
    ],
    afterChange: [
      async ({ doc, operation }) => {
        revalidateTag('categories');
      }
    ]
  }
};
