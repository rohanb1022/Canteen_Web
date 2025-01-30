import React, { useState, useEffect } from "react";

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
    const interval = setInterval(calculateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [order.orderDate, order.orderId]);

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



  return ( 
    <div className={`border rounded-md shadow-md p-4 flex flex-col ${getCardStyle()}`}>
      <div className="flex justify-between w-full">
        <p className="text-xl text-blue-500">Order ID: {order.orderId.slice(-4)}</p>
        <p className="text-lg text-gray-600">{timeAgo}</p>
      </div>
      <p className="text-sm text-gray-500">
        {new Date(order.orderDate).toLocaleDateString("en-GB")}
      </p>
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

    </div>
  );
}

export default OrderCard;
