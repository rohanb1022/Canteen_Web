
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Stats = () => {
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [viewType, setViewType] = useState("daily"); // 'daily' or 'monthly'
//   const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'revenue'
//   const [comparison, setComparison] = useState({ ordersDiff: 0, revenueDiff: 0 });

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axiosInstance.get(`/api/v1/statistics?type=${viewType}`);
//       setStats(response.data);
      
//       console.log('Fetched stats:', response.data); // Debugging the response data

//       if (response.data.length >= 2) {
//         const latest = response.data[response.data.length - 1];
//         const previous = response.data[response.data.length - 2];

//         console.log('Latest data:', latest); // Debugging the latest data
//         console.log('Previous data:', previous); // Debugging the previous data

//         setComparison({
//           ordersDiff: latest.totalOrders - previous.totalOrders,
//           revenueDiff: latest.totalRevenue - previous.totalRevenue,
//         });
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching statistics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, [viewType]);

//   if (loading) return <div className="text-center text-gray-500">Loading...</div>;

//   if (error) {
//     return (
//       <div className="text-center text-red-500">
//         <p>Error: {error}</p>
//         <button onClick={fetchStats} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//           Retry
//         </button>
//       </div>
//     );
//   }

//   const labels = stats.map((entry) =>
//     viewType === "daily"
//       ? `${entry._id.day}-${entry._id.month}-${entry._id.year}`
//       : `${entry._id.month}-${entry._id.year}`
//   );

//   const ordersData = {
//     labels,
//     datasets: [
//       {
//         label: "Total Orders",
//         data: stats.map((entry) => entry.totalOrders),
//         backgroundColor: "rgba(54, 162, 235, 0.6)",
//       },
//       {
//         label: "Completed Orders",
//         data: stats.map((entry) => entry.completedOrders),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//     ],
//   };

//   const revenueData = {
//     labels,
//     datasets: [
//       {
//         label: "Total Revenue",
//         data: stats.map((entry) => entry.totalRevenue),
//         backgroundColor: "rgba(255, 99, 132, 0.6)",
//       },
//     ],
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Order & Revenue Statistics</h2>

//       {/* Toggle Button for Daily/Monthly */}
//       <div className="flex justify-center mb-4">
//         <button
//           className={`px-4 py-2 rounded-l ${viewType === "daily" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
//           onClick={() => setViewType("daily")}
//         >
//           Daily
//         </button>
//         <button
//           className={`px-4 py-2 rounded-r ${viewType === "monthly" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
//           onClick={() => setViewType("monthly")}
//         >
//           Monthly
//         </button>
//       </div>

//       {/* Tabs for Orders & Revenue */}
//       <div className="flex justify-center mb-6 border-b">
//         <button
//           className={`px-6 py-2 ${activeTab === "orders" ? "border-b-4 border-blue-500 font-semibold" : "text-gray-600"}`}
//           onClick={() => setActiveTab("orders")}
//         >
//           Orders
//         </button>
//         <button
//           className={`px-6 py-2 ${activeTab === "revenue" ? "border-b-4 border-red-500 font-semibold" : "text-gray-600"}`}
//           onClick={() => setActiveTab("revenue")}
//         >
//           Revenue
//         </button>
//       </div>

//       {/* Orders Section */}
//       {activeTab === "orders" && (
//         <>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//             <div className="p-4 bg-blue-100 rounded-lg text-center">
//               <h3 className="text-lg font-semibold text-blue-700">Total Orders</h3>
//               <p className="text-2xl font-bold">{stats.reduce((sum, entry) => sum + entry.totalOrders, 0)}</p>
//             </div>
//             <div className="p-4 bg-green-100 rounded-lg text-center">
//               <h3 className="text-lg font-semibold text-green-700">Completed Orders</h3>
//               <p className="text-2xl font-bold">{stats.reduce((sum, entry) => sum + entry.completedOrders, 0)}</p>
//             </div>
//             <div className="p-4 bg-gray-100 rounded-lg text-center">
//               <h3 className="text-lg font-semibold text-gray-700">{viewType === "daily" ? "Today vs Yesterday" : "This Month vs Last Month"}</h3>
//               <p className={`text-xl font-bold ${comparison.ordersDiff >= 0 ? "text-green-600" : "text-red-600"}`}>
//                 {comparison.ordersDiff >= 0 ? "+" : ""}{comparison.ordersDiff} Orders
//               </p>
//             </div>
//           </div>

//           <div className="w-full h-[350px]">
//             <Bar data={ordersData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
//           </div>
//         </>
//       )}

//       {/* Revenue Section */}
//       {activeTab === "revenue" && (
//         <>
//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="p-4 bg-red-100 rounded-lg text-center">
//               <h3 className="text-lg font-semibold text-red-700">Total Revenue</h3>
//               <p className="text-2xl font-bold">
//                 ₹{stats.reduce((sum, entry) => sum + entry.totalRevenue, 0).toLocaleString()}
//               </p>
//             </div>
//             <div className="p-4 bg-gray-100 rounded-lg text-center">
//               <h3 className="text-lg font-semibold text-gray-700">{viewType === "daily" ? "Today vs Yesterday" : "This Month vs Last Month"}</h3>
//               <p className={`text-xl font-bold ${comparison.revenueDiff >= 0 ? "text-green-600" : "text-red-600"}`}>
//                 {comparison.revenueDiff >= 0 ? "+" : ""}₹{comparison.revenueDiff.toLocaleString()} Revenue
//               </p>
//             </div>
//           </div>

//           <div className="w-full h-[350px]">
//             <Bar data={revenueData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Stats;

import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState("daily"); // 'daily' or 'monthly'
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'revenue'
  const [comparison, setComparison] = useState({ ordersDiff: 0, revenueDiff: 0 });

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/api/v1/statistics?type=${viewType}`);
      setStats(response.data);
      
      console.log('Fetched stats:', response.data); // Debugging the response data

      if (response.data.length >= 2) {
        const latest = response.data[response.data.length - 1];
        const previous = response.data[response.data.length - 2];

        console.log('Latest data:', latest); // Debugging the latest data
        console.log('Previous data:', previous); // Debugging the previous data

        setComparison({
          ordersDiff: latest.totalOrders - previous.totalOrders,
          revenueDiff: latest.totalRevenue - previous.totalRevenue,
        });
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [viewType]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
        <button onClick={fetchStats} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Retry
        </button>
      </div>
    );
  }

  const labels = stats.map((entry) =>
    viewType === "daily"
      ? `${entry._id.day}-${entry._id.month}-${entry._id.year}`
      : `${entry._id.month}-${entry._id.year}`
  );

  const ordersData = {
    labels,
    datasets: [
      {
        label: "Total Orders",
        data: stats.map((entry) => entry.totalOrders),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Completed Orders",
        data: stats.map((entry) => entry.completedOrders),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const revenueData = {
    labels,
    datasets: [
      {
        label: "Total Revenue",
        data: stats.map((entry) => entry.totalRevenue),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Order & Revenue Statistics</h2>

      {/* Toggle Button for Daily/Monthly */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l ${viewType === "daily" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => setViewType("daily")}
        >
          Daily
        </button>
        <button
          className={`px-4 py-2 rounded-r ${viewType === "monthly" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={() => setViewType("monthly")}
        >
          Monthly
        </button>
      </div>

      {/* Tabs for Orders & Revenue */}
      <div className="flex justify-center mb-6 border-b">
        <button
          className={`px-6 py-2 ${activeTab === "orders" ? "border-b-4 border-blue-500 font-semibold" : "text-gray-600"}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={`px-6 py-2 ${activeTab === "revenue" ? "border-b-4 border-red-500 font-semibold" : "text-gray-600"}`}
          onClick={() => setActiveTab("revenue")}
        >
          Revenue
        </button>
      </div>

      {/* Orders Section */}
      {activeTab === "orders" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-100 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-blue-700">Total Orders</h3>
              <p className="text-2xl font-bold">{stats.reduce((sum, entry) => sum + entry.totalOrders, 0)}</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-green-700">Completed Orders</h3>
              <p className="text-2xl font-bold">{stats.reduce((sum, entry) => sum + entry.completedOrders, 0)}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-700">{viewType === "daily" ? "Today vs Yesterday" : "This Month vs Last Month"}</h3>
              <p className={`text-xl font-bold ${comparison.ordersDiff >= 0 ? "text-green-600" : "text-red-600"}`}>
                {comparison.ordersDiff >= 0 ? "+" : ""}{comparison.ordersDiff} Orders
              </p>
            </div>
          </div>

          <div className="w-full h-[350px]">
            <Bar data={ordersData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
          </div>
        </>
      )}

      {/* Revenue Section */}
      {activeTab === "revenue" && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-red-100 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-red-700">Total Revenue</h3>
              <p className="text-2xl font-bold">
                ₹{stats.reduce((sum, entry) => sum + entry.totalRevenue, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-700">{viewType === "daily" ? "Today vs Yesterday" : "This Month vs Last Month"}</h3>
              <p className={`text-xl font-bold ${comparison.revenueDiff >= 0 ? "text-green-600" : "text-red-600"}`}>
                {comparison.revenueDiff >= 0 ? "+" : ""}₹{comparison.revenueDiff.toLocaleString()} Revenue
              </p>
            </div>
          </div>

          <div className="w-full h-[350px]">
            <Bar data={revenueData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
