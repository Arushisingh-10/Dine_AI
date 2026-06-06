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

    try {
      const res = await axios.post('http://localhost:5000/api/ai/scan', {
        imageName: image.name
      });
      setResult(res.data.reply);
    } catch (err) {
      setResult('❌ Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Food Scanner 📸</h1>
      <p className="text-center text-gray-500 mb-10">Upload a food photo — our AI will identify it!</p>

      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-6 text-center">
          <label className="cursor-pointer block">
            <div className="border-2 border-dashed border-orange-300 rounded-2xl p-10 hover:border-orange-500 transition">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-64 object-cover rounded-xl"/>
              ) : (
                <>
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-gray-500 font-semibold">Click to upload food image</p>
                  <p className="text-gray-400 text-sm mt-1">JPG, PNG supported</p>
                </>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleImage} className="hidden"/>
          </label>
        </div>

        <button onClick={handleScan} disabled={!image || loading}
          className={`w-full py-3 rounded-xl font-bold text-lg transition mb-6 ${
            image && !loading
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
          {loading ? '🔍 Scanning...' : '🔍 Scan Food'}
        </button>

        {result && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">🤖 AI Says:</h2>
            <p className="text-gray-600 leading-relaxed">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}