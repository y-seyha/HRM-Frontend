import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { axiosInstance } from "../../api/axiosInstance";
import { API_PATH } from "../../api/api";
import { toast } from "react-toastify";
import { validatePassword } from "../../utils/helper";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: "",
    username: "",
    password: "",
    role: "employee",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password must have uppercase, lowercase letters and numbers (min 8 characters)",
      );
      return;
    }

    const payload = {
      ...formData,
      employee_id: parseInt(formData.employee_id, 10),
    };

    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATH.AUTH.REGISTER, payload);

      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success(
        "Account created successfully! Redirecting to Dashboard...",
      );
      navigate("/"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      // Axios interceptor will show toast errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[1100px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left - Form */}
        <div className="w-1/2 flex items-center justify-center bg-gray-50 p-10">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Create Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Employee ID
                </label>
                <input
                  type="number"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter Employee ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter Username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="text-sm">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Already have an account?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded-lg text-white ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 transition"
                }`}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>

        {/* Right - Branding */}
        <div className="w-1/2 relative flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-pink-400 opacity-10 rounded-full blur-3xl bottom-10 right-10"></div>

          <div className="relative z-10 max-w-md text-center space-y-6 px-8">
            <h1 className="text-4xl font-bold leading-tight">
              Join Our HRM 🚀
            </h1>
            <p className="text-lg opacity-90">
              Create your account and start managing employees, payroll, and
              departments with confidence.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <p className="text-2xl font-bold">Secure</p>
                <p className="opacity-80">Role-Based Access</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <p className="text-2xl font-bold">Smart</p>
                <p className="opacity-80">Payroll Automation</p>
              </div>
            </div>
            <p className="text-sm opacity-70 mt-6">
              Designed for modern organizations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
