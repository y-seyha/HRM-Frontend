import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthContext } from "../../contexts/useAuthContext";
import { validatePassword } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { signupUser } = useAuthContext();
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

    if (!validatePassword(formData.password)) {
      return alert(
        "Password must have uppercase, lowercase letters and numbers (min 8 characters)",
      );
    }

    setLoading(true);
    try {
      await signupUser({
        ...formData,
        employee_id: parseInt(formData.employee_id, 10),
      });
      navigate("/login"); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Employee ID */}
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
          placeholder="Enter Username"
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

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Role</label>
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
  );
};

export default SignupForm;
