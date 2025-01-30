import React, { useEffect, useState } from 'react';
import {axiosInstance} from '../lib/axios'; // Import axios instance

const Stats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const response = await axiosInstance.get('/api/v1/statistics'); // Use axios instance
      setStats(response.data);
      console.log('API Response:', response.data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500" aria-live="polite">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500" aria-live="assertive">
        <p>Error: {error}</p>
        <button
          onClick={fetchStats}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Order Statistics
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-lg font-semibold text-gray-600">Total Orders:</span>
          <span className="text-lg font-bold text-gray-800">{stats.totalOrders}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-lg font-semibold text-gray-600">Total Revenue:</span>
          <span className="text-lg font-bold text-gray-800">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(stats.totalRevenue)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-600">
            Completed Orders:
          </span>
          <span className="text-lg font-bold text-gray-800">
            {stats.completedOrders}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
