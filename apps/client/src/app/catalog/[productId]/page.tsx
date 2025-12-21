import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProductById, getProducts } from "@/api/api";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import { Product, WithContext } from "schema-dts";

import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import resolvedImage from "@/lib/resolvedImage";
import { blocksToString } from "@/lib/utils";

import { Metadata } from "next";
import { Image } from "@/api";
import LinkedProducts from "@/components/LinkedProducts";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const response = await getProductById({ productId: productId });
  const product = response.data;

  const title = product?.name
    ? `${product.name} | Планета Упаковки`
    : "Планета Упаковки";
  const description = product?.description
    ? (blocksToString(product.description) || "").slice(0, 160)
    : "Упаковка и одноразовая посуда — оптом и в розницу.";
  const canonicalUrl = `${baseUrl?.replace(/\/$/, "") || ""}/catalog/${
    product?.documentId ?? productId
  }`;
  const images =
    product?.images && product.images.length > 0
      ? product.images.map((img: Image) => resolvedImage(img.url))
      : [];

  return {
    title,
    description,
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "pack-planet.ru",
      images: images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: {
      index: true,
      follow: true,
    },
    // optional: add icons if you use them
    // icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  };
}

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
    const response = await getProducts({ page: "1", pageSize: "25" });

    // Check if response is valid
    if (!response?.meta?.pagination || !response?.data) {
      console.warn(
        "Invalid response from getProducts, skipping static generation"
      );
      return [];
    }

    const { pageCount } = response.meta.pagination;
    const productIds: string[] = response.data.map((p) => p.documentId);

    // Fetch remaining pages (if any)
    for (let page = 2; page <= pageCount; page++) {
      const res = await getProducts({ page: String(page), pageSize: "25" });
      if (res?.data) {
        productIds.push(...res.data.map((p) => p.documentId));
      }
    }

    console.log(`Generated static params for ${productIds.length} products`);

    // Return params in required format
    return productIds.map((id) => ({ productId: id }));
  } catch (error) {
    console.warn("Failed to fetch products for static generation:", error);
    // Return empty array - pages will be generated on-demand
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const response = await getProductById({ productId });
  const product = response.data;

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    image: product.images?.length
      ? product.images.map((image) => resolvedImage(image.url))
      : [],
    name: product.name,
    description: product.description ? blocksToString(product.description) : "",
    sku: product.sku || "",
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/catalog/${product.documentId}`,
      priceCurrency: "RUB",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Планета Упаковки",
      },
    },
    category: product.category?.Name || "",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <article className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {/* Image Carousel */}
        <ImageCarousel images={product.images} />

        <div className="flex flex-col justify-center space-y-6">
          {/* Product Name */}
          <div className="flex gap-2 justify-between items-center">
            <h2
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              className="text-2xl overflow-hidden text-ellipsis"
            >
              {product.name}
            </h2>
            <Badge className="text-base">{product.sku}</Badge>
          </div>

          {/* Price */}
          <div className="text-xl flex justify-between">
            <div aria-label="Цены и условия">
              <data value={product.price}>{product.price}₽</data>{" "}
              <span>/{product.unit}</span>
              {product.wholesale && (
                <p className="text-sm italic">Розничная цена</p>
              )}
            </div>

            {product.wholesale && (
              <div className="text-eco-green">
                {product.wholesale_price}₽<span>/{product.unit}</span>
                <p className="text-sm italic">
                  Оптовая цена (от {product.wholesale_min_qty} {product.unit})
                </p>
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <Link href={`/catalog/category/${product.category?.documentId}`}>
              <Badge className="text-base underline" variant={"outline"}>
                {product.category?.Name}
              </Badge>
            </Link>
          </div>

          {/* Description */}
          {product.description && (
            <Card className="my-12 w-full col-start-1 col-end-3">
              <CardContent>
                <BlocksRenderer content={product.description} />
              </CardContent>
            </Card>
          )}
        </div>
      </article>
      {Array.isArray(product.linked_products) &&
        product.linked_products.length > 0 && (
          <Suspense
            fallback={
              <div className="h-[385px] w-full flex items-center justify-center">
                <Spinner className="text-eco-green w-12 h-12" />
              </div>
            }
          >
            <LinkedProducts
              className="col-start-1 col-end-3 mt-12 "
              linkedProducts={
                product.linked_products as Array<{
                  id: number;
                  sku: string;
                }>
              }
            />
          </Suspense>
        )}
    </>
  );
}
