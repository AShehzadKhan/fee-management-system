import { Plus, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
const QuickActions = () => {
  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Quick Actions
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Link to={"/admin/students/new"} className="contents">
          <button className="group relative overflow-hidden px-4 py-3 sm:px-6 sm:py-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-white flex items-center justify-center gap-2 sm:gap-3">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base">Add Student</span>
          <div className="absolute -right-12 -top-12 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        </button>
        </Link>
    <Link to={"/admin/students/assign"} className="contents">
        <button className="group relative overflow-hidden px-4 py-3 sm:px-6 sm:py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-white flex items-center justify-center gap-2 sm:gap-3">
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base">Assign Fee</span>
          <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        </button>
      </Link>
      </div>
    </div>
  );
};

export default QuickActions;
