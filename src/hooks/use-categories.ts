import { useQuery } from '@tanstack/react-query';

export interface Category {
  /* …ваш тип */
}

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories?limit=100&depth=0');
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);
  const { docs } = await res.json();
  return docs as Category[];
};

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ['categories', 100, 0], // стабильный ключ
    queryFn: fetchCategories,
    staleTime: 3600 * 1000, // 1 ч = свежие данные
    refetchOnWindowFocus: true // авто-обновление при фокусе
  });
