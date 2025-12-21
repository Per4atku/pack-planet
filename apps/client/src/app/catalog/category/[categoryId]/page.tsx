import {
  getCategories,
  getCategoryById,
  getProductsFilteredByCategory,
} from "@/api/api";
import { CategorySelector } from "@/components/CategorySelector";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PaginationControls from "@/components/PaginationControls";
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
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // During Docker build, Strapi isn't available - return empty array
  // Pages will be generated on-demand (ISR)
  if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
    console.warn("NEXT_PUBLIC_STRAPI_URL not set, skipping static generation");
    return [];
  }

  try {
    const response = await getCategories();

    // Check if response is valid
    if (!response?.data) {
      console.warn(
        "Invalid response from getCategories, skipping static generation"
      );
      return [];
    }

    const categories = response.data;

    console.log(`Generated static params for ${categories.length} categories`);

    return categories.map((cat) => ({
      categoryId: cat.documentId,
    }));
  } catch (error) {
    console.warn("Failed to fetch categories for static generation:", error);
    // Return empty array - pages will be generated on-demand
    return [];
  }
}

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId?: string }>;
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
  const { categoryId = "y6ennjodlsqhr1gczg694rk8" } = await params;
  const { page = "1", pageSize = "10" } = await searchParams;

  const [products, categories] = await Promise.all([
    getProductsFilteredByCategory({
      page,
      pageSize,
      categoryId,
    }),
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
