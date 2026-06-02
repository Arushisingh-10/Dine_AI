const router = require('express').Router();
const Order = require('../models/Order');

// Order place karo
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: '✅ Order placed!', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Orders fetch karo
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.menuItem');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;