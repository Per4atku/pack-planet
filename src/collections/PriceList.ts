import importFullCatalog from '@/app/(payload)/utils/importFullCatalog';
import parseExcel from '@/utils/parseExcel';
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
        await importFullCatalog(parsedSheet, req);
      }
    ]
  }
};
