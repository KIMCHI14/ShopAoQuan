import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import ItemsSearch from './pages/ItemsSearch';
import HomeProduct from './pages/HomeProduct';
import About from './pages/About';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Account from './pages/Account';
import MyOrder from './pages/MyOrder';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* được gọi là outlet */}
            <Route index element={<HomePage />} />
            <Route path=':slug' element={<ProductDetail />} />
            <Route path='search' element={<ItemsSearch />} />
            <Route path='contact' element={<Contact />} />
            <Route path='products' element={<HomeProduct />} />
            <Route path='about' element={<About />} />
            <Route path='cart' element={<Cart />} />
            <Route path='checkout-success' element={<CheckoutSuccess />} />

            <Route path='checkout' element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
            <Route path='account' element={<PrivateRoutes><Account /></PrivateRoutes>} />
            <Route path='my-order' element={<PrivateRoutes><MyOrder /></PrivateRoutes>} />
            <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path='register' element={<OpenRoutes><Register /></OpenRoutes>} />
          </Route>
          {/* outlet end */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
