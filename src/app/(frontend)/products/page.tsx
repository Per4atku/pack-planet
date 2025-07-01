const Products = ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { q = '' } = searchParams ?? {};
  return <div>{q}</div>;
};

export default Products;
