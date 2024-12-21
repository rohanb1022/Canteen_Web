import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; 

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

 
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("https://api.example.com/orders"); // Replace with your API endpoint
      const data = await response.json();
      setOrders(data); // Assuming `data` contains an array of orders
    };

    fetchOrders();
  }, []);

  // Filter orders dynamically
  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(filter.toLowerCase()) ||
      order.id.toString().includes(filter)
  );

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
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Prepared">Prepared</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-orange-500 text-white text-left">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Item</th>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-orange-50 ${
                    index % 2 === 0 ? "bg-orange-100" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3">{order.id}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Prepared"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">{order.item}</td>
                  <td className="px-6 py-3">{order.customer}</td>
                  <td className="px-6 py-3">{order.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-orange-200">
            1
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-orange-200">
            2
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-orange-200">
            3
          </button>
          <span className="px-4 py-2 text-gray-500">...</span>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-orange-200">
            10
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderlist;
