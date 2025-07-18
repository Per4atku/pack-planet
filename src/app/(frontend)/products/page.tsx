// app/products/page.tsx

import PaginationControls from '@/components/PaginationControls';
import { ProductGrid } from '@/components/ProductGrid';

export const dynamic = 'force-dynamic';

export default async function ProductsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;
  const categoryName =
    typeof searchParams.categoryName === 'string'
      ? searchParams.categoryName
      : undefined;
  const limit = 30;

  const apiRoute =
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${currentPage}` +
    (category ? `&where[category][equals]=${category}` : '');

  const res = await fetch(apiRoute, {
    next: { tags: ['products'], revalidate: 3600 }
  });
  const data = await res.json();

  const products = data.docs;
  const { totalPages = 1, totalDocs = 1 } = data;

  return (
    <>
      <div className='h-12' />
      <main>
        <ProductGrid
          products={products}
          selectedCategoryName={categoryName || 'Все товары'}
          total={totalDocs}
        />
        {totalPages > 1 && (
          <div className='mt-6 flex justify-center'>
            <PaginationControls totalPages={totalPages} />
          </div>
        )}
      </main>
    </>
  );
}
