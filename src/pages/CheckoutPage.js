import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CheckoutPage = () => {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const addresses = [
    {
      id: 1,
      name: "Tejas Patil",
      phone: "9881678837",
      tag: "HOME",
      address:
        "156 plot no. Vighnaharta colony in front of sharayu provision deopur dhule, Walwadi, Dhule, Maharashtra - 424002",
    },
    {
      id: 2,
      name: "Tejas Patil",
      phone: "7767000279",
      tag: "HOME",
      address:
        "39A rajsarathi colony near stadium deopur dhule, Walwadi, Dhule, Maharashtra - 424002",
    },
  ];

  return (
    <>
    <Header/>
      <div className="p-4">
        {/* Main Content */}
        <div className="flex flex-col mx-20 md:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1">
            {/* Login Section */}
            <div className="bg-white shadow rounded p-4 mb-4">
              <h2 className="font-medium text-base">1. LOGIN</h2>
              <div className="flex justify-between items-center mt-2">
                <p>Parth Patil +918380978837</p>
                <button className="text-blue-500">CHANGE</button>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white shadow rounded p-4 mb-4">
              <h2 className="font-medium text-base">2. DELIVERY ADDRESS</h2>

              {!showAddAddressForm ? (
                <>
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 rounded border ${
                        selectedAddress === address.id
                          ? "border-blue-500"
                          : "border-gray-300"
                      } mt-4`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                        />
                        <div>
                          <p className="font-semibold">
                            {address.name}{" "}
                            <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                              {address.tag}
                            </span>{" "}
                            {address.phone}
                          </p>
                          <p className="text-gray-600 mt-1">
                            {address.address}
                          </p>
                          {selectedAddress === address.id && (
                            <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">
                              DELIVER HERE
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    className="text-blue-500 mt-4"
                    onClick={() => setShowAddAddressForm(true)}
                  >
                    + Add a new address
                  </button>
                </>
              ) : (
                <div>
                  <h2 className="font-medium text-base mb-4">
                    ADD A NEW ADDRESS
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="10-digit mobile number"
                      className="w-full border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      className="w-full border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="Locality"
                      className="w-full border rounded p-2"
                    />
                    <textarea
                      placeholder="Address (Area and Street)"
                      className="w-full border rounded p-2"
                    ></textarea>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="City/District/Town"
                        className="w-full border rounded p-2"
                      />
                      <select className="w-full border rounded p-2">
                        <option value="">--Select State--</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="gujarat">Gujarat</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      placeholder="Landmark (Optional)"
                      className="w-full border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="Alternate Phone (Optional)"
                      className="w-full border rounded p-2"
                    />
                    <div className="flex gap-4">
                      <label>
                        <input type="radio" name="addressType" /> Home (All day
                        delivery)
                      </label>
                      <label>
                        <input type="radio" name="addressType" /> Work (10 AM -
                        5 PM)
                      </label>
                    </div>
                    <div className="flex gap-4">
                      <button className="bg-orange-500 text-white px-4 py-2 rounded">
                        SAVE AND DELIVER HERE
                      </button>
                      <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setShowAddAddressForm(false)}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3 bg-white shadow rounded p-4">
            <h2 className="font-semibold text-lg">PRICE DETAILS</h2>
            <div className="mt-4 text-sm">
              <div className="flex justify-between mb-2">
                <p>Price (2 items)</p>
                <p>₹439</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>Delivery Charges</p>
                <p className="text-green-600">FREE</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold mb-2">
                <p>Total Payable</p>
                <p>₹439</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CheckoutPage;
