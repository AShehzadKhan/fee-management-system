import { useContext, useState } from "react";
import { Search, Eye, Wallet, CheckCircle, X } from "lucide-react";
import { StudentContext } from "../../context/StudentContext";
import { paymentMethod } from "../../assets/assets";

const Fees = () => {
  const { studentFees } = useContext(StudentContext);

  // ---- UI state ----
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [step, setStep] = useState("list"); // list | method | confirm | success
  const [selectedFee, setSelectedFee] = useState(null);
  const [method, setMethod] = useState("Easypaisa");
  const [transactionId, setTransactionId] = useState("");

  // ---- Filter + search logic ----
  const visibleFees = studentFees.filter(
    (f) =>
      (filter === "All" || f.status === filter) &&
      f.name.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-yellow-100 text-yellow-700";
    if (status === "Overdue") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // ---- Payment flow handlers ----
  const startPayment = (fee) => {
    setSelectedFee(fee);
    setStep("method");
  };

  const confirmPayment = () => {
    const id = `${method === "Easypaisa" ? "EP" : "JC"}${Math.floor(100000 + Math.random() * 900000)}`;
    setTransactionId(id);
    setStep("success");
  };

  const closeFlow = () => {
    setStep("list");
    setSelectedFee(null);
    setTransactionId("");
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Page Header */}
      <div className="px-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Fees
        </h1>
        <p className="text-gray-600 mt-1">
          View your assigned fees and payment status
        </p>
      </div>
      <div></div>
      {/* Search + Filter Bar */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 mx-2 flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search fees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Paid", "Overdue"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mx-2">
        <div className="overflow-x-auto">
          <table className="w-full">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visibleFees.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No fees found
                  </td>
                </tr>
              ) : (
                visibleFees.map((fee) => (
                  <tr
                    key={fee.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">
                        {fee.name}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">
                        PKR {fee.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{fee.due}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(fee.status)}`}
                      >
                        {fee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {fee.status === "Paid" ? (
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                          <Eye size={16} />
                          View
                        </button>
                      ) : (
                        <button
                          onClick={() => startPayment(fee)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <Wallet size={16} />
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Payment Modal (method → confirm → success) ===== */}
      {step !== "list" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative">
            {/* Close button */}
            {step !== "success" && (
              <button
                onClick={closeFlow}
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
              >
                <X size={20} />
              </button>
            )}

            {/* STEP 1: Choose Method */}
            {step === "method" && (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedFee.name}
                </h2>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  PKR {selectedFee.amount.toLocaleString()}
                </p>

                <p className="text-sm font-medium text-gray-700 mt-5 mb-2">
                  Payment Method
                </p>
                <div className="space-y-2">
  {[
    { name: "Easypaisa", logo: paymentMethod.easypaisa },
    { name: "JazzCash",  logo: paymentMethod.jazz_cash },
  ].map((m) => (
    <label
      key={m.name}
      className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
        method === m.name
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <input
        type="radio"
        name="method"
        value={m.name}
        checked={method === m.name}
        onChange={() => setMethod(m.name)}
        className="accent-blue-600"
      />

      <img
        src={m.logo}
        alt={m.name}
        className="w-16 h-16 object-contain rounded"
      />
    </label>
  ))}
</div>

                <button
                  onClick={() => setStep("confirm")}
                  className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Continue to Payment
                </button>
              </>
            )}

            {/* STEP 2: Confirm */}
            {step === "confirm" && (
              <>
                <h2 className="text-lg font-semibold text-gray-800">
                  Payment Confirmation
                </h2>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fee</span>
                    <span className="font-medium text-gray-800">
                      {selectedFee.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-medium text-gray-800">
                      PKR {selectedFee.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method</span>
                    <span className="font-medium text-gray-800">{method}</span>
                  </div>
                </div>

                <button
                  onClick={confirmPayment}
                  className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => setStep("method")}
                  className="w-full mt-2 py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Back
                </button>
              </>
            )}

            {/* STEP 3: Success */}
            {step === "success" && (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mt-4">
                  Payment Successful
                </h2>

                <div className="mt-4 space-y-3 text-sm text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-medium text-gray-800">
                      {transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-medium text-gray-800">
                      PKR {selectedFee.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-800 text-sm">
                      {new Date().toLocaleDateString()}{" "}
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Paid
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeFlow}
                  className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  View Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Fees;
