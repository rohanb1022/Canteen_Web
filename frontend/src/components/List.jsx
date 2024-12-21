import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = ({ filter }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/view-orders') // Update the endpoint as per your backend
      .then(response => {
        console.log(response);
        
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
    order.customer?.toLowerCase().includes(filter.toLowerCase()) ||
    order.status.toLowerCase().includes(filter.toLowerCase()) ||
    order.foodItems.some(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;
console.log(filteredOrders);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
            <th className="border border-gray-300 px-4 py-2">Order Date</th>
            <th className="border border-gray-300 px-4 py-2">Food Items</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map(order => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{order._id}</td>
              <td className="border border-gray-300 px-4 py-2">{order.status}</td>
              <td className="border border-gray-300 px-4 py-2">${order.totalAmount}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(order.orderDate).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc list-inside">
                  {order.foodItems?.map((item, index) => (
                    <li key={index}>
                      <strong>{item.name}</strong> - Qty: {item.quantity}, Price: ${item.price}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); 
};

export default List;
