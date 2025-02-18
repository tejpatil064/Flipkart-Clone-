import React from "react";

const ProductSuggestions = () => {
  const sections = [
    {
      title: "Suggested Items",
      items: [
        {
          image: "https://via.placeholder.com/150",
          name: "JEWELS GURU Brass Gold-plated Necklace",
          price: "₹232",
          originalPrice: "₹2,300",
          discount: "90% off",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "KUKRAIL Brass Gold-plated Necklace",
          price: "₹198",
          originalPrice: "₹2,499",
          discount: "92% off",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "GRSMGlobalTrade Necklace Set",
          price: "₹251",
          originalPrice: "₹999",
          discount: "75% off",
        },
      ],
    },
    {
      title: "More to Explore",
      items: [
        {
          image: "https://via.placeholder.com/150",
          name: "Fastrack Revoltt FS1",
          price: "₹1,149",
          originalPrice: "₹3,995",
          discount: "71% off",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Fastrack Revoltt X-1",
          price: "₹1,499",
          originalPrice: "₹2,799",
          discount: "46% off",
        },
      ],
    },
    {
      title: "Top Rated",
      items: [
        {
          image: "https://via.placeholder.com/150",
          name: "The Psychology of Money",
          label: "Grab Or Gone",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Messenger Bags",
          label: "New Collection",
        },
        {
          image: "https://via.placeholder.com/150",
          name: "Dark Fantasy Choco Treat",
          label: "Top Deals",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
      {sections.map((section, index) => (
        <div key={index} className="bg-white shadow p-4">
          <h2 className="text-xl font-medium mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <h3 className="text-sm font-medium mt-2">{item.name}</h3>
                {item.price && (
                  <p className="text-sm text-gray-500 line-through">
                    {item.originalPrice}
                  </p>
                )}
                {item.price && (
                  <p className="text-sm text-green-600 font-bold">
                    {item.price}
                  </p>
                )}
                {item.discount && (
                  <p className="text-xs text-red-500">{item.discount}</p>
                )}
                {item.label && (
                  <p className="text-xs text-blue-600 font-medium">
                    {item.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSuggestions;
