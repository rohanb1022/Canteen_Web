import  { useState, useEffect } from "react";

function OrderCard({ order, onUpdateStatus }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [timeAgo, setTimeAgo] = useState("");

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
                 <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M178-560q5-38-3-65.5T140-692q-26-38-34-70.5t-3-77.5h57q-5 37 3.5 64.5T200-709q26 37 33.5 70.5T235-560h-57Zm170 0q5-38-3-65.5T310-692q-26-38-34-70.5t-3-77.5h57q-5 37 3 64.5t36 66.5q26 37 34 70.5t2 78.5h-57Zm170 0q5-38-3-65.5T480-692q-26-38-34-70.5t-3-77.5h57q-5 37 3 64.5t36 66.5q26 37 34 70.5t2 78.5h-57ZM200-160q-51 0-85.5-34.5T80-280v-200h580q0-32 16-58.5t45-36.5l189-64 19 57-189 63q-11 4-15.5 15.5T720-480v200q0 50-34.5 85T600-160H200Zm0-60h400q26 0 43-17.5t17-42.5v-140H140v140q0 26 17 43t43 17Zm200-100Z"/></svg>
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

          {orderStatus === "accepted" && (
            <button
              className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
              onClick={() => handleStatus("prepared")}
              aria-label="Mark as prepared"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M480-502Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Zm250-360v-130H600v-60h130v-130h60v130h130v60H790v130h-60ZM160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q20 5 39.04 12.31Q598.08-778.38 615-767q-12 11-22.5 23T573-718q-20-12-43.5-19t-49.5-7q-75 0-127.5 52.5T300-564v304h360v-143q14 7 28.84 12.44 14.84 5.45 31.16 8.56v122h80v60H160Z"/></svg>
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
  );
}

export default OrderCard;
