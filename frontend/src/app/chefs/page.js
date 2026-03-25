'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';

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
    } catch (err) {
      console.error('Failed to fetch chefs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchChefs();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
      {/* Header */}
      <div className="mb-16 reveal-item">
        <span className="text-overline">Our Collection</span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-4">
          <h1 className="heading-section">
            Browse <span className="italic text-gold-400">Chefs</span>
          </h1>
          <p className="text-cream-400/40 text-sm max-w-sm lg:text-right">
            Discover culinary artists who bring exceptional dining experiences to your doorstep.
          </p>
        </div>
        <div className="gold-line mt-8" />
      </div>

      {/* Filters */}
      <div className="border border-cream-400/8 p-6 mb-10 reveal-item delay-1">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-400/30 text-sm">◎</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chefs, cuisine, location..."
              className="field pl-10"
            />
          </form>

          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="field-select md:w-48"
          >
            {CUISINES.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="field-select md:w-48"
          >
            <option value="rating">Top Rated</option>
            <option value="experience">Most Experienced</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Cuisine pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setCuisine(c)}
              className={`px-4 py-1.5 text-[11px] font-body font-semibold tracking-[0.12em] uppercase border transition-all duration-500 ${
                cuisine === c
                  ? 'bg-gold-400 text-charcoal-950 border-gold-400'
                  : 'bg-transparent text-cream-400/40 border-cream-400/10 hover:border-cream-400/25 hover:text-cream-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-cream-400/5">
              <div className="aspect-[3/4] bg-charcoal-800 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-cream-400/5 w-2/3" />
                <div className="h-3 bg-cream-400/5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : chefs.length === 0 ? (
        <div className="text-center py-24 border border-cream-400/8">
          <span className="font-display text-5xl text-cream-400/20 block mb-4">◇</span>
          <h3 className="font-display text-2xl text-cream-50 mb-2">No chefs found</h3>
          <p className="text-sm text-cream-400/40">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {chefs.map((chef, i) => (
            <Link
              key={chef.id}
              href={`/chefs/${chef.id}`}
              className={`group relative overflow-hidden border border-cream-400/5 hover:border-gold-400/15 transition-all duration-700 reveal-item delay-${Math.min(i + 1, 6)}`}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop'}
                  alt={chef.user?.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

                {/* Cuisine tag */}
                <div className="absolute top-4 left-4">
                  <span className="tag-gold">{chef.cuisine}</span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 font-body text-xs text-gold-400 tracking-wider">
                  ★ {chef.rating}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl text-cream-50 group-hover:text-gold-400 transition-colors duration-500 mb-1">
                  {chef.user?.name}
                </h3>
                <p className="text-[11px] font-body tracking-[0.1em] uppercase text-cream-400/40 mb-3">
                  {chef.location} · {chef.experience} years · {chef.dishes?.length || 0} dishes
                </p>
                <p className="text-xs text-cream-400/30 line-clamp-2 leading-relaxed">{chef.description}</p>
              </div>

              {/* Hover corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-l-[40px] border-t-gold-400/0 border-l-transparent group-hover:border-t-gold-400/20 transition-all duration-700" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
