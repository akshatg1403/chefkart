import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ChefKart — Personal Chef Experiences',
  description: 'A curated marketplace connecting discerning food lovers with exceptional personal chefs for unforgettable dining experiences at home.',
  keywords: ['chef', 'personal chef', 'private dining', 'booking', 'culinary', 'gourmet'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1A1714',
                color: '#F5F0E8',
                border: '1px solid rgba(212,168,67,0.2)',
                borderRadius: '0',
                fontFamily: 'Syne, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.03em',
              },
              success: {
                iconTheme: { primary: '#D4A843', secondary: '#0A0908' },
              },
              error: {
                iconTheme: { primary: '#C4442A', secondary: '#0A0908' },
              },
            }}
          />
          <Navbar />
          <main className="pt-20 min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="border-t border-cream-400/8 mt-32">
            {/* Marquee band */}
            <div className="py-4 border-b border-cream-400/5 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex gap-8 text-cream-400/15 font-display text-lg italic">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="flex gap-8">
                    <span>Personal Chef Experiences</span>
                    <span>✦</span>
                    <span>Curated Culinary Journeys</span>
                    <span>✦</span>
                    <span>Farm to Table</span>
                    <span>✦</span>
                    <span>Bespoke Dining</span>
                    <span>✦</span>
                    <span>Artisan Cuisine</span>
                    <span>✦</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Brand */}
                <div className="md:col-span-5">
                  <h3 className="font-display text-3xl font-light text-cream-50 mb-4">
                    Chef<span className="text-gold-400">Kart</span>
                  </h3>
                  <p className="text-sm text-cream-400/50 leading-relaxed max-w-sm">
                    Connecting discerning food lovers with exceptional personal chefs. 
                    Every meal, a masterpiece. Every evening, unforgettable.
                  </p>
                  <div className="accent-line mt-6" />
                </div>

                {/* Links */}
                <div className="md:col-span-3">
                  <h4 className="text-overline mb-5">Explore</h4>
                  <ul className="space-y-3">
                    {['Browse Chefs', 'Become a Chef', 'How It Works'].map((item) => (
                      <li key={item}>
                        <a href={item === 'Browse Chefs' ? '/chefs' : '/register'} 
                           className="text-sm text-cream-400/50 hover:text-gold-400 transition-colors duration-300">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="md:col-span-4">
                  <h4 className="text-overline mb-5">Get in Touch</h4>
                  <ul className="space-y-3 text-sm text-cream-400/50">
                    <li>hello@chefkart.in</li>
                    <li>+91 98765 43210</li>
                    <li>Mumbai, Maharashtra, India</li>
                  </ul>
                </div>
              </div>

              <div className="section-divider mt-12 mb-6" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-cream-400/30 tracking-wider">
                  © 2026 ChefKart. All rights reserved.
                </p>
                <p className="text-xs text-cream-400/20 font-display italic">
                  Crafted with passion
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
