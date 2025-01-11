import  { useState } from "react";
import Sidebar from "../components/Sidebar";

const Products = () => {
  const [dishes, setDishes] = useState([
    
  { id: 1, name: "Tea Full", price: 15, img: "https://www.sharmispassions.com/wp-content/uploads/2012/12/cardamom-tea4.jpg" },
  { id: 2, name: "Coffee", price: 15, img: "https://thecircleofaroma.in/cdn/shop/files/picture-steaming-cup-coffee-perfect-coffee-lovers-can-be-used-illustrate-concept-cozy-morning-caffeine-addiction-warm-beverage.jpg?v=1719467884&width=3840" },
  //{ id: 3, name: "Lassi", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 4, name: "Dahi", price: 20, img: "https://via.placeholder.com/150" },
  { id: 6, name: "Poha", price: 20, img: "https://vegecravings.com/wp-content/uploads/2016/12/Aloo-Poha-Recipe-Step-By-Step-Instructions-scaled.jpg" },
  //{ id: 7, name: "Upma", price: 20, img: "https://via.placeholder.com/150" },
  { id: 8, name: "Vadapav", price: 15, img: "https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav-500x375.jpg" },
  { id: 9, name: "Samosa", price: 17, img: "https://thumbs.dreamstime.com/b/fresh-delicious-crispy-samosa-isolated-white-220143505.jpg" },
  { id: 10, name: "Chinese Samosa", price: 20, img: "https://www.cubesnjuliennes.com/wp-content/uploads/2018/08/chinese-samosaa-recipe.jpg" },
  //{ id: 11, name: "Chole Samosa", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 12, name: "Dahi Kachori", price: 20, img: "https://via.placeholder.com/150" },
  { id: 13, name: "Chole Bhature", price: 50, img: "https://i.ytimg.com/vi/wAv-mFU7eus/maxresdefault.jpg" },
  { id: 16, name: "Misal Pav", price: 35, img: "https://www.robinage.com/wp-content/uploads/2023/09/Misal.jpg" },
  { id: 17, name: "Sabudana Vada", price: 20, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/06/sabudana-vada-recipe.jpg" },
  { id: 18, name: "Bread Pakoda", price: 15, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdIWj_jzX_L7KgHCnvN8GKj3RGp1HNpN4DQ&s" },
  //{ id: 19, name: "French Fries", price: 35, img: "https://via.placeholder.com/150" },
  { id: 20, name: "Veg Frankie", price: 20, img: "https://cdn.tarladalal.com/members/9306/procstepimgs/veg-frankie-(32)-7-187537.jpg" },
  //{ id: 21, name: "Chocolate", price: 2, img: "" },
  //{ id: 22, name: "Biscuits", price: 10, img: "" },
  //{ id: 23, name: "Maggi", price: 20, img: "" },
  //{ id: 24, name: "Ice Cream", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 25, name: "Beverages", price: 20, img: "https://via.placeholder.com/150" },

  // South Indian Dish
  { id: 26, name: "Idli Samber", price: 30, img: "https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg" },
  { id: 27, name: "Medu Vada", price: 35, img: "https://vaya.in/recipes/wp-content/uploads/2018/02/Medu-Vada.jpg" },
  { id: 28, name: "Idli Vada Sambhar", price: 35, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvupuRWAQnnJhjcf9KZoQKYKepqxRlLhQdUw&s" },
  //{ id: 29, name: "Sadha Dosa", price: 45, img: "" },
  //{ id: 30, name: "Masala Dosa", price: 50, img: "" },
  //{ id: 31, name: "Mysore Sada", price: 50, img: "https://via.placeholder.com/150" },
  //{ id: 32, name: "Mysore Masala", price: 60, img: "https://via.placeholder.com/150" },
  //{ id: 33, name: "Chinese Dosa", price: 55, img: "https://via.placeholder.com/150" },
  //{ id: 34, name: "Onion Uttappa", price: 40, img: "https://via.placeholder.com/150" },
  //{ id: 35, name: "Mini Uttappa", price: 40, img: "https://via.placeholder.com/150" },
  //{ id: 36, name: "Uttappa", price: 40, img: "https://via.placeholder.com/150" },

  // Chinese
  { id: 37, name: "Fried Rice", price: 50, img: "https://fullofplants.com/wp-content/uploads/2020/05/sweet-and-sour-spicy-thai-fried-rice-easy-vegan-meal-with-vegetables-thumb-500x500.jpg" },
  { id: 38, name: "Hakka Noodles", price: 55, img: "https://www.ohmyveg.co.uk/wp-content/uploads/2024/08/hakka-noodles-720x720.jpg" },
  { id: 39, name: "Schezwan Fried Rice", price: 55, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgHRL5vv09iTTcD1SsDsre1nWiFdBIHiMdA&s" },
  { id: 40, name: "Schezwan Noodles", price: 55, img: "https://www.cookwithmanali.com/wp-content/uploads/2021/08/Schezwan-Noodles-500x500.jpg" },
  { id: 41, name: "Egg Fried Rice", price: 55, img: "https://savvybites.co.uk/wp-content/uploads/2024/02/Easy-Egg-fried-rice-2.jpg" },
  { id: 42, name: "Egg Noodles", price: 55, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpDz4-GZI5EPxY_2Q-d_HnCANSJ42Cf6EFWg&s" },
  { id: 43, name: "Egg Schezwan Fried Rice", price: 55, img: "https://images.slurrp.com/prod/recipe_images/whiskaffair/spicy-indo-chinese-schezwan-egg-fried-rice-recipe-1617380322_SNFD3JE3HW8A5KXCW3JI.webp" },
  { id: 44, name: "Egg Schezwan Noodles", price: 55, img: "https://www.sharmispassions.com/wp-content/uploads/2012/01/EggNoodles3-500x500.jpg" },
  { id: 45, name: "Triple Schezwan Rice", price: 65, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQRLIyDHmYmsAhkCvtDWKUow5wORxruJgD3w&s" },
  //{ id: 46, name: "Veg Manchurian", price: 60, img: "" },
  //{ id: 47, name: "Tomato Soup", price: 40, img: "https://via.placeholder.com/150" },
  //{ id: 48, name: "Paneer Chilly", price: 120, img: "https://via.placeholder.com/150" },
  { id: 49, name: "Chinese Bhel", price: 20, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTg4zSxCYDpnnZNL3s2OLG4Y8Jom51kCD27Q&s" },

  // Sandwiches
  { id: 50, name: "Veg Sandwich", price: 23, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4EKY1TGqIxv_ERvFIXz7oG7ICvAQi0QdEQ&s" },
  //{ id: 51, name: "Veg Toast Sandwich", price: 35, img: "" },
  //{ id: 52, name: "Veg Grilled Sandwich", price: 35, img: "" },
  //{ id: 54, name: "Egg Omlette Sandwich", price: 35, img: "https://via.placeholder.com/150" },
  //{ id: 55, name: "Bread Butter", price: 25, img: "https://via.placeholder.com/150" },
  //{ id: 56, name: "Bread Butter Toast", price: 35, img: "https://via.placeholder.com/150" },
  { id: 57, name: "Cheese Chilly Grilled", price: 35, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTKNC5yNAgTSCzKUywePL1v3S-Ja9qytkkhw&s" },
  //{ id: 58, name: "Bread Butter Jam", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 59, name: "Bread Butter Jam Toast", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 60, name: "Samosa Sandwich", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 61, name: "Club Sandwich with Cheese", price: 20, img: "https://via.placeholder.com/150" },
  //{ id: 62, name: "Pizza", price: 20, img: "https://via.placeholder.com/150" },

  // Lunch
  { id: 63, name: "Regualar thali", price: 100, img: "https://media.vyaparify.com/vcards/products/679/IMG-20230601-WA0006.jpg" },
  //{ id: 64, name: "Mini Lunch", price: 55, img: "https://via.placeholder.com/150" },
  { id: 65, name: "Veg Biryani", price: 60, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/09/veg-biryani-vegetable-biryani.jpg" },
  { id: 66, name: "Veg Pulav", price: 50, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2018/07/pulao-recipe.jpg" },
  { id: 67, name: "Dal Rice", price: 40, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIEnKPsNPAE9EwAdDJUGpaEcrZF16p7bqVQ&s" },
  //{ id: 68, name: "Dal Khichdi", price: 20, img: "" },
  //{ id: 69, name: "Paneer Sabzi", price: 60, img: "" },
  //{ id: 70, name: "Puri Bhaji", price: 40, img: "" },
  //{ id: 71, name: "Puri Plate", price: 20, img: "" },
  { id: 72, name: "Chapati", price: 15, img: "https://sandhyahariharan.co.uk/wp-content/uploads/2022/09/chapati_-500x500.jpg" },
  //{ id: 73, name: "Curd Rice", price: 45, img: "" },
  { id: 74, name: "Plain Rice", price: 35, img: "https://www.mississippivegan.com/wp-content/uploads/2021/12/easy-baked-rice-02-819x1024.jpg" },
  //{ id: 75, name: "Lemon Rice", price: 20, img: "https://via.placeholder.com/150" }


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
      <div className="overflow-y-auto flex-grow p-8">
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
