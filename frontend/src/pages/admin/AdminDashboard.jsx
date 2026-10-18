import { Users, Clock, TrendingUp } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import FeeTable from "../../components/FeeTable";
import QuickActions from "../../components/QuickActions";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row gap-3 md:justify-between px-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Hello, {user?.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back to Fee Management System
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<Users size={24} />}
          title="Total Students"
          value="2,450"
          color="blue"
        />
        <StatsCard
          icon={<Clock size={24} />}
          title="Pending Fees"
          value="342"
          color="red"
        />
        <StatsCard
          icon={"Rs"}
          title="Today's Collection"
          value="Rs.8,450"
          color="green"
        />
        <StatsCard
          icon={<TrendingUp size={24} />}
          title="Total Revenue"
          value="Rs.124,850"
          color="purple"
        />
      </div>
      <QuickActions />
      <FeeTable />
    </div>
  );
};

export default AdminDashboard;
