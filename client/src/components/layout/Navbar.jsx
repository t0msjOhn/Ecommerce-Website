import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartCount} = useCart();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleProfileClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/profile');
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">E-Commerce</Link>
                <button 
                    className="block md:hidden"
                    onClick={toggleNavbar}
                >
                    ☰
                </button>
                <div 
                    className={`${
                        isOpen ? 'block' : 'hidden'
                    } md:flex md:items-center w-full md:w-auto`}
                >
                    <Link to="/" className="block md:inline-block mt-2 md:mt-0 md:ml-4">Home</Link>
                    <Link to="/products" className="block md:inline-block mt-2 md:mt-0 md:ml-4">Products</Link>
                    <Link to="/cart" className="block md:inline-block mt-2 md:mt-0 md:ml-4">
                        Cart
                        {cartCount > 0 && (
                            <span className="ml-2 bg-red-600 rounded-full px-2 py-1 text-xs">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button 
                        onClick={handleProfileClick}
                        className="block md:inline-block mt-2 md:mt-0 md:ml-4"
                    >
                        Profile
                    </button>
                    {user && (
                        <button 
                            onClick={logout}
                            className="block md:inline-block mt-2 md:mt-0 md:ml-4 bg-red-600 text-white py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
