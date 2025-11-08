import { BlocksContent } from "@strapi/blocks-react-renderer";

interface ProductsApiResponse {
  data: Product[];
  meta: Meta;
}
interface CategoriesApiResponse {
  data: Category[];
  meta: Meta;
}

interface PartnersApiResponse {
  data: Partner[];
  meta: Meta;
}

/* ---------- Product ---------- */
interface Product {
  id: number;
  documentId: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  publishedAt?: string | null; // sometimes present
  sku?: string | null;
  name: string;
  price: number;
  description?: BlocksContent | null;
  wholesale: boolean;
  wholesale_price?: number | null;
  wholesale_min_qty?: number | null;
  unit?: string | null;
  images?: Image[];
  category?: Category | null;
}

/* ---------- Category ---------- */
interface Category {
  id: number;
  documentId: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  publishedAt?: string | null; // sometimes present
  Name: string;
  products?: Product[];
}

/* ---------- Partner ---------- */
interface Partner {
  id: number;
  documentId: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  publishedAt?: string | null; // sometimes present
  name: string;
  description?: string;
  image?: Image;
}

/* ---------- Image & formats ---------- */
interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: ImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number; // kilobytes in your sample
  sizeInBytes?: number | null; // sometimes present inside formats; kept here optional
  url: string;
  previewUrl?: string | null;
  provider?: string | null;
  provider_metadata?: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

interface ImageFormats {
  thumbnail?: FormatDetail;
  small?: FormatDetail;
  medium?: FormatDetail;
  // allow other custom format keys that Strapi might return
  [key: string]: FormatDetail | undefined;
}

interface FormatDetail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string | null;
  width: number;
  height: number;
  size: number; // kilobytes in your sample
  sizeInBytes?: number | null;
  url: string;
}

/* ---------- Category & Meta ---------- */
interface Category {
  id: number;
  documentId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
