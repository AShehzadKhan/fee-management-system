// src/pages/Payments.jsx
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Search,
  ChevronDown,
  Eye,
  CheckCircle,
  Filter,
  Wallet,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { AdminContext } from "../../context/AdminContext";
import StatsCard from "../../components/StatsCard";

const departments = [
  "Computer Science",
  "Zoology",
  "Botany",
  "Islamiyat",
  "Mathematics",
  "Chemistry",
  "Political Science",
  "Economics",
  "Urdu",
  "Pashto",
  "English",
  "Physics",
];

const statuses = ["Paid", "Pending", "Overdue", "Declined"];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700",
  Declined: "bg-gray-200 text-gray-700",
};

const Payments = () => {
  const { students, setStudents } = useContext(AdminContext);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ---- Update logic lives HERE ----
  const markPaymentPaid = (studentId, paymentId) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id !== studentId) return student;

        const updatedPayments = student.payments.map((payment) => {
          if (payment.id !== paymentId) return payment;

          return {
            ...payment,
            status: "Paid",
            paidDate: new Date().toISOString().slice(0, 10),
          };
        });

        return { ...student, payments: updatedPayments };
      }),
    );
  };

  // Flatten students → payments
  const payments = students.flatMap((s) =>
    s.payments.map((p) => ({
      ...p,
      studentId: s.id,
      name: s.name,
      rollNo: s.rollNo,
      department: s.department,
    })),
  );

  // KPIs
  const totalCollected = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const overdueCount = payments.filter((p) => p.status === "Overdue").length;

  // Filters
  const filtered = payments.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchDept = !departmentFilter || p.department === departmentFilter;
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const formatPKR = (n) => `PKR ${n.toLocaleString()}`;

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-white text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Payments
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Track and manage student fee payments.
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatsCard
            icon={<Wallet className="w-6 h-6" />}
            title="Total Collected"
            value={formatPKR(totalCollected)}
            color="green"
          />
          <StatsCard
            icon={<Clock className="w-6 h-6" />}
            title="Pending"
            value={`${pendingCount} payments`}
            color="blue"
          />
          <StatsCard
            icon={<AlertTriangle className="w-6 h-6" />}
            title="Overdue"
            value={`${overdueCount} payments`}
            color="red"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student or roll no..."
                className={`${inputBase} pl-9`}
              />
            </div>

            <div className="relative">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={`${inputBase} appearance-none pr-10`}
              >
                <option value="">All Departments</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`${inputBase} appearance-none pr-10`}
              >
                <option value="">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                    Fee Type
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                    Amount
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                    Method
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                    Transaction ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.length > 0 ? (
                  filtered.slice(0, 10).map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                            {p.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {p.rollNo}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                        {p.feeType}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900 hidden md:table-cell">
                        {formatPKR(p.amount)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden lg:table-cell">
                        {p.paymentMethod}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden xl:table-cell">
                        {p.transactionId}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[p.status]}`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/admin/payments/${p.id}`}>
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                              <Eye className="w-5 h-5" />
                            </button>
                          </Link>
                          {p.status !== "Paid" && (
                            <button
                              title="Mark as Paid"
                              onClick={() => markPaymentPaid(p.studentId, p.id)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-12 h-12 text-gray-300" />
                        <p className="text-lg font-medium">No payments found</p>
                        <p className="text-sm">Adjust filters to see results</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
