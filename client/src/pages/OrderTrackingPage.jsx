import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchOrders } from '../services/api';

const OrderTrackingPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            if (!user) return;

            try {
                const token = user.token;
                const response = await fetchOrders(token);
                setOrders(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Error fetching orders: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, [user]);

    return (
        <div className="max-w-3xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded shadow">
                            <h3 className="text-xl font-bold mb-2">Order ID: {order._id}</h3>
                            <p className="mb-1">Status: {order.status}</p>
                            <p className="mb-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <div className="mt-2">
                                <h4 className="font-bold">Items:</h4>
                                <ul className="list-disc list-inside">
                                    {order.cart.map((item, index) => (
                                        <li key={index}>
                                            {item.product.name} - Quantity: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderTrackingPage;
