import React from 'react';
import './styles.css';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template'
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang='en'>
      <Providers>
        <body className='1'>
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
