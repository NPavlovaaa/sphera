import './App.css';
import {Suspense, useEffect} from 'react';
import ClientsList from "../clientsList/ClientsList";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import RegistrationFormPage from "../pages/RegistrationFormPage";
import MainPage from "../pages/MainPage";
import AppHeader from "../appHeader/AppHeader";
import {useDispatch} from "react-redux";
import {fetchAuth, fetchClient} from "../../api/userSlice";
import ProductListPage from '../pages/ProductListPage';
import AccountPage from '../pages/AccountPage ';
import ProductItem from '../productItem/ProductItem';


function App() {
      const dispatch = useDispatch();

      useEffect(() => {
          dispatch(fetchAuth())
          dispatch(fetchClient())
      }, [])

      return (
          <Router>
              <div className="app">
                  <AppHeader/>
                  <Suspense fallback={<Spinner/>}>
                      <main>
                          <Routes>
                              <Route path="/" element={<MainPage/>}/>
                              <Route path="/login" element={<RegistrationFormPage/>}/>
                              <Route path="/clients" element={<ClientsList/>}/>
                              <Route path="/products" element={<ProductListPage/>}/>
                              <Route path="/products/:id" element={<ProductItem/>}/>
                              <Route path="/account" element={<AccountPage/>}/>
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