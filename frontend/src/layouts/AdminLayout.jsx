import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import {LayoutDashboard,Users,CreditCard,Calendar,} from "lucide-react"
import StudentContextProvider from "../context/AdminContext";

const AdminLayout = () => {
  const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Students", icon: Users, path: "/admin/students" },
  { label: "Payments", icon: CreditCard, path: "/admin/payments" },
  { label: "Schedules", icon: Calendar, path: "/admin/schedules" },
]
  return (
    <>
      <StudentContextProvider>
        <Navbar navText={"Plan, Manage, Deliver"} navItems={navItems}/>
        <Sidebar navItems={navItems}/>
        <main className="mt-20 md:ml-64 sm:mt-26 md:mt-32 p-4 md:p-6'">
          <Outlet />
        </main>
      </StudentContextProvider>
    </>
  );
};

export default AdminLayout;
