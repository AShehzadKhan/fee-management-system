import { Calendar } from "lucide-react";

const Schedules = () => (
  <div className=" bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 shadow-lg">
    <div className="max-w-6xl mx-auto shadow-md">
      <div className="bg-white rounded-lg shadow-sm py-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          Schedules are coming soon
        </h2>
      </div>
    </div>
  </div>
);

export default Schedules;
