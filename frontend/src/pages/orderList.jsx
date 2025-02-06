


import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import List from "../components/List";
import { axiosInstance } from "../lib/axios";

const Orderlist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let query = `?page=${currentPage}&limit=10`;
    if (statusFilter) query += `&status=${statusFilter}`;

    axiosInstance
      .get(`/api/v1/order-history${query}`)
      .then((response) => {
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [statusFilter, currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // Refreshes the page
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
        {/* Pagination Controls (Moved to Top) */}
        <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-md">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by Order ID, Name, Email, Amount"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-300"
              onChange={(e) => setStatusFilter(e.target.value)}
              value={statusFilter}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="prepared">Prepared</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className={`px-4 py-2 rounded-lg shadow-md ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
            <button
              className={`px-4 py-2 rounded-lg shadow-md ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        <List searchQuery={searchQuery} orders={orders} />
      </div>
    </div>
  );
};

export default Orderlist;
