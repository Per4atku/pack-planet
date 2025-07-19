import React from 'react';
import './styles.css';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

export const metadata = {
  description: 'Планета Упаковки - упаковка для бизнеса',
  title: '🌏 Планета Упаковки'
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
