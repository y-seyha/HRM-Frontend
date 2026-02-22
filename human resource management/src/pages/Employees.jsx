import { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import AddEmployeeModal from "../components/Employee/AddEmployeeModal";
import EmployeeTable from "../components/Employee/EmployeeTable";
import { useEmployees } from "../hooks/useEmployees";
import { useFilteredEmployees } from "../hooks/useFilterEmployees";

const Employees = () => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    employees,
    departments,
    positions,
    loading,
    error,
    setEmployees,
    deleteEmployee,
  } = useEmployees();

  const filteredEmployees = useFilteredEmployees(
    employees,
    search,
    departmentFilter,
    statusFilter,
  );

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteEmployee(deleteId);
    setDeleteId(null);
    setIsConfirmOpen(false);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
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

        {isModalOpen && (
          <AddEmployeeModal
            onClose={() => setIsModalOpen(false)}
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
              editingEmployee && {
                ...editingEmployee,
                status:
                  editingEmployee.status?.trim() === "On Leave"
                    ? "On Leave"
                    : "Active",
                date_of_birth: editingEmployee.date_of_birth?.split("T")[0],
                hire_date: editingEmployee.hire_date?.split("T")[0],
              }
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

        {/* Table / Loading / Error */}
        {loading && (
          <p className="text-center text-gray-500 mt-8">Loading employees...</p>
        )}
        {error && <p className="text-center text-red-500 mt-8">{error}</p>}
        {!loading && !error && filteredEmployees.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No employees found.</p>
        )}
        {!loading && !error && filteredEmployees.length > 0 && (
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
