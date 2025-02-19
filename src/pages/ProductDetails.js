import { useParams } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Star, TagIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/getProductById/${id}`
    );
    setProduct(response.data.product);

    if (response.data.product?.images?.length > 0) {
      setMainImage(response.data.product.images[0]);
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const toggleViewMore = () => {
    setShowAllFeatures((prevState) => !prevState);
  };

  if (!product) {
    return (
      <div className="text-center py-10">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto py-2">
        <div className="bg-white p-8">
          <div className="flex gap-8">
            <div className="flex gap-8">
              {/* Left column with smaller images */}
              <div className="flex flex-col gap-4 h-20 w-20">
                {product?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/placeholder.svg"}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-24 rounded-sm object-cover cursor-pointer"
                    onClick={() => handleImageClick(img)}
                  />
                ))}
              </div>
              <div className="w-3/4">
                <img
                  src={mainImage || "/placeholder.svg"} // Display the current main image
                  alt={product?.title}
                  className="w-80 h-80 rounded-sm object-cover"
                />
              </div>
            </div>

            <div className="w-1/2">
              <h1 className="text-xl font-medium mb-0.5">{product?.title}</h1>
              <p className="text-sm font-normal mb-2">{product?.description}</p>
              <div className="flex items-center mb-4 text-xs">
                <span className="bg-green-500 text-white px-1 py-0.5 rounded-sm flex items-center mr-2">
                  {product?.rating} 4.1 <Star className="ml-1 w-3 h-3" />
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  1000+ ratings & 2000 reviews
                </span>
              </div>
              <div className="text-sm font-medium text-green-600">
                {" "}
                Special Price
              </div>
              <div className="flex items-center">
                <p className="text-2xl font-medium  mr-1">
                  ₹{product?.price.final_price}
                </p>
                <p className="text-md font-normal text-gray-500 line-through mx-1">
                  ₹{product?.price.amount}{" "}
                </p>
                <span className="mx-1 text-green-600 text-md font-medium">
                  {product?.price.discount}% OFF
                </span>
              </div>
              <p className="mb-4 text-sm font-medium">
                Delivery upto {product?.shipping_details.shipping_time}
              </p>
              <div className="items-center space-y-1 mb-4">
                <div className="flex items-center space-x-2">
                  <TagIcon className="text-green-600 w-4 h-4" />
                  <p className="text-sm">
                    Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank
                    Credit Card T&C
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <TagIcon className="text-green-600 w-4 h-4" />
                  <p className="text-sm">
                    Bank Offer Flat ₹500 off on RuPay Credit Card on orders of
                    ₹15,000 & above
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <TagIcon className="text-green-600 w-4 h-4" />
                  <p className="text-sm">
                    Special Price Get extra 71% off (price inclusive of
                    cashback/coupon)
                  </p>
                </div>
              </div>
              <div className="items-center space-y-1 mb-4">
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-medium"> Features </p>
                </div>
                <ul className="list-disc pl-5">
                  {product?.feature?.slice(0, 5).map((feature, index) => (
                    <li key={index} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
                {product?.feature?.length > 5 && !showAllFeatures && (
                  <button
                    onClick={toggleViewMore}
                    className="text-sm text-blue-500 mt-2"
                  >
                    View More
                  </button>
                )}
                {showAllFeatures && (
                  <ul className="list-disc pl-5">
                    {product?.feature?.slice(5).map((feature, index) => (
                      <li key={index} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Buttons below the image */}
              <div className="flex gap-4 mt-6">
                <button className="bg-amber-500 text-white py-2 px-4 flex items-center w-full justify-center">
                  <ShoppingCart className="mr-2" /> Add to Cart
                </button>
                <button className="bg-orange-500 text-white py-2 px-4  flex items-center w-full justify-center">
                  <ShoppingBag className="mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
