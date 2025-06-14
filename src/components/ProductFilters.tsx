import React from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ProductFiltersProps {
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  minQuantity: number;
  setMinQuantity: (quantity: number) => void;
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  units: string[];
  maxPrice: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  priceRange,
  setPriceRange,
  minQuantity,
  setMinQuantity,
  selectedUnit,
  setSelectedUnit,
  sortBy,
  setSortBy,
  units,
  maxPrice
}) => {
  return (
    <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Price Range: ${priceRange[0]!.toFixed(2)} - $
            {priceRange[1]!.toFixed(2)}
          </label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={maxPrice}
            step={0.01}
            className='w-full'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Min Quantity
          </label>
          <Input
            type='number'
            value={minQuantity}
            onChange={(e) => setMinQuantity(Number(e.target.value))}
            min='0'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Unit
          </label>
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Units</SelectItem>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Sort By
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='name'>Name</SelectItem>
              <SelectItem value='price'>Price</SelectItem>
              <SelectItem value='quantity'>Quantity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
