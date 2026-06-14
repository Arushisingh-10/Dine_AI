import { useState } from 'react';
import axios from 'axios';

export default function CalorieEstimator() {
  const [dish, setDish] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const popularDishes = [
    'Butter Chicken', 'Biryani', 'Paneer Tikka',
    'Dal Makhani', 'Gulab Jamun', 'Samosa', 'Dosa', 'Chole Bhature'
  ];

  const handleEstimate = async () => {
    if (!dish.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/calories', { dish });
      setResult(res.data);
    } catch (err) {
      setError('Something went wrong! Try again.');
    }
    setLoading(false);
  };

  const getHealthColor = (score) => {
    if (score >= 7) return { color: '#22c55e', bg: '#f0fdf4', label: 'Healthy' };
    if (score >= 4) return { color: '#eab308', bg: '#fefce8', label: 'Moderate' };
    return { color: '#ef4444', bg: '#fef2f2', label: 'Indulgent' };
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="text-white py-14 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🤖 AI Nutrition Analysis
        </div>
        <h1 className="text-5xl font-black mb-2">Calorie <span style={{ color: '#FFD700' }}>Estimator</span></h1>
        <p className="opacity-70 text-lg">AI-powered nutrition facts for any dish!</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-black text-gray-800 mb-2">Enter Dish Name 🍽️</h2>
          <p className="text-gray-400 text-sm mb-6">Type any Indian or international dish!</p>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={dish}
              onChange={e => setDish(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleEstimate()}
              placeholder="e.g. Butter Chicken, Pizza, Biryani..."
              className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50"
            />
            <button onClick={handleEstimate} disabled={!dish.trim() || loading}
              className="text-white px-6 py-3 rounded-2xl font-bold transition shadow"
              style={{
                background: dish.trim() && !loading ? 'linear-gradient(135deg, #8B0000, #FF6B35)' : '#e5e7eb',
                color: dish.trim() && !loading ? 'white' : '#9ca3af',
                cursor: dish.trim() && !loading ? 'pointer' : 'not-allowed'
              }}>
              {loading ? '⏳' : '🔍'}
            </button>
          </div>

          {/* Popular Dishes */}
          <div>
            <p className="text-gray-400 text-xs mb-2 font-semibold">POPULAR DISHES:</p>
            <div className="flex flex-wrap gap-2">
              {popularDishes.map(d => (
                <button key={d} onClick={() => setDish(d)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition"
                  style={{ background: dish === d ? '#8B0000' : '#FFF3EE', color: dish === d ? 'white' : '#8B0000' }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-6 text-center">
            <div className="text-5xl mb-4 animate-bounce">🤖</div>
            <p className="text-gray-600 font-semibold">Analyzing nutrition facts...</p>
          </div>
        )}

        {/* Result Card */}
        {result && !loading && (
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Header */}
            <div className="px-8 py-6 text-white"
              style={{ background: 'linear-gradient(135deg, #1A1A2E, #8B0000)' }}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black">{result.dish}</h2>
                  <p className="opacity-70 text-sm mt-1">Per {result.serving}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-black" style={{ color: '#FFD700' }}>{result.calories}</p>
                  <p className="text-sm opacity-70">calories</p>
                </div>
              </div>
            </div>

            <div className="p-8">

              {/* Macros Grid */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Protein', value: result.protein, emoji: '💪', color: '#3b82f6' },
                  { label: 'Carbs', value: result.carbs, emoji: '🌾', color: '#f59e0b' },
                  { label: 'Fat', value: result.fat, emoji: '🥑', color: '#ef4444' },
                  { label: 'Fiber', value: result.fiber, emoji: '🌿', color: '#22c55e' },
                ].map(macro => (
                  <div key={macro.label} className="text-center p-4 rounded-2xl"
                    style={{ background: '#f9fafb' }}>
                    <div className="text-2xl mb-1">{macro.emoji}</div>
                    <p className="text-lg font-black" style={{ color: macro.color }}>{macro.value}</p>
                    <p className="text-xs text-gray-400 font-semibold">{macro.label}</p>
                  </div>
                ))}
              </div>

              {/* Health Score */}
              {(() => {
                const h = getHealthColor(result.healthScore);
                return (
                  <div className="rounded-2xl p-5 mb-4" style={{ background: h.bg }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black text-gray-800">Health Score</span>
                      <span className="font-black text-lg" style={{ color: h.color }}>
                        {result.healthScore}/10 — {h.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-3 rounded-full transition-all duration-500"
                        style={{ width: `${result.healthScore * 10}%`, background: h.color }}/>
                    </div>
                  </div>
                );
              })()}

              {/* Verdict */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                <p className="text-gray-600 text-sm">🤖 <span className="font-bold">AI Verdict:</span> {result.verdict}</p>
              </div>

              {/* Tip */}
              <div className="rounded-2xl p-4" style={{ background: '#FFF3EE' }}>
                <p className="text-sm" style={{ color: '#8B0000' }}>💡 <span className="font-bold">Healthy Tip:</span> {result.tips}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}