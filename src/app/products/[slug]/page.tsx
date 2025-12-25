"use client";

import { products } from "@/data/products";
import { categoryImages } from "@/data/categoryImages";
import { useCart } from "@/context/CartContext";
import { useState, use, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  Info,
  ChevronRight,
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const { addToCart, items } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeImgSrc, setActiveImgSrc] = useState<string>("");
  const [activeTab, setActiveTab] = useState("description");

  // Find if this item (and specific variant) is already in cart
  const cartItem = items.find(
    (item) => item.product.id === product?.id && item.variantId === selectedVariant?.id
  );
  const quantityInCart = cartItem?.quantity || 0;

  useEffect(() => {
    if (product) {
      const originalUrl = product.images[activeImage];
      if (originalUrl && originalUrl.includes('kingsspiceminimart.com.au')) {
        const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
        setActiveImgSrc(categoryImages[categorySlug] || categoryImages['default']);
      } else {
        setActiveImgSrc(originalUrl);
      }
    }
  }, [activeImage, product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-6">Product not found</h1>
        <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant?.id);
  };

  const currentPrice = selectedVariant?.price ?? product.price;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-xl shadow-gray-200/50 border border-white"
            >
              <Image
                src={activeImgSrc || product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={() => {
                  const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
                  setActiveImgSrc(categoryImages[categorySlug] || categoryImages['default']);
                }}
              />
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:bg-white transition-all group">
                  <Heart className="w-6 h-6 text-gray-400 group-hover:text-masala-red transition-colors" />
                </button>
                <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:bg-white transition-all group">
                  <Share2 className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                </button>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-6">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary ring-4 ring-primary/10' : 'border-transparent hover:border-gray-200'}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6">
                {product.category}
              </span>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-secondary text-secondary' : 'text-gray-200'}`} />
                  ))}
                  <span className="ml-2 font-bold text-secondary">{product.rating}</span>
                </div>
                <span className="text-gray-400 font-medium">{product.reviewsCount} Verified Reviews</span>
              </div>

              <div className="flex items-baseline gap-4 mb-10">
                <div className="text-4xl font-bold text-gray-900">
                  ${currentPrice.toFixed(2)}
                </div>
                {product.originalPrice && (
                  <div className="text-2xl text-gray-400 line-through font-medium">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>

              <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-12">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Select Size</h4>
                  <div className="flex flex-wrap gap-4">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-8 py-4 rounded-2xl font-bold transition-all border-2 ${selectedVariant?.id === v.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 mb-12">
                {quantityInCart > 0 && (
                  <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-2 rounded-xl w-fit">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{quantityInCart} already in your cart</span>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center font-bold text-xl">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
                  >
                    <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    {quantityInCart > 0 ? 'Add More to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-6 pt-12 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-gray-700">100% Organic</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-gray-700">Fast Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-24">
          <div className="flex gap-12 border-b border-gray-100 mb-12">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-6 text-lg font-bold capitalize transition-all relative ${activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
          
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl text-gray-500 leading-relaxed font-medium"
                >
                  {product.description}
                  <p className="mt-6">Our {product.name} is sourced from the highest quality growers, ensuring that every pinch adds a burst of authentic flavor to your dishes. Whether you're a professional chef or a home cook, this is a must-have in your pantry.</p>
                </motion.div>
              )}
              {/* Add other tabs as needed */}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">You May Also Like</h2>
              <p className="text-gray-500 font-medium">Complete your pantry with these related items.</p>
            </div>
            <Link href="/shop" className="text-primary font-bold hover:underline flex items-center gap-2">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
        <p className="mt-4 text-gray-500 font-bold animate-pulse">Loading Product...</p>
      </div>
    }>
      <ProductContent params={params} />
    </Suspense>
  );
}
