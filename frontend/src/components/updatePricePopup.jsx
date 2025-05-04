// components/UpdatePricePopup.jsx
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const UpdatePricePopup = ({ dishId, currentPrice, onClose, onPriceUpdated }) => {
  const [newPrice, setNewPrice] = useState(currentPrice);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!newPrice || isNaN(newPrice)) {
      toast.error("Please enter a valid price.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put(`/api/v1/changePrice/${dishId}`, {
        price: Number(newPrice),
      });

      if (response.data.success) {
        onPriceUpdated(Number(newPrice));
        toast.success("Price updated successfully.");
        onClose();
      } else {
        toast.error("Failed to update price.");
      }
    } catch (error) {
      console.error("Error updating price:", error);
      toast.error("Internal server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-lg font-bold mb-4">Update Price</h2>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePricePopup;
