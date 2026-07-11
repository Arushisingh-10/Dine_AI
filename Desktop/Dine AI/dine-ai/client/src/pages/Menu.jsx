import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Skeleton from '../components/Skeleton';
import toast from 'react-hot-toast';

export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios.get('http://localhost:5000/api/menu')
        .then(res => {
          setItems(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 1500);
  }, []);

  const filtered = items
    .filter(i => category === 'all' || i.category === category)
    .filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
    );

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart! 🛒`);
  };

  const getImage = (name) => {
    const images = {
      'Butter Chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
      'Paneer Tikka': 'https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1-480x270.jpg',
      'Biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
      'Gulab Jamun': 'https://media.istockphoto.com/id/521803129/photo/gulab-jamun-11.webp?a=1&b=1&s=612x612&w=0&k=20&c=pssaaXKPDK6oegce0JpBIJVsPN00S_YwOTtCivfwdQc=',
      'Dal Makhani': 'https://media.istockphoto.com/id/531241066/photo/dal-makhani-or-dal-makhani-or-daal-makhni.webp?a=1&b=1&s=612x612&w=0&k=20&c=DgZxad4-2Q0II88BRi60BtfASi1bZYb8Xx6LBZZWmgY=',
      'Mango Lassi': 'https://cdn.indiaphile.info/wp-content/uploads/2014/05/mangolassi-3908.jpg?width=1200&crop_gravity=center&aspect_ratio=auto&q=75'
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
        <p className="opacity-70 text-lg mb-8">AI-recommended dishes just for you!</p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search dishes, ingredients..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 font-semibold focus:outline-none shadow-lg"
            style={{ background: 'rgba(255,255,255,0.95)' }}
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-lg">
              ✕
            </button>
          )}
        </div>
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

      {/* Search Results Info */}
      {search && !loading && (
        <div className="text-center mb-4">
          <p className="text-gray-500 font-semibold">
            {filtered.length > 0
              ? `🔍 ${filtered.length} result${filtered.length > 1 ? 's' : ''} found for "${search}"`
              : `😔 No results found for "${search}"`}
          </p>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-16">

        {loading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i}/>)
        ) : filtered.length === 0 ? (
          <div className="col-span-3 text-center py-20">
            <div className="text-8xl mb-4">🍽️</div>
            <h3 className="text-2xl font-black text-gray-600 mb-2">No dishes found!</h3>
            <p className="text-gray-400">Try a different search term</p>
            <button onClick={() => setSearch('')}
              className="mt-4 text-white px-6 py-2 rounded-full font-bold"
              style={{ background: '#8B0000' }}>
              Clear Search
            </button>
          </div>
        ) : (
          filtered.map(item => (
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
          ))
        )}
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