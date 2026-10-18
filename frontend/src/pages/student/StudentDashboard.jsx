import { Wallet, CheckCircle, Clock, AlertCircle } from "lucide-react";
import StatsCard from "../../components/StatsCard";
import { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { studentFees, recentPayments } = useContext(StudentContext);
  const { user } = useAuth();
  // Status badge colors
  const getStatusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Overdue") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Welcome Section */}
      <div className="flex justify-between px-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Hello {user?.name}, Welcome Back
          </h1>
        </div>
        <div></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        <StatsCard
          icon={<Wallet size={24} />}
          title="Total Fees"
          value="PKR 85,000"
          color="blue"
        />
        <StatsCard
          icon={<CheckCircle size={24} />}
          title="Paid"
          value="PKR 45,000"
          color="green"
        />
        <StatsCard
          icon={<Clock size={24} />}
          title="Pending"
          value="PKR 40,000"
          color="red"
        />
        <StatsCard
          icon={<AlertCircle size={24} />}
          title="Overdue"
          value="PKR 0"
          color="purple"
        />
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mx-4">
        <h2 className="text-lg font-semibold text-gray-800 px-5 py-4 border-b border-gray-200">
          Fee Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {studentFees.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.amount}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600">{item.due}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Payment */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5 mx-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Payment
        </h2>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="font-medium text-gray-800">{recentPayments.title}</p>
            <p className="text-sm text-gray-500 mt-1">
              {recentPayments.method} · Transaction ID:{" "}
              {recentPayments.transactionId}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-800">
              PKR {recentPayments.amount}
            </p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              {recentPayments.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
