const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCheckout } = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', protect, createCheckout);

module.exports = router;
