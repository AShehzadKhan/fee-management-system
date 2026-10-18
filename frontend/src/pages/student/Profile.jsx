import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Hash,
  Building2,
} from "lucide-react";
import StudentProfileInfo from "../../components/StudentProfileInfo";
import { useAuth } from "../../context/AuthContext";
const Profile = () => {
  const { user } = useAuth();
  // ---- Personal info ----
  const personalInfo = [
    { label: "Full Name", value: user?.name, icon: User },
    { label: "Email", value: user?.email, icon: Mail },
    { label: "Phone", value: user?.phone, icon: Phone },
    { label: "Address", value: user?.address, icon: MapPin },
  ];

  // ---- Academic info ----
  const academicInfo = [
    { label: "Department", value: user?.department, icon: Building2 },
    { label: "Program", value: user?.program, icon: GraduationCap },
    { label: "Semester", value: user?.semester, icon: Calendar },
    { label: "Session", value: user?.session, icon: BookOpen },
    { label: "Roll Number", value: user?.rollNo, icon: Hash },
  ];

  return (
    <div className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6">
      {/* Page Header */}
      <div className="px-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Profile
        </h1>
        <p className="text-gray-600 mt-1 text-sm lg:text-base">
          View your personal and academic information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 lg:p-8 mx-2">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-blue-50 rounded-full flex items-center justify-center">
            <User size={36} className="text-blue-600 lg:w-11 lg:h-11" />
          </div>

          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mt-4">
            {user?.name}
          </h2>
          <p className="text-sm lg:text-base text-gray-500 mt-0.5">Student</p>

          <span className="mt-3 px-3 lg:px-4 py-1 lg:py-1.5 text-xs lg:text-sm font-semibold rounded-full bg-blue-100 text-blue-700">
            {user?.rollNo}
          </span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="px-2">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalInfo.map((item) => (
            <StudentProfileInfo key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* Academic Information */}
      <div className="px-2">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-3 lg:mb-4">
          Academic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {academicInfo.map((item) => (
            <StudentProfileInfo key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
