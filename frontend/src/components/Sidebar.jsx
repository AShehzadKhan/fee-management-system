import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ navItems }) => {
  const { logout } = useAuth();
  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all group ${isActive ? "text-blue-600 bg-blue-50" : "hover:bg-blue-50 hover:text-blue-600 text-gray-600"}`;

  return (
    <aside className="hidden w-64 h-[92%] md:h-[85%] shadow-2xl  md:flex flex-col fixed md:top-27.5 left-0.5 overflow-y-auto bg-white">
      {/* College Logo */}
      <div className="flex items-center justify-center p-6 border-b border-gray-200 bg-linear-to-br from-blue-50 to-white shrink">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            G
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">GPGC</h1>
            <p className=" text-gray-700">Swabi</p>
          </div>
        </div>
      </div>

      {/* Navigation NavLinks */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={navLinkClass}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 shrink">
        <button
          onClick={logout}
          className="flex items-center cursor-pointer space-x-3 w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 transition-all group"
        >
          <LogOut
            size={20}
            className="group-hover:scale-105 transition-transform"
          />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
