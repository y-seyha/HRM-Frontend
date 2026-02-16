import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../../utils/helper";
import ConfirmationModal from "./ConfirmationModal";

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  isConfirmOpen,
  setIsConfirmOpen,
  handleDeleteConfirm,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {/* Table Header */}
      <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold rounded-t-lg px-4 py-2">
        <div className="w-1/12">NO</div>
        <div className="w-1/12">ID</div>
        <div className="w-1/12">Code</div>
        <div className="w-2/12">Name</div>
        <div className="w-2/12">Email</div>
        <div className="w-1/12">Phone</div>
        <div className="w-1/12">DOB</div>
        <div className="w-1/12">Hire</div>
        <div className="w-2/12">Dept / Pos</div>
        <div className="w-1/12">Status</div>
        <div className="w-1/12 text-right">Actions</div>
      </div>

      {/* Table Rows */}
      {employees.map((emp, idx) => (
        <div
          key={emp.id}
          className="flex flex-col md:flex-row bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-3 md:items-center transition"
        >
          <div className="w-full md:w-1/12 font-medium text-gray-700">
            {idx + 1}
          </div>
          <div className="w-full md:w-1/12 text-gray-600">{emp.id}</div>
          <div className="w-full md:w-1/12 text-gray-600">
            {emp.employee_code}
          </div>
          <div className="w-full md:w-2/12 font-medium text-gray-800">
            {emp.first_name} {emp.last_name}
          </div>
          <div className="w-full md:w-2/12 text-gray-600">{emp.email}</div>
          <div className="w-full md:w-1/12 text-gray-600">
            {emp.phone || "-"}
          </div>
          <div className="w-full md:w-1/12 text-gray-600">
            {formatDate(emp.date_of_birth)}
          </div>
          <div className="w-full md:w-1/12 text-gray-600">
            {formatDate(emp.hire_date)}
          </div>
          <div className="w-full md:w-2/12 text-gray-600">
            {emp.department_name || "Unassigned"} /{" "}
            {emp.position_name || "Unassigned"}
          </div>
          <div className="w-full md:w-1/12 flex justify-center md:justify-start">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                emp.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {emp.status}
            </span>
          </div>
          <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
            <button
              className="text-blue-600 hover:text-blue-800 transition"
              onClick={() => onEdit(emp)}
            >
              <FaEdit />
            </button>

            <ConfirmationModal
              isOpen={isConfirmOpen}
              onClose={() => setIsConfirmOpen(false)}
              onConfirm={handleDeleteConfirm}
              title="Delete Employee"
              message="Are you sure you want to delete this employee? This action cannot be undone."
            />
            <button
              className="text-red-600 hover:text-red-800 transition"
              onClick={() => onDelete(emp.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeTable;
