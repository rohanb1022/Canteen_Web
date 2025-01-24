import { useState, useEffect } from 'react';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';

const Products = () => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
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
        <h1 className="text-3xl font-bold text-orange-500 mb-6">Product List</h1>
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
    </div>
  );
};

export default Products;
