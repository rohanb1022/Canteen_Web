
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

const Product = ({ product, toggleAvailability }) => {
  const [isAvailable, setIsAvailable] = useState(product.availability);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch latest availability when component mounts
  useEffect(() => {
    setIsAvailable(product.availability);
  }, [product.availability]);

  const updateAvailability = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.put(`/api/v1/products/${product._id}`, {
        availability: !isAvailable,
      });

      // Update state only after a successful backend update
      setIsAvailable((prev) => !prev);
      toggleAvailability(product._id, !isAvailable); // Update parent state
    } catch (error) {
      console.error("Error updating product availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
      <img
        src={product.img || "/placeholder-image.jpg"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <div className="mt-4">
        <span className="text-xl font-bold text-orange-500">₹{product.price}</span>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={updateAvailability}
          className={`px-4 py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-green-500"} ${
            isLoading ? "cursor-not-allowed" : "" } 
            ${ isAvailable ? "bg-green-500" : "bg-red-500" }`}
          disabled={isLoading}
        >
          {isAvailable ? "Available" : "Unavailable"}
        </button>
        <button 
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Special
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
    img: PropTypes.string,
  }).isRequired,
  toggleAvailability: PropTypes.func.isRequired,
};

export default Product;
