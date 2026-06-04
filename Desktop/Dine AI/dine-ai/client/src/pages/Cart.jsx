import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty!</h2>
        <Link to="/menu"
          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Cart 🛒</h1>

      <div className="max-w-2xl mx-auto">
        {cart.map(item => (
          <div key={item._id} className="bg-white rounded-2xl shadow p-5 mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-orange-500 font-bold">₹{item.price} x {item.quantity}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold hover:bg-gray-300">-</button>
              <span className="font-bold text-lg">{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold hover:bg-gray-300">+</button>
              <button onClick={() => removeFromCart(item._id)}
                className="bg-red-100 text-red-500 px-3 py-1 rounded-lg font-semibold hover:bg-red-200">Remove</button>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-orange-500">₹{total}</span>
          </div>
          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition mb-3">
            Place Order 🎉
          </button>
          <button onClick={clearCart}
            className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}