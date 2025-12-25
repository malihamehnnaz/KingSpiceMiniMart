"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <h1 className="text-5xl font-black text-earth-brown mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-12">
          Thank you for your order. We're getting your spices ready for their journey to your kitchen!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-earth-brown mb-2">Check your email</h3>
            <p className="text-sm text-gray-500">We've sent a confirmation email with your order details and tracking information.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-left">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-bold text-earth-brown mb-2">Shipping soon</h3>
            <p className="text-sm text-gray-500">Most orders are processed within 24 hours. You'll receive another update when it ships.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop" 
            className="bg-masala-red text-white px-10 py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/" 
            className="bg-white text-earth-brown border-2 border-gray-100 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
