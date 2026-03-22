'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? 'bg-charcoal-950/90 backdrop-blur-md border-b border-cream-400/8' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="font-display text-2xl font-light text-cream-50 tracking-tight">
              Chef<span className="text-gold-400 group-hover:text-gold-300 transition-colors duration-500">Kart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-cream-400/60 hover:text-cream-50 transition-colors duration-300 text-[13px] font-body tracking-[0.08em] uppercase">
              Home
            </Link>
            <Link href="/chefs" className="text-cream-400/60 hover:text-cream-50 transition-colors duration-300 text-[13px] font-body tracking-[0.08em] uppercase">
              Chefs
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-3 pr-4 py-2 border border-cream-400/10 hover:border-gold-400/30 transition-all duration-500"
                >
                  <div className="w-7 h-7 bg-gold-400 flex items-center justify-center text-charcoal-950 text-xs font-body font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[13px] text-cream-300 tracking-wide">{user.name?.split(' ')[0]}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-charcoal-800 border border-cream-400/10 animate-reveal">
                    <div className="px-4 py-3 border-b border-cream-400/8">
                      <p className="text-sm font-body text-cream-100">{user.name}</p>
                      <p className="text-xs text-cream-400/40 mt-0.5">{user.email}</p>
                      <span className="tag-gold mt-2">{user.role}</span>
                    </div>
                    {user.role === 'CHEF' && (
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-[13px] text-cream-300 hover:text-gold-400 hover:bg-charcoal-900/50 transition-all duration-300 tracking-wide"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === 'USER' && (
                      <Link
                        href="/bookings"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-[13px] text-cream-300 hover:text-gold-400 hover:bg-charcoal-900/50 transition-all duration-300 tracking-wide"
                      >
                        My Bookings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-[13px] text-paprika-400 hover:bg-paprika-500/5 transition-all duration-300 tracking-wide border-t border-cream-400/5"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-cream-400/60 hover:text-cream-50 transition-colors duration-300 text-[13px] font-body tracking-[0.08em] uppercase">
                  Sign In
                </Link>
                <Link href="/register" className="btn-sm-gold">
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-cream-300 hover:text-gold-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`w-full h-px bg-current transition-all duration-500 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`w-full h-px bg-current transition-all duration-500 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal-950/98 backdrop-blur-xl border-b border-cream-400/8 animate-reveal">
          <div className="px-6 py-8 space-y-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/chefs', label: 'Browse Chefs' },
              ...(user?.role === 'CHEF' ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
              ...(user?.role === 'USER' ? [{ href: '/bookings', label: 'My Bookings' }] : []),
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-cream-300 hover:text-gold-400 transition-colors font-display text-2xl font-light border-b border-cream-400/5"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6">
              {user ? (
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-paprika-400 text-sm tracking-wider uppercase">
                  Sign Out
                </button>
              ) : (
                <div className="flex gap-4">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-outline flex-1 text-center">Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-gold flex-1 text-center">Join</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
