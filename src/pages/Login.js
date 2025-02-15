import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate here
import loginimage from "../images/loginimage.png";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpVerificationStatus, setOtpVerificationStatus] = useState(null);

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const mockDatabase = ["user1@example.com", "user2@example.com"]; // Mock email list
  const mockOtp = "1234"; // Mock OTP, this should come from the backend in real life

  const handleRequestOtp = () => {
    // Simulate checking email existence in the database
    if (mockDatabase.includes(emailAddress)) {
      setOtpSent(true);
      setIsOtpVisible(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Email not registered.");
      setOtpSent(false);
      setIsOtpVisible(false);
    }
  };

  const handleOtpVerification = () => {
    // Simulate OTP verification
    if (otp === mockOtp) {
      setOtpVerificationStatus("success");
      navigate("/home"); // Use navigate to redirect to the home page
    } else {
      setOtpVerificationStatus("failed");
      setErrorMessage("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col ">
      {/* Main Container to Center the Form */}
      <div className="flex flex-grow justify-center items-start py-2 px-6 mt-14 ">
        <div className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg h-[70vh]">
          {/* Left Section */}
          <div className="w-1/3 bg-blue-500 text-white flex flex-col justify-start items-start p-8">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <p className="text-sm mb-8">
              Get access to your Orders, Wishlist, and Recommendations
            </p>
            <div className="w-42 justify-end items-end mt-32 mb-16">
              <img
                src={loginimage}
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
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)} // Store entered email
              />

              {/* Show OTP input if OTP is sent */}
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
                    onChange={(e) => setOtp(e.target.value)} // Store entered OTP
                  />
                </>
              )}

              {/* Display error message */}
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}

              <button
                className="w-full bg-orange-600 text-white font-normal py-3 mt-4 rounded hover:bg-orange-600"
                onClick={otpSent ? handleOtpVerification : handleRequestOtp}
              >
                {otpSent ? "Verify OTP" : "Request OTP"}
              </button>

              <Link to="/register">
                <button className="w-full bg-white text-blue-500 font-normal py-3 mt-44 rounded">
                  New to Flipkart? Create an account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
