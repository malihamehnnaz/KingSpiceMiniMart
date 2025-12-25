"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import AnnouncementBar from './AnnouncementBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Spices', href: '/categories/spices-blends' },
    { name: 'Spice Kits', href: '/categories/spice-kits' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <AnnouncementBar />
      <motion.nav 
        className={`sticky top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-3' 
            : 'bg-white py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center gap-8">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              K
            </div>
            <span className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
              King<span className="text-primary">Spice</span>
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="px-4 py-2 text-gray-600 hover:text-primary font-medium text-sm transition-all rounded-full hover:bg-primary/5"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search for groceries, spices..." 
              className="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <button className="p-2.5 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all lg:hidden">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/login" className="p-2.5 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all hidden sm:flex">
              <User className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 bg-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col p-4 space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className="text-gray-700 hover:text-masala-red font-medium py-2 border-b border-gray-50 last:border-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex gap-4 pt-2">
                  <Link href="/login" className="flex-1 text-center py-3 border rounded-lg font-medium">Login</Link>
                  <Link href="/signup" className="flex-1 text-center py-3 bg-masala-red text-white rounded-lg font-medium">Sign Up</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
