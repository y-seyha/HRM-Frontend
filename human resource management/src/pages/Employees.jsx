import { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";
import AddEmployeeModal from "../components/Employee/AddEmployeeModal";
import EmployeeTable from "../components/Employee/EmployeeTable";
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

  // Load positions once
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

  // Load employees once
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

  // Filtered employees based on search and filters
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

  // Delete employee handlers
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
            setEditingEmployee(null);
            setIsModalOpen(true);
          }}
        />

        {/* Add / Edit Modal */}
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

        {/* Loading / Error / Table */}
        {loading ? (
          <p className="text-center text-gray-500 mt-8">Loading employees...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : filteredEmployees.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No employees found.</p>
        ) : (
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={(emp) => {
              setEditingEmployee(emp);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteClick}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            handleDeleteConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Employees;
