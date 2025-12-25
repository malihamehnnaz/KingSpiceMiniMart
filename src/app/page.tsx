"use client";

import { products, categories as allCategories } from "@/data/products";
import { categoryImages } from "@/data/categoryImages";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Award, Star, Mail, Send } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

const heroSlides = [
  {
    id: 1,
    image: "https://media.istockphoto.com/id/1128687123/photo/shopping-bag-full-of-fresh-vegetables-and-fruits.jpg?s=612x612&w=0&k=20&c=jXInOVcduhEnfuUVffbUacldkF5CwAeThD3MDUXCItM=",
    title: "Fresh Groceries Delivered Daily",
    subtitle: "Experience the finest selection of authentic Indian groceries and fresh produce delivered straight to your doorstep.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2670&auto=format&fit=crop",
    title: "Premium Spices & Blends",
    subtitle: "Elevate your cooking with our hand-picked, aromatic spices and traditional masala blends.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop",
    title: "Farm Fresh Produce",
    subtitle: "Quality you can taste. Our fruits and vegetables are sourced daily for maximum freshness.",
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = useMemo(() => 
    products.filter(p => p.tags.includes('Best Seller')).slice(0, 4), 
  []);

  const categoryGroups = useMemo(() => {
    const groups = ["Grocery", "Snacks", "Beverages", "Frozen Food"].map(cat => ({
      name: cat,
      products: products.filter(p => p.category === cat).slice(0, 4)
    }));
    return groups;
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-24 bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md text-primary font-bold text-sm rounded-full mb-6 border border-primary/30">
                Fresh & Authentic Groceries
              </span>
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-[1.1] tracking-tight">
                {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-primary" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 font-medium max-w-xl leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/shop"
                  className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-hover transition-all shadow-2xl shadow-primary/40 flex items-center gap-2 group text-lg"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/categories/spices-blends"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/30 text-lg"
                >
                  Explore Spices
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === i ? 'w-16 bg-primary' : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Delivery", desc: "On orders over $50", color: "bg-blue-50 text-blue-600" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout", color: "bg-green-50 text-green-600" },
            { icon: RefreshCcw, title: "Fresh Stock", desc: "Small batches, high turnover", color: "bg-orange-50 text-orange-600" },
            { icon: Award, title: "Quality Assured", desc: "Handpicked products", color: "bg-purple-50 text-purple-600" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-6 rounded-[2.5rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group border border-transparent hover:border-gray-100">
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">{feature.title}</h3>
                <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Browse by</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-gray-500 text-lg font-medium">Explore our wide range of authentic products, carefully curated for your kitchen needs.</p>
          </div>
          <Link href="/shop" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all bg-primary/5 px-6 py-3 rounded-full group">
            View All Categories <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {allCategories.slice(0, 6).map((cat) => (
            <Link 
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center p-8 rounded-[3rem] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-transparent hover:border-primary/10"
            >
              <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden shadow-xl group-hover:scale-110 transition-transform duration-700">
                <Image 
                  src={categoryImages[cat.slug] || categoryImages['default']}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-center group-hover:text-primary transition-colors text-lg">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Our Favorites</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900">Best Sellers</h2>
            </div>
            <Link href="/shop" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group">
              Shop All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Wise Product Display */}
      {categoryGroups.map((group) => (
        <section key={group.name} className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-primary rounded-full" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">{group.name}</h2>
            </div>
            <Link href={`/shop?category=${group.name.toLowerCase()}`} className="group text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all text-base">
              Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {group.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}

      {/* Testimonials Section */}
      <section className="bg-gray-900 py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">What Our Community Says</h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">Join thousands of happy customers who trust KingSpice for their daily essentials.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-secondary mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <p className="text-white font-bold text-3xl mb-1">4.9 / 5.0</p>
              <p className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">Google Reviews</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Local Guide",
                text: "Absolutely love this place! They have an amazing variety of authentic Indian spices and groceries that I can't find anywhere else. The staff is always friendly and helpful.",
                initial: "S"
              },
              {
                name: "Rahul K.",
                role: "Verified Customer",
                text: "Best Indian grocery store in Pendle Hill. Fresh vegetables, great prices, and the store is always clean and well-organized. Highly recommend for your weekly shopping!",
                initial: "R"
              },
              {
                name: "Priya S.",
                role: "Regular Shopper",
                text: "Great service and quality products. I come here specifically for their rice and lentil selection. Always stocked up and good value for money.",
                initial: "P"
              }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group relative"
              >
                <div className="absolute top-8 right-10 text-6xl text-primary/10 group-hover:text-primary/20 transition-colors font-serif">"</div>
                <p className="text-gray-300 mb-10 leading-relaxed italic text-lg relative z-10">
                  {review.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-primary/20">
                    {review.initial}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{review.name}</h4>
                    <p className="text-primary/80 text-xs font-bold uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 lg:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-gray-900 p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-3xl shadow-black/20"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 45, 0],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" 
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, -45, 0],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px]" 
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
          </div>
          
          <div className="relative z-10 flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Exclusive Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-[1.1] tracking-tight">
                New to <span className="text-primary">King's Spice?</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-medium">
                Get <span className="text-white font-bold text-2xl mx-1">10% OFF</span> your first order when you sign up for our newsletter.
              </p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-1 relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors w-4 h-4" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-xl placeholder:text-gray-500 text-base font-medium"
                />
              </div>
              <button className="group bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-hover transition-all flex items-center justify-center gap-2 text-base shadow-xl shadow-primary/20 active:scale-95">
                Join Now
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.form>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-gray-500 text-xs font-medium"
            >
              No spam, just spice. Unsubscribe at any time.
            </motion.p>
          </div>

          <div className="relative z-10 hidden lg:block w-1/4">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square"
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] blur-2xl" />
              <div className="relative h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2670&auto=format&fit=crop"
                  alt="Spices"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
