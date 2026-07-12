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
      localStorage.setItem('userId', res.data.user._id);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>

      <div className="w-full max-w-md">

        {/* Logo top */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="text-3xl font-black text-white">Dine <span style={{ color: '#FFD700' }}>AI</span></h1>
          <p className="text-white opacity-60 mt-1">Smart Dining Experience</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-black text-gray-800 mb-1">Welcome Back! 👋</h2>
          <p className="text-gray-400 mb-6 text-sm">Login to your Dine AI account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm font-semibold">
              ⚠️ {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-sm">Email Address</label>
            <input type="email" placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50 text-gray-800"
              onChange={e => setForm({ ...form, email: e.target.value })}/>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2 text-sm">Password</label>
            <input type="password" placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50"
              onChange={e => setForm({ ...form, password: e.target.value })}/>
          </div>

          <button onClick={handleSubmit}
            className="w-full text-white font-black py-3 rounded-2xl text-lg shadow-lg transition mb-4"
            style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
            Login →
          </button>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold" style={{ color: '#FF6B35' }}>Sign up free</Link>
          </p>
        </div>

        {/* Bottom text */}
        <p className="text-center text-white opacity-40 text-xs mt-6">
          © 2025 Dine AI — Smart Dining Experience
        </p>
      </div>
    </div>
  );
}