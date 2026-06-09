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
      'Paneer Tikka': 'https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1-480x270.jpg',
      'Biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
      'Gulab Jamun': 'https://media.istockphoto.com/id/521803129/photo/gulab-jamun-11.webp?a=1&b=1&s=612x612&w=0&k=20&c=pssaaXKPDK6oegce0JpBIJVsPN00S_YwOTtCivfwdQc=',
      'Dal Makhani': 'https://media.istockphoto.com/id/531241066/photo/dal-makhani-or-dal-makhani-or-daal-makhni.webp?a=1&b=1&s=612x612&w=0&k=20&c=DgZxad4-2Q0II88BRi60BtfASi1bZYb8Xx6LBZZWmgY=',
    };
    return images[name] || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400';
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="text-white py-14 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          🍽️ Fresh & Delicious
        </div>
        <h1 className="text-5xl font-black mb-2">Our <span style={{ color: '#FFD700' }}>Menu</span></h1>
        <p className="opacity-70 text-lg">AI-recommended dishes just for you!</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 py-8 flex-wrap px-4">
        {['all', 'starter', 'main', 'dessert', 'drink'].map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className="px-6 py-2 rounded-full font-semibold capitalize transition shadow-sm"
            style={{
              background: category === cat ? '#8B0000' : 'white',
              color: category === cat ? 'white' : '#555',
              border: category === cat ? 'none' : '1px solid #ddd'
            }}>
            {cat === 'all' ? '🍴 All' : cat === 'starter' ? '🥗 Starter' : cat === 'main' ? '🍛 Main' : cat === 'dessert' ? '🍮 Dessert' : '🥤 Drink'}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-16">
        {filtered.map(item => (
          <div key={item._id} className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group">
            <div className="relative overflow-hidden">
              <img src={getImage(item.name)} alt={item.name}
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                onError={e => e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'}/>
              <div className="absolute top-3 right-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full capitalize shadow"
                  style={{ background: '#8B0000', color: 'white' }}>
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black" style={{ color: '#FF6B35' }}>₹{item.price}</span>
                <button onClick={() => handleAddToCart(item)}
                  className="text-white px-5 py-2 rounded-xl font-bold transition shadow"
                  style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Badge */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-lg cursor-pointer z-50"
          style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
          🛒 {cart.length} items
        </div>
      )}
    </div>
  );
}