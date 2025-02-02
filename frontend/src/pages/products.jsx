import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios'; // Import axios instance
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import AddSpecialDishPopup from '../components/AddSpecialDishPopup'; // Import the pop-up component

const Products = () => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to handle pop-up visibility

  useEffect(() => {
    axiosInstance.get('/api/v1/products') // Use axios instance for the request
      .then((response) => {
        const data = response.data;
        if (data.success && Array.isArray(data.data)) {
          setDishes(data.data);
        } else {
          setError('No products available');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Function to update availability in the parent component
  const updateAvailability = (id, status) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish._id === id ? { ...dish, availability: status } : dish
      )
    );
  };

  // Function to filter products based on search term
  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-xl font-bold text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-bold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 ml-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Product List</h1>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            onClick={() => setIsPopupOpen(true)}
          >
            + Add Special Dish
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for a product..."
            className="w-full p-2 border border-orange-400 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.length === 0 ? (
            <div>No products found.</div>
          ) : (
            filteredDishes.map((dish) => (
              <Product key={dish._id} product={dish} updateAvailability={updateAvailability} />
            ))
          )}
        </div>
      </div>

      {/* Add Special Dish Pop-up */}
      {isPopupOpen && <AddSpecialDishPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Products;
