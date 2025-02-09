import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { user } = useAuth();
    const { cart, setCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCart = async () => {
            if (!user){
                setLoading(false);
                return;
            } 

            try {
                const token = user.token;
                console.log('Fetching cart with token:', token);
                const response = await fetchCart(token);
                console.log('Cart response:', response.data);

                if (response.data && response.data.products) {
                    setCart(response.data.products);
                    setError(null);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setError('Unexpected response structure');
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setError('Error fetching cart: ' + error.message);
                setLoading(false);
            }
        };

        getCart();
    }, [user, setCart]);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 gap-4">
                        {cart.map((item, index) => (
                            <div key={index} className="border p-4 rounded">
                                <h3 className="text-xl font-bold">{item.product.name}</h3>
                                <p className="text-lg">${item.product.price.toFixed(2)}</p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => decreaseQuantity(item.product._id, user.token)}
                                        className="bg-red-600 text-white py-1 px-3 rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.product._id, user.token)}
                                        className="bg-green-600 text-white py-1 px-3 rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.product._id, user.token)}
                                        className="bg-gray-600 text-white py-1 px-3 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
