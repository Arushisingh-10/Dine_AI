import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div style={{ background: darkMode ? '#0F0F1A' : '#ffffff' }}>

      {/* Hero Section */}
      <div className="relative overflow-hidden text-white py-24 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: '#FF6B35', transform: 'translate(-30%, -30%)' }}/>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: '#FFD700', transform: 'translate(30%, 30%)' }}/>

        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold mb-6 backdrop-blur">
          🤖 AI Powered Restaurant Experience
        </div>

        <h1 className="text-6xl font-black mb-4 leading-tight">
          Welcome to <span style={{ color: '#FFD700' }}>Dine AI</span>
        </h1>
        <p className="text-xl mb-4 opacity-80 max-w-2xl mx-auto">
          Experience the future of dining — AI-powered recommendations,<br/> smart ordering & more!
        </p>

        <div className="flex justify-center gap-10 mb-10 mt-6">
          <div>
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>50+</p>
            <p className="text-sm opacity-70">Menu Items</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>AI</p>
            <p className="text-sm opacity-70">Powered</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>24/7</p>
            <p className="text-sm opacity-70">Available</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/menu"
            className="font-bold px-8 py-3 rounded-full text-lg transition shadow-lg"
            style={{ background: '#FF6B35', color: 'white' }}>
            🍽️ Explore Menu
          </Link>
          <Link to="/signup"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-gray-800 transition">
            Get Started →
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8" style={{ background: darkMode ? '#0F0F1A' : '#ffffff' }}>
        <h2 className="text-4xl font-bold text-center mb-4"
          style={{ color: darkMode ? '#ffffff' : '#1A1A2E' }}>
          Why Dine AI? ✨
        </h2>
        <p className="text-center mb-12" style={{ color: darkMode ? '#aaaaaa' : '#9ca3af' }}>
          Powered by cutting-edge AI technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { emoji: '🤖', title: 'AI Chatbot', desc: 'Ask our AI anything — get personalized food recommendations instantly!' },
            { emoji: '📸', title: 'Food Scanner', desc: 'Upload a food photo and our AI will identify the dish for you!' },
            { emoji: '⭐', title: 'Smart Recommendations', desc: 'Get personalized menu suggestions based on your taste preferences!' },
          ].map((card, i) => (
            <div key={i} className="rounded-2xl p-8 text-center shadow hover:shadow-lg transition"
              style={{ background: darkMode ? '#1A1A2E' : '#f9fafb', border: darkMode ? '1px solid #333' : 'none' }}>
              <div className="text-5xl mb-4">{card.emoji}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: darkMode ? '#ffffff' : '#1A1A2E' }}>{card.title}</h3>
              <p style={{ color: darkMode ? '#aaaaaa' : '#6b7280' }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Dishes */}
      <div className="py-16 px-8" style={{ background: darkMode ? '#1A1A2E' : '#f9fafb' }}>
        <h2 className="text-4xl font-bold text-center mb-12"
          style={{ color: darkMode ? '#ffffff' : '#1A1A2E' }}>
          Most Loved Dishes 🔥
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Butter Chicken', price: '₹320', emoji: '🍛', tag: 'Bestseller' },
            { name: 'Paneer Tikka',   price: '₹280', emoji: '🧆', tag: 'Veg' },
            { name: 'Biryani',        price: '₹350', emoji: '🍚', tag: 'Chef Special' },
            { name: 'Gulab Jamun',    price: '₹120', emoji: '🍮', tag: 'Dessert' },
          ].map((dish) => (
            <div key={dish.name} className="rounded-2xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer"
              style={{ background: darkMode ? '#0F0F1A' : '#ffffff', border: darkMode ? '1px solid #333' : 'none' }}>
              <div className="text-5xl mb-3">{dish.emoji}</div>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">{dish.tag}</span>
              <h3 className="text-lg font-bold mt-3 mb-1" style={{ color: darkMode ? '#ffffff' : '#1A1A2E' }}>{dish.name}</h3>
              <p className="font-bold text-xl" style={{ color: '#FF6B35' }}>{dish.price}</p>
              <Link to="/menu"
                className="mt-3 block text-white py-2 rounded-xl font-semibold transition"
                style={{ background: '#FF6B35' }}>
                Order Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-white py-16 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <h2 className="text-4xl font-bold mb-4">Ready to experience AI dining? 🚀</h2>
        <p className="text-xl mb-8 opacity-90">Join thousands of food lovers using Dine AI!</p>
        <Link to="/signup"
          className="font-bold px-10 py-4 rounded-full text-xl shadow-xl transition"
          style={{ background: '#FFD700', color: '#1A1A2E' }}>
          Start Ordering Now →
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center py-6"
        style={{ background: darkMode ? '#0F0F1A' : '#1f2937', color: '#9ca3af' }}>
        <p>© 2025 Dine AI — Made with ❤️ by Arushi Singh</p>
      </footer>

    </div>
  );
}