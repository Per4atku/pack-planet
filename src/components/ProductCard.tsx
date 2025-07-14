import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/payload-types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className='hover:shadow-lg transition-shadow '>
      <CardHeader className='pb-3'>
        <div className=''>
          <CardTitle className='text-lg font-semibold text-gray-900 leading-tight'>
            {product.name}
          </CardTitle>
          {product.sku && (
            <Badge variant='default' className='text-xs mt-2 '>
              {product.sku}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Separator />

        <div className='space-y-2 self-end'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-500'>Цена</span>
            <span className='font-semibold text-lg text-gray-900'>
              ₽{product.price.toFixed(2)}
              {product.unit && `/${product.unit}`}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-500'>В Наличии</span>
            <Badge
              className='bg-black'
              variant={
                (product.quantity || 0) > 100 ? 'default' : 'destructive'
              }
            >
              {product.quantity || 0} {product.unit || 'units'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
