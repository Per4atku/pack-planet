import { getProducts } from "@/api/api";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductGrid from "@/components/ProductGrid";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { page = "1", pageSize = "10" } = await searchParams;

  const products = await getProducts({ page, pageSize });

  return (
    <MaxWidthWrapper className="mt-12">
      <ProductGrid
        products={products.data}
        productsTotal={products.meta.pagination.total}
      />
    </MaxWidthWrapper>
  );
}
