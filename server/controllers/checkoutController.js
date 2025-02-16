const Order = require('../models/Order'); // Import the Order model
const Cart = require('../models/Cart');
const sendEmail = require('../utils/sendEmail');

const createCheckout = async (req, res) => {
    const { phoneNumber, address, paymentMethod, cart } = req.body;

    if (!phoneNumber || !address || !paymentMethod || !cart || cart.length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            phoneNumber,
            address,
            paymentMethod,
            cart,
            status: 'Pending' // Set initial status to 'Pending'
        });

        await order.save();
        await Cart.findOneAndUpdate({ user: req.user._id }, { products: [] });

        // Send confirmation email
        const userEmail = req.user.email;
        const emailSubject = 'Order Confirmation';
        const emailText = `
            Thank you for your order!
            Phone Number: ${phoneNumber}
            Address: ${address}
            Payment Method: ${paymentMethod}
            Products: ${cart.map(item => `${item.product.name} (Quantity: ${item.quantity})`).join(', ')}
            Status: ${order.status}
        `;

        try {
            await sendEmail({
                to: userEmail,
                subject: emailSubject,
                text: emailText,
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCheckout,
};
