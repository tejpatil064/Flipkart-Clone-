import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import SellerHeader from "../components/SellerHeader";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productid: "",
    title: "",
    description: "",
    feature: [],
    category: "",
    subcategory: "",
    images: [],
    price: {
      amount: "",
      discount: "",
      final_price: "",
    },
    availability: true,
    shipping_details: {
      shipping_time: "2-4 business days",
      shipping_cost: "Free",
      return_policy: "30-day return policy",
    },
  });

  const [subcategories, setSubcategories] = useState([]);

  const categoriesMap = {
    Electronics: [
      "Audio",
      "Cameras & Accessories",
      "Computer Peripherals",
      "Gaming",
      "Health & Personal Care",
      "Laptop Accessories",
      "Mobile Accessory",
      "Power Banks",
      "Smart Home Automation",
      "Smart Wearables",
      "Storage",
      "Tablets",
    ],
    Mobile: ["Smartphones", "Feature Phones", "Mobile Accessories"],
    Kilos: ["Grocery", "Fruits & Vegetables", "Meat & Fish", "Dairy"],
    Fashion: [
      "Men's Top Wear",
      "Men's Bottom Wear",
      "Women Ethnic Wear",
      "Men Footwear",
      "Women Footwear",
      "Watches and Accessories",
      "Women Western Wear",
      "Bags, Suitcases & Luggage",
      "Kids Clothing",
      "Essentials",
      "Winter Wear",
    ],
    "Home & Furniture": [
      "Home Furnishings",
      "Furniture",
      "Living Room Furniture",
      "Kitchen & Dining",
      "Bedroom Furniture",
      "Space Saving Furniture",
      "Home Decor",
      "Tools & Utilities",
      "Workspace Furniture",
      "Kids Furniture",
      "Lightings & Electricals",
      "Cleaning & Bath",
      "Pet Gardening",
    ],
    Appliances: [],
    "Flight Booking": [],
    "Beauty Toys & More": [
      "Beauty & Personal Care",
      "Men's Grooming",
      "Food & Drinks",
      "Nutritions & Health Care",
      "Baby Care",
      "Toys & School Supplies",
      "Sports & Fitness",
      "Books",
      "Music",
      "Stationary & Office Supplies",
      "Auto Accessories",
      "Safety & Hygiene Essentials",
    ],
    "Two Wheelers": ["Petrol Vehicles", "Electric Vehicles"],
  };

  useEffect(() => {
    if (productData.category) {
      const categorySubcategories = categoriesMap[productData.category] || [];
      setSubcategories(categorySubcategories);
    }
  }, [productData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle array fields like features
    if (name === "feature") {
      const updatedFeatures = value.split(",").map((item) => item.trim());
      setProductData((prevData) => ({
        ...prevData,
        feature: updatedFeatures,
      }));
      return;
    }

    // Handle nested price data update
    if (name.startsWith("price.")) {
      const priceField = name.split(".")[1]; // Get the field like 'amount', 'discount', 'final_price'
      setProductData((prevData) => {
        const updatedPrice = {
          ...prevData.price,
          [priceField]: value,
        };

        // If updating amount or discount, calculate the final price
        if (priceField === "amount" || priceField === "discount") {
          const amount = parseFloat(updatedPrice.amount) || 0;
          const discount = parseFloat(updatedPrice.discount) || 0;
          const finalPrice = amount - (amount * discount) / 100;
          updatedPrice.final_price = finalPrice.toFixed(2); // Keep two decimal points
        }

        return {
          ...prevData,
          price: updatedPrice,
        };
      });
      return;
    }

    // Handle other regular fields
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const imageData = new FormData();
        imageData.append("file", files[i]);
        imageData.append("upload_preset", "practice");
        imageData.append("cloud_name", "dih4mkdr2");

        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dih4mkdr2/image/upload",
            {
              method: "POST",
              body: imageData,
            }
          );
          const data = await response.json();
          if (data.secure_url) {
            uploadedImages.push(data.secure_url);
          } else {
            console.error("Failed to upload image:", data);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...uploadedImages],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product Data:", productData);
    const resposne = await axios.post("http://localhost:3000/api/addproduct", {
      productData,
    });
    if (resposne.status) {
      alert("Product Added!");
    } else {
      alert("Chud gaye guru");
    }
  };

  return (
    <>
      <SellerHeader />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Product ID */}
          <div>
            <label
              htmlFor="productid"
              className="block text-sm font-medium text-gray-700"
            >
              Product ID
            </label>
            <input
              type="number"
              id="productid"
              name="productid"
              value={productData.productid}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product ID"
              required
            />
          </div>

          {/* Product Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
              required
            />
          </div>

          {/* Features */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="feature"
              className="block text-sm font-medium text-gray-700"
            >
              Features (comma-separated)
            </label>
            <input
              type="text"
              id="feature"
              name="feature"
              value={productData.feature.join(", ")}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter features"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {Object.keys(categoriesMap).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label
              htmlFor="subcategory"
              className="block text-sm font-medium text-gray-700"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={productData.subcategory}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          {/* Product Images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Product Images (Upload multiple images)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Display Uploaded Images */}
          {productData.images.length > 0 && (
            <div className="col-span-1 md:col-span-2 mt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Uploaded Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productData.images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div>
            <label
              htmlFor="price.amount"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price.amount"
              name="price.amount"
              value={productData.price.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="price.discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount (%)
            </label>
            <input
              type="number"
              id="price.discount"
              name="price.discount"
              value={productData.price.discount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter discount percentage"
            />
          </div>

          {/* Final Price */}
          <div>
            <label
              htmlFor="price.final_price"
              className="block text-sm font-medium text-gray-700"
            >
              Final Price
            </label>
            <input
              type="text"
              id="price.final_price"
              name="price.final_price"
              value={productData.price.final_price}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Final price"
            />
          </div>

          {/* Shipping Details */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="shipping_time"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Time
            </label>
            <input
              type="text"
              id="shipping_time"
              name="shipping_details.shipping_time"
              value={productData.shipping_details.shipping_time}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter shipping time"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="shipping_cost"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Cost
            </label>
            <input
              type="text"
              id="shipping_cost"
              name="shipping_details.shipping_cost"
              value={productData.shipping_details.shipping_cost}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter shipping cost"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="return_policy"
              className="block text-sm font-medium text-gray-700"
            >
              Return Policy
            </label>
            <input
              type="text"
              id="return_policy"
              name="shipping_details.return_policy"
              value={productData.shipping_details.return_policy}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter return policy"
            />
          </div>

          {/* Availability */}
          <div className="col-span-1 md:col-span-2 flex items-center">
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={productData.availability}
              onChange={() =>
                setProductData({
                  ...productData,
                  availability: !productData.availability,
                })
              }
              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="availability"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Available
            </label>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
