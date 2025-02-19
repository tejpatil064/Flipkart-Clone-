import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4); // Limit to 4 products initially

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/getAllProducts"
    );
    setProducts(response.data.products);
  };

  // Group products by category
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category || "Uncategorized"; // Fallback to 'Uncategorized' if category is missing
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCategory(products);

  // Handle View More button click
  const handleViewMore = (category) => {
    setVisibleProducts((prev) =>
      prev === 4 ? groupedProducts[category].length : 4
    ); // Toggle between showing 4 or all products
  };

  return (
    <div className="container mx-auto py-8">
      {/* Render products grouped by category */}
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-8">
          {/* Category Name with View More Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            {groupedProducts[category].length > 4 && (
              <button
                onClick={() => handleViewMore(category)}
                className="text-blue-500 text-sm"
              >
                {visibleProducts === 4 ? "View More" : "View Less"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-6">
            {groupedProducts[category]
              .slice(0, visibleProducts) // Show only the visible number of products
              .map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="block border p-2 hover:shadow-md transition-shadow relative"
                >
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-yellow-300 text-black text-sm font-normal px-2 py-1">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-56 object-cover mb-2"
                  />
                  <h2 className="text-sm font-normal mb-1 truncate">
                    {product.title}
                  </h2>
                  <p className="text-xs text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="text-sm mb-1">
                    <span className="text-black-600 font-bold">
                      ₹{product.price.final_price}
                    </span>
                    <span className="line-through text-xs text-gray-500 ml-2">
                      ₹{product.price.amount}
                    </span>
                    <span className="text-xs text-green-600 font-semibold ml-2">
                      {product.price.discount}% off
                    </span>
                  </div>
                  <p className="text-xs text-blue-500">
                    Save extra with combo offers
                  </p>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
