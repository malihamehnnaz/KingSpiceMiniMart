import Link from 'next/link';
import { ArrowRight, Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-warm-beige pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-earth-brown mb-6">Our Story</h1>
          <p className="text-xl text-earth-brown/70 leading-relaxed">
            From a small family stall to Australia's favorite destination for authentic spices and specialty groceries. 
            We bring the flavors of the world to your kitchen.
          </p>
        </div>

        {/* Image & Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000" 
                alt="Spice Market" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-saffron p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-earth-brown font-serif text-2xl font-bold italic">"Quality you can taste, tradition you can trust."</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-brown">The King's Spice Legacy</h2>
            <p className="text-earth-brown/70 leading-relaxed">
              Founded in Sydney, King's Spice Mini Mart began with a simple mission: to provide the local community with the highest quality, most authentic spices that were often hard to find in mainstream supermarkets.
            </p>
            <p className="text-earth-brown/70 leading-relaxed">
              Today, we source our products directly from farmers and trusted suppliers across India, Southeast Asia, and the Middle East. Every blend is crafted with care, ensuring that the vibrant colors and potent aromas of traditional cuisines are preserved.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-earth-brown/10">
                <h3 className="text-3xl font-bold text-saffron mb-1">15+</h3>
                <p className="text-sm text-earth-brown/60 font-bold uppercase tracking-wider">Years of Heritage</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-earth-brown/10">
                <h3 className="text-3xl font-bold text-saffron mb-1">500+</h3>
                <p className="text-sm text-earth-brown/60 font-bold uppercase tracking-wider">Unique Products</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-earth-brown text-warm-beige rounded-[3rem] p-12 md:p-20 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What We Stand For</h2>
            <p className="text-warm-beige/60">The principles that guide every spice we source and every customer we serve.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-saffron" />
              </div>
              <h3 className="text-xl font-bold">Uncompromising Quality</h3>
              <p className="text-warm-beige/60 text-sm">We only stock premium grade spices, free from fillers and artificial colors.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-saffron" />
              </div>
              <h3 className="text-xl font-bold">Ethical Sourcing</h3>
              <p className="text-warm-beige/60 text-sm">Working directly with producers to ensure fair trade and sustainable practices.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-saffron" />
              </div>
              <h3 className="text-xl font-bold">Community First</h3>
              <p className="text-warm-beige/60 text-sm">Proudly Australian owned, supporting local families and businesses.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-saffron" />
              </div>
              <h3 className="text-xl font-bold">Passion for Flavor</h3>
              <p className="text-warm-beige/60 text-sm">We believe food is the universal language of love and connection.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-earth-brown mb-8">Ready to elevate your cooking?</h2>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-saffron text-earth-brown px-10 py-4 rounded-full font-bold hover:bg-saffron/90 transition-all shadow-lg shadow-saffron/20"
          >
            Explore Our Collection
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
