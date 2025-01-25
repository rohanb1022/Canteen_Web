import React, { useState } from "react";

function OrderCard({ order, onComplete, onCancel, onPending }) {
  const [markedItems, setMarkedItems] = useState([]);

  const handleMarkItem = (itemIndex) => {
    setMarkedItems((prev) =>
      prev.includes(itemIndex)
        ? prev.filter((index) => index !== itemIndex)
        : [...prev, itemIndex]
    );
  };

  // Ensure that order.items is defined and is an array before mapping over it
  const foodItems = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center">
      {/* Order ID */}
      <p className="text-xl text-blue-500">
        Order ID: {order.orderId.slice(-4)}
      </p>{" "}
      {/* Display last 4 characters of Order ID with larger text */}
      {/* Order Date */}
      <p className="text-sm text-gray-500">
        {new Date(order.orderDate).toLocaleDateString("en-GB")}{" "}
        {/* Format: day/month/year */}
      </p>
      {/* Food Items */}
      <div className="my-2 w-full">
        {foodItems.length > 0 ? (
          foodItems.map((item, i) => (
            <div
              key={i} // Unique key based on index, or a better unique identifier if available
              className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0"
            >
              <p
                className={`${
                  markedItems.includes(i) ? "line-through text-gray-400" : ""
                } font-bold`}
              >
                {item.foodName || "Unknown Food Item"} {/* Display food name */}
              </p>
              <button
                className={`${
                  markedItems.includes(i)
                    ? "bg-blue-400 text-white px-2 py-1 rounded-md"
                    : "bg-orange-400 text-white px-2 py-1 rounded-md"
                }`}
                onClick={() => handleMarkItem(i)}
                aria-label={markedItems.includes(i) ? "Unmark" : "Mark"}
              >
                {markedItems.includes(i) ? "Unmark" : "Mark"}
              </button>
            </div>
          ))
        ) : (
          <p>No food items available</p> // Fallback message if no food items are found
        )}
      </div>
      {/* Total Amount */}
      <p className="font-bold text-lg">
        Total: ₹{order.totalAmount.toFixed(2)}
      </p>
      {/* Action Buttons */}
      <div className="flex justify-around w-full mt-4">
        <button
          className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onComplete(order.orderId)} // Use orderId
          aria-label="Mark as completed"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✔</span>{" "}
          {/* Increased size and black color */}
        </button>
        <button
          className="p-4 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onCancel(order.orderId)} // Use orderId
          aria-label="Cancel order"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✖</span>{" "}
          {/* Increased size and black color */}
        </button>
        <button
          className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onPending(order.orderId)} // Use orderId
          aria-label="Notify"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>🔔</span>{" "}
          {/* Increased size and black color */}
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
