import PuffLoader from 'react-spinners/PuffLoader';

// app/products/loading.tsx
export default function LoadingProducts() {
  return (
    <main className='flex h-screen items-center justify-center'>
      <PuffLoader color='var(--eco-green)' />
    </main>
  );
}
