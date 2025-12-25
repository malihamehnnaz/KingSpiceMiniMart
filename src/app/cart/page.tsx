"use client";

import { useCart } from "@/context/CartContext";
import { categoryImages } from "@/data/categoryImages";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CartImage = ({ product }: { product: any }) => {
  const getInitialImage = () => {
    const originalUrl = product.images[0];
    if (originalUrl && originalUrl.includes('kingsspiceminimart.com.au')) {
      const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
      return categoryImages[categorySlug] || categoryImages['default'];
    }
    return originalUrl;
  };

  const [src, setSrc] = useState(getInitialImage());
  
  return (
    <Image
      src={src}
      alt={product.name}
      fill
      className="object-cover"
      onError={() => {
         const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
         setSrc(categoryImages[categorySlug] || categoryImages['default']);
      }}
    />
  );
};

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, amountToFreeShipping, isFreeShipping, freeShippingThreshold } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "WELCOME10") {
      setCouponError("Coupon applied! (Mock logic)");
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-4xl font-black text-earth-brown mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">Looks like you haven't added any spices to your cart yet. Start exploring our collection to find your favorites!</p>
        <Link 
          href="/shop" 
          className="bg-masala-red text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-earth-brown mb-12">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {/* Free Shipping Banner */}
          <div className="p-6 bg-warm-beige rounded-2xl border border-saffron/20 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="w-6 h-6 text-masala-red" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-earth-brown">
                {isFreeShipping 
                  ? "🎉 You've unlocked FREE shipping!" 
                  : `You're only $${amountToFreeShipping.toFixed(2)} away from FREE shipping!`}
              </p>
              {!isFreeShipping && (
                <div className="mt-2 h-2 bg-white rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                    className="h-full bg-masala-red"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b bg-gray-50/50 hidden md:grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.variantId}`} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="col-span-6 flex gap-4 items-center">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                      <CartImage product={item.product} />
                    </div>
                    <div>
                      <Link href={`/products/${item.product.slug}`} className="font-bold text-earth-brown hover:text-masala-red transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.variantId ? item.product.variants.find(v => v.id === item.variantId)?.name : `${item.product.weightValue}${item.product.weightUnit}`}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.variantId)}
                        className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center font-bold text-gray-600">
                    <span className="md:hidden text-xs text-gray-400 block mb-1">Price</span>
                    ${item.product.price.toFixed(2)}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border-2 border-gray-100 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                        className="p-1 hover:bg-gray-50 rounded-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                        className="p-1 hover:bg-gray-50 rounded-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right font-black text-masala-red text-lg">
                    <span className="md:hidden text-xs text-gray-400 block mb-1">Total</span>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/shop" className="inline-flex items-center gap-2 text-earth-brown font-bold hover:text-masala-red transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-200/50 sticky top-32">
            <h2 className="text-2xl font-black text-earth-brown mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-earth-brown">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-green-600">{isFreeShipping ? "FREE" : "$12.00"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated GST</span>
                <span className="font-bold text-earth-brown">${(subtotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                <span className="text-lg font-bold text-earth-brown">Total</span>
                <div className="text-right">
                  <p className="text-3xl font-black text-masala-red">${(subtotal + (isFreeShipping ? 0 : 12)).toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">AUD (GST Included)</p>
                </div>
              </div>
            </div>

            {/* Coupon */}
            <form onSubmit={handleApplyCoupon} className="mb-8">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Coupon Code</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter code"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-masala-red text-sm"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="bg-earth-brown text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors">
                  Apply
                </button>
              </div>
              {couponError && <p className="text-xs mt-2 font-medium text-masala-red">{couponError}</p>}
            </form>

            <Link 
              href="/checkout" 
              className="w-full bg-masala-red text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-xl shadow-red-900/20"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Secure SSL encrypted checkout
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Truck className="w-4 h-4 text-blue-600" />
                Australia-wide express delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
