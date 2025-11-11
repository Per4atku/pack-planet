import {
  getCategories,
  getCategoryById,
  getProductsFilteredByCategory,
} from "@/api/api";
import { CategorySelector } from "@/components/CategorySelector";
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

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export async function generateStaticParams() {
  const response = await getCategories();
  const categories = response.data;

  return categories.map((cat) => ({
    categoryId: cat.documentId,
  }));
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

  const categories = await getCategories();

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
    </MaxWidthWrapper>
  );
}
