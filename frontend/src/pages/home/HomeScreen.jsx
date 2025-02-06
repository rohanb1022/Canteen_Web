import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import OrderCard from "../../components/OrderCard";
import { axiosInstance } from "../../lib/axios";

function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [foodItemsSummary, setFoodItemsSummary] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(""); // Added state for selected filter

  // Fetch orders and summarize food items
  useEffect(() => {
    axiosInstance
      .get("/api/v1/view-orders")
      .then((response) => {
        if (response.data) {
          setOrders(response.data);

          const summary = {};
          response.data.forEach((order) => {
            if (order.status !== "completed" && order.status !== "rejected") {
              order.items.forEach((item) => {
                if (!summary[item.foodName]) {
                  summary[item.foodName] = { count: item.quantity };
                } else {
                  summary[item.foodName].count += item.quantity;
                }
              });
            }
          });
          setFoodItemsSummary(summary);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload(); // Refreshes the page
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleOrderCountChange = (orderId, status) => {
    const order = orders.find((o) => o.orderId === orderId);
    if (order && (status === "completed" || status === "rejected")) {
      const updatedSummary = { ...foodItemsSummary };
      order.items.forEach((item) => {
        if (updatedSummary[item.foodName]) {
          updatedSummary[item.foodName].count -= item.quantity;
          if (updatedSummary[item.foodName].count <= 0) {
            delete updatedSummary[item.foodName]; // Remove item if count is zero
          }
        }
      });
      setFoodItemsSummary(updatedSummary);
    }

    // Remove the order from the list if it is completed or rejected
    if (status === "completed" || status === "rejected") {
      setOrders((prevOrders) => prevOrders.filter((order) => order.orderId !== orderId));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchesSearch = order.items.some((item) =>
      item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axiosInstance.put("/api/v1/update-status", { orderId, status });
      console.log(`Order ${orderId} marked as ${status}`);

      // Update the orders state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        )
      );

      // Only update the food items summary and remove card if the status is completed or rejected
      if (status === "completed" || status === "rejected") {
        handleOrderCountChange(orderId, status); // Update the food item summary
      }
    } catch (error) {
      console.error(`Error marking order ${orderId} as ${status}`, error);
    }
  };

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}

      <div className="flex-1">
        <div className="flex items-center justify-between p-4 bg-orange-400 text-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 bg-white text-orange-400 rounded-md"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Order Dashboard</h1>
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-md text-black"
          />
        </div>

        {/* Filter dropdown for order status */}
        {/* <div className="p-4">
          <label htmlFor="status-filter" className="mr-2">Filter by Status:</label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 rounded-md"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="prepared">Prepared</option>
            
            
          </select>
        </div> */}

<div className="p-4">
  <label htmlFor="status-filter" className="mr-2 text-lg font-semibold">Filter by Status:</label>
  <select
    id="status-filter"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="p-3 rounded-lg border-2 border-orange-400 bg-white text-orange-400 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-100 transition ease-in-out duration-200"
  >
    <option value="">All</option>
    <option value="pending">Pending</option>
    <option value="accepted">Accepted</option>
    <option value="prepared">Prepared</option>
  </select>
</div>

        <div className="flex">
          <div className="w-1/4 bg-orange-100 p-4">
            {Object.keys(foodItemsSummary).length > 0 ? (
              Object.entries(foodItemsSummary).map(([name, summary], index) => (
                <div
                  key={index}
                  className="bg-white p-4 mb-2 shadow-md rounded-md text-center"
                >
                  {name}{" "}
                  <span className="text-orange-400 font-bold">
                    x{summary.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No food items found</p>
            )}
          </div>

          <div className="flex-1 grid grid-cols-3 gap-4 p-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.orderId} // Unique key for each order
                  order={order}
                  onUpdateStatus={handleUpdateStatus} // Pass the function directly
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">No orders found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
