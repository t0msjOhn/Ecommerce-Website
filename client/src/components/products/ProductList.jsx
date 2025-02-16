import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const dispatch = useDispatch();
    const productState = useSelector((state) => state.product);
    const { products, loading, error } = productState;

    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [dispatch]);

    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Products</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                Array.isArray(products) && products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div key={product._id} className="border p-5 rounded flex items-center justify-center">
                                <div className="w-1/2 p-auto m-auto">
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                    <p className="text-lg">${product.price.toFixed(2)}</p>
                                    <Link
                                    to={`/products/${product._id}`}
                                    className="bg-blue-600 text-white py-1 px-2 rounded mt-2 inline-block"
                                    >
                                    View Details
                                    </Link>
                                </div>
                                <div className="w-1/2 flex items-center justify-center">
                                    <img src={product.image} alt={product.name} className="max-w-full max-h-full rounded-2xl"/>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products available.</p>
                )
            )}
        </div>
    );
};

export default ProductList;
