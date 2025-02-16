import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart, checkout } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if(!user){
            navigate('/login');
        }
        const orderDetails = {
            phoneNumber,
            address,
            paymentMethod,
            cart,
        };

        try {
            const token = user.token;
            await checkout(orderDetails, token);

            // For now, we'll simply navigate to a success page
            navigate('/success');
        } catch (error) {
            console.error('Error creating checkout:', error);
            setError('Error creating checkout. Please try again.');
        }finally{
            setLoading(false);
        }
    };

    return (

        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Delivery Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
