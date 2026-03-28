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
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
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
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16 relative">
      <div className="absolute top-10 right-10 w-60 h-60 bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-neon-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-lg card-neon animate-fade-in">
        {/* Header */}
        <div className="p-8 pb-0">
          <span className="text-overline">Get Started</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 tracking-wider">
            CREATE YOUR <span className="text-glow-pink">ACCOUNT</span>
          </h1>
          <div className="neon-line-cyan mt-6 w-16" />
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="field-label">Full Name</label>
              <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field" placeholder="Your full name" required />
            </div>
            <div>
              <label htmlFor="email" className="field-label">Email Address</label>
              <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="password" className="field-label">Password</label>
              <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="field" placeholder="Minimum 6 characters" required />
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
                      ? 'bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan shadow-[0_0_20px_rgba(0,255,245,0.1)]'
                      : 'bg-transparent border-dark-400 text-dark-300 hover:border-neon-cyan/20'
                  }`}
                >
                  <span className="font-display text-2xl block mb-2 group-hover:scale-110 transition-transform duration-500">&#9671;</span>
                  <span className="text-[11px] font-display font-semibold tracking-[0.15em] uppercase">Book Chefs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'CHEF' })}
                  className={`p-5 border text-center transition-all duration-500 group ${
                    form.role === 'CHEF'
                      ? 'bg-neon-pink/10 border-neon-pink/40 text-neon-pink shadow-[0_0_20px_rgba(255,45,149,0.1)]'
                      : 'bg-transparent border-dark-400 text-dark-300 hover:border-neon-pink/20'
                  }`}
                >
                  <span className="font-display text-2xl block mb-2 group-hover:scale-110 transition-transform duration-500">&#9670;</span>
                  <span className="text-[11px] font-display font-semibold tracking-[0.15em] uppercase">Be a Chef</span>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-neon-filled w-full">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="neon-line my-6" />

          <p className="text-center text-sm text-dark-300 font-body">
            Already have an account?{' '}
            <Link href="/login" className="text-neon-cyan hover:text-neon-pink transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
