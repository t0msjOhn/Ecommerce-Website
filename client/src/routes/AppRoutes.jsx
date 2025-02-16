import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import UserProfilePage from '../pages/UserProfilePage';
import SuccessPage from '../pages/SuccessPage';
import OrderTrackingPage from '../pages/OrderTrackingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage'
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext'; // Import CartProvider

const AppRoutes = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/products/:id" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/success" element={<SuccessPage />} />
                            <Route path="/orders" element={<OrderTrackingPage />} />
                            <Route path="/profile" element={<UserProfilePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Layout>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default AppRoutes;
