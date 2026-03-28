import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'ChefKart — Neon Kitchen',
  description: 'A futuristic marketplace connecting food lovers with exceptional personal chefs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grid-bg">
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#0a0a16',
                color: '#e0e0e8',
                border: '1px solid rgba(0,255,245,0.3)',
                borderRadius: '0',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '14px',
                letterSpacing: '0.03em',
                boxShadow: '0 0 20px rgba(0,255,245,0.1)',
              },
              success: {
                iconTheme: { primary: '#39ff14', secondary: '#020208' },
              },
              error: {
                iconTheme: { primary: '#ff2d95', secondary: '#020208' },
              },
            }}
          />
          <Navbar />
          <main className="pt-20 min-h-screen">{children}</main>

          {/* Footer */}
          <footer className="border-t border-neon-cyan/10 mt-32 relative">
            {/* Neon marquee band */}
            <div className="py-4 border-b border-neon-cyan/5 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex gap-8 text-dark-400 font-display text-sm tracking-widest uppercase">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="flex gap-8">
                    <span>Personal Chef Experiences</span>
                    <span className="text-neon-cyan">///</span>
                    <span>Curated Culinary Journeys</span>
                    <span className="text-neon-pink">///</span>
                    <span>Farm to Table</span>
                    <span className="text-neon-purple">///</span>
                    <span>Bespoke Dining</span>
                    <span className="text-neon-green">///</span>
                    <span>Artisan Cuisine</span>
                    <span className="text-neon-cyan">///</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Brand */}
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 border border-neon-cyan/50 flex items-center justify-center rotate-45">
                      <span className="text-neon-cyan font-display text-xs font-bold -rotate-45">CK</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold tracking-wider">
                      <span className="text-white">CHEF</span>
                      <span className="text-glow-cyan">KART</span>
                    </h3>
                  </div>
                  <p className="text-sm text-dark-300 leading-relaxed max-w-sm font-body">
                    Connecting food lovers with exceptional personal chefs.
                    Every meal, a masterpiece. Every evening, unforgettable.
                  </p>
                  <div className="neon-line-cyan mt-6 w-16" />
                </div>

                {/* Links */}
                <div className="md:col-span-3">
                  <h4 className="text-overline mb-5">Explore</h4>
                  <ul className="space-y-3">
                    {[
                      { label: 'Browse Chefs', href: '/chefs' },
                      { label: 'Become a Chef', href: '/register' },
                      { label: 'Sign In', href: '/login' },
                    ].map((item) => (
                      <li key={item.label}>
                        <a href={item.href}
                           className="text-sm text-dark-300 hover:text-neon-cyan transition-colors duration-300 font-body">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="md:col-span-4">
                  <h4 className="text-overline mb-5">Get in Touch</h4>
                  <ul className="space-y-3 text-sm text-dark-300 font-body">
                    <li>hello@chefkart.in</li>
                    <li>+91 98765 43210</li>
                    <li>Mumbai, Maharashtra, India</li>
                  </ul>
                </div>
              </div>

              <div className="neon-line mt-12 mb-6" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-dark-400 tracking-wider font-display">
                  &copy; 2026 CHEFKART. ALL RIGHTS RESERVED.
                </p>
                <p className="text-xs text-dark-400 font-display tracking-wider">
                  CRAFTED WITH <span className="text-neon-pink">&#9829;</span> & NEON
                </p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
