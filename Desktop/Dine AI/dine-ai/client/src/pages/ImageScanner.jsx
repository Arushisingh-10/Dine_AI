import { useState } from 'react';
import axios from 'axios';

export default function ImageScanner() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult('');
  };

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);
    setResult('');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      try {
        const res = await axios.post('http://localhost:5000/api/ai/scan', { image: base64 });
        setResult(res.data.reply);
      } catch (err) {
        setResult('❌ Something went wrong!');
      }
      setLoading(false);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 60%, #FF6B35 100%)' }}>

      {/* Header */}
      <div className="text-center py-14 px-6">
        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold text-white mb-4">
          🤖 AI Powered Food Recognition
        </div>
        <h1 className="text-5xl font-black text-white mb-3">Food Scanner <span style={{ color: '#FFD700' }}>📸</span></h1>
        <p className="text-white opacity-70 text-lg">Upload any food photo — our AI will identify it instantly!</p>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Upload Area */}
          <label className="cursor-pointer block">
            <div className="relative">
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="preview" className="w-full h-72 object-cover"/>
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <p className="text-white font-bold text-lg">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="h-72 flex flex-col items-center justify-center gap-4"
                  style={{ background: 'linear-gradient(135deg, #FFF3EE, #FFE8D6)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg bg-white">
                    📸
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 font-bold text-lg">Click to upload food image</p>
                    <p className="text-gray-400 text-sm mt-1">JPG, PNG supported • Max 10MB</p>
                  </div>
                  <div className="border-2 border-dashed border-orange-300 rounded-2xl px-8 py-2">
                    <p className="text-orange-400 font-semibold text-sm">Browse Files</p>
                  </div>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImage} className="hidden"/>
          </label>

          {/* Info bar */}
          {image && (
            <div className="px-6 py-3 flex items-center gap-2 border-t border-gray-100"
              style={{ background: '#FFF8F0' }}>
              <span className="text-2xl">🖼️</span>
              <p className="text-gray-600 text-sm font-medium">{image.name}</p>
              <span className="ml-auto text-xs text-gray-400">{(image.size / 1024).toFixed(0)} KB</span>
            </div>
          )}

          {/* Scan Button */}
          <div className="p-6">
            <button onClick={handleScan} disabled={!image || loading}
              className="w-full py-4 rounded-2xl font-bold text-lg transition shadow-lg"
              style={{
                background: image && !loading ? 'linear-gradient(135deg, #8B0000, #FF6B35)' : '#e5e7eb',
                color: image && !loading ? 'white' : '#9ca3af',
                cursor: image && !loading ? 'pointer' : 'not-allowed'
              }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span>⏳</span> Scanning your food...
                </span>
              ) : '🔍 Scan Food Now'}
            </button>
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <div className="mt-6 bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-3"
              style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
              <span className="text-2xl">🤖</span>
              <h2 className="text-white font-bold text-xl">AI Analysis Result</h2>
              <span className="ml-auto bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Powered by Groq AI
              </span>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed text-base">{result}</p>
            </div>
          </div>
        )}

        {/* Tips */}
        {!result && (
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { emoji: '🍛', tip: 'Indian cuisine' },
              { emoji: '🍕', tip: 'Fast food' },
              { emoji: '🍜', tip: 'Asian dishes' },
            ].map(item => (
              <div key={item.tip} className="bg-white bg-opacity-10 rounded-2xl p-4 text-center border border-white border-opacity-20">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-white text-sm opacity-80">{item.tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}