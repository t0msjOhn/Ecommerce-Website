import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserProfilePage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleViewOrders = () => {
        navigate('/orders');
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p>Email: {user.email}</p>
            <div className="mt-4">
                <button
                    onClick={handleViewOrders}
                    className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
                >
                    View Orders
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfilePage;
