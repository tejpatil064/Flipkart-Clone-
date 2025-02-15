import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider";

const Home = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image: "/images/TV.png",
      subcategories: [
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
    },
    {
      id: 2,
      name: "Mobiles",
      image: "/images/SmartPhone.png",
    },
    {
      id: 3,
      name: "Kilos",
      image: "/images/kilos.png",
    },
    {
      id: 4,
      name: "Fashon",
      image: "/images/fashon.png",
      subcategories: [
        "Men's Top Wear",
        "Men's Bottom Wear",
        "Women Ethnic Wear",
        "Men Footwear",
        "Women Footwear",
        "Wateches and Accessories",
        "Women Western Wear",
        "Bags, Suitcases & Luggage",
        "Kids Clothing",
        "Essentials",
        "Winter Wear",
      ],
    },
    {
      id: 5,
      name: "Home & Furniture",
      image: "/images/furniture.png",
      subcategories: [
        "Home Firnishings",
        "Furniture",
        "Living Room Furniture",
        "Kitchen & Dining",
        "Bedroom Furniture",
        "Space Saving Furniture",
        "Home Decor",
        "Tools & Utilities",
        "Work Space Furniture",
        "Kids Furniture",
        "Lightings & Electricals",
        "Cleaning & Bath",
        "Pet Gardening",
      ],
    },
    {
      id: 6,
      name: "Appliances",
      image: "/images/appliances.png",
    },
    {
      id: 7,
      name: "Flight Booking",
      image: "/images/flight.png",
    },
    {
      id: 8,
      name: "Beauty Toys & More",
      image: "/images/toys.png",
      subcategories: [
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
    },
    {
      id: 9,
      name: "Two Wheelers",
      image: "/images/twowheeler.png",
      subcategories: ["Petrol Vehicles", "Electric Vehicles"],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(null);

  // Set active category on hover
  const handleMouseEnter = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Remove active category when mouse leaves
  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <div className="py-1.5 w-full">
        <div className="bg-white shadow-sm p-6 px-20 w-full">
          <div className="grid grid-cols-2  sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 w-full h-26">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="block text-center items-center focus:outline-none hover:text-blue-500">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-18 h-16 object-cover rounded-lg mb-2  mx-auto"
                  />
                  <h2 className="text-sm font-semibold hover:text-blue-400">
                    {category.name}
                  </h2>
                </button>

                {/* Dropdown */}
                {activeCategory === category.name && category.subcategories && (
                  <div className="absolute top-24 left-0 bg-white shadow-lg rounded-sm p-4 w-48 z-10">
                    <ul className="space-y-3">
                      {category.subcategories.map((subcategory, index) => (
                        <li key={index}>
                          <Link
                            to={`/products?category=${category.name}&subcategory=${subcategory}`}
                            className="block text-sm text-gray-700 hover:text-blue-500"
                          >
                            {subcategory}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Slider />
    </>
  );
};

export default Home;
