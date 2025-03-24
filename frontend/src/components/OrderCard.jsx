import { useState, useEffect } from "react";

function OrderCard({ order, onUpdateStatus, onRemoveItem }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const orderTime = new Date(order.orderDate);
      const diffInMinutes = Math.floor((now - orderTime) / (1000 * 60));

      if (diffInMinutes < 60) {
        setTimeAgo(`${diffInMinutes} min ago`);
      } else if (diffInMinutes < 1440) {
        setTimeAgo(`${Math.floor(diffInMinutes / 60)} hours ago`);
      } else {
        setTimeAgo(`${Math.floor(diffInMinutes / 1440)} days ago`);
      }
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [order.orderDate]);

  const handleStatus = async (status) => {
    const validTransitions = {
      pending: ["accepted", "rejected"],
      accepted: ["prepared"],
      prepared: ["completed"],
    };

    if (!validTransitions[orderStatus]?.includes(status)) return;

    await onUpdateStatus(order.orderId, status);
    setOrderStatus(status);
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
            {order.items.map((item, index) => {
              const isRemovable =
                order.items.length > 1 && !["accepted", "prepared", "completed"].includes(orderStatus);

              return (
                <li key={index} className="text-gray-700 text-xl font-bold flex justify-between">
                  {item.foodName} (x{item.quantity})

                  {/* Remove button is only shown when `isRemovable` is true */}
                  {isRemovable && (
                    <button
                      className="p-2 bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-500 transition"
                      onClick={() => onRemoveItem(order.orderId, item.foodName)}
                      aria-label={`Remove ${item.foodName}`}
                    >
                      ✖
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

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

          {orderStatus === "accepted" && (
            <button
              className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-yellow-500 transition"
              onClick={() => handleStatus("prepared")}
              aria-label="Mark as prepared"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000">
                <path d="M480-502Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Zm250-360v-130H600v-60h130v-130h60v130h130v60H790v130h-60ZM160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q20 5 39.04 12.31Q598.08-778.38 615-767q-12 11-22.5 23T573-718q-20-12-43.5-19t-49.5-7q-75 0-127.5 52.5T300-564v304h360v-143q14 7 28.84 12.44 14.84 5.45 31.16 8.56v122h80v60H160Z"/>
              </svg>
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
