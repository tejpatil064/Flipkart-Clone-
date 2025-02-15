import React, { useState, useEffect } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 seconds for each slide
    return () => clearInterval(slideInterval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="bg-white w-full ">
      <div className="relative w-full h-64 md:h-full overflow-hidden ">
        {/* Images */}
        <div
          className="flex transition-transform ease-in-out duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((index) => (
            <img
              key={index}
              src={`images/slider${index + 1}.jpg`}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-20  bg-white p-2 rounded-sm shadow-lg hover:bg-gray-200"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-20 bg-white p-2 rounded-sm shadow-lg hover:bg-gray-200"
        >
          ▶
        </button>

        {/* Dots Outside */}
        <div className="flex justify-center items-center mt-2 mb-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full mx-1 ${
                currentSlide === index ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
