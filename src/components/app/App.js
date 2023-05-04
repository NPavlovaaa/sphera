import './App.css';
import {Suspense, useEffect, useState} from 'react';
import ClientsList from "../clientsList/ClientsList";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import RegistrationFormPage from "../pages/RegistrationFormPage";
import MainPage from "../pages/MainPage";
import {useDispatch} from "react-redux";
import {fetchAuth} from "../../api/userSlice";
import ProductListPage from '../pages/ProductListPage';
import AccountPage from '../pages/AccountPage';
import ProductItem from '../productItem/ProductItem';
import { useSelector } from 'react-redux';
import ClientCart from '../clientCart/ClientCart';
import Ordering from '../ordering/Ordering';
import ClientOrders from "../clientOrders/clientOrders";
import AppHeaderClient from '../appHeader/AppHeaderClient';
import AppHeaderAdmin from '../appHeader/AppHeaderAdmin';
import ProductReviewsClient from '../productReviews/ProductReviewsClient';
import ProductReviewsAdmin from '../productReviews/ProductReviewsAdmin';
import ReviewsClient from '../reviews/ReviewsClient';
import ReviewsAdmin from '../reviews/ReviewsAdmin';


function App() {
    // const [role, setRole] = useState();
    const dispatch = useDispatch();
    const userAuthLoadingStatus = useSelector(state => state.authUser.userAuthLoadingStatus);
    const role = useSelector(state => state.authUser.role);


    useEffect(() => {
    if(userAuthLoadingStatus === 'login success' || userAuthLoadingStatus === 'idle'){
        dispatch(fetchAuth())
    }
    }, [userAuthLoadingStatus])

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
                            <Route path="/reviews" element={<ReviewsClient/>}/>
                            <Route path="/reviews_admin" element={<ReviewsAdmin/>}/>
                            <Route path="/product_reviews" element={<ProductReviewsClient/>}/>
                            <Route path="/product_reviews_admin" element={<ProductReviewsAdmin/>}/>
                        </Routes>
                    </main>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;


// let [data, setData] = useState(null);
//
// async function getData(){
//     let data = await fetch('http://localhost:8000/account/', {
//                 headers: {'Content-Type': 'application/json'},
//                 credentials: 'include',
//             }).then(response => response.json())
//
//     setData(data);
// }
//
// useEffect( () => {
//     getData();
// }, []);