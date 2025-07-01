import { useRouter } from 'next/navigation';

interface PageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = params;

  return (
    <div>
      <h1>Products in category: {category}</h1>
      {/* Render products for this category */}
    </div>
  );
}
