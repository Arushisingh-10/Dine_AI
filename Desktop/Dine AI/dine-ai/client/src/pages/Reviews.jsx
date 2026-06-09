import { useState } from 'react';
import axios from 'axios';

export default function Reviews() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([
    { text: 'Biryani was absolutely amazing!', sentiment: 'positive', emoji: '😊', score: 95 },
    { text: 'Food was cold and delivery was late', sentiment: 'negative', emoji: '😠', score: 12 },
    { text: 'Average experience, nothing special', sentiment: 'neutral', emoji: '😐', score: 50 },
  ]);

  const handleAnalyze = async () => {
    if (!review.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/sentiment', { review });
      setResult(res.data);
      setReviews(prev => [{ text: review, ...res.data }, ...prev]);
      setReview('');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return { bg: '#f0fdf4', border: '#86efac', text: '#166534' };
    if (sentiment === 'negative') return { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b' };
    return { bg: '#fefce8', border: '#fde047', text: '#854d0e' };
  };

  const positiveCount = reviews.filter(r => r.sentiment === 'positive').length;
  const negativeCount = reviews.filter(r => r.sentiment === 'negative').length;
  const neutralCount = reviews.filter(r => r.sentiment === 'neutral').length;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="text-white py-14 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🤖 NLP Powered Analysis
        </div>
        <h1 className="text-5xl font-black mb-2">Sentiment <span style={{ color: '#FFD700' }}>Analysis</span></h1>
        <p className="opacity-70 text-lg">AI analyzes customer reviews automatically!</p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-8">
          <div>
            <p className="text-3xl font-black text-green-400">{positiveCount}</p>
            <p className="text-sm opacity-70">😊 Positive</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black text-red-400">{negativeCount}</p>
            <p className="text-sm opacity-70">😠 Negative</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black text-yellow-400">{neutralCount}</p>
            <p className="text-sm opacity-70">😐 Neutral</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-black text-gray-800 mb-2">Write a Review ✍️</h2>
          <p className="text-gray-400 text-sm mb-6">AI will analyze your sentiment instantly!</p>

          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="e.g. The biryani was absolutely delicious! Best food I've had..."
            rows={4}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-orange-400 bg-gray-50 resize-none mb-4"
          />

          <button onClick={handleAnalyze} disabled={!review.trim() || loading}
            className="w-full text-white py-3 rounded-2xl font-black text-lg shadow-lg transition"
            style={{
              background: review.trim() && !loading ? 'linear-gradient(135deg, #8B0000, #FF6B35)' : '#e5e7eb',
              color: review.trim() && !loading ? 'white' : '#9ca3af',
              cursor: review.trim() && !loading ? 'pointer' : 'not-allowed'
            }}>
            {loading ? '🔍 Analyzing...' : '🔍 Analyze Sentiment'}
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2"
            style={{ borderColor: getSentimentColor(result.sentiment).border }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{result.emoji}</span>
              <div>
                <h3 className="text-2xl font-black text-gray-800 capitalize">{result.sentiment}!</h3>
                <p className="text-gray-500">{result.summary}</p>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mb-2 flex justify-between text-sm font-bold text-gray-600">
              <span>Sentiment Score</span>
              <span>{result.score}/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4">
              <div className="h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${result.score}%`,
                  background: result.sentiment === 'positive' ? '#22c55e' :
                               result.sentiment === 'negative' ? '#ef4444' : '#eab308'
                }}/>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <h2 className="text-2xl font-black text-gray-800 mb-4">All Reviews 📋</h2>
        <div className="space-y-4">
          {reviews.map((r, i) => {
            const colors = getSentimentColor(r.sentiment);
            return (
              <div key={i} className="bg-white rounded-2xl shadow-md p-5 border-l-4"
                style={{ borderLeftColor: colors.border }}>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-gray-700 flex-1">"{r.text}"</p>
                  <span className="text-2xl">{r.emoji}</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold capitalize"
                    style={{ background: colors.bg, color: colors.text }}>
                    {r.sentiment}
                  </span>
                  <span className="text-gray-400 text-xs">Score: {r.score}/100</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}