import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

const HomeScreen = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([
    { id: 356, items: [{ name: "Sandwitch", price: 2.48, qty: 1 }, { name: "Chinese Takeout Dish", price: 5.3, qty: 1 }], showRedButton: true },
    { id: 388, items: [{ name: "Baked Pasted Dishes", price: 2.48, qty: 1 }, { name: "Chinese Takeout Dish", price: 5.3, qty: 1 }], showRedButton: true },
    { id: 475, items: [{ name: "Baked Pasted Dishes", price: 2.48, qty: 1 }, { name: "Chinese Takeout Dish", price: 5.3, qty: 1 }], showRedButton: true },
    { id: 66, items: [{ name: "Baked Pasted Dishes", price: 2.48, qty: 1 }, { name: "Chinese Takeout Dish", price: 5.3, qty: 1 }], showRedButton: true },
    { id: 52, items: [{ name: "Baked Pasted Dishes", price: 2.48, qty: 1 }, { name: "Chinese Takeout Dish", price: 5.3, qty: 1 }], showRedButton: true },
    { id: 874, items: [{ name: "Baked Pasted Dishes", price: 2.48, qty: 1 }, { name: "Chinese Takeout Dish", price: 5.3, qty: 1 }], showRedButton: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    "Fried Rice",
    "Triple Rice",
    "Veg Meals",
    "Pav Bhaji",
    "Noodles",
    "Misal Pav",
    "Pasta",
    "Biryani",
    "Sandwich",
    "Manchurian",
  ];

  const handleDelete = (index) => {
    setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
  };

  const handleOrangeButtonClick = (index) => {
    setOrders((prevOrders) =>
      prevOrders.map((order, i) =>
        i === index ? { ...order, showRedButton: false } : order
      )
    );
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 relative">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="absolute inset-0 z-50 bg-gray-800 bg-opacity-50">
          <Sidebar />
          <button
            className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow flex">
        {/* Sidebar and Search Section */}
        <div className="w-1/5 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 shadow-lg p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none mb-4"
          >
            Menu
          </button>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="space-y-5">
            {filteredMenuItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
              >
                {item} <span className="text-gray-500">x3</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Orders Section */}
        <main className="flex-grow p-4 grid grid-cols-3 gap-4 overflow-y-auto">
          {orders.map((order, index) => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6 relative">
              <p className="text-gray-500 text-sm mb-4">05 Feb 2023, 08:28 PM</p>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center mb-6">
                  <img
                    src="https://via.placeholder.com/50"
                    alt={item.name}
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
                  onClick={() => handleDelete(index)}
                >
                  ✔
                </button>
                <button
                  className={`bg-red-500 text-white p-3 rounded-full hover:bg-red-600 ${
                    order.showRedButton ? "block" : "hidden"
                  }`}
                  onClick={() => handleDelete(index)}
                >
                  ✖
                </button>
                <button
                  className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600"
                  onClick={() => handleOrangeButtonClick(index)}
                >
                  ✔
                </button>
              </div>
              <p className="absolute bottom-4 left-4 text-gray-500 font-bold">#{order.id}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
