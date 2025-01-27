import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, BellIcon } from "@heroicons/react/outline"; // Import Heroicons

function OrderCard({ order, onUpdateStatus }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    // Calculate the "time ago" string
    const calculateTimeAgo = () => {
      const now = new Date();
      const orderTime = new Date(order.orderDate);
      const diffInMinutes = Math.floor((now - orderTime) / (1000 * 60));
      setTimeAgo(`${diffInMinutes} min ago`);
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute
    return () => clearInterval(interval); // Clean up on unmount
  }, [order.orderDate]);

  const handleStatus = async (status) => {
    await onUpdateStatus(order.orderId, status); // Update the database
    setOrderStatus(status); // Update local state
  };

  const getCardStyle = () => {
    switch (orderStatus) {
      case "rejected":
        return "bg-red-100 border-red-500";
      case "accepted":
        return "bg-yellow-100 border-yellow-500";
      case "prepared":
        return "bg-blue-100 border-blue-500";
      case "completed":
        return "bg-green-100 border-green-500";
      default:
        return "bg-white border-gray-300";
    }
  };

  // Group food items by name to display the count
  const groupedItems = order.items.reduce((acc, item) => {
    const key = item.foodName || "Unknown Food Item";
    if (acc[key]) {
      acc[key].count += item.quantity || 1;
    } else {
      acc[key] = { ...item, count: item.quantity || 1 };
    }
    return acc;
  }, {});

  const foodItems = Object.values(groupedItems);

  return (
    <div className={`border rounded-md shadow-md p-4 flex flex-col ${getCardStyle()}`}>
      {/* Order ID and Time Ago */}
      <div className="flex justify-between w-full">
        <p className="text-xl text-blue-500">Order ID: {order.orderId.slice(-4)}</p>
        <p className="text-lg text-gray-600">{timeAgo}</p>
      </div>

      {/* Order Date and Status */}
      <p className="text-sm text-gray-500">
        {new Date(order.orderDate).toLocaleDateString("en-GB")}
      </p>
      <p className="text-md font-semibold text-gray-700">
        Status: <span className="text-blue-500">{orderStatus}</span>
      </p>

      {/* Food Items */}
      <div className="my-2 flex-1">
        {foodItems.length > 0 ? (
          foodItems.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0">
              <p className="font-bold">
                {item.foodName} {item.count > 1 && `x${item.count}`}
              </p>
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </div>

      {/* Total Amount */}
      <p className="font-bold text-lg">Total: ₹{order.totalAmount.toFixed(2)}</p>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-center space-x-4 pt-4 border-t">
        {orderStatus === "pending" && (
          <>
            <button
              className="p-4 bg-green-400 text-white rounded-full shadow-lg hover:bg-green-500 transition"
              onClick={() => handleStatus("accepted")}
              aria-label="Accept order"
            >
              <CheckCircleIcon className="h-8 w-8" />
            </button>
            <button
              className="p-4 bg-red-400 text-white rounded-full shadow-lg hover:bg-red-500 transition"
              onClick={() => handleStatus("rejected")}
              aria-label="Reject order"
            >
              <XCircleIcon className="h-8 w-8" />
            </button>
          </>
        )}

        {(orderStatus === "accepted" || orderStatus === "prepared") && (
          <button
            className="p-4 bg-yellow-400 text-white rounded-full shadow-lg hover:bg-yellow-500 transition"
            onClick={() => handleStatus("prepared")}
            aria-label="Mark as prepared"
          >
            <BellIcon className="h-8 w-8" />
          </button>
        )}

        {orderStatus === "prepared" && (
          <button
            className="p-4 bg-green-400 text-white rounded-full shadow-lg hover:bg-green-500 transition"
            onClick={() => handleStatus("completed")}
            aria-label="Mark as completed"
          >
            <CheckCircleIcon className="h-8 w-8" />
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;
