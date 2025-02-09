const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add', protect, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            const newCart = await Cart.create({
                user: req.user.id,
                products: [{ product: productId, quantity }],
            });
            return res.json(newCart);
        }

        const productExists = cart.products.find((p) => p.product.toString() === productId);
        if (productExists) {
            productExists.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Increase quantity
router.put('/increase/:productId', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const productIndex = cart.products.findIndex(product => product.product.toString() === req.params.productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Decrease quantity
router.put('/decrease/:productId', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const productIndex = cart.products.findIndex(product => product.product.toString() === req.params.productId);
        if (productIndex > -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1;
            } else {
                cart.products.splice(productIndex, 1);
            }
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove product from cart
router.delete('/remove/:productId', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        const productIndex = cart.products.findIndex(product => product.product.toString() === req.params.productId);
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
