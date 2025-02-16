const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
