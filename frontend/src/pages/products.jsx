import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import Product from '../components/Product';
import Sidebar from '../components/Sidebar';
import AddDishPopup from '../components/AddDishPopup';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await axiosInstance.get(`/api/v1/products?page=${currentPage}&limit=${itemsPerPage}`);
        setProducts(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Error fetching data'  , err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // ✅ Fix: Toggle availability properly
  const toggleAvailability = async (productId, currentStatus) => {
    try {
      const response = await axiosInstance.patch(`/api/v1/products/${productId}`, {
        available: !currentStatus,
      });

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, available: !currentStatus } : product
          )
        );
      }
    } catch (err) {
      console.error('Error updating product availability:', err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center text-xl font-bold text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-xl font-bold text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
      <Sidebar />
      <div className="flex-1 p-5">
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="mx-4 text-xl p-1 border-[2px] border-orange-400">{`page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Product List</h1>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
            onClick={() => setIsPopupOpen(true)}
          >
            + Add Dish
          </button>
        </div>

        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full p-2 border border-orange-400 rounded-md mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Food Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Product key={product._id} product={product} toggleAvailability={toggleAvailability} />
              ))}
            </div>
          </div>
        )}

      </div>

      {isPopupOpen && <AddDishPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default Products;


// import { useState, useEffect } from 'react';
// import { axiosInstance } from '../lib/axios'; 
// import Product from '../components/Product';
// import Sidebar from '../components/Sidebar';
// import AddDishPopup from '../components/AddDishPopup';

// const Products = () => {
//   const [products, setProducts] = useState([]); 
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const itemsPerPage = 8; 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(`/api/v1/products?page=${currentPage}&limit=${itemsPerPage}`);
//         setProducts(response.data.data || []); 
//         setTotalPages(response.data.totalPages);
//       } catch (err) {
//         setError('Error fetching data' , err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   // ✅ Function to add a product dynamically
//   const addProduct = (newProduct) => {
//     setProducts((prevProducts) => [newProduct, ...prevProducts]); // Add new product to state
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="text-center text-xl font-bold text-gray-700">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-xl font-bold text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="flex h-screen bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 ml-4">
//         {/* Title & Add Dish Button */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-orange-500">Product List</h1>
//           <button
//             className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
//             onClick={() => setIsPopupOpen(true)}
//           >
//             + Add Dish
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Search for a product..."
//             className="w-full p-2 border border-orange-400 rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Product List Section */}
//         {filteredProducts.length > 0 && (
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-orange-600 mb-4">Food Items</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <Product key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}  

//         {/* Pagination Controls */}
//         <div className="flex justify-center">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Previous
//           </button>
//           <span className="mx-4 text-xl">{`Page ${currentPage} of ${totalPages}`}</span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Add Dish Pop-up */}
//       {isPopupOpen && <AddDishPopup onClose={() => setIsPopupOpen(false)} onAdd={addProduct} />}
//     </div>
//   );
// };

// export default Products;
