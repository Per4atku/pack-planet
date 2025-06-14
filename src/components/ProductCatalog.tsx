'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface Category {
  id: string;
  name: string;
  isRoot: boolean;
  children: Category[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  sku: string;
  quantity: number;
  categoryId: string;
}

// Mock data - replace with your actual data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'STRAWS',
    isRoot: true,
    children: [
      {
        id: '2',
        name: 'Straight Straws',
        isRoot: false,
        children: []
      },
      {
        id: '3',
        name: 'Flexible Straws',
        isRoot: false,
        children: []
      }
    ]
  },
  {
    id: '4',
    name: 'CUPS',
    isRoot: true,
    children: [
      {
        id: '5',
        name: 'Plastic Cups',
        isRoot: false,
        children: []
      },
      {
        id: '6',
        name: 'Paper Cups',
        isRoot: false,
        children: []
      }
    ]
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Red Plastic Straw',
    description: 'Durable plastic straw in vibrant red color',
    price: 0.05,
    unit: 'pcs',
    sku: 'STR-001',
    quantity: 1500,
    categoryId: '2'
  },
  {
    id: '2',
    name: 'Blue Flexible Straw',
    description: 'Bendable straw perfect for drinks',
    price: 0.07,
    unit: 'pcs',
    sku: 'STR-002',
    quantity: 800,
    categoryId: '3'
  },
  {
    id: '3',
    name: '12oz Plastic Cup',
    description: 'Clear plastic cup with excellent clarity',
    price: 0.15,
    unit: 'pcs',
    sku: 'CUP-001',
    quantity: 2000,
    categoryId: '5'
  }
];

const ProductCatalog = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1]);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const units = useMemo(() => {
    const uniqueUnits = [...new Set(mockProducts.map((p) => p.unit))];
    return uniqueUnits;
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...mockProducts.map((p) => p.price));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const matchesCategory =
        !selectedCategoryId || product.categoryId === selectedCategoryId;
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        priceRange[0] !== undefined &&
        priceRange[1] !== undefined &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1];
      const matchesQuantity = product.quantity >= minQuantity;
      const matchesUnit =
        selectedUnit === 'all' || product.unit === selectedUnit;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesQuantity &&
        matchesUnit
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'quantity':
          return b.quantity - a.quantity;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [
    selectedCategoryId,
    searchTerm,
    priceRange,
    minQuantity,
    selectedUnit,
    sortBy
  ]);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = category.children.length > 0;
    const isSelected = selectedCategoryId === category.id;

    return (
      <div key={category.id} className='select-none'>
        <div
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            setSelectedCategoryId(category.id);
            if (hasChildren) {
              toggleCategory(category.id);
            }
          }}
        >
          {hasChildren && (
            <button
              className='p-1 hover:bg-gray-200 rounded'
              onClick={(e) => {
                e.stopPropagation();
                toggleCategory(category.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}
          {!hasChildren && <div className='w-6' />}
          <span
            className={`text-sm font-medium ${
              category.isRoot
                ? 'text-gray-900 font-bold uppercase tracking-wide'
                : 'text-gray-700'
            }`}
          >
            {category.name}
          </span>
        </div>
        {isExpanded && hasChildren && (
          <div className='mt-1'>
            {category.children.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-80 bg-white border-r border-gray-200 z-40 h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900'>Categories</h2>
            <Button
              variant='ghost'
              size='sm'
              className='lg:hidden'
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>
        </div>
        <div className='p-4 overflow-y-auto h-full'>
          <div className='space-y-1'>
            <div
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                selectedCategoryId === ''
                  ? 'bg-blue-100 text-blue-900'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategoryId('')}
            >
              <span className='text-sm font-medium'>All Products</span>
            </div>
            {mockCategories.map((category) => renderCategory(category))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <div className='bg-white border-b border-gray-200 p-4'>
          <div className='flex items-center gap-4 '>
            <Button
              variant='ghost'
              size='sm'
              className='lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>

            <div className='flex-1 flex items-center justify-between gap-4'>
              <div className='relative flex-1 '>
                <Search
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
                <Input
                  placeholder='Искать по всей планете...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>

              <Button
                variant='outline'
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center gap-2'
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Price Range: $
                    {priceRange[0] !== undefined
                      ? priceRange[0].toFixed(2)
                      : '0.00'}{' '}
                    - $
                    {priceRange[1] !== undefined
                      ? priceRange[1].toFixed(2)
                      : '0.00'}
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
          )}
        </div>

        {/* Products Grid */}
        <div className='flex-1 overflow-y-auto p-6'>
          <div className='mb-4'>
            <h1 className='text-2xl font-bold text-gray-900'>
              {selectedCategoryId
                ? mockCategories.find((c) => c.id === selectedCategoryId)
                    ?.name || 'Category'
                : 'All Products'}
            </h1>
            <p className='text-gray-600 mt-1'>
              {filteredProducts.length} products found
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className='hover:shadow-lg transition-shadow'
              >
                <CardHeader className='pb-3'>
                  <div className='flex justify-between items-start'>
                    <CardTitle className='text-lg font-semibold text-gray-900 leading-tight'>
                      {product.name}
                    </CardTitle>
                    <Badge variant='secondary' className='text-xs'>
                      {product.sku}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <p className='text-sm text-gray-600 line-clamp-2'>
                    {product.description}
                  </p>

                  <Separator />

                  <div className='space-y-2'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-500'>Price</span>
                      <span className='font-semibold text-lg text-gray-900'>
                        ${product.price.toFixed(2)}/{product.unit}
                      </span>
                    </div>

                    <div className='flex justify-between items-center'>
                      <span className='text-sm text-gray-500'>In Stock</span>
                      <Badge
                        variant={
                          product.quantity > 100 ? 'default' : 'destructive'
                        }
                      >
                        {product.quantity} {product.unit}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
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
      </div>
    </div>
  );
};

export default ProductCatalog;
