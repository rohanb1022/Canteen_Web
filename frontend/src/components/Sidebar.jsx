// components/Sidebar.jsx

import { useNavigate } from "react-router-dom";
import { HomeIcon, ClockIcon, ChartBarIcon, CubeIcon, LogoutIcon } from "@heroicons/react/outline";
import logo from "../assets/Collegelogo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic, such as clearing authentication tokens
    localStorage.clear(); // Example: Clearing tokens from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-start border-b border-gray-200">
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      {/* Menu Items */}
      <nav className="mt-6 flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate("/home")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-lg"
            >
              <HomeIcon className="h-6 w-6 text-orange-500 mr-3" />
              <span>Home</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/list")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-lg"
            >
              <ClockIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span>Order List / History</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/statistics")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-lg"
            >
              <ChartBarIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span>Statistics</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/product")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-lg"
            >
              <CubeIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span>Products</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/prepared-orders")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-orange-100 rounded-lg"
            >
              <CubeIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span>Currently Serving</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-red-500 hover:text-red-600"
        >
          <LogoutIcon className="h-6 w-6 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
