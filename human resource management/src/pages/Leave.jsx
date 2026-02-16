import React, { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import LeaveFilters from "../components/Leave/LeaveFilters";
import LeaveCard from "../components/Leave/LeaveCard";
import LeaveModal from "../components/Leave/LeaveModal";
import ConfirmationModal from "../components/Employee/ConfirmationModal";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const role = currentUser?.role;

  const fetchLeaves = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.LEAVE_REQUEST.GET_ALL);
      setLeaveRequests(res.data);
    } catch (err) {
      console.error("Fetch leaves error:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const deleteLeave = async (id) => {
    setDeleteTargetId(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await axiosInstance.delete(API_PATH.LEAVE_REQUEST.DELETE(deleteTargetId));
      setLeaveRequests((prev) => prev.filter((l) => l.id !== deleteTargetId));
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsConfirmOpen(false);
      setDeleteTargetId(null);
    }
  };

  const filteredRequests = leaveRequests.filter((req) => {
    const matchesSearch =
      String(req.employee_id).includes(search) ||
      (req.leave_type || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (req.status || "pending").toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === "All" ||
      (req.leave_type || "").toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  const leaveTypes = [
    "All",
    ...new Set(leaveRequests.map((r) => r.leave_type)),
  ];

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        <PageHeader
          title="Leave Management"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Apply Leave"
          onButtonClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
        />

        <LeaveFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          leaveTypes={leaveTypes}
        />

        {filteredRequests.map((req, index) => (
          <LeaveCard
            key={req.id}
            req={req}
            index={index}
            role={role}
            showHeader={index === 0}
            onEdit={(data) => {
              setEditData(data);
              setIsModalOpen(true);
            }}
            onDelete={deleteLeave}
          />
        ))}

        <LeaveModal
          key={editData ? editData.id : "new"}
          isOpen={isModalOpen}
          editData={editData}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchLeaves} // refresh after submit
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
