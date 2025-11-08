import { getCategoryById, getProductsFilteredByCategory } from "@/api/api";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductGrid from "@/components/ProductGrid";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId?: string }>;
}): Promise<Metadata> {
  const categoryId = (await params).categoryId || "";
  const category = await getCategoryById({ categoryId });

  const name = category.data.Name || "Все Товары";

  return {
    title: `${name} | Планета Упаковки`,
    openGraph: {
      title: `${name} | Планета Упаковки`,
      type: "website",
      url: `https://planetaupackovki.ru/catalog/${categoryId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Планета Упаковки`,
    },
  };
}

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
