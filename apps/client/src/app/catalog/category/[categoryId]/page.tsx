import {
  getCategoryById,
  getProductsFilteredByCategory,
  getProducts,
} from "@/api/api";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductGrid from "@/components/ProductGrid";

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId?: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { categoryId = "y6ennjodlsqhr1gczg694rk8" } = await params;

  const category = await getCategoryById({ categoryId: categoryId || "" });
  const { page = "1", pageSize = "10" } = await searchParams;

  const products = await getProductsFilteredByCategory({
    page,
    pageSize,
    categoryId,
  });

  return (
    <MaxWidthWrapper className="mt-12">
      <ProductGrid
        selectedCategory={category.data}
        products={products.data}
        productsTotal={products.meta.pagination.total}
      />
    </MaxWidthWrapper>
  );
}
