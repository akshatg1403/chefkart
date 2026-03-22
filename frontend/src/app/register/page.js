'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role);
      toast.success(`Welcome to ChefKart, ${user.name}!`);
      router.push(user.role === 'CHEF' ? '/dashboard' : '/chefs');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg border border-cream-400/8 animate-reveal">

        {/* Header */}
        <div className="p-8 pb-0">
          <span className="text-overline">Get Started</span>
          <h1 className="font-display text-3xl md:text-4xl font-light text-cream-50 mt-3">
            Create Your <span className="italic text-gold-400">Account</span>
          </h1>
          <div className="accent-line mt-6" />
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="field-label">Full Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="field"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="field-label">Email Address</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="field-label">Password</label>
              <input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="field"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            {/* Role selector */}
            <div>
              <label className="field-label">I want to</label>
              <div className="grid grid-cols-2 gap-0">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'USER' })}
                  className={`p-5 border text-center transition-all duration-500 group ${
                    form.role === 'USER'
                      ? 'bg-gold-400/10 border-gold-400/30 text-gold-400'
                      : 'bg-transparent border-cream-400/10 text-cream-400/50 hover:border-cream-400/20'
                  }`}
                >
                  <span className="font-display text-2xl block mb-2 group-hover:scale-110 transition-transform duration-500">◇</span>
                  <span className="text-[11px] font-body font-semibold tracking-[0.15em] uppercase">Book Chefs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'CHEF' })}
                  className={`p-5 border text-center transition-all duration-500 group ${
                    form.role === 'CHEF'
                      ? 'bg-gold-400/10 border-gold-400/30 text-gold-400'
                      : 'bg-transparent border-cream-400/10 text-cream-400/50 hover:border-cream-400/20'
                  }`}
                >
                  <span className="font-display text-2xl block mb-2 group-hover:scale-110 transition-transform duration-500">◆</span>
                  <span className="text-[11px] font-body font-semibold tracking-[0.15em] uppercase">Be a Chef</span>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="section-divider my-6" />

          <p className="text-center text-sm text-cream-400/40">
            Already have an account?{' '}
            <Link href="/login" className="text-gold-400 hover:text-gold-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
