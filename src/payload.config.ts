// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { PriceList } from './collections/PriceList';
import { Category } from './collections/Category';
import { Product } from './collections/Product';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  collections: [Users, Media, PriceList, Category, Product],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || ''
    }
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
        'price-list': true
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      clientUploads: true,
      addRandomSuffix: true
    })

    // storage-adapter-placeholder
  ]
});
