'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function HomePage() {
  const [featuredChefs, setFeaturedChefs] = useState([]);

  useEffect(() => {
    api.get('/chefs?sortBy=rating')
      .then((res) => setFeaturedChefs(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[100vh] flex items-end pb-20 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1800&h=1200&fit=crop&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-32 right-16 hidden lg:block">
          <div className="w-px h-32 bg-gradient-to-b from-gold-400/0 via-gold-400/40 to-gold-400/0 animate-line-grow origin-top" />
        </div>
        <div className="absolute bottom-40 right-32 hidden lg:block">
          <div className="w-20 h-20 border border-gold-400/15 rotate-45 animate-float" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-3xl">
            {/* Overline */}
            <div className="reveal-item delay-1 flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-gold-400" />
              <span className="text-overline">Est. 2024 — India&apos;s Finest</span>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-6">
              <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl reveal-item delay-2">
                The Art of
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl reveal-item delay-3">
                Private <span className="text-gold-400 italic">Dining</span>
              </h1>
            </div>

            {/* Sub copy */}
            <p className="text-editorial max-w-lg reveal-item delay-4 mb-10">
              Discover exceptional chefs who bring world-class cuisine to your table. 
              Every meal, crafted with precision and soul.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 reveal-item delay-5">
              <Link href="/chefs" className="btn-gold">
                Explore Chefs
              </Link>
              <Link href="/register" className="btn-outline">
                Become a Chef
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 pt-8 border-t border-cream-400/10 grid grid-cols-3 gap-8 max-w-lg reveal-item delay-6">
            {[
              { val: '500+', label: 'Verified Chefs' },
              { val: '10K+', label: 'Meals Served' },
              { val: '4.8', label: 'Avg Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-light text-gold-400">{stat.val}</p>
                <p className="text-[11px] font-body tracking-[0.12em] uppercase text-cream-400/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left - heading */}
          <div className="lg:col-span-4 reveal-item">
            <span className="text-overline">The Process</span>
            <h2 className="heading-section mt-4">
              Three Steps to an<br />
              <span className="italic text-gold-400">Extraordinary</span> Meal
            </h2>
            <div className="accent-line mt-6" />
          </div>

          {/* Right - steps */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Discover', desc: 'Browse our curated roster of chefs. Filter by cuisine, city, and ratings to find your ideal match.', icon: '◎' },
              { num: '02', title: 'Preview', desc: 'Explore each chef\'s signature dishes, culinary philosophy, and reviews from previous diners.', icon: '◈' },
              { num: '03', title: 'Reserve', desc: 'Send a booking request with your date and preferences. Your chef confirms and plans your menu.', icon: '◆' },
            ].map((step, i) => (
              <div key={step.num} className={`reveal-item delay-${i + 2} group`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gold-400/30 font-display text-5xl font-light group-hover:text-gold-400/60 transition-colors duration-700">{step.icon}</span>
                </div>
                <span className="text-gold-400 font-body text-xs tracking-[0.2em] font-bold">{step.num}</span>
                <h3 className="font-display text-2xl text-cream-50 mt-2 mb-3">{step.title}</h3>
                <p className="text-sm text-cream-400/50 leading-relaxed">{step.desc}</p>
                <div className="w-full h-px bg-cream-400/8 mt-6 group-hover:bg-gold-400/20 transition-colors duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Chefs ── */}
      {featuredChefs.length > 0 && (
        <section className="py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-overline">Our Chefs</span>
              <h2 className="heading-section mt-4">
                Culinary <span className="italic text-gold-400">Masters</span>
              </h2>
            </div>
            <Link href="/chefs" className="btn-outline self-start">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {featuredChefs.map((chef, i) => (
              <Link
                key={chef.id}
                href={`/chefs/${chef.id}`}
                className={`group relative overflow-hidden reveal-item delay-${i + 1}`}
              >
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop'}
                    alt={chef.user?.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold-400 text-sm">★ {chef.rating}</span>
                    <span className="text-cream-400/30 text-xs">·</span>
                    <span className="text-cream-400/50 text-xs">{chef.location}</span>
                  </div>
                  <h3 className="font-display text-xl text-cream-50 group-hover:text-gold-400 transition-colors duration-500">
                    {chef.user?.name}
                  </h3>
                  <p className="text-xs text-cream-400/40 tracking-wider uppercase mt-1 font-body">
                    {chef.cuisine} · {chef.experience}yr exp
                  </p>
                </div>

                {/* Hover corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold-400/0 group-hover:border-gold-400/40 transition-all duration-700" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="py-28 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative border border-cream-400/8 p-12 md:p-20 overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-400/5 to-transparent" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border border-gold-400/10 -translate-x-1/2 translate-y-1/2 rotate-45" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-overline">For Chefs</span>
                <h2 className="heading-section mt-4">
                  Share Your <span className="italic text-gold-400">Craft</span><br />
                  With the World
                </h2>
                <p className="text-cream-400/50 mt-6 max-w-md leading-relaxed">
                  Join our exclusive platform, showcase your culinary artistry, and connect with food enthusiasts seeking extraordinary dining experiences.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <Link href="/register" className="btn-gold text-base">
                  Register as Chef
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
