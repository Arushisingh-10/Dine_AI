const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:  [{ menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }, quantity: Number }],
  total:  { type: Number, required: true },
  status: { type: String, enum: ['pending', 'preparing', 'delivered'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);