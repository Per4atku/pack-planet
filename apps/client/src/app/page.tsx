import { getProducts } from "@/api/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      {products.map((product) => (
        <div key={product.name}>{product.name}</div>
      ))}
    </div>
  );
}
