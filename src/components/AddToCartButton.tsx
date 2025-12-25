"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
        isAdded 
          ? "bg-green-600 text-white" 
          : "bg-chili text-white hover:bg-red-700 shadow-lg hover:shadow-xl"
      }`}
    >
      {isAdded ? "Added to Cart! ✓" : "Add to Cart"}
    </button>
  );
}
