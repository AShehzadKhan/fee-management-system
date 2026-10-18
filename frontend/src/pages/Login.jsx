import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setUser, backendUrl } = useAuth();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`${backendUrl}/user/login`, form);
      console.log(data);
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-md">
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
              Welcome Back,
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </label>
              <div className="relative mt-2">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ahmad@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <div className="relative mt-2">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer text-sm sm:text-base"
            >
              Sign In
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Register Link Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50 text-center text-xs sm:text-sm">
            <span className="text-gray-500">Don't have an account?</span>{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Register
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

export default Login;
