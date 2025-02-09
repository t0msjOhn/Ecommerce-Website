import { fetchProducts, fetchProductById } from '../../services/api';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCT_DETAIL_REQUEST = 'FETCH_PRODUCT_DETAIL_REQUEST';
export const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS';
export const FETCH_PRODUCT_DETAIL_FAILURE = 'FETCH_PRODUCT_DETAIL_FAILURE';

// Fetch Products
export const fetchProductsAction = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        const response = await fetchProducts();
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
};

// Fetch Product Detail
export const fetchProductDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_DETAIL_REQUEST });
        const response = await fetchProductById(id);
        dispatch({ type: FETCH_PRODUCT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_DETAIL_FAILURE, payload: error.message });
    }
};


// import { mockProducts } from '../../mockData';

// export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
// export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
// export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// export const FETCH_PRODUCT_DETAIL_REQUEST = 'FETCH_PRODUCT_DETAIL_REQUEST';
// export const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS';
// export const FETCH_PRODUCT_DETAIL_FAILURE = 'FETCH_PRODUCT_DETAIL_FAILURE';

// export const fetchProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: FETCH_PRODUCTS_REQUEST });

//         // Simulate fetching data with a delay
//         await new Promise(resolve => setTimeout(resolve, 500));

//         dispatch({
//             type: FETCH_PRODUCTS_SUCCESS,
//             payload: mockProducts,
//         });
//     } catch (error) {
//         dispatch({
//             type: FETCH_PRODUCTS_FAILURE,
//             payload: error.message,
//         });
//     }
// };

// export const fetchProductDetail = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: FETCH_PRODUCT_DETAIL_REQUEST });

//         // Simulate fetching data with a delay
//         await new Promise(resolve => setTimeout(resolve, 500));

//         const product = mockProducts.find((product) => product.id === parseInt(id));
//         if (product) {
//             dispatch({
//                 type: FETCH_PRODUCT_DETAIL_SUCCESS,
//                 payload: product,
//             });
//         } else {
//             throw new Error('Product not found');
//         }
//     } catch (error) {
//         dispatch({
//             type: FETCH_PRODUCT_DETAIL_FAILURE,
//             payload: error.message,
//         });
//     }
// };
