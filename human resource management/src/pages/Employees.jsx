import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";

const Employees = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const employees = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice@example.com",
      department: "IT",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Jones",
      email: "bob@example.com",
      department: "HR",
      role: "HR Manager",
      status: "On Leave",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      department: "Sales",
      role: "Sales Rep",
      status: "Active",
    },
  ];

  // Filter employees based on search + dropdowns
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      departmentFilter === "All" || emp.department === departmentFilter;
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Get unique departments for filter dropdown
  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Page Header with Search + Add Button */}
        <PageHeader
          title="Employees"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Add Employee"
          onButtonClick={() => alert("Add Employee clicked")}
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {/* Employee Table Header */}
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12">#</div>
          <div className="w-3/12">Name</div>
          <div className="w-3/12">Email</div>
          <div className="w-2/12">Department</div>
          <div className="w-2/12">Role</div>
          <div className="w-1/12">Status</div>
          <div className="w-1/12 text-right">Actions</div>
        </div>

        {/* Employee Rows */}
        <div className="flex flex-col">
          {filteredEmployees.map((emp, index) => (
            <div
              key={emp.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 transition"
            >
              <div className="w-full md:w-1/12 font-medium text-gray-700">
                {index + 1}
              </div>
              <div className="w-full md:w-3/12 font-medium text-gray-800">
                {emp.name}
              </div>
              <div className="w-full md:w-3/12 text-gray-600">{emp.email}</div>
              <div className="w-full md:w-2/12 text-gray-600">
                {emp.department}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">{emp.role}</div>
              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    emp.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {emp.status}
                </span>
              </div>
              <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
                <button className="text-blue-600 hover:text-blue-800 transition">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-800 transition">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No employees found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Employees;
