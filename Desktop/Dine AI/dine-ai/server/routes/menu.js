const router = require('express').Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Item deleted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;