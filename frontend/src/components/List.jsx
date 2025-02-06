
import React from "react";

const List = ({ searchQuery, orders }) => {
  const filteredOrders = orders.filter((order) =>
    [order.orderNo, order.userName, order.email, order.totalAmount.toString()]
      .some((field) => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b">Order ID</th>
              <th className="px-6 py-3 border-b">User Name</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Total Amount</th>
              <th className="px-6 py-3 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.orderNo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{order.orderNo.slice(-4)}</td>
                  <td className="px-6 py-4 border-b">{order.userName || "Unknown User"}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b">${order.totalAmount}</td>
                  <td className="px-6 py-4 border-b">{order.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
