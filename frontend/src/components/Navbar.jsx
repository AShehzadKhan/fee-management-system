import { Menu, School, User, X, LogOut } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ navText, navItems }) => {
  const { user, logout } = useAuth();
  const [visible, setVisible] = useState(false);
  const navLinkClass = ({ isActive }) =>
    `${isActive ? "text-blue-600 bg-blue-100" : "text-gray-600"}`;
  return (
    <div className="flex items-center justify-between py-5 bg-white font-medium pr-4 border-b border-gray-300 fixed top-0 right-0 left-0 z-1000">
      <div className="pl-3">
        <div className="flex gap-3">
          <School className="text-blue-400" size={40} />
          <h1 className="text-2xl md:text-3xl mt-2">GPGC Swabi</h1>
        </div>
        <p className="hidden sm:block md:text-base">
          Government Post Graduate College Swabi
        </p>
      </div>
      <div className="p-2 hidden sm:block">
        <h1 className="text-3xl text-blue-400">{navText}</h1>
      </div>
      <div className="hidden sm:flex flex-col items-center justify-center gap-2">
        <User
          size={30}
          className="cursor-pointer hover:text-blue-400 transition-all"
        />
        <p>{user?.name.split(" ")[0]}</p>
      </div>
      <Menu
        className="cursor-pointer sm:hidden"
        onClick={() => setVisible(true)}
      />

      {/* Sidebar menu for smaller screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 shadow-2xl overflow-y-auto bg-white transition-all ${visible ? "w-2/3" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="p-3">
            <X className="cursor-pointer" onClick={() => setVisible(false)} />
          </div>

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              className={navLinkClass}
              onClick={() => setVisible(false)}
              to={item.path}
            >
              <div className="cursor-pointer px-4 py-3 flex gap-2 hover:text-blue-400 border-b border-gray-400">
                <item.icon size={22} />
                <p>{item.label}</p>
              </div>
            </NavLink>
          ))}

          <NavLink onClick={logout}>
            <div className="cursor-pointer px-4 py-3 flex gap-2 hover:text-red-500 border-b border-gray-400">
              <LogOut size={22} />
              <p>Logout</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
