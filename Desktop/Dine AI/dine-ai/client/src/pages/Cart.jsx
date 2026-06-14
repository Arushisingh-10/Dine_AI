import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const generateBill = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(139, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('DINE AI', 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Smart Dining Experience', 105, 28, { align: 'center' });
    doc.text('AI-Powered Restaurant', 105, 36, { align: 'center' });

    // Bill Info
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(11);
    doc.text(`Bill Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 52);
    doc.text(`Bill Time: ${new Date().toLocaleTimeString('en-IN')}`, 14, 60);
    doc.text(`Bill No: #${Math.floor(Math.random() * 9000) + 1000}`, 140, 52);
    doc.text('Status: Confirmed ✓', 140, 60);

    // Divider
    doc.setDrawColor(139, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 66, 196, 66);

    // Table
    autoTable(doc, {
      startY: 72,
      head: [['#', 'Item', 'Category', 'Price', 'Qty', 'Total']],
      body: cart.map((item, i) => [
        i + 1,
        item.name,
        item.category || 'main',
        `Rs. ${item.price}`,
        item.quantity,
        `Rs. ${item.price * item.quantity}`
      ]),
      headStyles: {
        fillColor: [139, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 11
      },
      bodyStyles: { fontSize: 10, textColor: [50, 50, 50] },
      alternateRowStyles: { fillColor: [255, 243, 238] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 60 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 15 },
        5: { cellWidth: 30 },
      }
    });

    const finalY = doc.lastAutoTable.finalY + 10;

    // Summary Box
    doc.setFillColor(255, 243, 238);
    doc.rect(120, finalY, 76, 50, 'F');
    doc.setDrawColor(139, 0, 0);
    doc.rect(120, finalY, 76, 50, 'S');

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Subtotal:', 125, finalY + 10);
    doc.text(`Rs. ${total}`, 188, finalY + 10, { align: 'right' });

    doc.text('Tax (5%):', 125, finalY + 20);
    doc.text(`Rs. ${Math.round(total * 0.05)}`, 188, finalY + 20, { align: 'right' });

    doc.text('Delivery:', 125, finalY + 30);
    doc.setTextColor(34, 197, 94);
    doc.text('FREE', 188, finalY + 30, { align: 'right' });

    doc.setDrawColor(139, 0, 0);
    doc.line(125, finalY + 35, 193, finalY + 35);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 0, 0);
    doc.text('TOTAL:', 125, finalY + 45);
    doc.text(`Rs. ${total + Math.round(total * 0.05)}`, 188, finalY + 45, { align: 'right' });

    // Thank you message
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 0, 0);
    doc.text('Thank you for dining with Dine AI!', 105, finalY + 70, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text('Powered by AI • Smart Dining Experience', 105, finalY + 78, { align: 'center' });
    doc.text('© 2025 Dine AI — Made with ❤️ by Arushi Singh', 105, finalY + 85, { align: 'center' });

    doc.save(`DineAI_Bill_${Date.now()}.pdf`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-black text-gray-800 mb-3">Cart is Empty!</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/menu"
              className="block text-white font-bold py-3 px-8 rounded-2xl text-lg shadow-lg transition"
              style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
              🍽️ Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="text-white py-14 px-8 text-center"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #8B0000 50%, #FF6B35 100%)' }}>
        <h1 className="text-5xl font-black mb-2">Your <span style={{ color: '#FFD700' }}>Cart</span> 🛒</h1>
        <p className="opacity-70 text-lg">{cart.length} item{cart.length > 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart.map(item => (
            <div key={item._id} className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: '#FFF3EE' }}>
                  🍛
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="font-bold" style={{ color: '#FF6B35' }}>₹{item.price} x {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full font-bold text-white flex items-center justify-center"
                  style={{ background: '#8B0000' }}>-</button>
                <span className="font-black text-lg w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full font-bold text-white flex items-center justify-center"
                  style={{ background: '#FF6B35' }}>+</button>
                <button onClick={() => removeFromCart(item._id)}
                  className="ml-2 bg-red-50 text-red-500 px-3 py-1 rounded-lg font-semibold hover:bg-red-100 transition text-sm">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-xl font-black text-gray-800">Order Summary</h3>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery</span>
              <span className="text-green-500 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (5%)</span>
              <span>₹{Math.round(total * 0.05)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between">
              <span className="text-xl font-black text-gray-800">Total</span>
              <span className="text-2xl font-black" style={{ color: '#FF6B35' }}>
                ₹{total + Math.round(total * 0.05)}
              </span>
            </div>
          </div>
          <div className="px-6 pb-6 space-y-3">
            <button className="w-full text-white py-4 rounded-2xl font-black text-lg shadow-lg transition"
              style={{ background: 'linear-gradient(135deg, #8B0000, #FF6B35)' }}>
              🎉 Place Order
            </button>
            <button onClick={generateBill}
              className="w-full text-white py-3 rounded-2xl font-bold transition shadow"
              style={{ background: 'linear-gradient(135deg, #1A1A2E, #333)' }}>
              🧾 Download Bill (PDF)
            </button>
            <button onClick={clearCart}
              className="w-full bg-gray-100 text-gray-500 py-3 rounded-2xl font-bold hover:bg-gray-200 transition">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}