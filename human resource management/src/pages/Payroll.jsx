import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import ActionDropdown from "../components/ui/ActionDropdown";
import PayrollModal from "../components/Payroll/PayrollModal";
import { usePayroll } from "../hooks/usePayroll";
import ConfirmationModal from "../components/Employee/ConfirmationModal";

const Payroll = () => {
  const { payments, loading, error, deletePayment, refetch } = usePayroll();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  // Map status to colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Sort by newest payment_date first
  const sortedPayments = [...payments].sort(
    (a, b) => new Date(b.payment_date) - new Date(a.payment_date),
  );

  // Filter payments by search, department, and status
  const filteredPayments = sortedPayments.filter((p) => {
    const matchesSearch =
      p.employee_name?.toLowerCase().includes(search.toLowerCase()) ||
      (p.department_name?.toLowerCase() || "").includes(search.toLowerCase());

    const matchesDept =
      departmentFilter === "All" ||
      (p.department_name || "-") === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || (p.status || "Pending") === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Open modal for editing
  const handleEdit = (payment) => {
    setPaymentToEdit(payment);
    setModalOpen(true);
  };

  // Open modal for adding
  const handleAdd = () => {
    setPaymentToEdit(null);
    setModalOpen(true);
  };

  // Handle delete
  const handleDeleteClick = (payment) => {
    setPaymentToDelete(payment);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (paymentToDelete) {
      await deletePayment(paymentToDelete.id);
      setPaymentToDelete(null);
      setConfirmOpen(false);
    }
  };

  // Get unique departments dynamically
  const departments = [
    "All",
    ...new Set(payments.map((p) => p.department_name || "Unknown")),
  ];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <PageHeader
          title="Payroll"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Add Payroll"
          onButtonClick={handleAdd}
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
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Loading / Error */}
        {loading && (
          <p className="text-center text-gray-500 mt-8">Loading payments...</p>
        )}
        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        {/* Table Header */}
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12">NO</div>
          <div className="w-2/12">Employee</div>
          <div className="w-2/12">Department</div>
          <div className="w-1/12">Salary</div>
          <div className="w-1/12">Bonus</div>
          <div className="w-1/12">Deduction</div>
          <div className="w-1/12">Net</div>
          <div className="w-1/12">Status</div>
          <div className="w-2/12">Date</div>
          <div className="w-1/12 text-right">Actions</div>
        </div>

        {/* Payroll List */}
        <div className="flex flex-col">
          {filteredPayments.length === 0 && !loading && (
            <p className="text-center text-gray-500 mt-8">
              No payroll records found.
            </p>
          )}

          {filteredPayments.map((p, index) => (
            <div
              key={p.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 transition rounded-lg"
            >
              <div className="w-full md:w-1/12 font-medium text-gray-700">
                {index + 1}
              </div>
              <div className="w-full md:w-2/12 font-medium text-gray-800">
                {p.employee_name}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">
                {p.department_name || "-"}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">
                ${p.base_salary}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">${p.bonus}</div>
              <div className="w-full md:w-1/12 text-gray-600">
                ${p.deductions}
              </div>
              <div className="w-full md:w-1/12 font-semibold">
                ${p.net_salary}
              </div>
              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    p.status || "Pending",
                  )}`}
                >
                  {p.status || "Pending"}
                </span>
              </div>
              <div className="w-full md:w-2/12 text-gray-600">
                {new Date(p.payment_date).toLocaleDateString()}
              </div>
              <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
                <ActionDropdown
                  onEdit={() => handleEdit(p)}
                  onDelete={() => handleDeleteClick(p)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add / Edit Modal */}
        <PayrollModal
          key={paymentToEdit ? paymentToEdit.id : "new"}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          paymentToEdit={paymentToEdit}
          onSuccess={refetch}
        />

        <ConfirmationModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Payment"
          message={`Are you sure you want to delete payment for ${paymentToDelete?.employee_name}?`}
        />
      </div>
    </MainLayout>
  );
};

export default Payroll;
