// import { useState, useEffect } from 'react';
// import { axiosInstance } from '../lib/axios'; // Import axios instance
// import Product from '../components/Product';
// import Sidebar from '../components/Sidebar';
// import AddSpecialDishPopup from '../components/AddSpecialDishPopup'; // Import the pop-up component

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [specialDishes, setSpecialDishes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch both products (normal food items) and special dishes
//         const [productsRes, specialDishesRes] = await Promise.all([
//           axiosInstance.get('/api/v1/products'),
//           axiosInstance.get('/api/v1/getSpecialDish'),
//         ]);

//         setProducts(productsRes.data.data || []);  // Set normal food items
//         setSpecialDishes(specialDishesRes.data.data || []); // Set special dishes
//       } catch (err) {
//         setError('Error fetching data', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Remove special dish from UI after deletion from database
//   const removeSpecialDish = (id) => {
//     setSpecialDishes((prev) => prev.filter((dish) => dish._id !== id));
//   };

//   // Filter products (non-special dishes) based on search term
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Filter special dishes based on search term
//   const filteredSpecialDishes = specialDishes.filter((dish) =>
//     dish.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="text-center text-xl font-bold text-gray-700">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-xl font-bold text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 ml-4">
//         {/* Title & Add Special Dish Button */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-orange-500">Product List</h1>
//           <button
//             className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
//             onClick={() => setIsPopupOpen(true)}
//           >
//             + Add Special Dish
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search for a product or special dish..."
//             className="w-full p-2 border border-orange-400 rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Non-Special Products Section */}
//         {filteredProducts.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-orange-600 mb-4">Food Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <Product key={product._id} product={product} removeSpecialDish={removeSpecialDish} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Special Dishes Section */}
//         {filteredSpecialDishes.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-orange-600 mb-4">Special Dishes</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredSpecialDishes.map((dish) => (
//                 <Product key={dish._id} product={dish} removeSpecialDish={removeSpecialDish} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add Special Dish Pop-up */}
//       {isPopupOpen && <AddSpecialDishPopup onClose={() => setIsPopupOpen(false)} />}
//     </div>
//   );
// };

// export default Products;


import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios'; // Import axios instance
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import AddSpecialDishPopup from '../components/AddSpecialDishPopup'; // Import the pop-up component

const Products = () => {
  const [products, setProducts] = useState([]); // For regular products
  const [specialDishes, setSpecialDishes] = useState([]); // For special dishes
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8; // You can adjust the number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both products (regular) and special dishes with pagination
        const [productsRes, specialDishesRes] = await Promise.all([
          axiosInstance.get(`/api/v1/products?page=${currentPage}&limit=${itemsPerPage}`),
          axiosInstance.get('/api/v1/getSpecialDish'),
        ]);

        setProducts(productsRes.data.data || []); // Set products
        setSpecialDishes(specialDishesRes.data.data || []); // Set special dishes
        setTotalPages(productsRes.data.totalPages); // Set total pages for pagination
      } catch (err) {
        setError('Error fetching data' , err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes

  const removeSpecialDish = (id) => {
    setSpecialDishes((prev) => prev.filter((dish) => dish._id !== id)); // Remove from UI
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpecialDishes = specialDishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-xl font-bold text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-bold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
      <Sidebar />
      <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 ml-4">
        {/* Title & Add Special Dish Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Product List</h1>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            onClick={() => setIsPopupOpen(true)}
          >
            + Add Special Dish
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for a product or special dish..."
            className="w-full p-2 border border-orange-400 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Product List Section */}
        {filteredProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Food Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Product key={product._id} product={product} removeSpecialDish={removeSpecialDish} />
              ))}
            </div>
          </div>
        )}

        {/* Special Dishes Section */}
        {filteredSpecialDishes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Special Dishes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSpecialDishes.map((dish) => (
                <Product key={dish._id} product={dish} removeSpecialDish={removeSpecialDish} />
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="mx-4 text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Special Dish Pop-up */}
      {isPopupOpen && <AddSpecialDishPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Products;
