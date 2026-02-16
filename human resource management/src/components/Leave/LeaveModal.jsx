import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "../../api/axiosInstance";
import { API_PATH } from "../../api/api";
import { formatDateForInput } from "../../utils/helper";

const LeaveModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = currentUser?.role === "admin";
  console.log("Current User", currentUser);
  console.log("Current User", isAdmin);

  const isEdit = !!editData;

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    employee_id: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    status: "pending",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (isEdit && editData) {
      setForm({
        employee_id: editData.employee_id || "",
        leave_type: editData.leave_type || "",
        start_date: formatDateForInput(editData.start_date),
        end_date: formatDateForInput(editData.end_date),
        reason: editData.reason || "",
        status: editData.status || "pending",
      });
    } else {
      setForm({
        employee_id: "",
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
        status: "pending",
      });
    }
  }, [editData, isEdit]);

  // Fetch employees for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (
        !form.employee_id ||
        !form.leave_type.trim() ||
        !form.start_date ||
        !form.end_date ||
        !form.reason.trim()
      ) {
        alert("Please fill all fields correctly.");
        setLoading(false);
        return;
      }

      const payload = {
        employee_id: Number(form.employee_id),
        leave_type: form.leave_type.trim(),
        start_date: new Date(form.start_date).toISOString(),
        end_date: new Date(form.end_date).toISOString(),
        reason: form.reason.trim(),
      };

      if (isAdmin && isEdit) {
        // Admin approves/rejects leave
        await axiosInstance.put(
          API_PATH.LEAVE_REQUEST.APPROVE_REJECT(editData.id),
          {
            status: form.status,
            approved_by: currentUser.employee_id,
          },
        );
        console.log("Leave ID:", editData?.id);
      } else {
        // Normal leave creation
        payload.status = "pending";
        await axiosInstance.post(API_PATH.LEAVE_REQUEST.CREATE, payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Leave submit error:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {isEdit ? "Edit Leave" : "Apply Leave"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Employee Dropdown */}
          <div>
            <label className="block mb-1 font-medium">Employee</label>
            <select
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name} ({emp.employee_code})
                </option>
              ))}
            </select>
          </div>

          {/* Leave Type */}
          <div>
            <label className="block mb-1 font-medium">Leave Type</label>
            <input
              name="leave_type"
              value={form.leave_type}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-1 font-medium">Reason</label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Status (Admin Only) */}
          {isAdmin && isEdit && (
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Submitting..."
              : isEdit
                ? "Update Leave"
                : "Submit Leave"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveModal;
