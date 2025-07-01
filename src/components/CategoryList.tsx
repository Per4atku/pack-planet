import axios from 'axios';
import React from 'react';
import { ScrollArea } from './ui/scroll-area';

const getCategoryList = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?limit=500`,
      {
        // Можно настроить кэш: cache: 'no-store' или revalidate
        next: { revalidate: 3600 }
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const CategoryList: React.FC = async () => {
  const categories = await getCategoryList();

  return (
    <div className='grid grid-cols-2 gap-4'>
      {categories?.docs.map((category: { id: string; name: string }) => (
        <div
          key={category.id}
          className='p-4 border rounded-lg hover:bg-gray-100 cursor-pointer'
        >
          <h3 className='text-lg font-semibold'>{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
