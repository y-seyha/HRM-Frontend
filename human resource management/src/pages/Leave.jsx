import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import LeaveFilters from "../components/Leave/LeaveFilters";
import LeaveCard from "../components/Leave/LeaveCard";
import LeaveModal from "../components/Leave/LeaveModal";
import ConfirmationModal from "../components/Employee/ConfirmationModal";
import { useLeaves } from "../hooks/useLeaves";
import { useFilteredLeaves } from "../hooks/useFilterLeave";

const LeaveManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  const role = storedUser ? JSON.parse(storedUser).role : null;

  const { leaveRequests, fetchLeaves, deleteLeave, loading, error } =
    useLeaves();
  const filteredRequests = useFilteredLeaves(
    leaveRequests,
    search,
    statusFilter,
    typeFilter,
  );

  const leaveTypes = [
    "All",
    ...new Set(leaveRequests.map((r) => r.leave_type)),
  ];

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    await deleteLeave(deleteTargetId);
    setIsConfirmOpen(false);
    setDeleteTargetId(null);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        <PageHeader
          title="Leave Management"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Apply Leave"
          onButtonClick={handleAdd}
        />

        <LeaveFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          leaveTypes={leaveTypes}
        />

        {loading && (
          <p className="text-center mt-8 text-gray-500">
            Loading leave requests...
          </p>
        )}
        {error && <p className="text-center mt-8 text-red-500">{error}</p>}

        {!loading &&
          !error &&
          filteredRequests.map((req, index) => (
            <LeaveCard
              key={req.id}
              req={req}
              index={index}
              role={role}
              showHeader={index === 0}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}

        <LeaveModal
          key={editData ? editData.id : "new"}
          isOpen={isModalOpen}
          editData={editData}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchLeaves}
        />

        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Leave Request"
          message="Are you sure you want to delete this leave request?"
        />
      </div>
    </MainLayout>
  );
};

export default LeaveManagement;
