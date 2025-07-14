import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const { category } = params;

  return (
    <div>
      <h1>Products in category: {category}</h1>
      {/* Render products for this category */}
    </div>
  );
}
