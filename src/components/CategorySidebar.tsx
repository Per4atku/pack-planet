import React from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Category } from '@/payload-types';
import { Separator } from './ui/separator';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  expandedCategories: Set<number>;
  toggleCategory: (id: number) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  expandedCategories,
  toggleCategory,
  sidebarOpen,
  setSidebarOpen
}) => {
  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const hasChildren = category.categories && category.categories.length > 0;
    const isSelected = selectedCategoryId === category.id;

    return (
      <div key={category.id} className='select-none'>
        <div
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? 'bg-eco-light-green text-eco-green'
              : 'hover:bg-gray-100'
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
            {category
              .categories!.map((child) =>
                typeof child === 'number' ? null : child
              )
              .filter((child): child is Category => child !== null)
              .map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50  z-30 lg:hidden'
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
            <h2 className='text-2xl font-semibold text-gray-900'>Категории</h2>
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
                selectedCategoryId === null
                  ? 'bg-eco-light-green text-black'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategoryId(null)}
            >
              <span className='text-sm font-medium'>Все Товары</span>
            </div>
            <Separator className='w-full mb-2 mt-3' />
            {categories.map((category) => renderCategory(category))}
          </div>
        </div>
      </div>
    </>
  );
};
