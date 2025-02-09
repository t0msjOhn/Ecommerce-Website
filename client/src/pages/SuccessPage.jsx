import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="max-w-md mx-auto mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="mb-4">Thank you for your order. Your order has been placed successfully.</p>
            <Link to="/" className="bg-blue-600 text-white py-2 px-4 rounded">
                Back to Home
            </Link>
        </div>
    );
};

export default SuccessPage;
