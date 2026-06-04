import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'main' });
  const [message, setMessage] = useState('');

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
    } catch (err) {
      setMessage('❌ Something went wrong!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      setMessage('✅ Item deleted!');
      fetchItems();
    } catch (err) {
      setMessage('❌ Delete failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard 👨‍💼</h1>

      <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Menu Item</h2>

        {message && <p className="mb-4 text-center font-semibold">{message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Name</label>
          <input type="text" placeholder="Dish name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <input type="text" placeholder="Short description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Price (₹)</label>
          <input type="number" placeholder="299"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"/>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Category</label>
          <select value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400">
            <option value="starter">Starter</option>
            <option value="main">Main</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <button onClick={handleAdd}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition">
          Add Item ➕
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Menu Items</h2>
        {items.map(item => (
          <div key={item._id} className="bg-white rounded-2xl shadow p-5 mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
              <p className="text-orange-500 font-bold">₹{item.price} — {item.category}</p>
            </div>
            <button onClick={() => handleDelete(item._id)}
              className="bg-red-100 text-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-200 transition">
              Delete 🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}