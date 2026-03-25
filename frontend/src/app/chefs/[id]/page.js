'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
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
      .catch(() => toast.error('Chef not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to book a chef');
      router.push('/login');
      return;
    }
    if (user.role !== 'USER') {
      toast.error('Only users can book chefs');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/bookings', {
        chefId: chef.id,
        date: bookingForm.date,
        message: bookingForm.message,
      });
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
        <div className="animate-pulse">
          <div className="aspect-[21/9] bg-charcoal-800" />
          <div className="p-8 space-y-4">
            <div className="h-8 bg-cream-400/5 w-1/3" />
            <div className="h-4 bg-cream-400/5 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        <span className="font-display text-6xl text-cream-400/15 block mb-6">◇</span>
        <h2 className="font-display text-3xl text-cream-50 mb-3">Chef Not Found</h2>
        <p className="text-cream-400/40 mb-8">The chef you&apos;re looking for doesn&apos;t exist.</p>
        <button onClick={() => router.push('/chefs')} className="btn-gold">Browse Chefs</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
      {/* Hero */}
      <div className="border border-cream-400/8 overflow-hidden animate-reveal">
        {/* Cover image */}
        <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
          <img
            src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&h=500&fit=crop'}
            alt={chef.user?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/60 to-transparent" />

          {/* Name overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-gold-400" />
              <span className="text-overline">{chef.cuisine}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream-50 tracking-tight">
              {chef.user?.name}
            </h1>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-cream-400/8 divide-x divide-cream-400/8">
          {[
            { label: 'Rating', value: `★ ${chef.rating}`, sub: `${chef.totalRatings} reviews` },
            { label: 'Location', value: chef.location, sub: 'Based in' },
            { label: 'Experience', value: `${chef.experience} Years`, sub: 'Professional' },
            { label: 'Dishes', value: chef.dishes?.length || 0, sub: 'On menu' },
          ].map((item) => (
            <div key={item.label} className="p-5 md:p-6">
              <p className="text-[10px] font-body font-bold tracking-[0.2em] uppercase text-cream-400/30 mb-1">{item.label}</p>
              <p className="font-display text-xl text-cream-50">{item.value}</p>
              <p className="text-[11px] text-cream-400/30 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Bio + CTA */}
        <div className="p-8 md:p-10 border-t border-cream-400/8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              <p className="text-editorial leading-relaxed">{chef.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="tag-gold">{chef.cuisine}</span>
                <span className="tag bg-sage-400/10 text-sage-400 border-sage-400/20">{chef.dishes?.length} Dishes</span>
                <span className="tag bg-cream-400/5 text-cream-400/50 border-cream-400/10">{chef._count?.bookings} Bookings</span>
              </div>
            </div>
            <button onClick={() => setBookingOpen(true)} className="btn-gold whitespace-nowrap">
              Book This Chef
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-backdrop animate-reveal">
          <div className="w-full max-w-md border border-cream-400/10 bg-charcoal-800 animate-reveal-scale">
            <div className="p-6 border-b border-cream-400/8">
              <span className="text-overline">Booking Request</span>
              <h2 className="font-display text-2xl text-cream-50 mt-2">
                Book <span className="italic text-gold-400">{chef.user?.name}</span>
              </h2>
            </div>
            <form onSubmit={handleBooking} className="p-6 space-y-5">
              <div>
                <label className="field-label">Preferred Date & Time</label>
                <input
                  type="datetime-local"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="field"
                  required
                />
              </div>
              <div>
                <label className="field-label">Message (optional)</label>
                <textarea
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="field resize-none h-28"
                  placeholder="Event details, number of guests, dietary preferences..."
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={submitting} className="btn-gold flex-1">
                  {submitting ? 'Sending...' : 'Send Request'}
                </button>
                <button type="button" onClick={() => setBookingOpen(false)} className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dishes */}
      {chef.dishes?.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="accent-line" />
            <span className="text-overline">Menu</span>
          </div>
          <h2 className="heading-section mb-10">
            Signature <span className="italic text-gold-400">Dishes</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {chef.dishes.map((dish, i) => (
              <div key={dish.id} className={`group border border-cream-400/5 hover:border-gold-400/15 overflow-hidden transition-all duration-700 reveal-item delay-${Math.min(i + 1, 6)}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg text-cream-50 group-hover:text-gold-400 transition-colors duration-500">{dish.name}</h3>
                      {dish.category && (
                        <span className="text-[10px] font-body tracking-[0.15em] uppercase text-cream-400/30 mt-1 block">{dish.category}</span>
                      )}
                    </div>
                    <span className="font-display text-xl text-gold-400 whitespace-nowrap">₹{dish.price}</span>
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
