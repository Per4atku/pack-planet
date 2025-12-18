import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import resolvedImage from "@/lib/resolvedImage";
import Link from "next/link";
import { Product } from "@/api";
import fire from "@/assets/fire.png";

export const ProductCard = ({ product }: { product: Product }) => {
  const hasImage = product.images && product.images.length > 0;

  return (
    <Card className="hover:shadow-lg transition-shadow relative ">
      <CardContent className="p-0">
        <Link href={`/catalog/${product.documentId}`}>
          <div className="relative w-full h-36 flex items-center justify-center py-4 ">
            {/* Fire glow */}
            {product.featured_product && (
              <div className="absolute -right-6 -top-10 z-30 group">
                {/* Fire glow */}
                <div
                  className="absolute w-28 h-28 rounded-full blur-2xl opacity-60 "
                  style={{
                    background:
                      "radial-gradient(circle, #ED782F 0%, rgba(237,120,47,0.4) 60%, rgba(237,120,47,0) 100%)",
                    zIndex: 20,
                  }}
                />
                {/* Fire icon */}
                <Image
                  draggable={false}
                  src={fire}
                  width={75}
                  height={75}
                  className="relative rotate-12 z-30 pointer-events-none"
                  alt="fire icon"
                />
              </div>
            )}

            {hasImage ? (
              <Image
                draggable={false}
                alt={product.name || "Изображение товара"}
                src={resolvedImage(product.images?.at(0)?.url || "")}
                width={192}
                height={192}
                priority
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400 space-y-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg">🖼️</span>
                </div>
                <span className="text-sm font-medium italic">
                  Картинка отсутствует
                </span>
              </div>
            )}
          </div>

          <div className="p-4 space-y-3">
            <Separator />

            <Badge className="font-bold">Артикул: {product.sku}</Badge>
            <h1 className="text-base font-medium">{product.name}</h1>

            <p className="font-bold text-base">
              {product.price} руб/{product.unit}
            </p>
          </div>
        </Link>

        <Link href={`/catalog/category/${product.category?.documentId || ""}`}>
          <div className="text-xs px-4 italic hover:underline">
            ({product.category?.Name})
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
