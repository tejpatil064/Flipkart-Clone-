import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Cart = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Ryme Yellow Westeria Artificial Flower",
      price: 198,
      originalPrice: 799,
      discount: 75,
      quantity: 1,
      seller: "Ryme",
      delivery: "Tue Feb 25",
      deliveryCharge: 40,
      isAssured: true,
    },
    {
      id: 2,
      name: "Flipkart SmartBuy 69 cm Wall Decals",
      price: 238,
      originalPrice: 1798,
      discount: 86,
      quantity: 1,
      seller: "Rawpockets",
      delivery: "Sat Feb 22",
      deliveryCharge: 80,
      isAssured: false,
    },
  ]);

  const [insurance, setInsurance] = useState({
    name: "Digital Suraksha for Rs 10000 by Bajaj Allianz",
    price: 20,
    originalPrice: 40,
    discount: 50,
    duration: "1 Month",
  });

  // User information state
  const [user, setUser] = useState({
    name: "John Doe",
    address: "1234 Elm Street, Springfield, IL",
  });

  // Calculate price details
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (total, item) => total + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const handleChangeAddress = () => {
    const newAddress = prompt("Please enter your new address:");
    if (newAddress) {
      setUser((prevUser) => ({
        ...prevUser,
        address: newAddress,
      }));
    }
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-6 mx-20">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white shadow p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">
              Flipkart ({cartItems.length})
            </h2>

            {/* User Info */}
            <div className="mb-4">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-600">{user.address}</p>
              <button
                onClick={handleChangeAddress}
                className="text-blue-500 mt-2"
              >
                Change Address
              </button>
            </div>

            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="border-b pb-4 mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://via.placeholder.com/100"
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">Seller: {item.seller}</p>
                      <p className="text-gray-600">
                        Delivery by {item.delivery} | ₹{item.deliveryCharge}{" "}
                        {item.deliveryCharge === 0 ? "Free" : ""}
                      </p>
                      {item.isAssured && (
                        <p className="text-blue-600 text-sm font-medium">
                          Assured
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-green-600 font-medium mt-2">
                        ₹{item.price} ({item.discount}% Off)
                      </p>
                      <div className="flex gap-4 text-sm mt-2">
                        <button className="text-blue-500">
                          Save for Later
                        </button>
                        <button className="text-red-500">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Insurance Section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold">Add Item</h3>
              <div className="flex items-center gap-4 mt-2">
                <img
                  src="https://via.placeholder.com/100"
                  alt={insurance.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{insurance.name}</p>
                  <p className="text-gray-600">{insurance.duration}</p>
                  <p className="text-green-600">
                    ₹{insurance.price} ({insurance.discount}% Off)
                  </p>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Price Details Section */}
          <div className="w-full md:w-1/3 bg-white shadow p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Price Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p>Price ({cartItems.length} items)</p>
                <p>₹{totalPrice}</p>
              </div>
              <div className="flex justify-between text-green-600">
                <p>Discount</p>
                <p>- ₹{totalDiscount}</p>
              </div>
              <div className="flex justify-between">
                <p>Platform Fee</p>
                <p>₹3</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <p>Total Amount</p>
                <p>₹{totalPrice - totalDiscount + 3}</p>
              </div>
            </div>
            <p className="text-green-600 mt-4">
              You will save ₹{totalDiscount} on this order
            </p>
            <button className="bg-orange-500 text-white w-full mt-4 py-2 rounded">
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;