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
    <div className="min-h-[85vh] flex items-center justify-center px-6 relative">
      {/* Background effects */}
      <div className="absolute top-20 left-20 w-60 h-60 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-neon-purple/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-0 card-neon animate-fade-in">

          {/* Left - Branding */}
          <div className="hidden lg:flex flex-col justify-between p-8 border-r border-neon-cyan/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-cyan/5 to-transparent" />
            <div className="relative">
              <span className="text-overline">Welcome back</span>
              <h2 className="font-display text-2xl font-bold text-white mt-4 leading-tight tracking-wider">
                SIGN IN TO<br />YOUR <span className="text-glow-cyan">ACCOUNT</span>
              </h2>
            </div>
            <div className="relative">
              <div className="neon-line-cyan w-12 mb-4" />
              <p className="text-xs text-dark-400 leading-relaxed font-body">
                Access your bookings, manage your profile, and discover new chefs.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-8 lg:p-10">
            <div className="lg:hidden mb-8">
              <span className="text-overline">Welcome back</span>
              <h2 className="font-display text-2xl font-bold text-white mt-3 tracking-wider">
                SIGN <span className="text-glow-cyan">IN</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="field-label">Email Address</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="field" placeholder="you@example.com" required />
              </div>
              <div>
                <label htmlFor="password" className="field-label">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" placeholder="Enter your password" required />
              </div>
              <button type="submit" disabled={loading} className="btn-neon-filled w-full">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="neon-line my-6" />

            <p className="text-center text-sm text-dark-300 font-body">
              New here?{' '}
              <Link href="/register" className="text-neon-cyan hover:text-neon-pink transition-colors">
                Create an account
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-6 p-4 border border-neon-cyan/15 bg-neon-cyan/5">
              <p className="text-overline mb-3" style={{ fontSize: '10px' }}>Demo Accounts</p>
              <div className="space-y-1.5 text-xs text-dark-200 font-body">
                <p>User &mdash; rahul@example.com</p>
                <p>Chef &mdash; arjun@example.com</p>
                <p className="text-dark-400">Password: password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
