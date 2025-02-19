import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/getAllProducts"
    );
    setProducts(response.data.products);
  };
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-4 gap-6">
          {products.length !== 0 ? (
            products.map((product) => (
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
                <h2 className="text-sm font-normal mb-1 truncate ">
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
            ))
          ) : (
            <div className="text-base align-middle items-center">
              Product Not Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
