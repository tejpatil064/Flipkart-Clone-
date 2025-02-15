import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: 'Noise Colorfit Icon 2.8"',
      description: "Black strap, Free size",
      price: 1049,
      oldPrice: 5999,
      discount: "82% off",
      badge: "Sponsored",
      image: watch,
    },
    {
      id: 2,
      name: 'Noise Colorfit Icon 2.8" Blue',
      description: "Blue strap, Free size",
      price: 1099,
      oldPrice: 5999,
      discount: "81% off",
      badge: "Sponsored",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: 'Fastrack Pro with 1.43"',
      description: "Sleek design, Waterproof",
      price: 1999,
      oldPrice: 5995,
      discount: "66% off",
      badge: "",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Fastrack Revolt FS1 Pro",
      description: "Fitness tracker, Heart rate monitor",
      price: 1799,
      oldPrice: 7995,
      discount: "77% off",
      badge: "Flipkart's Choice",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Smart Watches</h1>
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block border p-2 hover:shadow-md transition-shadow relative"
          >
            {product.badge && (
              <span className="absolute top-2 left-2 bg-yellow-300 text-black text-sm font-normal px-2 py-1">
                {product.badge}
              </span>
            )}
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-56 object-cover mb-2"
            />
            <h2 className="text-sm font-semibold mb-1 truncate">
              {product.name}
            </h2>
            <p className="text-xs text-gray-600 mb-2">{product.description}</p>
            <div className="text-base mb-1">
              <span className="text-black-600 font-bold">₹{product.price}</span>
              <span className="line-through text-gray-500 ml-2">
                ₹{product.oldPrice}
              </span>
              <span className="text-sm text-green-600 font-semibold ml-2">
                {product.discount}
              </span>
            </div>
            <p className="text-xs text-blue-500">
              Save extra with combo offers
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
