import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GraduationCap, ArrowRight } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    password: "",
    rollNo: "",
    department: "",
    program: "",
    semester: "",
    session: "",
  });

  const [errors, setErrors] = useState({});

  const { setToken, setUser, backendUrl } = useAuth();
  const navigate = useNavigate();
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

  const programs = departments;

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
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
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
    } else if (!/^03\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone must start with 03 and be 11 digits";
    }

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newErrors = validate();

      if (Object.keys(newErrors).length === 0) {
        const { data } = await axios.post(
          `${backendUrl}/user/register`,
          formData,
        );
        console.log(data);
        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setUser(data.user);
          navigate(
            data.user.role === "admin"
              ? "/admin/dashboard"
              : "/student/dashboard",
            { replace: true },
          );
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        setErrors(newErrors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm text-gray-700 focus:outline-none transition-colors ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-gray-200 focus:border-blue-500"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-2xl">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-5 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md">
            <GraduationCap size={28} className="text-white sm:hidden" />
            <GraduationCap size={32} className="text-white hidden sm:block" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-3 sm:mt-4">
            GPGC Swabi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Fee Management System
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 text-center">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Create Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Fill in your details to register
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ahmad Shehzad"
                    className={`mt-2 ${inputClass("name")}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ahmad@example.com"
                    className={`mt-2 ${inputClass("email")}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03001234567"
                    className={`mt-2 ${inputClass("phone")}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`mt-2 ${inputClass("dateOfBirth")}`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`mt-2 ${inputClass("password")}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="2"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City"
                    className={`mt-2 resize-none ${inputClass("address")}`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Roll Number */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    placeholder="CS-2415"
                    className={`mt-2 ${inputClass("rollNo")}`}
                  />
                  {errors.rollNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`mt-2 cursor-pointer bg-white ${inputClass("department")}`}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* Program */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className={`mt-2 cursor-pointer bg-white ${inputClass("program")}`}
                  >
                    <option value="">Select Program</option>
                    {programs.map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                  {errors.program && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.program}
                    </p>
                  )}
                </div>

                {/* Semester */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className={`mt-2 cursor-pointer bg-white ${inputClass("semester")}`}
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                  {errors.semester && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.semester}
                    </p>
                  )}
                </div>

                {/* Session */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Session <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    className={`mt-2 cursor-pointer bg-white ${inputClass("session")}`}
                  >
                    <option value="">Select Session</option>
                    {sessions.map((sess) => (
                      <option key={sess} value={sess}>
                        {sess}
                      </option>
                    ))}
                  </select>
                  {errors.session && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.session}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer text-sm sm:text-base"
            >
              Create Account
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Login Link Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50 text-center text-xs sm:text-sm">
            <span className="text-gray-500">Already have an account?</span>{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-5 sm:mt-6">
          © {new Date().getFullYear()} GPGC Swabi. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
