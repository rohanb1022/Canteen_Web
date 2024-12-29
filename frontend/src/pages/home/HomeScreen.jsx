import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { axiosInstance } from "../../lib/axios";

function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]); // Stores fetched orders
  const [foodItemsSummary, setFoodItemsSummary] = useState({}); // Food item summaries for sidebar

  useEffect(() => {
    // Fetch orders using axiosInstance
    axiosInstance
      .get("/orders") // Endpoint relative to baseURL in axiosInstance
      .then((response) => {
        setOrders(response.data);

        // Create a summary of food items grouped by their IDs
        const summary = {};
        response.data.forEach((order) => {
          order.foodItems.forEach((item) => {
            if (!summary[item.foodItemId.name]) {
              summary[item.foodItemId.name] = {
                count: item.quantity,
              };
            } else {
              summary[item.foodItemId.name].count += item.quantity;
            }
          });
        });
        setFoodItemsSummary(summary);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      <div className="flex-1">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 bg-orange-400 text-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 bg-white text-orange-400 rounded-md"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Order Dashboard</h1>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Left Sidebar Items */}
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

          {/* Right Section */}
          <div className="flex-1 grid grid-cols-3 gap-4 p-4">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-md p-4 flex flex-col items-center"
                >
                  <p className="text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <div className="my-2">
                    {order.foodItems.map((item, i) => (
                      <div
                        key={i}
                        className="text-center mb-2 border-b pb-2 last:border-b-0"
                      >
                        <p className="font-bold">{item.foodItemId.name}</p>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="font-bold text-lg">
                    Total: ${order.totalAmount.toFixed(2)}
                  </p>
                  <div className="flex justify-around w-full mt-2">
                    <button className="p-2 bg-green-400 text-white rounded-md">
                      ✔ Complete
                    </button>
                    <button className="p-2 bg-red-400 text-white rounded-md">
                      ✖ Cancel
                    </button>
                    <button className="p-2 bg-yellow-400 text-white rounded-md">
                      Pending
                    </button>
                  </div>
                </div>
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
