import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Twitter, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-heading font-bold text-white tracking-tighter flex items-center gap-2">
               <span className="text-primary">King</span>Spice
            </Link>
            <p className="text-gray-400 text-base leading-relaxed font-medium">
              Your neighborhood destination for authentic spices, fresh produce, and premium groceries.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group border border-white/10">
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-primary">Shop</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/deals" className="hover:text-white transition-colors">Special Offers</Link></li>
              <li><Link href="/shop?category=grocery" className="hover:text-white transition-colors">Grocery</Link></li>
              <li><Link href="/shop?category=spices" className="hover:text-white transition-colors">Spices & Herbs</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-primary">Support</h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-primary">Visit Us</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span className="leading-snug">144, Pendle way, Pendle Hill NSW 2145</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+61296885222" className="hover:text-white transition-colors">+61 2 9688 5222</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>8:00 AM - 9:30 PM Daily</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
          <p> 2024 KingSpice. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/returns" className="hover:text-white transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
