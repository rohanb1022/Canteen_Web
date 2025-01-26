import React, { useState, useEffect } from "react";
<<<<<<< HEAD

function OrderCard({ order, onUpdateStatus }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [timeAgo, setTimeAgo] = useState("");
=======
import { CheckCircleIcon, XCircleIcon, BellIcon } from "@heroicons/react/outline"; // Import Heroicons

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
>>>>>>> 552ec436ba5cf71ce937078711cfa25c5f89ed7a

  useEffect(() => {

    // Calculate the "time ago" string
    const calculateTimeAgo = () => {
      const now = new Date();
      const orderTime = new Date(order.orderDate);
      const diffInMinutes = Math.floor((now - orderTime) / (1000 * 60));
      setTimeAgo(`${diffInMinutes} min ago`);
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [order.orderDate, order.orderId]);

  const handleStatus = async (status) => {
    await onUpdateStatus(order.orderId, status); // Update the database
    setOrderStatus(status); // Update local state
  };

<<<<<<< HEAD
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

  return (
    <div className={`border rounded-md shadow-md p-4 flex flex-col ${getCardStyle()}`}>
      <div className="flex justify-between w-full">
        <p className="text-xl text-blue-500">Order ID: {order.orderId.slice(-4)}</p>
        <p className="text-lg text-gray-600">{timeAgo}</p>
      </div>
=======
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
>>>>>>> 552ec436ba5cf71ce937078711cfa25c5f89ed7a
      <p className="text-sm text-gray-500">
        {new Date(order.orderDate).toLocaleDateString("en-GB")}
      </p>
<<<<<<< HEAD
      <p className="text-md font-semibold text-gray-700">
        Status: <span className="text-blue-500">{orderStatus}</span>
      </p>

      <div className="flex flex-col h-full">
      <div className="flex flex-col h-full">
  {/* Display order items */}
  <div className="flex-1 overflow-y-auto mt-4"> 
    <ul className="list-none pl-5">
      {order.items.map((item, index) => (
        <li key={index} className="text-gray-700 text-xl font-bold">
          {item.foodName} (x{item.quantity})
        </li>
      ))}
    </ul>
  </div>

  {/* Buttons */}
  <div className="mt-4 flex justify-center space-x-4 pt-4 border-t">
    {orderStatus === "pending" && (
      <>
        <button
          className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-500 transition"
          onClick={() => handleStatus("accepted")}
          aria-label="Accept order"
        >
          ✔
        </button>
        <button
          className="p-4 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-500 transition"
          onClick={() => handleStatus("rejected")}
          aria-label="Reject order"
        >
          ✖
        </button>
      </>
    )}

    {(orderStatus === "accepted" || orderStatus === "prepared") && (
      <button
        className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
        onClick={() => handleStatus("prepared")}
        aria-label="Mark as prepared"
      >
        🔔
      </button>
    )}

    {orderStatus === "prepared" && (
      <button
        className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-500 transition"
        onClick={() => handleStatus("completed")}
        aria-label="Mark as completed"
      >
        ✔
      </button>
    )}
  </div>
</div>

</div>

=======

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
      <div className="flex justify-center space-x-4 mt-4 pt-4 border-t">
        <button
          className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-500 transition"
          onClick={() => onComplete(order.orderId)} // Use orderId
          aria-label="Mark as completed"
        >
          <CheckCircleIcon className="h-8 w-8 text-black" />
        </button>
        <button
          className="p-4 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-500 transition"
          onClick={() => onCancel(order.orderId)} // Use orderId
          aria-label="Cancel order"
        >
          <XCircleIcon className="h-8 w-8 text-black" />
        </button>
        <button
          className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
          onClick={() => onPending(order.orderId)} // Use orderId
          aria-label="Notify"
        >
          <BellIcon className="h-8 w-8 text-black" />
        </button>
      </div>
>>>>>>> 552ec436ba5cf71ce937078711cfa25c5f89ed7a
    </div>
  );
}

export default OrderCard;
