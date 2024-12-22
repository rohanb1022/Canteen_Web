import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; 
import List from "../components/List";

const Orderlist = () => {
  const [filter, setFilter] = useState("");

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

        {/* List Component */}
        <List filter={filter} />
      </div>
    </div>
  );
};

export default Orderlist;
