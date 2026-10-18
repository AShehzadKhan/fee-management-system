import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  Search,
  Plus,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  Users,
  Filter,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Students = () => {
  const { students } = useContext(AdminContext);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Filter options
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

  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      !search ||
      student.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      student.rollNo
        .toLowerCase()
        .includes(search.trim().toString().toLowerCase()) ||
        student.email.toLowerCase().includes(search.trim().toLowerCase());

    const matchesDepartment =
      !department ||
      student.department.trim().toLowerCase() ===
        department.trim().toLowerCase();
    const matchesSemester = !semester || student.semester === semester;

    return matchesSearch && matchesDepartment && matchesSemester;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Students
              </h1>
            </div>
            <p className="text-gray-600 mt-1 ml-10 sm:ml-11 text-sm sm:text-base">
              Manage all registered students
            </p>
          </div>

          {/* Add Student Button */}
          <button
            onClick={() => navigate("/admin/students/new")}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Student</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-6">
          {/* Search Bar */}
          <div className="relative mb-3 sm:mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400  w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search by name, roll number or email..."
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <select
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <select
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">Semester</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Roll No.
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    department
                  </th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Semester
                  </th>

                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.slice(0, 10).map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm sm:text-base">
                            {student.name?.charAt(0)}
                          </div>
                          <div className="ml-2 sm:ml-3">
                            <div className="text-sm sm:text-base font-medium text-gray-900">
                              {student.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate max-w-25 sm:max-w-none">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 hidden sm:table-cell">
                        {student.rollNo}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 hidden md:table-cell">
                        {student.department}
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 hidden lg:table-cell">
                        {student.semester}
                      </td>

                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <Link to={`/admin/students/${student.id}`}>
                            <button className="p-1 text-blue-600 hover:bg-blue-50 hover:scale-110 cursor-pointer rounded transition-colors">
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </Link>
                          
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-3 sm:px-6 py-8 sm:py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300" />
                        <p className="text-base sm:text-lg font-medium">
                          No students found
                        </p>
                        <p className="text-xs sm:text-sm">
                          Add students to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {students.length > 0 && (
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
                Showing 1–10 of {students.length}
              </div>

              <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
                <button className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-blue-600 text-white text-xs sm:text-sm">
                  1
                </button>
                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg hover:bg-gray-100 text-xs sm:text-sm">
                  2
                </button>
                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg hover:bg-gray-100 text-xs sm:text-sm">
                  3
                </button>
                <span className="text-xs sm:text-sm">...</span>
                <button className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg hover:bg-gray-100 text-xs sm:text-sm">
                  {Math.ceil(students.length / 10)}
                </button>

                <button className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
