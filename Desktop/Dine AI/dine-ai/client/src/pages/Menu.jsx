import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const { addToCart, cart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => setItems(res.data));
  }, []);

  const filtered = category === 'all' ? items : items.filter(i => i.category === category);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`✅ ${item.name} added to cart!`);
  };

  const getImage = (name) => {
    const images = {
      'Butter Chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
      'Paneer Tikka': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
      'Biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
      'Gulab Jamun': 'https://images.unsplash.com/photo-1666200611424-8a6a0df0b3eb?w=400',
      'Dal Makhani': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
    };
    return images[name] || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Our Menu 🍽️</h1>
      <p className="text-center text-gray-500 mb-8">Fresh, delicious & AI-recommended!</p>

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {['all', 'starter', 'main', 'dessert', 'drink'].map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold capitalize transition ${
              category === cat ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-300 hover:border-orange-400'
            }`}>
            {cat === 'all' ? '🍴 All' : cat === 'starter' ? '🥗 Starter' : cat === 'main' ? '🍛 Main' : cat === 'dessert' ? '🍮 Dessert' : '🥤 Drink'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map(item => (
          <div key={item._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
            <img src={getImage(item.name)} alt={item.name} className="w-full h-48 object-cover"
              onError={e => e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'}/>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full capitalize">{item.category}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-500">₹{item.price}</span>
                <button onClick={() => handleAddToCart(item)}
                  className="bg-orange-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg font-bold text-lg cursor-pointer">
          🛒 {cart.length} items
        </div>
      )}
    </div>
  );
}