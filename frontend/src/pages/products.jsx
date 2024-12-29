import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [dishes, setDishes] = useState([
    { id: 1, name: "Biryani", price: 8.99, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Pasta", price: 7.49, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Noodles", price: 6.99, img: "https://via.placeholder.com/150" },
  ]);
  const [editingNameId, setEditingNameId] = useState(null);

  const handleDelete = (id) => {
    setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== id));
    if (editingNameId === id) {
      setEditingNameId(null); // Reset editing state if the currently edited card is deleted
    }
  };

  const handlePriceChange = (id, newPrice) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) => (dish.id === id ? { ...dish, price: newPrice } : dish))
    );
  };

  const handleNameChange = (id, newName) => {
    setDishes((prevDishes) =>
      prevDishes.map((dish) => (dish.id === id ? { ...dish, name: newName } : dish))
    );
  };

  const handleAddDish = () => {
    const newDish = {
      id: dishes.length > 0 ? dishes[dishes.length - 1].id + 1 : 1,
      name: "New Dish",
      price: 0.0,
      img: "https://via.placeholder.com/150",
    };
    setDishes((prevDishes) => [...prevDishes, newDish]);
    setEditingNameId(newDish.id); // Focus on the new dish's name
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300">
      {/* Sidebar */}
      <div className="w-1/5 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-300 shadow-xl">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        {/* Add Dish Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Menu Management</h1>
          <button
            className="relative bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
            onClick={handleAddDish}
          >
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-2 py-1 rounded-full">
              +
            </span>
            Add Dish
          </button>
        </div>

        {/* Dish Cards */}
        <div className="grid grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl p-6 transform hover:-translate-y-2 transition duration-300 flex flex-col items-center"
            >
              <img
                src={dish.img}
                alt={dish.name}
                className="w-36 h-36 object-cover rounded-full mb-4 border-4 border-orange-200"
              />
              {editingNameId === dish.id ? (
                <input
                  type="text"
                  value={dish.name}
                  onChange={(e) => handleNameChange(dish.id, e.target.value)}
                  onBlur={() => setEditingNameId(null)}
                  autoFocus
                  className="text-lg font-semibold text-gray-800 mb-2 border-b-2 border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              ) : (
                <h2
                  className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer"
                  onClick={() => setEditingNameId(dish.id)}
                >
                  {dish.name}
                </h2>
              )}
              <div className="flex items-center mb-4">
                <span className="text-gray-600 font-medium mr-2">Price:</span>
                <input
                  type="number"
                  value={dish.price}
                  onChange={(e) => handlePriceChange(dish.id, parseFloat(e.target.value))}
                  className="w-24 py-1 px-2 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <button
                onClick={() => handleDelete(dish.id)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300"
              >
                Delete Dish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
