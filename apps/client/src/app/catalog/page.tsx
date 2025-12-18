import { getCategories, getProducts } from "@/api/api";
import { CategorySelector } from "@/components/CategorySelector";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PaginationControls from "@/components/PaginationControls";
import ProductGrid from "@/components/ProductGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог | Планета Упаковки",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { page = "1", pageSize = "10" } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ page, pageSize }),
    getCategories(),
  ]);

  return (
    <MaxWidthWrapper className="mt-12">
      <div className="mb-4">
        <div className="flex justify-between">
          <div className="text-2xl font-bold text-gray-900">
            <CategorySelector categories={categories.data} />
          </div>
        </div>
        <p className="text-gray-600 mt-1">
          {products.meta.pagination.total} товаров найдено
        </p>
      </div>
      <ProductGrid products={products.data} />

      {products.meta.pagination.pageCount > 1 && (
        <PaginationControls totalPages={products.meta.pagination.pageCount} />
      )}
    </MaxWidthWrapper>
  );
}
