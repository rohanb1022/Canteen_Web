/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
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
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order List</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border-b">Order ID</th>
              <th scope="col" className="px-6 py-3 border-b">User Name</th>
              <th scope="col" className="px-6 py-3 border-b">Status</th>
              <th scope="col" className="px-6 py-3 border-b">Total Amount</th>
              <th scope="col" className="px-6 py-3 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.orderNo} className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 border-b">{order.orderNo}</td>
                  <td className="px-6 py-4 border-b">{order.userName || 'Unknown User'}</td>
                  <td className="px-6 py-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
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
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
