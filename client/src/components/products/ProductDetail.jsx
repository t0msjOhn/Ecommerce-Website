import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetailAction } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart: addToCartContext } = useCart();
    const productDetailState = useSelector((state) => state.product.productDetail);
    const { product, loading, error } = productDetailState;
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);

    useEffect(() => {
        dispatch(fetchProductDetailAction(id));
    }, [dispatch, id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = user.token;
            await addToCartContext({ productId: id, quantity: 1 }, token);
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError('Error adding to cart. Please try again.');
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                product && (
                    <div>
                        <h2 className="text-2xl font-bold my-4">{product.name}</h2>
                        <img src={product.image} alt={product.name} className="w-full h-auto" />
                        <p className="my-4">{product.description}</p>
                        <p className="text-lg font-bold">
                            {product.price !== undefined ? `$${product.price.toFixed(2)}` : 'Price not available'}
                        </p>
                        {Error && <p className="text-red-500 mt-2">{Error}</p>}
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                        >
                            {Loading ? 'Adding to Cart...' : 'Add to Cart'}
                        </button>
                    </div>
                )
            )}
        </div>
    );
};

export default ProductDetail;
