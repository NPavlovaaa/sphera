import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../api/apiSlice";
import authUser from "../api/userSlice";
import getProduct from "../api/productSlice";
import getOrders from "../api/orderSlice";
import getCart from "../api/cartSlice";

// Server side with csurf middleware
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

const store = configureStore({
    reducer: {authUser, getProduct, getOrders, getCart, [apiSlice.reducerPath]: apiSlice.reducer,},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;