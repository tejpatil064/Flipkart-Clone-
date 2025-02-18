import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SellerRegister = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shopName: "",
    address: "",
    password: "",
    confirmPassword: "", // added confirm password
  });
  const [otp, setOtp] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRequestOtp = async () => {
    if (!formData.name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/request-otp",
        {
          email: formData.email,
          name: formData.name,
        }
      );

      if (response.data.success) {
        setSuccess("OTP sent successfully. Please check your email.");
        setOtp(response.data.otp);
        setIsVerified(true); // Reset isVerified in case the user needs to input OTP again
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    if (otp !== userOTP) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    // Password validation
    if (!formData.password) {
      setError("Please enter a password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/sellersignup",
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          shopName: formData.shopName,
          address: formData.address,
          password: formData.password,
        }
      );

      if (response.data.success) {
        setSuccess("User registered successfully!");
        navigate(response.data.route);
      } else {
        setError(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-grow justify-center items-start py-2 px-6 mt-14 h-auto">
          <div className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg h-auto">
            {/* Left Section */}
            <div className="w-1/3 bg-blue-500 text-white flex flex-col justify-start items-start p-8">
              <h1 className="text-2xl font-bold mb-4">
                Heyy Seller!! Looks like you're new here!
              </h1>
              <p className="text-sm mb-8">
                Sign up with your email address to get started
              </p>
              <div className="w-42 justify-end items-end mt-32 mb-16">
                <img
                  src={"/images/loginimage.png" || "/placeholder.svg"}
                  alt="Login illustration"
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="w-2/3 bg-white flex flex-col justify-top items-top p-8">
              <div className="w-full max-w-md">
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Your Name
                </h2>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Email address
                </h2>
                <input
                  type="email"
                  placeholder="Enter Email address"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Phone Number
                </h2>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Shop Name
                </h2>
                <input
                  type="text"
                  placeholder="Enter Shop Name"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.shopName}
                  onChange={(e) =>
                    setFormData({ ...formData, shopName: e.target.value })
                  }
                />
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Enter Address
                </h2>
                <input
                  type="text"
                  placeholder="Enter Address"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
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
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <h2 className="text-sm font-normal text-gray-500 mb-2">
                  Confirm Password
                </h2>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <div className="flex items-center justify-between mt-4">
                  <button
                    className="w-full bg-blue-500 text-white font-normal mb-4 py-3 rounded"
                    onClick={handleRequestOtp}
                  >
                    Verify Email
                  </button>
                </div>
                {otp !== "" && (
                  <>
                    <h2 className="text-sm font-normal text-gray-500 mb-2">
                      Enter OTP
                    </h2>
                    <input
                      type="text"
                      placeholder="Enter The OTP"
                      className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                      value={userOTP}
                      onChange={(e) => setUserOTP(e.target.value)}
                    />
                  </>
                )}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && (
                  <p className="text-green-500 text-sm mb-4">{success}</p>
                )}
                <p className="text-sm text-gray-500">
                  By continuing, you agree to Flipkart's{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
                <button
                  className="w-full bg-orange-600 text-white font-normal py-3 mt-4 rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleRegister}
                  disabled={!isVerified}
                >
                  {isLoading ? "Please wait..." : "Register"}
                </button>
                <Link to="/sellerLogin">
                  <button className="w-full shadow-md bg-white text-blue-500 font-normal py-3 mt-4 rounded hover:bg-gray-50">
                    Existing Seller? Log in
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

export default SellerRegister;
