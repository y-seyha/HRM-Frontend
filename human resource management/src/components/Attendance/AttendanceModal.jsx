import React, { useState, useEffect } from "react";

const AttendanceModal = ({ isOpen, onClose, onSubmit, editData, isAdmin }) => {
  const isEdit = !!editData;

  const initialForm = {
    employee_id: editData?.employee_id || "",
    attendance_date: editData?.attendance_date?.split("T")[0] || "",
    status: editData?.status || "Present",
  };

  const [form, setForm] = useState(initialForm);

  // Update whenever modal opens or editData changes
  useEffect(() => {
    if (isOpen) {
      // Use a microtask to avoid synchronous setState warning
      Promise.resolve().then(() => setForm(initialForm));
    }
  }, [isOpen, editData]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, employee_id: Number(form.employee_id) });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          {isEdit ? "Edit Attendance" : "Mark Attendance"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="number"
              value={form.employee_id}
              onChange={(e) =>
                setForm({ ...form, employee_id: e.target.value })
              }
              className="border p-2 rounded"
              required
              readOnly={isEdit && !isAdmin}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={form.attendance_date}
              onChange={(e) =>
                setForm({ ...form, attendance_date: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border p-2 rounded"
              disabled={!isAdmin}
            >
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
