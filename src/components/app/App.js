import './App.css';
import {Suspense, useEffect, useState} from 'react';
import ClientsList from "../clientsList/ClientsList";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import RegistrationFormPage from "../pages/RegistrationFormPage";
import MainPage from "../pages/MainPage";
import {useDispatch} from "react-redux";
import {fetchLogin} from "../../api/userSlice";
import ProductListPage from '../pages/ProductListPage';
import AccountPage from '../pages/AccountPage';
import ProductItem from '../productItem/ProductItem';
import { useSelector } from 'react-redux';
import ClientCart from '../clientCart/ClientCart';
import Ordering from '../ordering/Ordering';
import ClientOrders from "../orders/ClientOrders";
import AppHeaderClient from '../appHeader/AppHeaderClient';
import AppHeaderAdmin from '../appHeader/AppHeaderAdmin';
import ProductReviewsClient from '../productReviews/ProductReviewsClient';
import ProductReviewsAdmin from '../productReviews/ProductReviewsAdmin';
import ReviewsClient from '../reviews/ReviewsClient';
import ReviewsAdmin from '../reviews/ReviewsAdmin';
import AdminOrders from '../orders/AdminOrders';


function App() {
    // const [role, setRole] = useState();
    const dispatch = useDispatch();
    const userAuthLoadingStatus = useSelector(state => state.authUser.userAuthLoadingStatus);
    const role = useSelector(state => state.authUser.role);
    const token = useSelector(state => state.authUser.token);

    useEffect(() => {
        if(userAuthLoadingStatus === 'login success' || userAuthLoadingStatus === 'idle'){
            dispatch(fetchLogin({'username': null, 'password': null, 'token': token ? token.jwt : null}))
        }
        }, [])

    // const

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
                            <Route path="/admin_orders" element={<AdminOrders/>}/>
                            <Route path="/reviews" element={<ReviewsClient/>}/>
                            <Route path="/admin_reviews" element={<ReviewsAdmin/>}/>
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