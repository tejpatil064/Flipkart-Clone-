import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.js";
import ProductList from "./pages/ProductList.js";
import ProductDetails from "./pages/ProductDetails.js";
import SellerRegister from "./seller/SellerRegister.js";
import SellerLogin from "./seller/SelllerLogin.js";
import AddProduct from "./seller/AddProduct.js";
import UserHomePage from "./user/UserHomePage.js";
import { SellerHomePage } from "./seller/SellerHomePage.js";
import Cart from "./pages/Cart.js";
import { Home } from "./views/Home/index.jsx";
import CheckoutPage from "./pages/CheckoutPage.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/sellerRegister" element={<SellerRegister />} />
        <Route path="/sellerLogin" element={<SellerLogin />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/userhomepage" element={<UserHomePage />} />
        <Route path="/seller/dashboard" element={<SellerHomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
