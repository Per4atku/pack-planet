'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cleanPhone, phones } from '@/data/phones';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const headerHeight = 64; // px

  return (
    <>
      <header
        className='fixed top-0 left-0 w-full z-50 bg-white shadow-sm'
        style={{ height: `var(--header-height)` }}
      >
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            {/* Logo */}
            <Link href={'/'} className='flex items-center space-x-2'>
              <div className='w-10 h-10 rounded-lg flex items-center justify-center'>
                <span className='text-3xl'>🌏</span>
              </div>
              <h1 className='text-xl font-bold'>Планета Упаковки</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-8'>
              <a
                href='/'
                className='text-foreground hover:text-eco-green transition-colors'
              >
                Главная
              </a>
              <a
                href='/products'
                className='text-foreground hover:text-eco-green transition-colors'
              >
                Продукция
              </a>
              <a
                href='#about'
                className='text-foreground hover:text-eco-green transition-colors'
              >
                О нас
              </a>
              <a
                href='#contact'
                className='text-foreground hover:text-eco-green transition-colors'
              >
                Контакты
              </a>
            </nav>

            {/* Contact Info */}
            <div className='hidden lg:flex items-center space-x-4'>
              <div className='flex items-center space-x-2 text-sm'>
                <Phone className='w-4 h-4 text-eco-green' />
                <a href={`tel:${cleanPhone(phones[0] || '')}`}>{phones[0]}</a>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className='md:hidden' onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: `var(--header-height)` }} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-[var(--header-height)] left-0 w-full z-40 bg-white transition-all shadow-2xl duration-300 ease-in-out overflow-hidden md:hidden ${
          isMenuOpen ? 'max-h-[500px] py-4 border-t border-border' : 'max-h-0'
        }`}
      >
        <nav className='flex flex-col space-y-4 container mx-auto px-4'>
          <a
            href='/'
            onClick={() => setIsMenuOpen(false)}
            className='text-foreground hover:text-eco-green transition-colors'
          >
            Главная
          </a>
          <a
            href='/products'
            onClick={() => setIsMenuOpen(false)}
            className='text-foreground hover:text-eco-green transition-colors'
          >
            Продукция
          </a>
          <a
            href='#about'
            onClick={() => setIsMenuOpen(false)}
            className='text-foreground hover:text-eco-green transition-colors'
          >
            О нас
          </a>
          <a
            href='#contact'
            onClick={() => setIsMenuOpen(false)}
            className='text-foreground hover:text-eco-green transition-colors'
          >
            Контакты
          </a>
          <div className='pt-4 border-t border-border'>
            <div className='flex items-center space-x-2 text-sm mb-4'>
              <Phone className='w-4 h-4 text-eco-green' />
              <a href={`tel:${cleanPhone(phones[0] || '')}`}>{phones[0]}</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
