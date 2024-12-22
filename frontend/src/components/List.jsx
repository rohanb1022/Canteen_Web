import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = ({ filter }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/order-history') // Update the endpoint as per your backend
      .then(response => {
        console.log('API Response:', response.data); // Log the entire response
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching orders');
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Filter orders based on filter prop
  const filteredOrders = orders.filter(order => 
    order.status.toLowerCase().includes(filter.toLowerCase()) ||
    order.items.some(item => item.foodName.toLowerCase().includes(filter.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  console.log('Filtered Orders:', filteredOrders); // Log filtered orders
 
 
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">User  Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.orderNo} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.orderNo}</td>
                <td className="border border-gray-300 px-4 py-2">{order.userName || 'Unknown User'}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">${order.totalAmount}</td>
                <td className="border border-gray-300 px-4 py-2">{order.phoneNumber}</td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  {order.items && order.items.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={`${item.foodName}-${index}`}>
                          <strong>{item.foodName}</strong> - Qty: {item.quantity}, Price: ${item.price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No food items</span>
                  )}
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;