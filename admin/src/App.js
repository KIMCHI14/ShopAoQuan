import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import MainLayout from './components/MainLayout';
import AddCat from './pages/AddCat';
import CategoryList from './pages/CategoryList';
import AddBrand from './pages/AddBrand';
import BrandList from './pages/BrandList';
import Addproduct from './pages/AddProduct';
import ProductList from './pages/ProductList';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* bên trong mainlayout có outlet nhận các phần tử con làm children */}
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path='orders/:id' element={<ViewOrder/>} /> */}
          {/* <Route path='customers' element={<Customers/>} /> */}

          <Route path='category' element={<AddCat />} />
          <Route path='category/:id' element={<AddCat />} />
          <Route path='list-category' element={<CategoryList />} />

          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='list-brand' element={<BrandList />} />

          <Route path='product' element={<Addproduct />} />
          <Route path='list-product' element={<ProductList />} />
          <Route path='update-product/:id' element={<Addproduct />} />

          <Route path='orders' element={<Order />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
