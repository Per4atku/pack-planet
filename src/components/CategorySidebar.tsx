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
  return (
    <>
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
        <div className='p-4 overflow-y-auto h-full'></div>
      </div>
    </>
  );
};
