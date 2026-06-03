import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back! 👋</h2>
        <p className="text-center text-gray-500 mb-8">Login to your Dine AI account</p>

        {error && <p className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-center">{error}</p>}

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
          Login
        </button>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange-500 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}