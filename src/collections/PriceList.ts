import { importFullCatalog } from '@/app/(payload)/utils/importFullCatalog';
import parseExcel from '@/utils/parseExcel';
import { revalidateTag } from 'next/cache';

import type { CollectionConfig, CollectionSlug } from 'payload';

export const PriceList: CollectionConfig = {
  slug: 'price-list',
  upload: {
    staticDir: 'imports',
    mimeTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
  },
  fields: [],
  hooks: {
    afterChange: [
      async ({ req }) => {
        const buffer = req.file?.data;
        const parsedSheet = parseExcel(buffer!);
        console.log(parsedSheet);
        await importFullCatalog(parsedSheet);

        revalidateTag('products');
        revalidateTag('categories');
        console.log('Revalidated products & categories tag');
      }
    ]
  },
  access: { read: () => true }
};
