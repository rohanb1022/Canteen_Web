import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import OrderCard from "../../components/OrderCard";
import { axiosInstance } from "../../lib/axios";

function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [foodItemsSummary, setFoodItemsSummary] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedOrders, setHighlightedOrders] = useState({});

  // Fetch orders and summarize food items
  useEffect(() => {
    axiosInstance
      .get("/api/v1/view-orders")
      .then((response) => {
        if (response.data) {
          setOrders(response.data);

          const summary = {};
          response.data.forEach((order) => {
            order.items.forEach((item) => {
              if (!summary[item.foodName]) {
                summary[item.foodName] = { count: item.quantity };
              } else {
                summary[item.foodName].count += item.quantity;
              }
            });
          });
          setFoodItemsSummary(summary);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filtered orders based on the search query
  const filteredOrders = orders.filter((order) =>
    order.items.some((item) =>
      item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );


  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axiosInstance.put("/api/v1/update-status", { orderId, status });
      console.log(`Order ${orderId} marked as ${status}`);
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
