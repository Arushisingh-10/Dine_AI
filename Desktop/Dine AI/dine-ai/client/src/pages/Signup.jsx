import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Join Dine AI! 🍽️</h2>
        <p className="text-center text-gray-500 mb-8">Create your account and start ordering</p>

        {error && <p className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-600 px-4 py-2 rounded-lg mb-4 text-center">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Arushi Singh"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl text-lg hover:bg-orange-600 transition">
          Create Account
        </button>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}