import { getLinkedProducts } from "@/api/api";
import ProductGrid from "./ProductGrid";
import { cn } from "@/lib/utils";

const LinkedProducts = async ({
  linkedProducts,
  className,
}: {
  className?: string;
  linkedProducts: Array<{ id: number; sku: string }>;
}) => {
  const linkedProductsResponse = await getLinkedProducts({
    productSkus: linkedProducts.map((product) => product.sku),
  });

  return (
    <div className={cn("", className)}>
      <h3 className="text-2xl mb-6">Сопутствующие Товары:</h3>
      <ProductGrid products={linkedProductsResponse.data} />
    </div>
  );
};

export default LinkedProducts;
