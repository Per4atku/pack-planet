import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProductById } from "@/api/api";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const response = await getProductById({ productId });
  const product = response.data;

  return (
    <article
      className="grid grid-cols-1 sm:grid-cols-2"
      itemType="https://schema.org/Product"
    >
      {/* Image Carousel */}
      {/* <div className="w-full aspect-square bg-red-500"></div> */}

      <ImageCarousel images={product.images} />

      <div className="flex flex-col justify-center space-y-6">
        {/* Product Name */}
        <div className="flex gap-2 justify-between items-center">
          <h2
            itemProp="name"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            className="text-2xl overflow-hidden text-ellipsis"
          >
            {product.name}
          </h2>
          <Badge className="text-base" itemProp="skuxx">
            {product.sku}
          </Badge>
        </div>

        {/* Price */}
        <div className="text-xl flex justify-between">
          <div
            itemScope
            itemProp="offers"
            itemType="https://schema.org/Offer"
            aria-label="Цены и условия"
          >
            <data value={product.price}>{product.price}₽</data>{" "}
            <span>/{product.unit}</span>
            <meta itemProp="priceCurrency" content="RUB" />
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

        <div itemProp="category" content={product.category?.Name}>
          <Link href={`/catalog/category/${product.category?.documentId}`}>
            <Badge className="text-base underline" variant={"outline"}>
              {product.category?.Name}
            </Badge>
          </Link>
        </div>
        {product.description && (
          <Card
            itemProp="description"
            className="my-12 w-full col-start-1 col-end-3"
          >
            <CardContent>
              <BlocksRenderer content={product.description} />
            </CardContent>
          </Card>
        )}
      </div>
    </article>
  );
}
