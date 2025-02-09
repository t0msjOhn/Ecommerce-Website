import React, { createContext, useState, useContext } from 'react';
import {
    fetchCart,
    addToCart as addToCartAPI,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart as removeFromCartAPI,
    createCheckout
} from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = (cart) => {
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
    };

    const addToCart = async (product, token) => {
        await addToCartAPI(product, token);
        const response = await fetchCart(token);
        setCart(response.data.products);
        updateCartCount(response.data.products);
    };

    const increaseQuantity = async (productId, token) => {
        await increaseCartQuantity(productId, token);
        const response = await fetchCart(token);
        setCart(response.data.products);
        updateCartCount(response.data.products);
    };

    const decreaseQuantity = async (productId, token) => {
        await decreaseCartQuantity(productId, token);
        const response = await fetchCart(token);
        setCart(response.data.products);
        updateCartCount(response.data.products);
    };

    const removeFromCart = async (productId, token) => {
        await removeFromCartAPI(productId, token);
        const response = await fetchCart(token);
        setCart(response.data.products);
        updateCartCount(response.data.products);
    };

    const checkout = async (orderDetails, token) => {
        await createCheckout(orderDetails, token);
        setCart([]);
        setCartCount(0);
    };

    return (
        <CartContext.Provider value={{ cart,cartCount ,setCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
