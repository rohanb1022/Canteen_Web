import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import OrderCard from "../../components/OrderCard";
import { axiosInstance } from "../../lib/axios";

function HomeScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [foodItemsSummary, setFoodItemsSummary] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    localStorage.getItem("selectedStatus") || ""
  );

  // Fetch orders and summarize food items
  const fetchOrders = () => {
    axiosInstance
      .get("/api/v1/view-orders")
      .then((response) => {
        if (response.data) {
          setOrders(response.data);

          const summary = {};
          response.data.forEach((order) => {
            if (order.status !== "completed" && order.status !== "rejected") {
              order.items.forEach((item) => {
                if (!summary[item.foodName]) {
                  summary[item.foodName] = { count: item.quantity };
                } else {
                  summary[item.foodName].count += item.quantity;
                }
              });
            }
          });
          setFoodItemsSummary(summary);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Fetch data every 30 sec
    return () => clearInterval(interval);
  }, []);

  // Remove a dish from an order
  const handleRemoveItem = async (orderId, foodName) => {
    try {
      await axiosInstance.put("/api/v1/remove-dish", { orderId, foodName });
  
      // Update orders state
      const updatedOrders = orders.map((order) => {
        if (order.orderId === orderId) {
          const updatedItems = order.items.filter(
            (item) => item.foodName !== foodName
          );
          return { ...order, items: updatedItems };
        }
        return order;
      });
      setOrders(updatedOrders);

      // Update food items summary
      setFoodItemsSummary((prevSummary) => {
        const updatedSummary = { ...prevSummary };
        const removedItem = orders
          .find((o) => o.orderId === orderId)
          ?.items.find((item) => item.foodName === foodName);
        
        if (removedItem) {
          updatedSummary[foodName].count -= removedItem.quantity;
          if (updatedSummary[foodName].count <= 0) {
            delete updatedSummary[foodName];
          }
        }
        
        return updatedSummary;
      });
  
      console.log(`Dish "${foodName}" removed from order ${orderId}`);
    } catch (error) {
      console.error(`Error removing dish "${foodName}" from order ${orderId}:`, error);
    }
  };
  
  // Update order status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axiosInstance.put("/api/v1/update-status", { orderId, status });

      // Find the order being updated
      const orderToUpdate = orders.find((o) => o.orderId === orderId);

      // Update orders state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        )
      );

      // Remove order and update summary if completed or rejected
      if (status === "completed" || status === "rejected") {
        // Update food items summary
        setFoodItemsSummary((prevSummary) => {
          const updatedSummary = { ...prevSummary };
          
          orderToUpdate.items.forEach((item) => {
            if (updatedSummary[item.foodName]) {
              updatedSummary[item.foodName].count -= item.quantity;
              if (updatedSummary[item.foodName].count <= 0) {
                delete updatedSummary[item.foodName];
              }
            }
          });
          
          return updatedSummary;
        });

        // Remove the order
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
      }
    } catch (error) {
      console.error(`Error marking order ${orderId} as ${status}`, error);
    }
  };

  const handleStatusFilterChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    localStorage.setItem("selectedStatus", status);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchesSearch = order.items.some((item) =>
      item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}

      <div className="flex-1">
        <div className="flex items-center justify-between p-4 bg-orange-400 text-white">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 bg-white text-orange-400 rounded-md"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">Order Dashboard</h1>
          <input
            type="text"
            placeholder="Search for a dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-md text-black"
          />
        </div>

        <div className="p-4">
          <label htmlFor="status-filter" className="mr-2 text-lg font-semibold">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={handleStatusFilterChange}
            className="p-3 rounded-lg border-2 border-orange-400 bg-white text-orange-400 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover:bg-orange-100 transition ease-in-out duration-200"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="prepared">Prepared</option>
          </select>
        </div>

        <div className="flex">
          <div className="w-1/4 bg-orange-100 p-4">
            {Object.keys(foodItemsSummary).length > 0 ? (
              Object.entries(foodItemsSummary).map(([name, summary], index) => (
                <div
                  key={index}
                  className="bg-white p-4 mb-2 shadow-md rounded-md text-center"
                >
                  {name}{" "}
                  <span className="text-orange-400 font-bold">
                    x{summary.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No food items found</p>
            )}
          </div>

          <div className="flex-1 grid grid-cols-3 gap-4 p-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onUpdateStatus={handleUpdateStatus}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;