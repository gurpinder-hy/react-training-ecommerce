import './App.css';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Product from './pages/Product';
import { useEffect, useState } from 'react';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import store from './redux/store';
import { useDispatch } from 'react-redux';
import { logout } from './redux/cart.actions';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    store.subscribe(() => {
      setCart(store.getState().cart)
      let user = store.getState().cart.user
      if (user && user.name) {
        setIsLoggedIn(true)
        setUser({ ...user })
      } else {
        setIsLoggedIn(false)
        setUser({})
      }
    });
  }, [])

  return (
    <BrowserRouter basename='/react-training-ecommerce'>
      <nav style={{
        position: 'fixed',
        zIndex: '999',
        width: '100%',
        top: 0
      }} className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink activeclassname='active' className="nav-link" to="/home" >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname='active' className="nav-link" to="/products/mens" >Men</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname='active' className="nav-link" to="/products/womens" >Women</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname='active' className="nav-link" to="/products/jackets" >Jackets</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname='active' className="nav-link" to="/products/sneakers" >Sneakers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname='active' className="nav-link" to="/products/hats" >Hats</NavLink>
              </li>
            </ul>
            <div className="form-inline my-2 my-lg-0">
              <NavLink className="btn btn-outline-success my-2 my-sm-0 me-2" to="/checkout">Cart <span className="badge badge-dark">{cart && cart.items ? cart.items.length : 0}</span></NavLink>
            </div>
            <div className="form-inline my-2 my-lg-0">
              {user.name ? <button className="btn btn-outline-success ml-4 ms-2 my-sm-0" onClick={() => dispatch(logout())} >Logout <span className="badge badge-dark">{user.name}</span></button>
                : <NavLink className="btn btn-outline-success ml-4 ms-2 my-sm-0" to="/Login" >Login</NavLink>}
            </div>
          </div>
        </div>
      </nav>
      <div className='main' style={{ paddingTop: 10 }}>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products/:type" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
