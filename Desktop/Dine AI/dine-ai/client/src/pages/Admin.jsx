import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'main' });
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('add');

  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/api/menu');
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/menu', { ...form, price: Number(form.price) });
      setMessage('✅ Item added successfully!');
      setForm({ name: '', description: '', price: '', category: 'main' });
      fetchItems();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Something went wrong!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMessage('✅ Item deleted!');
      fetchItems();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Delete failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="text-white py-14 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🔐 Admin Access Only
        </div>
        <h1 className="text-5xl font-black mb-2">Admin <span style={{ color: '#FFD700' }}>Dashboard</span></h1>
        <p className="opacity-70 text-lg">Manage your restaurant menu</p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-8">
          <div>
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>{items.length}</p>
            <p className="text-sm opacity-70">Total Items</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>
              {items.filter(i => i.category === 'main').length}
            </p>
            <p className="text-sm opacity-70">Main Course</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>
              {items.filter(i => i.category === 'starter').length}
            </p>
            <p className="text-sm opacity-70">Starters</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 py-6 px-4">
        <button onClick={() => setActiveTab('add')}
          className="px-8 py-3 rounded-full font-bold transition shadow"
          style={{ background: activeTab === 'add' ? '#8B0000' : 'white', color: activeTab === 'add' ? 'white' : '#555' }}>
          ➕ Add Item
        </button>
        <button onClick={() => setActiveTab('manage')}
          className="px-8 py-3 rounded-full font-bold transition shadow"
          style={{ background: activeTab === 'manage' ? '#8B0000' : 'white', color: activeTab === 'manage' ? 'white' : '#555' }}>
          📋 Manage Menu ({items.length})
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-16">

        {/* Message */}
        {message && (
          <div className="mb-6 px-4 py-3 rounded-xl font-semibold text-center"
            style={{ background: message.includes('✅') ? '#f0fdf4' : '#fef2f2',
                     color: message.includes('✅') ? '#166534' : '#991b1b' }}>
            {message}
          </div>
        )}

        {/* Add Item Tab */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-black text-gray-800 mb-6">Add New Menu Item</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2 text-sm">Dish Name</label>
              <input type="text" placeholder="e.g. Chicken Tikka Masala"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50"/>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2 text-sm">Description</label>
              <input type="text" placeholder="Short description of the dish"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50"/>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Price (₹)</label>
                <input type="number" placeholder="299"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50"/>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">Category</label>
                <select value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50">
                  <option value="starter">🥗 Starter</option>
                  <option value="main">🍛 Main</option>
                  <option value="dessert">🍮 Dessert</option>
                  <option value="drink">🥤 Drink</option>
                </select>
              </div>
            </div>

            <button onClick={handleAdd}
              className="w-full text-white py-4 rounded-2xl font-black text-lg shadow-lg transition"
              style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
              ➕ Add to Menu
            </button>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item._id} className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: '#FFF3EE' }}>
                    {item.category === 'starter' ? '🥗' : item.category === 'main' ? '🍛' : item.category === 'dessert' ? '🍮' : '🥤'}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                    <p className="font-bold text-sm" style={{ color: '#FF6B35' }}>₹{item.price} • {item.category}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(item._id)}
                  className="bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition text-sm">
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}