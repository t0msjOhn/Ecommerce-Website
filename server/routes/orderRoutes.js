const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// Get orders for the logged-in user
router.get('/', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('cart.product', 'name price')
            .sort({ createdAt: -1 }); // Optional: sort orders by newest first
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
