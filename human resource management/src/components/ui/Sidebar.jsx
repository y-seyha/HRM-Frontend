import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaMoneyBill,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../../utils/auth";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { name: "Employees", icon: <FaUsers />, path: "/employees" },
    { name: "Leave Management", icon: <FaClipboardList />, path: "/leave" },
    { name: "Payroll", icon: <FaMoneyBill />, path: "/payroll" },
    { name: "Attendance", icon: <FaCalendarAlt />, path: "/attendance" },
    { name: "Reports", icon: <FaChartBar />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        HRM Admin
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-md mb-2 cursor-pointer hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full p-3 rounded-md hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
