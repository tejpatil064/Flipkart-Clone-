import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate here
import axios from "axios"; // Import axios to make API calls
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async () => {
    setErrorMessage("");

    try {
      const response = axios.post("http://localhost:3000/api/login", {
        formData,
      });
      toast.promise(response, {
        loading: "Logging in...",
        success: (data) => {
          navigate(data.data.route);
          return "Login Succesfull.";
        },
        error: (err) =>
          err.response.data.message || "Login failed. Please try again.",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="flex min-h-screen flex-col">
        {/* Main Container to Center the Form */}
        <div className="flex flex-grow justify-center items-start py-2 px-6 mt-14">
          <div className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg h-auto">
            {/* Left Section */}
            <div className="w-1/3 bg-blue-500 text-white flex flex-col justify-start items-start p-8">
              <h1 className="text-2xl font-bold mb-4">Login</h1>
              <p className="text-sm mb-8">
                Get access to your Orders, Wishlist, and Recommendations
              </p>
              <div className="w-42 justify-end items-end mt-32 mb-16">
                <img
                  src="/images/loginimage.png"
                  alt="Login illustration"
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="w-2/3 bg-white flex flex-col justify-top items-top p-8">
              <div className="w-full max-w-md">
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Email
                </h2>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Password
                </h2>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />

                {/* Display error message */}
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                <button
                  className="w-full bg-orange-600 text-white font-normal py-3 mt-4 rounded hover:bg-orange-600"
                  onClick={handleLogin}
                  disabled={!formData.email || !formData.password}
                >
                  Login
                </button>

                <Link to="/signup">
                  <button className="w-full bg-white text-blue-500 font-normal py-3 mt-44 rounded">
                    New to Flipkart? Create an account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
