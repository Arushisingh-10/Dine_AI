import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20 px-8 text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to Dine AI 🍽️</h1>
        <p className="text-xl mb-8 opacity-90">
          Experience the future of dining — AI-powered recommendations, smart ordering & more!
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/menu"
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-lg hover:shadow-lg transition">
            Explore Menu
          </Link>
          <Link to="/signup"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-orange-500 transition">
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Dine AI? ✨</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          <div className="bg-orange-50 rounded-2xl p-8 text-center shadow hover:shadow-lg transition">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI Chatbot</h3>
            <p className="text-gray-600">Ask our AI anything — get personalized food recommendations instantly!</p>
          </div>

          <div className="bg-red-50 rounded-2xl p-8 text-center shadow hover:shadow-lg transition">
            <div className="text-5xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Food Scanner</h3>
            <p className="text-gray-600">Upload a food photo and our AI will identify the dish for you!</p>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-8 text-center shadow hover:shadow-lg transition">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">Get personalized menu suggestions based on your taste preferences!</p>
          </div>

        </div>
      </div>

      {/* Popular Dishes Section */}
      <div className="bg-gray-50 py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Most Loved Dishes 🔥</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Butter Chicken', price: '₹320', emoji: '🍛', tag: 'Bestseller' },
            { name: 'Paneer Tikka',   price: '₹280', emoji: '🧆', tag: 'Veg' },
            { name: 'Biryani',        price: '₹350', emoji: '🍚', tag: 'Chef Special' },
            { name: 'Gulab Jamun',    price: '₹120', emoji: '🍮', tag: 'Dessert' },
          ].map((dish) => (
            <div key={dish.name} className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg transition cursor-pointer">
              <div className="text-5xl mb-3">{dish.emoji}</div>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">{dish.tag}</span>
              <h3 className="text-lg font-bold text-gray-800 mt-3 mb-1">{dish.name}</h3>
              <p className="text-orange-500 font-bold text-xl">{dish.price}</p>
              <Link to="/menu"
                className="mt-3 block bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
                Order Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to experience AI dining? 🚀</h2>
        <p className="text-xl mb-8 opacity-90">Join thousands of food lovers using Dine AI!</p>
        <Link to="/signup"
          className="bg-white text-orange-500 font-bold px-10 py-4 rounded-full text-xl hover:shadow-xl transition">
          Start Ordering Now
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6">
        <p>© 2025 Dine AI — Made with ❤️ by Arushi Singh</p>
      </footer>

    </div>
  );
}