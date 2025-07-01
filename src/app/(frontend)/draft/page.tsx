import React from 'react';
import axios from 'axios';

const DraftPage = async () => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=10&page=1`);
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=10&page=1`
  );
  const products = response.data;

  console.log('Fetched products:', products);

  return (
    <main className='container mx-auto p-4'>
      {products.docs.map((product: any) => (
        <div key={product.id} className='mb-4 p-4 border rounded-lg'>
          <h2 className='text-xl font-bold'>{product.name}</h2>
          <p className='text-gray-700'>{product.description}</p>
          <p className='text-green-600'>Price: ${product.price}</p>
        </div>
      ))}
    </main>
  );
};

export default DraftPage;
