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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'glass border-b border-neon-cyan/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 border border-neon-cyan/50 flex items-center justify-center rotate-45 group-hover:border-neon-cyan group-hover:shadow-[0_0_15px_rgba(0,255,245,0.3)] transition-all duration-500">
              <span className="text-neon-cyan font-display text-xs font-bold -rotate-45">CK</span>
            </div>
            <span className="font-display text-xl font-bold tracking-wider">
              <span className="text-white">CHEF</span>
              <span className="text-glow-cyan">KART</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-dark-200 hover:text-neon-cyan transition-all duration-300 text-sm font-display tracking-[0.1em] uppercase hover:text-shadow-[0_0_10px_rgba(0,255,245,0.5)]">
              Home
            </Link>
            <Link href="/chefs" className="text-dark-200 hover:text-neon-cyan transition-all duration-300 text-sm font-display tracking-[0.1em] uppercase">
              Chefs
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-3 pr-4 py-2 border border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,245,0.1)] transition-all duration-300"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center text-dark-950 text-xs font-display font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-dark-100 font-body tracking-wide">{user.name?.split(' ')[0]}</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass animate-scale-in">
                    <div className="px-4 py-3 border-b border-neon-cyan/10">
                      <p className="text-sm font-body text-white">{user.name}</p>
                      <p className="text-xs text-dark-200 mt-0.5">{user.email}</p>
                      <span className="tag-neon mt-2">{user.role}</span>
                    </div>
                    {user.role === 'CHEF' && (
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-dark-100 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all duration-300 tracking-wide font-body"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === 'USER' && (
                      <Link
                        href="/bookings"
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-3 text-sm text-dark-100 hover:text-neon-cyan hover:bg-neon-cyan/5 transition-all duration-300 tracking-wide font-body"
                      >
                        My Bookings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-neon-pink hover:bg-neon-pink/5 transition-all duration-300 tracking-wide font-body border-t border-neon-cyan/10"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-dark-200 hover:text-neon-cyan transition-all duration-300 text-sm font-display tracking-[0.1em] uppercase">
                  Sign In
                </Link>
                <Link href="/register" className="btn-sm-neon">
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-neon-cyan hover:text-neon-pink transition-colors"
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
        <div className="md:hidden glass border-b border-neon-cyan/10 animate-fade-in">
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
                className="block py-3 text-dark-100 hover:text-neon-cyan transition-colors font-display text-xl font-bold tracking-wider border-b border-neon-cyan/5"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-6">
              {user ? (
                <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-neon-pink text-sm tracking-wider uppercase font-display">
                  Sign Out
                </button>
              ) : (
                <div className="flex gap-4">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-neon flex-1 text-center">Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-neon-filled flex-1 text-center">Join</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
