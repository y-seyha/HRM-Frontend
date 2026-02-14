import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "../../api/axiosInstance";
import { API_PATH } from "../../api/api";

const AddEmployeeModal = ({ onClose, onAddSuccess, employee }) => {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    employee_code: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    hire_date: "",
    status: "Active",
    department_id: "",
    position_id: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (employee) {
      setForm({
        employee_code: employee.employee_code || "",
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        date_of_birth: employee.date_of_birth
          ? employee.date_of_birth.split("T")[0]
          : "",
        hire_date: employee.hire_date ? employee.hire_date.split("T")[0] : "",
        status: employee.status || "Active",
        department_id: employee.department_id || "",
        position_id: employee.position_id || "",
      });
    } else {
      // Clear form for adding
      setForm({
        employee_code: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        hire_date: "",
        status: "Active",
        department_id: "",
        position_id: "",
      });
    }
  }, [employee]);

  // Load dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const deptRes = await axiosInstance.get("/departments");
        setDepartments(deptRes.data);

        const posRes = await axiosInstance.get("/positions");
        setPositions(posRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data;
      if (employee) {
        // Editing
        const res = await axiosInstance.put(
          API_PATH.EMPLOYEES.UPDATE(employee.id),
          form,
        );
        data = res.data;
      } else {
        // Adding
        const res = await axiosInstance.post(API_PATH.EMPLOYEES.CREATE, form);
        data = res.data;
      }
      onAddSuccess(data); // update parent
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          {/* Employee Code */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Employee Code
            </label>
            <input
              name="employee_code"
              value={form.employee_code}
              onChange={handleChange}
              required
              className="input-style"
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              First Name
            </label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="input-style"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Last Name
            </label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="input-style"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input-style"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input-style"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
              className="input-style"
            />
          </div>

          {/* Hire Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Hire Date
            </label>
            <input
              name="hire_date"
              type="date"
              value={form.hire_date}
              onChange={handleChange}
              className="input-style"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="input-style"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Department
            </label>
            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              required
              className="input-style"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Position
            </label>
            <select
              name="position_id"
              value={form.position_id}
              onChange={handleChange}
              required
              className="input-style"
            >
              <option value="">Select Position</option>
              {positions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium mt-2 disabled:opacity-60"
          >
            {loading
              ? employee
                ? "Updating..."
                : "Adding..."
              : employee
                ? "Update Employee"
                : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
