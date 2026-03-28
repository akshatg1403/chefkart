'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { DEMO_CHEFS } from '@/lib/demoData';

const CUISINES = ['All', 'North Indian', 'South Indian', 'Mughlai', 'Continental', 'Chinese', 'Italian'];

export default function ChefsPage() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cuisine, setCuisine] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchChefs();
  }, [cuisine, sortBy]);

  const fetchChefs = async () => {
    setLoading(true);
    try {
      const params = { sortBy };
      if (cuisine !== 'All') params.cuisine = cuisine;
      if (search) params.search = search;
      const res = await api.get('/chefs', { params });
      setChefs(res.data);
    } catch {
      let filtered = [...DEMO_CHEFS];
      if (cuisine !== 'All') filtered = filtered.filter(c => c.cuisine === cuisine);
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(c =>
          c.user.name.toLowerCase().includes(q) ||
          c.cuisine.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
        );
      }
      if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      else if (sortBy === 'experience') filtered.sort((a, b) => b.experience - a.experience);
      setChefs(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchChefs();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="mb-16 animate-fade-in relative">
        <span className="text-overline">Our Collection</span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-4">
          <h1 className="heading-section">
            BROWSE <span className="text-glow-cyan">CHEFS</span>
          </h1>
          <p className="text-dark-300 text-sm max-w-sm lg:text-right font-body">
            Discover culinary artists who bring exceptional dining experiences to your doorstep.
          </p>
        </div>
        <div className="neon-line mt-8" />
      </div>

      {/* Filters */}
      <div className="card-neon p-6 mb-10 animate-fade-in delay-1">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-cyan/40 text-sm font-display">&#9678;</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chefs, cuisine, location..."
              className="field pl-10"
            />
          </form>
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="field-select md:w-48">
            {CUISINES.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="field-select md:w-48">
            <option value="rating">Top Rated</option>
            <option value="experience">Most Experienced</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setCuisine(c)}
              className={`px-4 py-1.5 text-[11px] font-display font-semibold tracking-[0.12em] uppercase border transition-all duration-500 ${
                cuisine === c
                  ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan shadow-[0_0_15px_rgba(0,255,245,0.2)]'
                  : 'bg-transparent text-dark-300 border-dark-400 hover:border-neon-cyan/30 hover:text-neon-cyan/70'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card-neon">
              <div className="aspect-[3/4] bg-dark-800 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-neon-cyan/5 w-2/3 rounded" />
                <div className="h-3 bg-neon-cyan/5 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : chefs.length === 0 ? (
        <div className="text-center py-24 card-neon">
          <span className="font-display text-5xl text-neon-cyan/20 block mb-4">&#9674;</span>
          <h3 className="font-display text-2xl text-white mb-2 tracking-wider">NO CHEFS FOUND</h3>
          <p className="text-sm text-dark-300 font-body">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chefs.map((chef, i) => (
            <Link
              key={chef.id}
              href={`/chefs/${chef.id}`}
              className={`group relative overflow-hidden card-neon animate-fade-in delay-${Math.min(i + 1, 6)}`}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop'}
                  alt={chef.user?.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                <div className="absolute top-4 left-4"><span className="tag-neon">{chef.cuisine}</span></div>
                <div className="absolute top-4 right-4 text-neon-green font-display text-xs tracking-wider">&#9733; {chef.rating}</div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan-line" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-500 tracking-wider mb-1">
                  {chef.user?.name}
                </h3>
                <p className="text-[11px] font-display tracking-[0.1em] uppercase text-dark-300 mb-2">
                  {chef.location} &middot; {chef.experience} years &middot; {chef.dishes?.length || 0} dishes
                </p>
                <p className="text-xs text-dark-400 line-clamp-2 leading-relaxed font-body">{chef.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
