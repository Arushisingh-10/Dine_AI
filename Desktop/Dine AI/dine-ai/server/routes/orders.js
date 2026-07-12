const router = require('express').Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { items, total, status } = req.body;
    
    const order = new Order({
      user: req.body.user || '000000000000000000000000',
      items: items || [],
      total: total || 0,
      status: status || 'pending'
    });
    
    await order.save();
    res.json({ message: '✅ Order placed!', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('items.menuItem')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;