import { getFeaturedProducts } from "@/api/api";
import ProductGrid from "./ProductGrid";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Card } from "./ui/card";
import Link from "next/link";
import { LucideArrowRightCircle } from "lucide-react";

const FeaturedProducts = async () => {
  let featuredProducts = null;

  try {
    // Check if Strapi URL is configured
    if (process.env.NEXT_PUBLIC_STRAPI_URL) {
      featuredProducts = await getFeaturedProducts();
    }
  } catch (error) {
    console.warn("Failed to fetch featured products:", error);
    // Component will render nothing
  }

  // Return nothing if no products data or empty
  if (
    !featuredProducts?.data ||
    !featuredProducts?.meta?.pagination ||
    featuredProducts.meta.pagination.total === 0
  ) {
    return null;
  }

  return (
    <MaxWidthWrapper className="my-24">
      <h2 className="text-section-title mb-12 text-center">
        Популярные Товары
      </h2>
      <ProductGrid products={featuredProducts.data}>
        <Link className="h-full" href={`/catalog`}>
          <Card
            className="relative p-6 flex justify-center gap-4 bg-eco-green text-white rounded-xl overflow-hidden shadow-md 
               hover:bg-white hover:border-eco-green  hover:text-eco-green  duration-300"
          >
            <LucideArrowRightCircle className="w-10 h-10 transition-colors  " />

            <div className="flex flex-col group">
              <h3 className="text-2xl font-semibold">Перейти в Каталог</h3>
              <span className="text-sm opacity-80  ">
                Смотреть все продукты
              </span>
            </div>
          </Card>
        </Link>
      </ProductGrid>
    </MaxWidthWrapper>
  );
};

export default FeaturedProducts;
