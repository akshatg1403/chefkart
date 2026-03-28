'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { DEMO_BOOKINGS } from '@/lib/demoData';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dishes');
  const [profile, setProfile] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ experience: '', cuisine: '', location: '', description: '' });

  const [dishModal, setDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'CHEF')) { router.push('/login'); return; }
    if (user) fetchAll();
  }, [user, authLoading]);

  const fetchAll = async () => {
    try {
      const [meRes, bookingsRes] = await Promise.all([api.get('/auth/me'), api.get('/bookings')]);
      const chefProfile = meRes.data.chefProfile;
      setProfile(chefProfile);
      setProfileForm({
        experience: chefProfile?.experience || '',
        cuisine: chefProfile?.cuisine || '',
        location: chefProfile?.location || '',
        description: chefProfile?.description || '',
      });
      setBookings(bookingsRes.data);
      if (chefProfile) {
        const dishRes = await api.get(`/dishes?chefId=${chefProfile.id}`);
        setDishes(dishRes.data);
      }
    } catch {
      setBookings(DEMO_BOOKINGS);
      setProfile({ experience: 5, cuisine: 'North Indian', location: 'Mumbai', description: 'Passionate chef', rating: 4.5, totalRatings: 10 });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async () => {
    try {
      const res = await api.put('/chefs/profile', profileForm);
      setProfile(res.data);
      setEditProfile(false);
      toast.success('Profile updated');
    } catch { toast.error('Failed to update profile'); }
  };

  const openAddDish = () => { setEditingDish(null); setDishForm({ name: '', price: '', category: '' }); setDishModal(true); };
  const openEditDish = (dish) => { setEditingDish(dish); setDishForm({ name: dish.name, price: dish.price, category: dish.category }); setDishModal(true); };

  const handleDishSave = async (e) => {
    e.preventDefault();
    try {
      if (editingDish) { await api.put(`/dishes/${editingDish.id}`, dishForm); toast.success('Dish updated'); }
      else { await api.post('/dishes', dishForm); toast.success('Dish added'); }
      setDishModal(false);
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || 'Failed to save dish'); }
  };

  const handleDishDelete = async (dishId) => {
    if (!confirm('Delete this dish?')) return;
    try { await api.delete(`/dishes/${dishId}`); toast.success('Dish deleted'); setDishes(dishes.filter((d) => d.id !== dishId)); }
    catch { toast.error('Failed to delete dish'); }
  };

  const handleBookingAction = async (bookingId, status) => {
    try { await api.put(`/bookings/${bookingId}`, { status }); toast.success(`Booking ${status.toLowerCase()}`); setBookings(bookings.map((b) => b.id === bookingId ? { ...b, status } : b)); }
    catch { toast.error('Failed to update booking'); }
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="animate-pulse card-neon p-10">
          <div className="h-8 bg-neon-cyan/5 w-1/3 mb-6 rounded" />
          <div className="space-y-4">
            <div className="h-4 bg-neon-cyan/5 w-full rounded" />
            <div className="h-4 bg-neon-cyan/5 w-2/3 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;

  const tabs = [
    { id: 'dishes', label: 'My Dishes', count: dishes.length },
    { id: 'bookings', label: 'Bookings', count: pendingCount },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 relative">
      <div className="absolute top-0 right-0 w-60 h-60 bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-12 animate-fade-in">
        <span className="text-overline">Chef Studio</span>
        <h1 className="heading-section mt-4">
          YOUR <span className="text-glow-purple">DASHBOARD</span>
        </h1>
        <div className="neon-line-cyan mt-6 w-16" />
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-10 border-b border-neon-cyan/10 animate-fade-in delay-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-[12px] font-display font-semibold tracking-[0.12em] uppercase border-b-2 transition-all duration-500 ${
              activeTab === tab.id
                ? 'text-neon-cyan border-neon-cyan shadow-[0_2px_10px_rgba(0,255,245,0.3)]'
                : 'text-dark-300 border-transparent hover:text-dark-100 hover:border-dark-400'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] ${
                activeTab === tab.id ? 'bg-neon-cyan text-dark-950' : 'bg-dark-500 text-dark-200'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Dishes Tab */}
      {activeTab === 'dishes' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl text-white tracking-wider font-bold">MENU ITEMS</h2>
            <button onClick={openAddDish} className="btn-sm-neon">+ Add Dish</button>
          </div>

          {dishes.length === 0 ? (
            <div className="card-neon p-16 text-center">
              <span className="font-display text-5xl text-neon-cyan/15 block mb-6">&#9674;</span>
              <h3 className="font-display text-2xl text-white mb-3 tracking-wider">NO DISHES YET</h3>
              <p className="text-sm text-dark-300 mb-6 font-body">Add your first dish to start receiving bookings</p>
              <button onClick={openAddDish} className="btn-neon-filled">Add Your First Dish</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes.map((dish) => (
                <div key={dish.id} className="group card-neon overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={dish.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-white tracking-wider">{dish.name}</h3>
                        {dish.category && <span className="text-[10px] tracking-[0.15em] uppercase text-dark-400 font-display">{dish.category}</span>}
                      </div>
                      <span className="font-display text-xl font-bold text-neon-green">&#8377;{dish.price}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditDish(dish)} className="btn-sm-neon">Edit</button>
                      <button onClick={() => handleDishDelete(dish.id)} className="btn-sm-danger">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dish Modal */}
          {dishModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 modal-backdrop animate-fade-in">
              <div className="w-full max-w-md card-neon animate-scale-in">
                <div className="p-6 border-b border-neon-cyan/10">
                  <span className="text-overline">{editingDish ? 'Edit' : 'New'} Dish</span>
                  <h2 className="font-display text-2xl text-white mt-2 tracking-wider font-bold">
                    {editingDish ? 'UPDATE' : 'ADD'} <span className="text-glow-cyan">DISH</span>
                  </h2>
                </div>
                <form onSubmit={handleDishSave} className="p-6 space-y-5">
                  <div>
                    <label className="field-label">Dish Name</label>
                    <input type="text" value={dishForm.name} onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })} className="field" placeholder="e.g. Butter Chicken" required />
                  </div>
                  <div>
                    <label className="field-label">Price (&#8377;)</label>
                    <input type="number" value={dishForm.price} onChange={(e) => setDishForm({ ...dishForm, price: e.target.value })} className="field" placeholder="e.g. 450" required />
                  </div>
                  <div>
                    <label className="field-label">Category</label>
                    <select value={dishForm.category} onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })} className="field-select">
                      <option value="">Select Category</option>
                      <option value="Starter">Starter</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Bread">Bread</option>
                      <option value="Beverage">Beverage</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-neon-filled flex-1">{editingDish ? 'Update' : 'Add Dish'}</button>
                    <button type="button" onClick={() => setDishModal(false)} className="btn-neon flex-1">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="animate-fade-in space-y-3">
          {bookings.length === 0 ? (
            <div className="card-neon p-16 text-center">
              <span className="font-display text-5xl text-neon-cyan/15 block mb-6">&#9674;</span>
              <h3 className="font-display text-2xl text-white mb-3 tracking-wider">NO BOOKINGS YET</h3>
              <p className="text-sm text-dark-300 font-body">Bookings will appear here when users request your services</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="card-neon p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl font-bold text-white tracking-wider">{booking.user?.name}</h3>
                      <span className={`tag-${booking.status.toLowerCase()}`}>{booking.status}</span>
                    </div>
                    <p className="text-sm text-dark-200 font-body">{booking.user?.email}</p>
                    <p className="text-sm text-dark-300 mt-1 font-body">
                      {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {booking.message && (
                      <p className="text-sm text-dark-400 mt-3 font-body italic">&ldquo;{booking.message}&rdquo;</p>
                    )}
                  </div>
                  {booking.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleBookingAction(booking.id, 'ACCEPTED')} className="btn-sm-success">Accept</button>
                      <button onClick={() => handleBookingAction(booking.id, 'REJECTED')} className="btn-sm-danger">Reject</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="animate-fade-in">
          <div className="card-neon">
            <div className="flex items-center justify-between p-6 border-b border-neon-cyan/10">
              <h2 className="font-display text-2xl text-white font-bold tracking-wider">CHEF PROFILE</h2>
              {!editProfile ? (
                <button onClick={() => setEditProfile(true)} className="btn-sm-neon">Edit Profile</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleProfileSave} className="btn-sm-neon">Save</button>
                  <button onClick={() => setEditProfile(false)} className="btn-sm-danger">Cancel</button>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="field-label">Years of Experience</label>
                  {editProfile ? (
                    <input type="number" value={profileForm.experience} onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })} className="field" />
                  ) : (
                    <p className="font-display text-xl text-neon-cyan font-bold">{profile?.experience || 0} years</p>
                  )}
                </div>
                <div>
                  <label className="field-label">Cuisine Specialty</label>
                  {editProfile ? (
                    <input type="text" value={profileForm.cuisine} onChange={(e) => setProfileForm({ ...profileForm, cuisine: e.target.value })} className="field" placeholder="e.g. North Indian" />
                  ) : (
                    <p className="font-display text-xl text-white font-bold">{profile?.cuisine || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <label className="field-label">Location</label>
                  {editProfile ? (
                    <input type="text" value={profileForm.location} onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })} className="field" placeholder="e.g. Mumbai" />
                  ) : (
                    <p className="font-display text-xl text-white font-bold">{profile?.location || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <label className="field-label">Rating</label>
                  <p className="font-display text-xl text-neon-green font-bold">&#9733; {profile?.rating || 0} <span className="text-dark-400 text-sm">({profile?.totalRatings || 0} reviews)</span></p>
                </div>
                <div className="md:col-span-2">
                  <label className="field-label">Bio & Description</label>
                  {editProfile ? (
                    <textarea value={profileForm.description} onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })} className="field resize-none h-32" placeholder="Tell clients about your culinary journey..." />
                  ) : (
                    <p className="text-dark-100 text-lg font-body leading-relaxed">{profile?.description || 'No description yet'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
