import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProductById } from "@/api/api";
import { ImageCarousel } from "@/components/ImageCarousel";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const response = await getProductById({ productId });
  const product = response.data;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Изображение */}

        <ImageCarousel images={product.images} />

        {/* Информация о товаре */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500">SKU: {product.sku}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-eco-green">
              {product.price} ₽ / {product.unit}
            </span>
            {product.wholesale && (
              <Badge className="bg-green-100 text-green-800 text-base font-bold">
                Опт: {product.wholesale_price} ₽/{product.unit} от{" "}
                {product.wholesale_count} {product.unit}
              </Badge>
            )}
          </div>

          <Card>
            <CardContent>
              <p className="text-gray-700">{product.description}</p>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2">
            <span className="font-medium">Категория:</span>
            <Badge>{product.category?.Name}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
