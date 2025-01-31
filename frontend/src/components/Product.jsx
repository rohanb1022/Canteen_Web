import  { useState } from 'react';
import PropTypes from 'prop-types'; // Adding PropTypes for better clarity
import {axiosInstance} from '../lib/axios'; // Import axios instance

const Product = ({ product, updateAvailability }) => {
  const [isAvailable, setIsAvailable] = useState(product.availability);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the click and update both frontend and backend
  const toggleAvailability = async () => {
    const updatedStatus = !isAvailable;
    setIsAvailable(updatedStatus);
    setIsLoading(true);
    setError(null);


    
    // Update the backend with the new availability status using axiosInstance
    try {
      const response = await axiosInstance.put(`/api/v1/products/${product._id}`, {
        availability: updatedStatus,
      });

      const data = response.data;
      if (!data.success) {
        throw new Error('Failed to update product availability');
      }

      // Optionally, trigger a callback function to refresh product data in the parent component (Products page)
      updateAvailability(product._id, updatedStatus);
    } catch (error) {
      console.error('Error updating product availability:', error);
      setError('Failed to update availability. Please try again.');
      // Optionally, revert to previous state if the backend update fails
      setIsAvailable(!updatedStatus);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200">
      <img
        src={product.img || '/placeholder-image.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <div className="mt-4">
        <span className="text-xl font-bold text-orange-500">₹{product.price}</span>
      </div>
      <div className="mt-4">
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        <button
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded-lg ${isAvailable ? 'bg-green-500' : 'bg-gray-400'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Updating...' : isAvailable ? 'Available' : 'Unavailable'}
        </button>
      </div>
    </div>
  );
};

// PropTypes for the Product component
Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    availability: PropTypes.bool.isRequired,
    img: PropTypes.string,
  }).isRequired,
  updateAvailability: PropTypes.func.isRequired,
};

export default Product;
