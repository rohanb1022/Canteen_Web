import { useState } from 'react';
import { axiosInstance } from '../lib/axios'; // Import axios instance

const AddSpecialDishPopup = ({ onClose, onDishAdded }) => { // Use onDishAdded to update UI
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newDish = { name: dishName, price, category };

    try {
      const response = await axiosInstance.post('/api/v1/addSpecialDish', newDish);
      
      if (response.data.success) {
        alert('Special dish added successfully!');
        onDishAdded(response.data.dish); // Update UI
        setDishName('');
        setPrice('');
        setCategory('Uncategorized');
        onClose();
      } else {
        alert('Failed to add special dish.');
      }
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Server error! Try again later.');
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/3 max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">Add Special Dish</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg mb-2">Dish Name</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg mb-2">Price</label>
            <input
              type="number"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg mb-2">Category</label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg text-lg bg-gray-100"
              value={category}
              readOnly
            />
          </div>
          <div className="flex justify-end space-x-6">
            <button type="button" className="px-6 py-3 bg-gray-400 text-white rounded-lg text-lg" onClick={onClose}>Cancel</button>
            <button 
              type="submit" 
              className={px-6 py-3 text-white rounded-lg text-lg ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}} 
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpecialDishPopup;