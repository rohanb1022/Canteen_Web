import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, BellIcon } from "@heroicons/react/outline";

function OrderCard({ order, onUpdateStatus }) {
  const [markedItems, setMarkedItems] = useState([]);
  const [timeAgo, setTimeAgo] = useState("");
  const [orderStatus, setOrderStatus] = useState(order.status);

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const orderTime = new Date(order.orderDate);
      const diffInMinutes = Math.floor((now - orderTime) / (1000 * 60));
      setTimeAgo(`${diffInMinutes} min ago`);
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [order.orderDate]);

  const handleMarkItem = (itemIndex) => {
    setMarkedItems((prev) =>
      prev.includes(itemIndex) ? prev.filter((index) => index !== itemIndex) : [...prev, itemIndex]
    );
  };

  const handleUpdateStatus = async (status) => {
    await onUpdateStatus(order.orderId, status);
    setOrderStatus(status);
  };

  const groupedItems = order.items.reduce((acc, item) => {
    const key = item.foodName || "Unknown Food Item";
    acc[key] = acc[key] ? { ...item, count: acc[key].count + 1 } : { ...item, count: 1 };
    return acc;
  }, {});

  const foodItems = Object.values(groupedItems);

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col h-full">
      <div className="flex justify-between w-full">
        <p className="text-xl text-blue-500">Order ID: {order.orderId.slice(-4)}</p>
        <p className="text-lg text-gray-600">{timeAgo}</p>
      </div>
      <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString("en-GB")}</p>

      <div className="my-2 w-full flex-grow">
        {foodItems.length > 0 ? (
          foodItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0">
              <p className={`${markedItems.includes(i) ? "line-through text-gray-400" : ""} font-bold`}>
                {item.foodName} {item.count > 1 && `x${item.count}`}
              </p>
              <button
                className={`px-2 py-1 rounded-md ${markedItems.includes(i) ? "bg-blue-400" : "bg-orange-400"} text-white`}
                onClick={() => handleMarkItem(i)}
                aria-label={markedItems.includes(i) ? "Unmark" : "Mark"}
              >
                {markedItems.includes(i) ? "Unmark" : "Mark"}
              </button>
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </div>

      <p className="font-bold text-lg">Total: ₹{order.totalAmount.toFixed(2)}</p>

      <p className="text-md font-semibold text-gray-700">Status: <span className="text-blue-500">{orderStatus}</span></p>

      <div className="flex justify-center space-x-4 mt-4 pt-4 border-t">
        <button
          className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-500 transition"
          onClick={() => handleUpdateStatus("accepted")}
          aria-label="Accept order"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✔</span>{" "}
          {/* Increased size and black color */}
        </button>
        <button
          className="p-4 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-500 transition"
          onClick={() => handleUpdateStatus("rejected")}
          aria-label="Reject order"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✖</span>{" "}
          {/* Increased size and black color */}
        </button>
        <button
          className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
          onClick={() => handleUpdateStatus("prepared")}
          aria-label="Mark as prepared"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>🔔</span>{" "}
          {/* Increased size and black color */}
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
