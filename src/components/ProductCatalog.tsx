'use client';

import React, { useState, useMemo } from 'react';

import { SearchHeader } from '@/components/SearchHeader';

import type { Category, Product } from '@/payload-types';
import { CategorySidebar } from './CategorySidebar';
import { ProductGrid } from './ProductGrid';
import { ProductFilters } from './ProductFilters';

// Mock data - replace with your actual data
const mockCategories: Category[] = [
  {
    id: 1,
    name: 'STRAWS',
    isRoot: true,
    hasProducts: false,
    categories: [
      {
        id: 2,
        name: 'Straight Straws',
        isRoot: false,
        hasProducts: true,
        category: 1,
        updatedAt: '2024-01-01T00:00:00Z',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Flexible Straws',
        isRoot: false,
        hasProducts: true,
        category: 1,
        updatedAt: '2024-01-01T00:00:00Z',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ],
    updatedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'CUPS',
    isRoot: true,
    hasProducts: false,
    categories: [
      {
        id: 5,
        name: 'Plastic Cups',
        isRoot: false,
        hasProducts: true,
        category: 4,
        updatedAt: '2024-01-01T00:00:00Z',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 6,
        name: 'Paper Cups',
        isRoot: false,
        hasProducts: true,
        category: 4,
        updatedAt: '2024-01-01T00:00:00Z',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ],
    updatedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Red Plastic Straw',
    description: 'Durable plastic straw in vibrant red color',
    price: 0.05,
    unit: 'pcs',
    sku: 'STR-001',
    quantity: 1500,
    category: 2,
    updatedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Blue Flexible Straw',
    description: 'Bendable straw perfect for drinks',
    price: 0.07,
    unit: 'pcs',
    sku: 'STR-002',
    quantity: 800,
    category: 3,
    updatedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 3,
    name: '12oz Plastic Cup',
    description: 'Clear plastic cup with excellent clarity',
    price: 0.15,
    unit: 'pcs',
    sku: 'CUP-001',
    quantity: 2000,
    category: 5,
    updatedAt: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

const ProductCatalog = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1]);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Helper function to get category ID
  const getCategoryId = (category: number | Category): number => {
    return typeof category === 'number' ? category : category.id;
  };

  // Helper function to flatten categories for easier searching
  const flattenCategories = (categories: Category[]): Category[] => {
    const result: Category[] = [];

    const flatten = (cats: Category[]) => {
      for (const cat of cats) {
        result.push(cat);
        if (cat.categories) {
          const subCats = cat.categories
            .map((c) => (typeof c === 'number' ? null : c))
            .filter((c): c is Category => c !== null);
          flatten(subCats);
        }
      }
    };

    flatten(categories);
    return result;
  };

  const allCategories = useMemo(() => flattenCategories(mockCategories), []);

  const units = useMemo(() => {
    const uniqueUnits = [
      ...new Set(mockProducts.map((p) => p.unit).filter(Boolean))
    ];
    return uniqueUnits as string[];
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...mockProducts.map((p) => p.price));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const productCategoryId = getCategoryId(product.category);
      const matchesCategory =
        selectedCategoryId === null || productCategoryId === selectedCategoryId;

      const searchFields = [
        product.name,
        product.description || '',
        product.sku || ''
      ]
        .join(' ')
        .toLowerCase();
      const matchesSearch =
        !searchTerm || searchFields.includes(searchTerm.toLowerCase());

      const matchesPrice =
        product.price >= priceRange[0]! && product.price <= priceRange[1]!;
      const matchesQuantity = (product.quantity || 0) >= minQuantity;
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
          return (b.quantity || 0) - (a.quantity || 0);
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

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getSelectedCategoryName = () => {
    if (selectedCategoryId === null) return 'All Products';
    const category = allCategories.find((c) => c.id === selectedCategoryId);
    return category?.name || 'Category';
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      <CategorySidebar
        categories={mockCategories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        expandedCategories={expandedCategories}
        toggleCategory={toggleCategory}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Filters Panel */}
        {showFilters && (
          <ProductFilters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minQuantity={minQuantity}
            setMinQuantity={setMinQuantity}
            selectedUnit={selectedUnit}
            setSelectedUnit={setSelectedUnit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            units={units}
            maxPrice={maxPrice}
          />
        )}

        <ProductGrid
          products={filteredProducts}
          selectedCategoryName={getSelectedCategoryName()}
        />
      </div>
    </div>
  );
};

export default ProductCatalog;
