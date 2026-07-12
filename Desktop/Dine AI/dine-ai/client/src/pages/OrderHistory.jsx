import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    if (status === 'delivered') return { bg: '#f0fdf4', color: '#166534', label: '✅ Delivered' };
    if (status === 'preparing') return { bg: '#fefce8', color: '#854d0e', label: '👨‍🍳 Preparing' };
    return { bg: '#FFF3EE', color: '#8B0000', label: '⏳ Pending' };
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="text-white py-14 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="inline-block bg-white bg-opacity-10 border border-white border-opacity-20 px-4 py-1 rounded-full text-sm font-semibold mb-4">
          📋 Your Orders
        </div>
        <h1 className="text-5xl font-black mb-2">Order <span style={{ color: '#FFD700' }}>History</span></h1>
        <p className="opacity-70 text-lg">Track all your past orders!</p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-8">
          <div>
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>{orders.length}</p>
            <p className="text-sm opacity-70">Total Orders</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>
              ₹{orders.reduce((sum, o) => sum + o.total, 0)}
            </p>
            <p className="text-sm opacity-70">Total Spent</p>
          </div>
          <div className="border-l border-white border-opacity-20 pl-10">
            <p className="text-3xl font-black" style={{ color: '#FFD700' }}>
              {orders.filter(o => o.status === 'delivered').length}
            </p>
            <p className="text-sm opacity-70">Delivered</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-gray-500 font-semibold">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
            <div className="text-8xl mb-4">📋</div>
            <h3 className="text-2xl font-black text-gray-600 mb-2">No orders yet!</h3>
            <p className="text-gray-400 mb-6">Place your first order from our menu</p>
            <Link to="/menu"
              className="text-white font-bold py-3 px-8 rounded-2xl inline-block"
              style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
              🍽️ Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => {
              const status = getStatusColor(order.status);
              return (
                <div key={order._id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
                    <div>
                      <p className="font-black text-gray-800">Order #{orders.length - i}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className="px-4 py-2 rounded-full text-sm font-bold"
                      style={{ background: status.bg, color: status.color }}>
                      {status.label}
                    </span>
                  </div>

                  <div className="px-6 py-4">
                    {order.items.map((item, j) => (
                      <div key={j} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🍛</span>
                          <p className="font-semibold text-gray-700">
                            {item.menuItem?.name || 'Item'}
                          </p>
                        </div>
                        <p className="text-gray-400 text-sm">x{item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 flex justify-between items-center"
                    style={{ background: '#FFF8F0' }}>
                    <p className="text-gray-500 text-sm font-semibold">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                    <p className="text-xl font-black" style={{ color: '#FF6B35' }}>
                      ₹{order.total}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}