"use client";

import { motion } from "framer-motion";
import { Truck, Sparkles, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AnnouncementBar() {
  const { amountToFreeShipping, isFreeShipping } = useCart();

  return (
    <div className="bg-earth-brown text-warm-beige py-2 px-4 overflow-hidden relative z-[60]">
      <div className="container mx-auto flex justify-center items-center text-xs md:text-sm font-medium">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-6 whitespace-nowrap"
        >
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-saffron" />
            <span>
              {isFreeShipping 
                ? "🎉 You've unlocked FREE shipping!" 
                : `Free shipping on orders over $79! Just $${amountToFreeShipping.toFixed(2)} away.`}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron" />
            <span>Premium Quality Spices</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Clock className="w-4 h-4 text-saffron" />
            <span>Fast Dispatch Australia-wide</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
