'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function BookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    if (user) fetchBookings();
  }, [user, authLoading]);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'PENDING': return 'tag-pending';
      case 'ACCEPTED': return 'tag-accepted';
      case 'REJECTED': return 'tag-rejected';
      default: return 'tag';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-cream-400/5 p-6 animate-pulse">
              <div className="h-5 bg-cream-400/5 w-1/3 mb-3" />
              <div className="h-4 bg-cream-400/5 w-1/2 mb-2" />
              <div className="h-4 bg-cream-400/5 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16">
      {/* Header */}
      <div className="mb-12 reveal-item">
        <span className="text-overline">Your History</span>
        <h1 className="heading-section mt-4">
          My <span className="italic text-gold-400">Bookings</span>
        </h1>
        <div className="accent-line mt-6" />
      </div>

      {bookings.length === 0 ? (
        <div className="border border-cream-400/8 p-16 text-center reveal-item delay-1">
          <span className="font-display text-5xl text-cream-400/15 block mb-6">◇</span>
          <h3 className="font-display text-2xl text-cream-50 mb-3">No bookings yet</h3>
          <p className="text-sm text-cream-400/40 mb-8">Start by exploring our talented chefs</p>
          <button onClick={() => router.push('/chefs')} className="btn-gold">Browse Chefs</button>
        </div>
      ) : (
        <div className="space-y-1">
          {bookings.map((booking, i) => (
            <div
              key={booking.id}
              className={`border border-cream-400/5 hover:border-cream-400/10 p-6 transition-all duration-500 reveal-item delay-${Math.min(i + 1, 6)}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-xl text-cream-50">
                      {user?.role === 'USER' ? booking.chef?.user?.name : booking.user?.name}
                    </h3>
                    <span className={getStatusTag(booking.status)}>{booking.status}</span>
                  </div>
                  <p className="text-sm text-cream-400/50 mb-1">
                    {new Date(booking.date).toLocaleDateString('en-IN', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                  {booking.message && (
                    <p className="text-sm text-cream-400/30 mt-3 font-display italic">
                      &ldquo;{booking.message}&rdquo;
                    </p>
                  )}
                </div>
                <p className="text-[11px] text-cream-400/20 tracking-wider font-body whitespace-nowrap">
                  {new Date(booking.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
