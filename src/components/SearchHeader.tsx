import React from 'react';
import { Search, Filter, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  setSidebarOpen
}) => {
  return (
    <div className='bg-white border-b border-gray-200 p-4'>
      <div className='flex items-center gap-4'>
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
              placeholder='Search products, SKU, or description...'
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
    </div>
  );
};
