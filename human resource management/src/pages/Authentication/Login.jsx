import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { axiosInstance } from "../../api/axiosInstance";
import { API_PATH } from "../../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        username: formData.username,
        password: formData.password,
      });

      // Extract JWT and user from nested object
      const jwt = res.data.token.token; // actual JWT string
      const user = res.data.token.user; // user object

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      navigate("/"); // redirect to dashboard
    } catch (err) {
      console.error(err);
      // Axios interceptor handles errors & toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[1100px] h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left - Login Form */}
        <div className="w-1/2 flex items-center justify-center bg-gray-50 p-10">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Login to HRM
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username */}
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
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password */}
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

              {/* Links */}
              <div className="flex justify-between text-sm">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Don't have an account?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded-lg text-white ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 transition"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>

        {/* Right - Info / Graphics */}
        <div className="w-1/2 relative flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl top-10 left-10"></div>
          <div className="absolute w-72 h-72 bg-pink-400 opacity-10 rounded-full blur-3xl bottom-10 right-10"></div>

          <div className="relative z-10 max-w-md text-center space-y-6 px-8">
            <h1 className="text-4xl font-bold leading-tight">
              Welcome Back 👋
            </h1>

            <p className="text-lg opacity-90">
              Streamline your workforce management with real-time insights,
              payroll automation, and seamless department coordination.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <p className="text-2xl font-bold">120+</p>
                <p className="opacity-80">Employees Managed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <p className="text-2xl font-bold">24/7</p>
                <p className="opacity-80">System Access</p>
              </div>
            </div>

            <p className="text-sm opacity-70 mt-6">
              Built for modern HR teams 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
