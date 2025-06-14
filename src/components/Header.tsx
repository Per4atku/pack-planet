'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cleanPhone, phones } from '@/data/phones';

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

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <div className='w-10 h-10 rounded-lg flex items-center justify-center'>
              <span className='text-3xl'>🌏</span>
            </div>
            <div>
              <h1 className='text-xl font-bold'>Планета Упаковки</h1>
            </div>
          </div>

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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute bg-white w-screen left-0 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-[1000px] py-4 border-t border-border'
              : 'max-h-0'
          }`}
        >
          <nav className='flex flex-col space-y-4 container mx-auto px-4'>
            <a
              href='#home'
              className='text-foreground hover:text-eco-green transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </a>
            <a
              href='#products'
              className='text-foreground hover:text-eco-green transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Продукция
            </a>
            <a
              href='#about'
              className='text-foreground hover:text-eco-green transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              О нас
            </a>
            <a
              href='#contact'
              className='text-foreground hover:text-eco-green transition-colors'
              onClick={() => setIsMenuOpen(false)}
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
      </div>
    </header>
  );
};

export default Header;
