'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}`);
      router.push(user.role === 'CHEF' ? '/dashboard' : '/chefs');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        {/* Two-column asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 border border-cream-400/8 animate-reveal">
          
          {/* Left - Branding */}
          <div className="hidden lg:flex flex-col justify-between p-8 bg-charcoal-800/40 border-r border-cream-400/8">
            <div>
              <span className="text-overline">Welcome back</span>
              <h2 className="font-display text-3xl font-light text-cream-50 mt-4 leading-tight">
                Sign in to<br />your <span className="italic text-gold-400">account</span>
              </h2>
            </div>
            <div>
              <div className="accent-line mb-4" />
              <p className="text-xs text-cream-400/30 leading-relaxed">
                Access your bookings, manage your profile, and discover new chefs.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-8 lg:p-10">
            <div className="lg:hidden mb-8">
              <span className="text-overline">Welcome back</span>
              <h2 className="font-display text-3xl font-light text-cream-50 mt-3">
                Sign <span className="italic text-gold-400">In</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="field-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-gold w-full">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="section-divider my-6" />

            <p className="text-center text-sm text-cream-400/40">
              New here?{' '}
              <Link href="/register" className="text-gold-400 hover:text-gold-300 transition-colors">
                Create an account
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-6 p-4 border border-cream-400/8 bg-charcoal-900/50">
              <p className="text-overline mb-3" style={{ fontSize: '10px' }}>Demo Accounts</p>
              <div className="space-y-1.5 text-xs text-cream-400/40">
                <p>User — rahul@example.com</p>
                <p>Chef — arjun@example.com</p>
                <p className="text-cream-400/25">Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
