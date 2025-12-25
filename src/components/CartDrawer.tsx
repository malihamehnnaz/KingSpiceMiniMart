"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeFromCart, amountToFreeShipping, isFreeShipping, freeShippingThreshold } = useCart();

  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-masala-red" />
                <h2 className="text-xl font-bold">Your Cart</h2>
                <span className="bg-warm-beige text-earth-brown px-2 py-0.5 rounded-full text-xs font-bold">
                  {items.length}
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-4 bg-warm-beige/50 border-b">
              <p className="text-sm mb-2 font-medium">
                {isFreeShipping 
                  ? "You've got free shipping! 🚚" 
                  : `Spend $${amountToFreeShipping.toFixed(2)} more for FREE shipping`}
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-masala-red"
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <p className="text-gray-500">Looks like you haven't added any spices yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-masala-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.product.id}-${item.variantId}`} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm truncate">{item.product.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {item.variantId ? item.product.variants.find(v => v.id === item.variantId)?.name : item.product.weightValue + item.product.weightUnit}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                            className="p-1 hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                            className="p-1 hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-masala-red">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t space-y-4 bg-white">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Shipping and taxes calculated at checkout. GST included.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <Link 
                    href="/checkout" 
                    onClick={onClose}
                    className="bg-masala-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                  >
                    Checkout Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="text-center py-2 text-sm font-medium text-gray-600 hover:text-masala-red transition-colors"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
