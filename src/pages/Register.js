import { useState } from "react";
import { Link } from "react-router-dom";
import loginimage from "../images/loginimage.png";

// Simulated API calls
const api = {
  requestOtp: async (email) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
  verifyOtp: async (email, otp) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
  register: async (email) => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  },
};

const Register = () => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRequestOtp = async () => {
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(emailAddress)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.requestOtp(emailAddress);
      if (response.success) {
        setIsOtpVisible(true);
        setSuccess("OTP sent successfully. Please check your email.");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(emailAddress)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const verifyResponse = await api.verifyOtp(emailAddress, otp);
      if (verifyResponse.success) {
        const registerResponse = await api.register(emailAddress);
        if (registerResponse.success) {
          setSuccess("Registration successful! You can now log in.");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueClick = () => {
    if (isOtpVisible) {
      handleRegister();
    } else {
      handleRequestOtp();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Container to Center the Form */}
      <div className="flex flex-grow justify-center items-start py-2 px-6 mt-14 h-auto">
        <div className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg h-auto">
          {/* Left Section */}
          <div className="w-1/3 bg-blue-500 text-white flex flex-col justify-start items-start p-8">
            <h1 className="text-2xl font-bold mb-4">
              Looks like you're new here!
            </h1>
            <p className="text-sm mb-8">
              Sign up with your email address to get started
            </p>
            <div className="w-42 justify-end items-end mt-32 mb-16">
              <img
                src={loginimage || "/placeholder.svg"}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h2 className="text-sm font-normal text-gray-500 mb-2">
                Enter Email address
              </h2>
              <input
                type="email"
                placeholder="Enter Email address"
                className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              {isOtpVisible && (
                <>
                  <h2 className="text-sm font-normal text-gray-500 mb-2">
                    Enter OTP
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full h-12 p-3 border-b border-gray-300 rounded mb-4 hover:border-blue-500 focus:border-blue-500"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                className="w-full bg-orange-600 text-white font-normal py-3 mt-4 rounded hover:bg-orange-700 disabled:opacity-50"
                onClick={handleContinueClick}
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : isOtpVisible
                  ? "Register"
                  : "Continue"}
              </button>
              <Link to="/login">
                <button className="w-full shadow-md bg-white text-blue-500 font-normal py-3 mt-4 rounded hover:bg-gray-50">
                  Existing User? Log in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
