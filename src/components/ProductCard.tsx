"use client";

import { Product } from "@/data/products";
import { categoryImages } from "@/data/categoryImages";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // Helper to determine initial image source
  const getInitialImage = () => {
    const originalUrl = product.images[0];
    // If the URL is from the known broken domain, use category fallback immediately
    if (originalUrl && originalUrl.includes('kingsspiceminimart.com.au')) {
      const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
      return categoryImages[categorySlug] || categoryImages['default'];
    }
    return originalUrl;
  };

  const [imgSrc, setImgSrc] = useState(getInitialImage());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-gray-100 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 m-3 rounded-[2rem]">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => {
              const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
              setImgSrc(categoryImages[categorySlug] || categoryImages['default']);
            }}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tags.map((tag) => (
            <span 
              key={tag}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                tag === 'Sale' ? 'bg-accent text-white' : 
                tag === 'Best Seller' ? 'bg-secondary text-white' : 
                'bg-gray-900 text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-20 group-hover:translate-y-0 transition-all duration-500 ease-[0.22, 1, 0.36, 1]">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-lg">
            {product.category}
          </span>
          <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            <span className="text-xs font-bold text-secondary">{product.rating}</span>
          </div>
        </div>
        
        <Link href={`/products/${product.slug}`} className="flex-1">
          <h3 className="font-heading font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 text-lg leading-tight">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through font-medium">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-2xl font-heading font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
              {product.weightValue}{product.weightUnit}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
