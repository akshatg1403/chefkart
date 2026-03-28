'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { DEMO_CHEFS } from '@/lib/demoData';
import toast from 'react-hot-toast';

export default function ChefProfilePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ date: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/chefs/${id}`)
      .then((res) => setChef(res.data))
      .catch(() => {
        const demo = DEMO_CHEFS.find(c => c.id === id);
        if (demo) setChef(demo);
        else toast.error('Chef not found');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please sign in to book a chef'); router.push('/login'); return; }
    if (user.role !== 'USER') { toast.error('Only users can book chefs'); return; }
    setSubmitting(true);
    try {
      await api.post('/bookings', { chefId: chef.id, date: bookingForm.date, message: bookingForm.message });
      toast.success('Booking request sent!');
      setBookingOpen(false);
      setBookingForm({ date: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-pulse card-neon">
          <div className="aspect-[21/9] bg-dark-800" />
          <div className="p-8 space-y-4">
            <div className="h-8 bg-neon-cyan/5 w-1/3 rounded" />
            <div className="h-4 bg-neon-cyan/5 w-2/3 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        <span className="font-display text-6xl text-neon-cyan/15 block mb-6">&#9674;</span>
        <h2 className="font-display text-3xl text-white mb-3 tracking-wider">CHEF NOT FOUND</h2>
        <p className="text-dark-300 mb-8 font-body">The chef you&apos;re looking for doesn&apos;t exist.</p>
        <button onClick={() => router.push('/chefs')} className="btn-neon">Browse Chefs</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 relative">
      <div className="absolute top-0 left-0 w-60 h-60 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero */}
      <div className="card-neon overflow-hidden animate-fade-in">
        <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <img
            src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&h=500&fit=crop'}
            alt={chef.user?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/70 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-neon-cyan shadow-[0_0_10px_rgba(0,255,245,0.5)]" />
              <span className="text-overline">{chef.cuisine}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider">
              {chef.user?.name}
            </h1>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-neon-cyan/10 divide-x divide-neon-cyan/10">
          {[
            { label: 'Rating', value: `★ ${chef.rating}`, sub: `${chef.totalRatings} reviews` },
            { label: 'Location', value: chef.location, sub: 'Based in' },
            { label: 'Experience', value: `${chef.experience} Years`, sub: 'Professional' },
            { label: 'Dishes', value: chef.dishes?.length || 0, sub: 'On menu' },
          ].map((item) => (
            <div key={item.label} className="p-5 md:p-6">
              <p className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-dark-400 mb-1">{item.label}</p>
              <p className="font-display text-xl text-neon-cyan font-bold">{item.value}</p>
              <p className="text-[11px] text-dark-400 mt-0.5 font-body">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Bio + CTA */}
        <div className="p-8 md:p-10 border-t border-neon-cyan/10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <p className="text-dark-100 text-lg leading-relaxed font-body">{chef.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="tag-neon">{chef.cuisine}</span>
                <span className="tag text-neon-green bg-neon-green/10 border border-neon-green/30">{chef.dishes?.length} Dishes</span>
                <span className="tag text-neon-purple bg-neon-purple/10 border border-neon-purple/30">{chef._count?.bookings} Bookings</span>
              </div>
            </div>
            <button onClick={() => setBookingOpen(true)} className="btn-neon-filled whitespace-nowrap">
              Book This Chef
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-backdrop animate-fade-in">
          <div className="w-full max-w-md card-neon animate-scale-in">
            <div className="p-6 border-b border-neon-cyan/10">
              <span className="text-overline">Booking Request</span>
              <h2 className="font-display text-2xl text-white mt-2 tracking-wider">
                Book <span className="text-glow-cyan">{chef.user?.name}</span>
              </h2>
            </div>
            <form onSubmit={handleBooking} className="p-6 space-y-5">
              <div>
                <label className="field-label">Preferred Date & Time</label>
                <input type="datetime-local" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="field" required />
              </div>
              <div>
                <label className="field-label">Message (optional)</label>
                <textarea value={bookingForm.message} onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })} className="field resize-none h-28" placeholder="Event details, number of guests, dietary preferences..." />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="btn-neon-filled flex-1">{submitting ? 'Sending...' : 'Send Request'}</button>
                <button type="button" onClick={() => setBookingOpen(false)} className="btn-neon flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dishes */}
      {chef.dishes?.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="neon-line-cyan w-12" />
            <span className="text-overline">Menu</span>
          </div>
          <h2 className="heading-section mb-10">
            SIGNATURE <span className="text-glow-pink">DISHES</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chef.dishes.map((dish, i) => (
              <div key={dish.id} className={`group card-neon overflow-hidden animate-fade-in delay-${Math.min(i + 1, 6)}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-500 tracking-wider">{dish.name}</h3>
                      {dish.category && (
                        <span className="text-[10px] font-display tracking-[0.15em] uppercase text-dark-400 mt-1 block">{dish.category}</span>
                      )}
                    </div>
                    <span className="font-display text-xl font-bold text-neon-green whitespace-nowrap">&#8377;{dish.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
