import { ReactNode } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/api";

const ProductGrid = async ({
  products,
  children,
}: {
  products: Product[];
  children?: ReactNode;
}) => {
  return (
    <div className="flex-1 overflow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {children}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Ничего не найдено :(
          </h3>
          <p className="text-gray-500">
            В текущей категории пока что нет товаров. Мы работаем над этим!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
