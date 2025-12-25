import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-warm-beige pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth-brown mb-4">Contact Us</h1>
            <p className="text-lg text-earth-brown/70">We'd love to hear from you. Visit us in-store or send us a message.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-brown/10">
                <h2 className="text-2xl font-bold text-earth-brown mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h3 className="font-bold text-earth-brown">Our Location</h3>
                      <p className="text-earth-brown/70">144, Pendle way, Pendle Hill NSW 2145, Sydney, Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h3 className="font-bold text-earth-brown">Phone</h3>
                      <p className="text-earth-brown/70">+61 2 9688 5222</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h3 className="font-bold text-earth-brown">Email</h3>
                      <p className="text-earth-brown/70">hello@kingspice.com.au</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-saffron" />
                    </div>
                    <div>
                      <h3 className="font-bold text-earth-brown">Opening Hours</h3>
                      <p className="text-earth-brown/70">Daily: 8:00 AM - 9:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-earth-brown/5 h-64 rounded-2xl border border-earth-brown/10 flex items-center justify-center overflow-hidden relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.696067866666!2d150.9536!3d-33.8185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a36666666667%3A0x6666666666666666!2s144%20Pendle%20Way%2C%20Pendle%20Hill%20NSW%202145!5e0!3m2!1sen!2sau!4v1622500000000!5m2!1sen!2sau" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-brown/10">
              <h2 className="text-2xl font-bold text-earth-brown mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-brown">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-earth-brown/10 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-earth-brown">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-earth-brown/10 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-brown">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-earth-brown/10 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Wholesale</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-earth-brown">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-earth-brown/10 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-earth-brown text-warm-beige py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-earth-brown/90 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
