import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Edit,
  Wallet,
  CheckCircle,
  AlertCircle,
  Building,
  Award,
  CreditCard,
} from "lucide-react";

const StudentProfile = () => {
  const { studentId } = useParams();
  const { students } = useContext(AdminContext);
  const [studentProfile, setStudentProfile] = useState(null);

  const fetchStudentData = () => {
    const student = students.find(
      (student) => student.id?.toString() === studentId?.toString(),
    );
    setStudentProfile(student || null);
  };

  useEffect(() => {
    fetchStudentData();
  }, [students, studentId]);

  // If no student found
  if (!studentProfile) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <Link
          to={"/admin/students"}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 w-fit px-2"
        >
          <ArrowLeft size={16} />
          Back to Students
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-12 mx-2 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={36} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Student Not Found</h2>
          <p className="text-sm text-gray-500 mt-1">
            The student you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Back Link */}
      <Link
        to={"/admin/students"}
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 w-fit px-2"
      >
        <ArrowLeft size={16} />
        Back to Students
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 mx-2 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl lg:text-3xl font-bold shrink-0">
                {studentProfile.name?.charAt(0) || <User size={32} />}
              </div>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800 truncate">
                  {studentProfile.name || "Student Name"}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 font-mono">
                    {studentProfile.rollNumber ||
                      studentProfile.rollNo ||
                      "N/A"}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>{studentProfile.program || "N/A"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    Semester {studentProfile.semester || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                <User size={18} className="text-blue-600" />
                <h3 className="text-base font-semibold text-gray-800">
                  Personal Information
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <Mail size={14} className="text-gray-400" />
                    Email
                  </span>
                  <span className="text-sm font-medium text-gray-900 break-all">
                    {studentProfile.email || "Not provided"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <Phone size={14} className="text-gray-400" />
                    Phone
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {studentProfile.phone || "Not provided"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <MapPin size={14} className="text-gray-400" />
                    Address
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {studentProfile.address || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                <Building size={18} className="text-blue-600" />
                <h3 className="text-base font-semibold text-gray-800">
                  Academic Information
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <Building size={14} className="text-gray-400" />
                    Department
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {studentProfile.department || "Not assigned"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <Award size={14} className="text-gray-400" />
                    Program
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {studentProfile.program || "Not assigned"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <BookOpen size={14} className="text-gray-400" />
                    Semester
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {studentProfile.semester || "N/A"}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-6 py-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2 sm:min-w-24">
                    <Calendar size={14} className="text-gray-400" />
                    Session
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {studentProfile.session || "Not set"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Summary Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Wallet size={18} className="text-blue-600" />
              <h3 className="text-base font-semibold text-gray-800">
                Fee Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Fees */}
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Fees
                  </span>
                  <span className="p-2 rounded-lg bg-blue-50">
                    <CreditCard size={16} className="text-blue-600" />
                  </span>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-blue-700">
                  Rs.{" "}
                  {studentProfile.feeSummary?.total?.toLocaleString() || "0"}
                </p>
              </div>

              {/* Paid */}
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Paid
                  </span>
                  <span className="p-2 rounded-lg bg-green-50">
                    <CheckCircle size={16} className="text-green-600" />
                  </span>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-green-700">
                  Rs. {studentProfile.feeSummary?.paid?.toLocaleString() || "0"}
                </p>
              </div>

              {/* Pending */}
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Pending
                  </span>
                  <span className="p-2 rounded-lg bg-yellow-50">
                    <AlertCircle size={16} className="text-yellow-600" />
                  </span>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-yellow-700">
                  Rs.{" "}
                  {studentProfile.feeSummary?.pending?.toLocaleString() || "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
