import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === category.name);

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-12">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-6 font-bold transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Shop
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-4">
                Category
              </span>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 tracking-tight">
                {category.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 text-gray-500 font-medium bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>{categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 font-medium">We're currently restocking this category.</p>
            <Link 
              href="/shop" 
              className="mt-8 inline-block px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
