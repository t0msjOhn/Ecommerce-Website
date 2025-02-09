import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
