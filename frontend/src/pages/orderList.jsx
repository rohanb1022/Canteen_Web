import  { useState , useEffect } from "react";
import Sidebar from "../components/Sidebar"; 
import List from "../components/List";
import { axiosInstance } from "../lib/axios"; // Import axios instance for making API calls

const Orderlist = () => {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Track the status filter
  const [orders, setOrders] = useState([]);
  // Fetch orders based on the selected status filter
  useEffect(() => {
    let query = statusFilter ? `?status=${statusFilter}` : "";
    // Make an API call to get orders based on the selected filter
    axiosInstance
      .get(`/api/v1/order-history${query}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [statusFilter]); // Re-run the effect when the statusFilter changes

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
        {/* Filter Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
              onChange={(e) => setStatusFilter(e.target.value)} // Handle status dropdown change
              value={statusFilter}
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="prepared">Prepared</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* List Component */}
        <List filter={filter} orders={orders} /> {/* Pass orders as prop */}
      </div>
    </div>
  );
};

export default Orderlist;
