import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

/**
 * OrdersDisplay component to display prepared orders.
 * Utilizes a sidebar for navigation and auto-fetching of orders.
 */
const OrdersDisplay = () => {
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar visibility
  const [preparedOrders, setPreparedOrders] = useState([]); // State to store prepared orders

  // Effect to fetch prepared orders from the backend
    /**
     * Fetches prepared orders from the backend API
     * and updates the state.
     */
    useEffect(() => {
      /**
       * Fetch prepared orders from the backend API.
       * Updates the state with the fetched data.
       */
      const fetchPreparedOrders = async () => {
        try {
          // Send a GET request to fetch prepared orders
          const response = await axios.get("http://localhost:5000/api/v1/preparedOrder");
          
          // Log the fetched orders for debugging
          console.log("Fetched Orders:", response.data);
          
          // Update the state with the fetched orders
          setPreparedOrders(response.data);
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error("Error fetching prepared orders:", error);
        }
      };
    
      fetchPreparedOrders();
    
      // Auto-refresh orders every 10 seconds
      const interval = setInterval(fetchPreparedOrders, 10000);
      return () => clearInterval(interval);
    }, []);
    

  return (
    <div className="flex h-screen bg-gray-100">
      {showSidebar && <Sidebar />} {/* Sidebar for navigation */}

      <div className="flex-1 flex flex-col">
        {/* Header section */}
        <div className="flex items-center justify-between p-4 bg-orange-500 text-white shadow-md">
          <button
            onClick={() => setShowSidebar(!showSidebar)} // Toggle sidebar visibility
            className="p-2 bg-white text-orange-500 rounded-md shadow-md hover:bg-gray-100"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Prepared Orders</h1>
          <div></div> {/* Placeholder to balance flex */}
        </div>

        {/* Orders List section */}
        <div className="p-4 overflow-y-auto flex-grow">
          {preparedOrders.length === 0 ? (
            <p className="text-gray-600 text-center text-lg mt-10">No prepared orders yet.</p> // Message for no orders
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {preparedOrders.map((order) => (
                <div key={order._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-5xl font-semibold text-orange-600">
                    Order ID: {order._id.slice(-4)}
                  </h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default OrdersDisplay;

// import  { useState } from "react";
// import Sidebar from "../components/Sidebar";

// const OrdersDisplay = () => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div className="flex h-screen">
//       {showSidebar && <Sidebar />}

//       <div className="flex-1">
//         <div className="flex items-center justify-between p-4 bg-orange-400 text-white">
//           <button
//             onClick={() => setShowSidebar(!showSidebar)}
//             className="p-2 bg-white text-orange-400 rounded-md"
//           >
//             ☰
//           </button>
//           <div className="flex-1 flex justify-center">
//             <h1 className="text-xl font-bold">Order Prepared</h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrdersDisplay;
