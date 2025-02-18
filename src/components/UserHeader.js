import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, StoreIcon, User } from "lucide-react";

const UserHeader = () => {
  const [userName, setUserName] = useState(null);

  // Fetch user details from the backend (once the user is logged in)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/userProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add your authorization token or cookies here if needed
          },
        });

        const data = await response.json();
        if (data.success) {
          setUserName(data.user.name); // Set the logged-in user's name
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

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
          {userName && (
            <Link to="/login" className="flex items-center">
              <User className="mr-1" />
               Profile {userName} {/* Display the fetched name */}
            </Link>
          )}
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

export default UserHeader;
