import CategoryAccordion from './CategoryAccordion';

export interface Category {
  id: string;
  name: string;
  level: number;
  hasProducts: boolean;
  parent?: string | null;
  children?: Category[];
  slug: string;
}

/** Converts flat category list to nested tree */
function buildTree(flat: Category[]): Category[] {
  const byId = new Map<string, Category>();
  const roots: Category[] = [];

  flat.forEach((cat) => {
    byId.set(cat.id, { ...cat, children: [] });
  });

  byId.forEach((cat) => {
    if (cat.parent) {
      const parent = byId.get(cat.parent);
      parent ? parent.children!.push(cat) : roots.push(cat);
    } else {
      roots.push(cat);
    }
  });

  roots.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  return roots;
}

/** Server component that fetches categories and renders the accordion */
export default async function CategoryTree() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?limit=500&depth=0`,
    { next: { tags: ['categories'], revalidate: 3600 } }
  );

  if (!res.ok) {
    return <p className='px-2 text-red-600'>Ошибка {res.status}</p>;
  }

  const { docs } = await res.json();
  const tree = buildTree(docs as Category[]);

  if (!tree.length) {
    return <p className='px-2'>Нет категорий</p>;
  }

  return <CategoryAccordion cats={tree} />;
}
