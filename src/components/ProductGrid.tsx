import React from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/payload-types';

interface ProductGridProps {
  products: Product[];
  selectedCategoryName: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategoryName
}) => {
  return (
    <div className='flex-1 overflow-y-auto p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {selectedCategoryName}
        </h1>
        <p className='text-gray-600 mt-1'>{products.length} products found</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <Search size={48} className='mx-auto' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No products found
          </h3>
          <p className='text-gray-500'>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};
