import './App.css';
import {lazy, Suspense, useEffect, useMemo} from 'react';
import ClientsList from "../clientsList/ClientsList";
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import RegistrationFormPage from "../pages/RegistrationFormPage";
import MainPage from "../pages/MainPage";
import AppHeader from "../appHeader/AppHeader";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {activeClientChange, activeUserChange, fetchAuth, selectAll} from "../../api/userSlice";
import store from "../../store";


function App() {
    //   const activeUser = useSelector(state => state.authUser.user);
      const activeClient = useSelector(state => state.authUser.client);
      const dispatch = useDispatch();

      const logout = async () => {
          await fetch('http://localhost:8000/logout/', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              credentials: 'include',
          });
          dispatch(activeUserChange(null))
          dispatch(activeClientChange(null))
      }

    // dispatch(activeUserChange(activeUser));
      return (
          <Router>
              <div className="app">
                  <AppHeader activeClient={activeClient} logout={logout}/>
                  <Suspense fallback={<Spinner/>}>
                      <main>
                          <Routes>
                              <Route path="/" element={<MainPage activeClient={activeClient}/>}/>
                              <Route path="/login" element={<RegistrationFormPage/>}/>
                              <Route path="/clients" element={<ClientsList/>}/>
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