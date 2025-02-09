import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import productReducer from './reducers/productReducer'; // Import your reducer

const store = configureStore({
    reducer: {
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: composeWithDevTools(),
});

export default store;
