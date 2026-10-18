import { useState } from "react";
import { CreditCard, ChevronDown } from "lucide-react";

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

const programs = [
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

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const feeTypes = ["Semester Fee", "Exam Fee"];

const AssignFee = () => {
  const [formData, setFormData] = useState({
    department: "",
    program: "",
    semester: "",
    feeType: "",
    amount: "",
    dueDate: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear error for that field as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || String(formData[key]).trim() === "") {
        newErrors[key] = "This field is required";
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: hook up to backend / API
    console.log("Fee Assigned:", formData);
    alert("Fee assigned successfully!");
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border bg-white text-sm sm:text-base text-gray-800 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500";
  const labelBase = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 ml-2 mt-1">
          <div className="w-11 h-11 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Assign Fee
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Fill in the details below to assign a fee to a student.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 space-y-6"
        >
          {/* Academic Info */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-500 mb-4">
              Academic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Department */}
              <div>
                <label className={labelBase}>
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 ${
                      errors.department ? "border-red-400" : "border-blue-200"
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.department && (
                  <p className="text-xs ml-1 text-red-500 mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Program */}
              <div>
                <label className={labelBase}>
                  Program <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 ${
                      errors.program ? "border-red-400" : "border-blue-200"
                    }`}
                  >
                    <option value="">Select Program</option>
                    {programs.map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.program && (
                  <p className="text-xs ml-1 text-red-500 mt-1">{errors.program}</p>
                )}
              </div>

              {/* Semester */}
              <div>
                <label className={labelBase}>
                  Semester <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 ${
                      errors.semester ? "border-red-400" : "border-blue-200"
                    }`}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.semester && (
                  <p className="text-xs ml-1 text-red-500 mt-1">{errors.semester}</p>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Fee Details */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-500 mb-4">
              Fee Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fee Type */}
              <div>
                <label className={labelBase}>
                  Fee Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="feeType"
                    value={formData.feeType}
                    onChange={handleChange}
                    className={`${inputBase} appearance-none pr-10 ${
                      errors.feeType ? "border-red-400" : "border-blue-200"
                    }`}
                  >
                    <option value="">Select Fee Type</option>
                    {feeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.feeType && (
                  <p className="text-xs ml-1 text-red-500 mt-1">{errors.feeType}</p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className={labelBase}>
                  Amount (PKR) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  min={0}
                  onChange={handleChange}
                  placeholder="e.g. 45000"
                  className={`${inputBase} ${
                    errors.amount ? "border-red-400" : "border-blue-200"
                  }`}
                />
                {errors.amount && (
                  <p className="text-xs ml-1 text-red-500 mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className={labelBase}>
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.dueDate ? "border-red-400" : "border-blue-200"
                  }`}
                />
                {errors.dueDate && (
                  <p className="text-xs ml-1 text-red-500 mt-1">{errors.dueDate}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={labelBase}>
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g. Fall 2026 Semester Fee"
                  className={`${inputBase} ${
                    errors.description ? "border-red-400" : "border-blue-200"
                  }`}
                />
                {errors.description && (
                  <p className="text-xs ml-1 text-red-500 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="group relative w-full sm:w-auto overflow-hidden px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] text-white flex items-center justify-center gap-2 sm:gap-3"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">
                Assign Fee
              </span>
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignFee;
