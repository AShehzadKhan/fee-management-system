import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Payments from "./pages/admin/Payments";
import AdminLayout from "./layouts/AdminLayout";
import Schedule from "./pages/admin/Schedules";
import StudentProfile from "./pages/admin/StudentProfile";
import AddStudent from "./components/AddStudent";
import AssignFee from "./components/AssignFee";
import { ToastContainer } from "react-toastify";
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentPayments from "./pages/student/Payments";
import StudentFees from "./pages/student/Fees";
import Profile from "./pages/student/Profile";
import Register from "./pages/student/Register";
import HomeRedirects from "./components/HomeRedirects";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="px-2">
      <ToastContainer autoClose="1800" />
      <Routes>
        {/* --------- Home -------- */}
        <Route path="/" element={<HomeRedirects />} />

        {/* ------ Public Routes --------- */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ----------- Admin Routes ---------- */}
        <Route element={<ProtectedRoute allowedRole={"admin"} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/new" element={<AddStudent />} />
            <Route path="students/assign" element={<AssignFee />} />
            <Route path="students/:studentId" element={<StudentProfile />} />
            <Route path="payments" element={<Payments />} />
            <Route path="schedules" element={<Schedule />} />
          </Route>
        </Route>

        {/* ------- Student Routes --------- */}
        <Route element={<ProtectedRoute allowedRole={"student"} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="payments" element={<StudentPayments />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ------ Unauthorized --------- */}
        <Route path="/unauthorized" element={<h1>Access Denied</h1>} />

        {/* ---------- Unknown URLs --------- */}
        <Route path="*" element={<HomeRedirects />} />
      </Routes>
    </div>
  );
};

export default App;
