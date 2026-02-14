import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";
import { formatDate } from "../utils/helper";
import AddEmployeeModal from "../components/Employee/AddEmployeeModal";
import ConfirmationModal from "../components/Employee/ConfirmationModal";

const Employees = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState(["All"]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Load positions ONCE
  useEffect(() => {
    const loadPositions = async () => {
      try {
        const { data } = await axiosInstance.get(API_PATH.POSITIONS.GET_ALL);
        setPositions(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadPositions();
  }, []);

  // Load employees ONCE
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(API_PATH.EMPLOYEES.GET_ALL);
        setEmployees(data);

        const deptList = [
          "All",
          ...new Set(data.map((emp) => emp.department_name || "Unassigned")),
        ];
        setDepartments(deptList);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name} ${emp.last_name}`;
    const matchesSearch =
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(search.toLowerCase());
    const matchesDept =
      departmentFilter === "All" || emp.department_name === departmentFilter;
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    try {
      await axiosInstance.delete(API_PATH.EMPLOYEES.DELETE(deleteId));
      setEmployees((prev) => prev.filter((emp) => emp.id !== deleteId));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
      setIsConfirmOpen(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <PageHeader
          title="Employees"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Add Employee"
          onButtonClick={() => {
            setEditingEmployee(null); // clear editing when adding
            setIsModalOpen(true);
          }}
        />

        {/* Modal */}
        {isModalOpen && (
          <AddEmployeeModal
            onClose={() => {
              setIsModalOpen(false);
              setEditingEmployee(null);
            }}
            onAddSuccess={(emp) => {
              if (editingEmployee) {
                setEmployees((prev) =>
                  prev.map((e) => (e.id === emp.id ? emp : e)),
                );
              } else {
                setEmployees((prev) => [...prev, emp]);
              }
            }}
            departments={departments.filter((d) => d !== "All")}
            positions={positions}
            employee={
              editingEmployee
                ? {
                    ...editingEmployee,
                    status:
                      editingEmployee.status?.trim() === "On Leave"
                        ? "On Leave"
                        : "Active",
                    date_of_birth: editingEmployee.date_of_birth?.split("T")[0],
                    hire_date: editingEmployee.hire_date?.split("T")[0],
                  }
                : null
            }
          />
        )}

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

        {/* Loading / Error / No Data */}
        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading employees...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : filteredEmployees.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No employees found.</p>
        ) : (
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
            {filteredEmployees.map((emp, idx) => (
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
                <div className="w-full md:w-2/12 text-gray-600">
                  {emp.email}
                </div>
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
                    onClick={() => {
                      setEditingEmployee(emp);
                      setIsModalOpen(true);
                    }}
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
                    onClick={() => handleDeleteClick(emp.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Employees;
