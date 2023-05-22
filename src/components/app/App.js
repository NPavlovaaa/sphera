import './App.css';
import {Suspense, useEffect} from 'react';
import ClientsList from "../clientsList/ClientsList";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import RegistrationFormPage from "../pages/RegistrationFormPage";
import MainPage from "../pages/MainPage";
import {useDispatch} from "react-redux";
import {fetchAuth} from "../../api/userSlice";
import ProductListPage from '../pages/ProductListPage';
import AccountPage from '../pages/AccountPage';
import ProductItem from '../products/productItem/ProductItem';
import { useSelector } from 'react-redux';
import ClientCart from '../clientCart/ClientCart';
import Ordering from '../orders/ordering/Ordering';
import ClientOrders from "../orders/clientOrders/ClientOrders";
import AppHeaderClient from '../appHeader/AppHeaderClient';
import AppHeaderAdmin from '../appHeader/AppHeaderAdmin';
import ProductReviewsClient from '../products/productReviews/ProductReviewsClient';
import ProductReviewsAdmin from '../products/productReviews/ProductReviewsAdmin';
import OrdersReviewListAdmin from '../reviews/reviewsAdmin/OrdersReviewListAdmin';
import AdminOrders from '../orders/adminOrders/AdminOrders';
import ProductListFavorites from "../products/productListFavorites/ProductListFavorites";
import OrdersReviewPage from "../pages/OrdersReviewPage";


function App() {
    const dispatch = useDispatch();
    const userAuthLoadingStatus = useSelector(state => state.authUser.userAuthLoadingStatus);
    const role = useSelector(state => state.authUser.role);
    const token = useSelector(state => state.authUser.token);

    useEffect(() => {
        if(userAuthLoadingStatus === 'login success' || userAuthLoadingStatus === 'idle'){
            dispatch(fetchAuth()).then(data => localStorage.setItem('ROLE', data.payload.user.role))
        }
    }, [userAuthLoadingStatus, token])

    return (
        <Router>
            <div className="app">
                {role && role === 1 ? <AppHeaderAdmin/> : <AppHeaderClient/>}
                <Suspense fallback={<Spinner/>}>
                    <main>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/login" element={<RegistrationFormPage/>}/>
                            <Route path="/clients" element={<ClientsList/>}/>
                            <Route path="/products" element={<ProductListPage/>}/>
                            <Route path="/products/:id" element={<ProductItem/>}/>
                            <Route path="/account" element={<AccountPage/>}/>
                            <Route path="/cart" element={<ClientCart/>}/>
                            <Route path="/ordering" element={<Ordering/>}/>
                            <Route path="/my_orders" element={<ClientOrders/>}/>
                            <Route path="/favorite" element={<ProductListFavorites/>}/>
                            <Route path="/admin_orders" element={<AdminOrders/>}/>
                            <Route path="/reviews" element={<OrdersReviewPage/>}/>
                            <Route path="/admin_reviews" element={<OrdersReviewListAdmin/>}/>
                            <Route path="/product_reviews" element={<ProductReviewsClient/>}/>
                            <Route path="/admin_product_reviews" element={<ProductReviewsAdmin/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;