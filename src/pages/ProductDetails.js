import { useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  // In a real application, you would fetch the product details based on the ID
  const product = {
    id: id,
    name: "Sample Product",
    price: 9999,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "This is a sample product description. It would contain detailed information about the product.",
    rating: 4.5,
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-8">
        <div className="w-1/2">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white px-2 py-1 rounded-lg flex items-center mr-2">
              {product.rating} <Star className="ml-1 w-4 h-4" />
            </span>
            <span className="text-gray-500">1000+ ratings</span>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-4">
            ₹{product.price}
          </p>
          <p className="mb-6">{product.description}</p>
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg flex items-center">
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
