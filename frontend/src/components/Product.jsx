import { useState } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../lib/axios';

const Product = ({ product, removeSpecialDish }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to delete the special dish when clicked on "Available"
  const deleteSpecialDish = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/v1/removeSpecialDish/${product._id}`); // Send DELETE request
      removeSpecialDish(product._id); // Remove it from the UI after successful deletion
    } catch (error) {
      console.error('Error deleting special dish:', error);
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
        <button
          onClick={deleteSpecialDish} // Call deleteSpecialDish on button click
          className={`px-4 py-2 rounded-lg ${isLoading ? 'bg-gray-400' : 'bg-green-500'} ${isLoading ? 'cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Available'}
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
    img: PropTypes.string,
  }).isRequired,
  removeSpecialDish: PropTypes.func.isRequired,
};

export default Product;
