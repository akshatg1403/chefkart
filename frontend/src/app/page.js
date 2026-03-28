'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { DEMO_CHEFS } from '@/lib/demoData';
import ScrollReveal from '@/components/ScrollReveal';

const CUISINES_SHOWCASE = [
  { name: 'North Indian', icon: '🍛', dishes: 'Butter Chicken, Biryani, Naan' },
  { name: 'South Indian', icon: '🥘', dishes: 'Dosa, Idli, Fish Curry' },
  { name: 'Mughlai', icon: '🍖', dishes: 'Kebabs, Korma, Biryani' },
  { name: 'Continental', icon: '🍝', dishes: 'Pasta, Risotto, Steak' },
  { name: 'Chinese', icon: '🥡', dishes: 'Dim Sum, Noodles, Manchurian' },
  { name: 'Italian', icon: '🍕', dishes: 'Pizza, Tiramisu, Bruschetta' },
];

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Food Enthusiast', text: 'Chef Arjun made our anniversary unforgettable. The butter chicken was the best I\'ve ever had!', rating: 5 },
  { name: 'Priya Patel', role: 'Event Planner', text: 'We use ChefKart for all our corporate events. The quality and professionalism is unmatched.', rating: 5 },
  { name: 'Amit Kumar', role: 'Home Chef Fan', text: 'Having a personal chef come to your home and cook a 5-course meal is pure luxury. Love it!', rating: 5 },
  { name: 'Sneha Reddy', role: 'Foodie Blogger', text: 'The variety of chefs on this platform is amazing. From Mughlai to Italian, everything is top-notch.', rating: 5 },
];

export default function HomePage() {
  const [featuredChefs, setFeaturedChefs] = useState(DEMO_CHEFS);

  useEffect(() => {
    api.get('/chefs?sortBy=rating')
      .then((res) => {
        if (res.data && res.data.length > 0) setFeaturedChefs(res.data.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />

        {/* Glowing animated orbs */}
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-neon-cyan/5 blur-[150px] animate-float" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full bg-neon-purple/5 blur-[130px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-neon-pink/5 blur-[100px] animate-float" style={{ animationDelay: '4s' }} />

        {/* Decorative shapes */}
        <div className="absolute top-32 right-16 hidden lg:block">
          <div className="w-px h-48 bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent" />
        </div>
        <div className="absolute top-44 right-8 hidden lg:block">
          <div className="w-24 h-24 border border-neon-cyan/20 rotate-45 animate-spin-slow" />
        </div>
        <div className="absolute bottom-40 right-40 hidden lg:block">
          <div className="w-36 h-36 border border-neon-purple/15 rotate-12 animate-float" />
        </div>
        <div className="absolute top-60 left-10 hidden lg:block">
          <div className="w-3 h-3 bg-neon-pink rounded-full animate-glow-pulse" />
        </div>
        <div className="absolute bottom-60 left-32 hidden lg:block">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-neon-cyan" style={{ boxShadow: '0 0 15px rgba(0,255,245,0.5)' }} />
              <span className="text-overline animate-neon-flicker">Est. 2024 &mdash; India&apos;s Finest</span>
            </div>

            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-[90px] mb-3">
              THE FUTURE OF
            </h1>
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-[90px] mb-6">
              PRIVATE <span className="text-glow-cyan animate-neon-flicker">DINING</span>
            </h1>

            <p className="text-lg md:text-xl text-dark-100 font-body max-w-xl mb-12 leading-relaxed">
              Discover exceptional chefs who bring world-class cuisine to your table.
              Every meal, crafted with precision and soul. Book your private chef experience today.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/chefs" className="btn-neon-filled text-base">
                Explore Chefs
              </Link>
              <Link href="/register" className="btn-neon-pink text-base">
                Become a Chef
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {['Personal Chef', 'Home Dining', 'Private Events', 'Corporate Catering'].map((t) => (
                <span key={t} className="text-xs font-display tracking-[0.15em] uppercase text-dark-300 border border-dark-400 px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {[
              { val: '500+', label: 'Verified Chefs', glow: 'text-glow-cyan' },
              { val: '10K+', label: 'Meals Served', glow: 'text-glow-pink' },
              { val: '4.8', label: 'Avg Rating', glow: 'text-glow-green' },
              { val: '50+', label: 'Cities', glow: 'text-glow-purple' },
            ].map((s) => (
              <div key={s.label} className="stat-box">
                <p className={`font-display text-3xl md:text-4xl font-bold ${s.glow}`}>{s.val}</p>
                <p className="text-[11px] font-display tracking-[0.12em] uppercase text-dark-300 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-display tracking-[0.3em] uppercase text-dark-400">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-neon-cyan/50 to-transparent animate-pulse" />
        </div>
      </section>

      <div className="neon-line" />

      {/* ═══════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/3 rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-overline">The Process</span>
            <h2 className="heading-section text-4xl md:text-5xl mt-4">
              HOW <span className="text-glow-cyan">CHEFKART</span> WORKS
            </h2>
            <p className="text-dark-300 mt-4 max-w-md mx-auto font-body">
              Three simple steps to an extraordinary dining experience at home.
            </p>
            <div className="neon-line mx-auto max-w-xs mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'DISCOVER', desc: 'Browse our curated roster of 500+ verified chefs. Filter by cuisine type, city, ratings, and experience. Every chef is hand-vetted for excellence.', icon: '⬡' },
            { num: '02', title: 'PREVIEW', desc: 'Explore each chef\'s signature dishes, pricing, culinary philosophy, and reviews from previous diners. See their full menu before you decide.', icon: '⬢' },
            { num: '03', title: 'RESERVE', desc: 'Send a booking request with your preferred date and special requirements. Your chef confirms within 24 hours and plans your personalized menu.', icon: '⬣' },
          ].map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 150}>
              <div className="group card-neon p-8 h-full relative overflow-hidden">
                <span className="absolute top-4 right-4 font-display text-[80px] font-bold opacity-[0.03] leading-none text-white">{step.num}</span>
                <span className="text-neon-cyan text-3xl block mb-4">{step.icon}</span>
                <span className="text-neon-cyan font-display text-xs tracking-[0.25em] font-bold">{step.num}</span>
                <h3 className="font-display text-2xl font-bold text-white mt-2 mb-4 tracking-wider">{step.title}</h3>
                <p className="text-sm text-dark-200 leading-relaxed font-body">{step.desc}</p>
                <div className="w-full h-px bg-neon-cyan/10 mt-6 group-hover:bg-neon-cyan/30 transition-colors duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CUISINE CATEGORIES
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-pink/3 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-overline">Cuisines</span>
              <h2 className="heading-section text-4xl md:text-5xl mt-4">
                EXPLORE BY <span className="text-glow-pink">CUISINE</span>
              </h2>
              <p className="text-dark-300 mt-4 max-w-md mx-auto font-body">
                From authentic Indian flavors to international gourmet, find your perfect match.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CUISINES_SHOWCASE.map((c, i) => (
              <ScrollReveal key={c.name} delay={i * 100}>
                <Link href="/chefs" className="group card-neon p-6 text-center h-full block">
                  <span className="text-4xl block mb-3 group-hover:scale-125 transition-transform duration-500">{c.icon}</span>
                  <h3 className="font-display text-sm font-bold text-white tracking-wider mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {c.name.toUpperCase()}
                  </h3>
                  <p className="text-[10px] text-dark-400 font-body leading-relaxed">{c.dishes}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED CHEFS
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-overline">Top Rated</span>
              <h2 className="heading-section text-4xl md:text-5xl mt-4">
                CULINARY <span className="text-glow-pink">MASTERS</span>
              </h2>
              <p className="text-dark-300 mt-3 max-w-md font-body">
                Meet our highest-rated chefs, handpicked for exceptional skill and service.
              </p>
            </div>
            <Link href="/chefs" className="btn-neon self-start">View All &rarr;</Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredChefs.slice(0, 6).map((chef, i) => (
            <ScrollReveal key={chef.id} delay={i * 100}>
              <Link href={`/chefs/${chef.id}`} className="group relative overflow-hidden card-neon block">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop'}
                    alt={chef.user?.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent animate-scan-line" />
                  </div>
                  <div className="absolute top-4 left-4"><span className="tag-neon">{chef.cuisine}</span></div>
                  <div className="absolute top-4 right-4 text-neon-green font-display text-xs tracking-wider font-bold">&#9733; {chef.rating}</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-500 tracking-wider mb-1">
                    {chef.user?.name}
                  </h3>
                  <p className="text-xs text-dark-300 tracking-wider uppercase font-display mb-2">
                    {chef.cuisine} &middot; {chef.location} &middot; {chef.experience}yr
                  </p>
                  <p className="text-xs text-dark-400 line-clamp-2 font-body">{chef.description}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          POPULAR DISHES
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-neon-green/3 rounded-full blur-[130px] pointer-events-none translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-overline">Menu Highlights</span>
              <h2 className="heading-section text-4xl md:text-5xl mt-4">
                SIGNATURE <span className="text-glow-green">DISHES</span>
              </h2>
              <p className="text-dark-300 mt-4 max-w-md mx-auto font-body">
                A taste of what our chefs create. From traditional favorites to modern fusion.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredChefs.flatMap(c => c.dishes || []).slice(0, 8).map((dish, i) => (
              <ScrollReveal key={dish.id} delay={i * 80}>
                <div className="group card-neon overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={dish.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop'}
                      alt={dish.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-neon-cyan transition-colors duration-300 tracking-wider">{dish.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] text-dark-400 font-display tracking-wider uppercase">{dish.category}</span>
                      <span className="text-neon-green font-display text-sm font-bold">&#8377;{dish.price}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-overline">Reviews</span>
            <h2 className="heading-section text-4xl md:text-5xl mt-4">
              WHAT PEOPLE <span className="text-glow-purple">SAY</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 120} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="card-neon p-8 h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="text-neon-yellow text-sm">&#9733;</span>
                  ))}
                </div>
                <p className="text-dark-100 font-body text-lg leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-neon-cyan/30 flex items-center justify-center bg-neon-cyan/5">
                    <span className="font-display text-sm font-bold text-neon-cyan">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-white tracking-wider">{t.name}</p>
                    <p className="text-xs text-dark-400 font-body">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE US
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/30 to-dark-950" />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[300px] bg-neon-cyan/3 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-overline">Why ChefKart</span>
              <h2 className="heading-section text-4xl md:text-5xl mt-4">
                THE <span className="text-glow-cyan">CHEFKART</span> ADVANTAGE
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '◈', title: 'VERIFIED CHEFS', desc: 'Every chef undergoes rigorous background checks and skill verification before joining our platform.' },
              { icon: '◉', title: 'SECURE BOOKING', desc: 'Encrypted payments and guaranteed service. Your money is safe until service is delivered.' },
              { icon: '◎', title: '24/7 SUPPORT', desc: 'Round-the-clock customer support to handle any issues before, during, or after your event.' },
              { icon: '◆', title: 'CUSTOM MENUS', desc: 'Work directly with your chef to create a personalized menu tailored to your preferences.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100} direction="scale">
                <div className="card-neon p-8 text-center h-full group">
                  <span className="text-neon-cyan text-4xl block mb-4 group-hover:animate-glow-pulse transition-all">{item.icon}</span>
                  <h3 className="font-display text-lg font-bold text-white tracking-wider mb-3">{item.title}</h3>
                  <p className="text-sm text-dark-300 font-body leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CITIES
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-overline">Available In</span>
            <h2 className="heading-section text-4xl md:text-5xl mt-4">
              SERVING ACROSS <span className="text-glow-pink">INDIA</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { city: 'Mumbai', count: 48 }, { city: 'Delhi', count: 42 }, { city: 'Bangalore', count: 35 },
            { city: 'Pune', count: 28 }, { city: 'Kolkata', count: 22 }, { city: 'Goa', count: 18 },
            { city: 'Hyderabad', count: 31 }, { city: 'Chennai', count: 25 }, { city: 'Jaipur', count: 15 },
            { city: 'Ahmedabad', count: 20 }, { city: 'Lucknow', count: 12 }, { city: 'Chandigarh', count: 10 },
          ].map((c, i) => (
            <ScrollReveal key={c.city} delay={i * 60}>
              <div className="stat-box group cursor-pointer">
                <p className="font-display text-sm font-bold text-dark-100 tracking-wider group-hover:text-neon-cyan transition-colors duration-300">
                  {c.city.toUpperCase()}
                </p>
                <p className="text-[10px] text-dark-400 font-display mt-1">{c.count}+ Chefs</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA — FOR CHEFS
          ═══════════════════════════════════════ */}
      <section className="py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="relative card-neon p-12 md:p-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent" />
              <div className="absolute bottom-0 left-0 w-48 h-48 border border-neon-cyan/10 -translate-x-1/2 translate-y-1/2 rotate-45 animate-spin-slow" />
              <div className="absolute top-10 right-10 w-3 h-3 bg-neon-pink rounded-full animate-glow-pulse opacity-40" />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-overline">For Chefs</span>
                  <h2 className="heading-section text-4xl md:text-5xl mt-4">
                    SHARE YOUR <span className="text-glow-purple">CRAFT</span><br />
                    WITH THE WORLD
                  </h2>
                  <p className="text-dark-200 mt-6 max-w-md leading-relaxed font-body text-lg">
                    Join 500+ professional chefs on India&apos;s fastest-growing personal chef platform. Set your own schedule, prices, and menu.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    {['Set Own Prices', 'Flexible Schedule', 'Zero Commission', 'Marketing Support'].map((b) => (
                      <span key={b} className="tag-neon">{b}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-end gap-6">
                  <Link href="/register" className="btn-neon-filled text-lg px-12 py-5">
                    Register as Chef
                  </Link>
                  <p className="text-xs text-dark-400 font-body">Free to join &middot; No hidden fees</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-section text-4xl md:text-5xl">
                READY FOR AN <span className="text-glow-cyan">UNFORGETTABLE</span> MEAL?
              </h2>
              <p className="text-dark-300 mt-4 max-w-lg mx-auto font-body text-lg">
                Browse our chefs, pick your cuisine, and book your next private dining experience in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <Link href="/chefs" className="btn-neon-filled text-base">Browse Chefs Now</Link>
                <Link href="/login" className="btn-neon text-base">Sign In</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
