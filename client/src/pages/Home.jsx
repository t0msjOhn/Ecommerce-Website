import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold my-4">Welcome to Our E-Commerce Store!</h1>
            <p className="text-lg my-4">Discover the best oversized T-shirts in town.</p>
            <Link className='font-medium text-blue-600 dark:text-blue-500 hover:underline' to="/products">Shop Now</Link>
        </div>
    );
};

export default Home;
