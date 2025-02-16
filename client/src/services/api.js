import axios from 'axios';

const API_URL = 'http://192.168.0.189:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const addProduct = (data, token) =>
    api.post('/products/add', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const fetchCart = (token) =>
    api.get('/cart', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
export const addToCart = (data, token) =>
    api.post('/cart/add', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    export const increaseCartQuantity = (productId, token) =>
        api.put(`/cart/increase/${productId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
    export const decreaseCartQuantity = (productId, token) =>
        api.put(`/cart/decrease/${productId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
    export const removeFromCart = (productId, token) =>
        api.delete(`/cart/remove/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    export const createCheckout = (data, token) =>
        api.post('/checkout', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    export const fetchOrders = (token) =>
        api.get('/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        

export default api;
