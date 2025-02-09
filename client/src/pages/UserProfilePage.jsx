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

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p>Email: {user.email}</p>
            <button 
                onClick={() => {
                    logout();
                    navigate('/');
                }} 
                className="bg-red-600 text-white py-2 px-4 rounded mt-4"
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfilePage;
