import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddStudent = () => {
  const { students, setStudents } = useContext(AdminContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    // Academic Information
    rollNo: "",
    department: "",
    program: "",
    semester: "",
    session: "",
  });

  const [errors, setErrors] = useState({});

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

  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const sessions = [
    "2022-2026",
    "2023-2027",
    "2024-2028",
    "2025-2029",
    "2026-2030",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone number must be 11 digits";
    }
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll Number is required";
    } else if (!formData.rollNo.includes("-")) {
      newErrors.rollNo = "Roll Number must be in the required format";
    }
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.program) newErrors.program = "Program is required";
    if (!formData.semester) newErrors.semester = "Semester is required";
    if (!formData.session) newErrors.session = "Session is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const newStudent = {
        ...formData,
        id: Date.now().toString(),
        feeSummary: {
          total: 0,
          paid: 0,
          pending: 0,
        },
      };
      setStudents((prevStudent) => [...prevStudent, newStudent]);
      toast.success(`Student Added Successfully`);
      setTimeout(() => {
        navigate(`/admin/students`);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      rollNo: "",
      department: "",
      program: "",
      semester: "",
      session: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Student Registration Form
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please fill in all required fields
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.name ? "border-red-500" : "border-gray-300"}`}
                    placeholder="John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="john@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    placeholder="03001234567"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                    }`}
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="2"
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="123 Main St, City, Country"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-500">
                Academic Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.rollNo ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="CS-2415"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                  />
                  {errors.rollNo && (
                    <p className="text-red-500 text-sm mt-1">{errors.rollNo}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.department ? "border-red-500" : "border-gray-300"
                    }`}
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Program */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.program ? "border-red-500" : "border-gray-300"
                    }`}
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                  >
                    <option value="">Select Program</option>
                    {programs.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                  {errors.program && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.program}
                    </p>
                  )}
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.semester ? "border-red-500" : "border-gray-300"
                    }`}
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                  {errors.semester && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.semester}
                    </p>
                  )}
                </div>

                {/* Session */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.session ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.session}
                    name="session"
                    onChange={handleChange}
                  >
                    <option value="">Select Session</option>
                    {sessions.map((session) => (
                      <option key={session} value={session}>
                        {session}
                      </option>
                    ))}
                  </select>
                  {errors.session && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.session}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Submit Registration
              </button>
              <button
                type="reset"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={handleReset}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
