import { getCategories } from "@/api/api";
import { CategorySelector } from "./CategorySelector";
import { ProductCard } from "./ProductCard";
import { Category, Product } from "@/api";

const ProductGrid = async ({
  products,
  productsTotal,
  selectedCategory,
}: {
  products: Product[];
  productsTotal: number;
  selectedCategory?: Category;
}) => {
  const categories = await getCategories();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mb-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? selectedCategory.Name : "Все Товары"}
          </h1>
          <p>
            <CategorySelector categories={categories.data} />
          </p>
        </div>
        <p className="text-gray-600 mt-1">{productsTotal} товаров найдено</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
