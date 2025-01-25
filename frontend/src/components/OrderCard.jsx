import React, { useState, useEffect } from "react";

function OrderCard({ order, onComplete, onCancel, onPending }) {
  const [markedItems, setMarkedItems] = useState([]);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const orderTime = new Date(order.orderDate);
      const diffInMs = now - orderTime;
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      setTimeAgo(`${diffInMinutes} min ago`);
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute
    return () => clearInterval(interval); // Clean up on unmount
  }, [order.orderDate]);

  const handleMarkItem = (itemIndex) => {
    setMarkedItems((prev) =>
      prev.includes(itemIndex)
        ? prev.filter((index) => index !== itemIndex)
        : [...prev, itemIndex]
    );
  };

  // Group food items by name to display the count
  const groupedItems = order.items.reduce((acc, item) => {
    const key = item.foodName || "Unknown Food Item";
    if (acc[key]) {
      acc[key].count += 1;
    } else {
      acc[key] = { ...item, count: 1 };
    }
    return acc;
  }, {});

  const foodItems = Object.values(groupedItems);

  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col h-full">
      {/* Order ID */}
      <div className="flex justify-between w-full">
        <p className="text-xl text-blue-500">
          Order ID: {order.orderId.slice(-4)} {/* Display last 4 characters of Order ID */}
        </p>
        <p className="text-lg text-gray-600">{timeAgo}</p> {/* Display time ago with larger text */}
      </div>
      {/* Order Date */}
      <p className="text-sm text-gray-500">
        {new Date(order.orderDate).toLocaleDateString("en-GB")}{" "}
        {/* Format: day/month/year */}
      </p>

      {/* Food Items */}
      <div className="my-2 w-full flex-grow">
        {foodItems.length > 0 ? (
          foodItems.map((item, i) => (
            <div
              key={i} // Unique key based on index
              className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0"
            >
              <p
                className={`${
                  markedItems.includes(i) ? "line-through text-gray-400" : ""
                } font-bold`}
              >
                {item.foodName} {item.count > 1 && `x${item.count}`} {/* Display item count if more than 1 */}
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
      <div className="flex justify-between w-full mt-4 space-x-4 pt-4 border-t">
        <button
          className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onComplete(order.orderId)} // Use orderId
          aria-label="Mark as completed"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✔</span> {/* Increased size and black color */}
        </button>
        <button
          className="p-4 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onCancel(order.orderId)} // Use orderId
          aria-label="Cancel order"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✖</span> {/* Increased size and black color */}
        </button>
        <button
          className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onPending(order.orderId)} // Use orderId
          aria-label="Notify"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>🔔</span> {/* Increased size and black color */}
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
