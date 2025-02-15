import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ProductList from "./pages/ProductList.js";
import ProductDetails from "./pages/ProductDetails.js";
import Home from "./pages/Home/index.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="bg-gray-100">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
