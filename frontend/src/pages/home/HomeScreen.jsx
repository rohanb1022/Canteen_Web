import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import OrderCard from "../../components/OrderCard";
import { axiosInstance } from "../../lib/axios";

function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [foodItemsSummary, setFoodItemsSummary] = useState({});

  // Fetch orders and summarize food items
  useEffect(() => {
    axiosInstance
      .get("/api/v1/view-orders")
      .then((response) => {
        if (response.data) {
          setOrders(response.data);
  
          const summary = {};
          response.data.forEach((order) => {
            order.foodItems.forEach((item) => {
              if (!summary[item.foodItemId.name]) {
                summary[item.foodItemId.name] = { count: item.quantity };
              } else {
                summary[item.foodItemId.name].count += item.quantity;
              }
            });
          });
          setFoodItemsSummary(summary);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  

  // Handlers for order actions
  const handleComplete = (orderId) => {
    console.log(`Order ${orderId} marked as complete`);
    // Implement backend call to update order status
  };

  const handleCancel = (orderId) => {
    console.log(`Order ${orderId} canceled`);
    // Implement backend call to update order status
  };

  const handlePending = (orderId) => {
    console.log(`Order ${orderId} marked as pending`);
    // Implement backend call to update order status
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  key={order._id}  // Make sure this is unique for each order
                  order={order}
                  onComplete={() => handleComplete(order._id)}
                  onCancel={() => handleCancel(order._id)}
                  onPending={() => handlePending(order._id)}
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
