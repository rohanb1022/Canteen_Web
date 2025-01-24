import React, { useEffect, useRef, useState } from "react";

function OrderCard({ order, onComplete, onCancel, onPending }) {
  const [markedItems, setMarkedItems] = useState([]);
  const [isSeen, setIsSeen] = useState(false); // Track if the card has been seen
  const [isHighlighted, setIsHighlighted] = useState(false); // Track if the card is highlighted
  const cardRef = useRef(null);

  const handleMarkItem = (itemIndex) => {
    setMarkedItems((prev) =>
      prev.includes(itemIndex)
        ? prev.filter((index) => index !== itemIndex)
        : [...prev, itemIndex]
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSeen(true); // Mark the card as seen when it enters the viewport
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the card is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Ensure that order.items is defined and is an array before mapping over it
  const foodItems = Array.isArray(order.items) ? order.items : [];

  // Determine the background color based on "seen" and "highlight" states
  let cardBgColor = "bg-white";
  if (isHighlighted && isSeen) {
    cardBgColor = "bg-blue-300"; // Highlighted and seen
  } else if (isHighlighted) {
    cardBgColor = "bg-yellow-300"; // Highlighted but not seen
  } else if (isSeen) {
    cardBgColor = "bg-green-200"; // Seen but not highlighted
  }

  return (
    <div
      ref={cardRef} // Attach the ref for intersection observer
      className={`p-4 rounded-md shadow-md ${cardBgColor}`}
    >
      {/* Order ID */}
      <p className="text-xl text-blue-500">
        Order ID: {order.orderId.slice(-4)}
      </p>
      <p className="text-sm text-gray-500">
        {new Date(order.orderDate).toLocaleDateString("en-GB")}
      </p>

      {/* Food Items */}
      <div className="my-2 w-full">
        {foodItems.length > 0 ? (
          foodItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-2 mb-2 last:border-b-0"
            >
              <p
                className={`${
                  markedItems.includes(i) ? "line-through text-gray-400" : ""
                } font-bold`}
              >
                {item.foodName || "Unknown Food Item"}
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
          <p>No food items available</p>
        )}
      </div>

      {/* Total Amount */}
      <p className="font-bold text-lg">Total: ₹{order.totalAmount.toFixed(2)}</p>

      {/* Action Buttons */}
      <div className="flex justify-around w-full mt-4">
        <button
          className="p-4 bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onComplete(order.orderId)}
          aria-label="Mark as completed"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✔</span>
        </button>
        <button
          className="p-4 bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onCancel(order.orderId)}
          aria-label="Cancel order"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>✖</span>
        </button>
        <button
          className="p-4 bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center"
          onClick={() => onPending(order.orderId)}
          aria-label="Notify"
        >
          <span style={{ color: "black", fontSize: "1.5rem" }}>🔔</span>
        </button>
      </div>

      {/* Highlight Button */}
      <div className="flex justify-center mt-4">
        <button
          className={`p-2 px-4 rounded-md ${
            isHighlighted ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => setIsHighlighted((prev) => !prev)} // Toggle highlight state
          aria-label={isHighlighted ? "Remove Highlight" : "Highlight"}
        >
          {isHighlighted ? "Unhighlight" : "Highlight"}
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
