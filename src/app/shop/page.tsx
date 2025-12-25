"use client";

import { useState, useMemo, Suspense } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, X, ChevronDown, Filter, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCuisine = searchParams.get("cuisine");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine || "All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
        const matchesCuisine = selectedCuisine === "All" || p.cuisine?.includes(selectedCuisine);
        return matchesSearch && matchesCategory && matchesCuisine;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "popularity") return b.reviewsCount - a.reviewsCount;
        return 0; // Default newest
      });
  }, [searchQuery, selectedCategory, selectedCuisine, sortBy]);

  const cuisines = ["All", "Indian", "Middle Eastern", "Asian", "Global"];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6">
              Our Collection
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
              Premium <span className="text-primary">Spices</span> & Pantry
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Explore our curated selection of authentic ingredients sourced directly from the finest growers worldwide.
            </p>
          </motion.div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search for spices, blends, or ingredients..."
              className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border-none shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-primary transition-all text-lg font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] font-bold transition-all shadow-sm ${showFilters ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:ring-primary'}`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedCategory !== "All" || selectedCuisine !== "All") && (
                <span className="bg-primary text-white w-6 h-6 rounded-full text-[10px] flex items-center justify-center ml-1">
                  { (selectedCategory !== "All" ? 1 : 0) + (selectedCuisine !== "All" ? 1 : 0) }
                </span>
              )}
            </button>

            <div className="relative group">
              <select 
                className="appearance-none pl-8 pr-14 py-5 rounded-[2rem] bg-white ring-1 ring-gray-200 font-bold focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="p-10 bg-white rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Category</h4>
                  <div className="flex flex-wrap gap-3">
                    {["All", ...categories.map(c => c.name)].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Cuisine</h4>
                  <div className="flex flex-wrap gap-3">
                    {cuisines.map((c) => (
                      <button 
                        key={c}
                        onClick={() => setSelectedCuisine(c)}
                        className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCuisine === c ? 'bg-secondary text-white shadow-lg shadow-secondary/30' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <button 
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedCuisine("All");
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-center gap-2 text-gray-400 hover:text-masala-red font-bold transition-colors py-3"
                  >
                    <X className="w-4 h-4" />
                    Reset All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 font-medium">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {
                setSelectedCategory("All");
                setSelectedCuisine("All");
                setSearchQuery("");
              }}
              className="mt-8 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
        <p className="mt-4 text-gray-500 font-bold animate-pulse">Loading Shop...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
