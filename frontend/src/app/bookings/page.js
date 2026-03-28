'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { DEMO_BOOKINGS } from '@/lib/demoData';

export default function BookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { router.push('/login'); return; }
    if (user) fetchBookings();
  }, [user, authLoading]);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings');
      setBookings(res.data);
    } catch {
      setBookings(DEMO_BOOKINGS);
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
            <div key={i} className="card-neon p-6 animate-pulse">
              <div className="h-5 bg-neon-cyan/5 w-1/3 mb-3 rounded" />
              <div className="h-4 bg-neon-cyan/5 w-1/2 mb-2 rounded" />
              <div className="h-4 bg-neon-cyan/5 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 relative">
      <div className="absolute top-0 left-0 w-60 h-60 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <span className="text-overline">Your History</span>
        <h1 className="heading-section mt-4">
          MY <span className="text-glow-cyan">BOOKINGS</span>
        </h1>
        <div className="neon-line-cyan mt-6 w-16" />
      </div>

      {bookings.length === 0 ? (
        <div className="card-neon p-16 text-center animate-fade-in delay-1">
          <span className="font-display text-5xl text-neon-cyan/15 block mb-6">&#9674;</span>
          <h3 className="font-display text-2xl text-white mb-3 tracking-wider">NO BOOKINGS YET</h3>
          <p className="text-sm text-dark-300 mb-8 font-body">Start by exploring our talented chefs</p>
          <button onClick={() => router.push('/chefs')} className="btn-neon-filled">Browse Chefs</button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking, i) => (
            <div
              key={booking.id}
              className={`card-neon p-6 animate-fade-in delay-${Math.min(i + 1, 6)}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-xl font-bold text-white tracking-wider">
                      {user?.role === 'USER' ? booking.chef?.user?.name : booking.user?.name}
                    </h3>
                    <span className={getStatusTag(booking.status)}>{booking.status}</span>
                  </div>
                  <p className="text-sm text-dark-200 mb-1 font-body">
                    {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {booking.message && (
                    <p className="text-sm text-dark-400 mt-3 font-body italic">&ldquo;{booking.message}&rdquo;</p>
                  )}
                </div>
                <p className="text-[11px] text-dark-400 tracking-wider font-display whitespace-nowrap">
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
