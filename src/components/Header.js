import { Link } from "react-router-dom";
import { Search, ShoppingCart, StoreIcon, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 px-4 h-16">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo with Text and Image */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <span className="hidden sm:block text-2xl font-bold">Flipkart</span>
          <img src="/images/flipkart.png" alt="Flipkart" className="h-8" />
        </Link>

        {/* Desktop View with Search Bar and Text Links */}
        <div className="hidden sm:flex items-center space-x-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="py-1.5 px-4 rounded-md w-96 text-black"
            />
            <Search className="absolute right-3 top-1.5 text-blue-400" />
          </div>
          <Link to="/login" className="flex items-center">
            <User className="mr-1" />
            Login
          </Link>
          <Link to="/cart" className="flex items-center">
            <ShoppingCart className="mr-1" />
            Cart
          </Link>
          <Link to="/sellerRegister" className="flex items-center">
            <StoreIcon className="mr-1" />
            Become a Seller
          </Link>
        </div>

        {/* Mobile View with Only Icons */}
        <div className="sm:hidden flex items-center space-x-6">
          <Link to="/login">
            <User className="text-white" />
          </Link>
          <Link to="/cart">
            <ShoppingCart className="text-white" />
          </Link>
          <Link to="/sellerRegister">
            <StoreIcon className="text-white" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
