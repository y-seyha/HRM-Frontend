import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import LeaveModal from "../components/Leave/LeaveModal";

import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";
import ConfirmationModal from "../components/Employee/ConfirmationModal";

const LeaveManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Safe parsing
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const role = currentUser?.role; // 'admin' or 'employee'

  //Fetch
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.LEAVE_REQUEST.GET_ALL);
        setLeaveRequests(res.data);
      } catch (err) {
        console.error("Fetch leaves error:", err);
      }
    };

    fetchLeaves();
  }, []);

  const handleDeleteClick = (id) => {
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
  const statuses = ["All", "pending", "approved", "rejected"];

  const getStatusColor = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700"; // pending / null
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const d = new Date(isoDate);
    return d.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Page Header */}
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

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {leaveTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Header Row */}
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12">No</div>
          <div className="w-1/12">ID</div>
          <div className="w-3/12">Employee Name</div>
          <div className="w-2/12">Type</div>
          <div className="w-3/12">Dates</div>
          <div className="w-1/12">Status</div>
          <div className="w-2/12">Approved By</div>
          <div className="w-2/12 text-right">Actions</div>
        </div>

        {/* Leave Cards */}
        <div className="flex flex-col">
          {filteredRequests.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No leave requests found.
            </p>
          )}

          {filteredRequests.map((req, index) => (
            <div
              key={req.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 transition rounded-lg"
            >
              <div className="w-full md:w-1/12 font-medium text-gray-700">
                {index + 1}
              </div>

              <div className="w-full md:w-1/12 font-medium text-gray-700">
                {req.employee_id || "-"}
              </div>

              {/* Employee Name */}
              <div className="w-full md:w-3/12 font-medium text-gray-800">
                {req.employee_fullname || "Unknown"}
              </div>

              <div className="w-full md:w-2/12 text-gray-600">
                {req.leave_type}
              </div>

              <div className="w-full md:w-3/12 text-gray-600">
                {formatDate(req.start_date)} → {formatDate(req.end_date)}
              </div>

              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    req.status || "pending",
                  )}`}
                >
                  {req.status || "pending"}
                </span>
              </div>

              {/* Approved By */}
              <div className="w-full md:w-2/12 text-gray-700">
                {req.approved_by_fullname || "-"}
              </div>

              {/* Actions */}
              <div className="w-full md:w-2/12 flex justify-end gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => {
                    setEditData(req);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaEdit />
                </button>

                {role === "admin" && (
                  <button
                    onClick={() => handleDeleteClick(req.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash />
                  </button>
                )}

                <ConfirmationModal
                  isOpen={isConfirmOpen}
                  onClose={() => setIsConfirmOpen(false)}
                  onConfirm={handleConfirmDelete}
                  title="Delete Leave Request"
                  message="Are you sure you want to delete this leave request?"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Leave Modal */}
        <LeaveModal
          key={editData ? editData.id : "new"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={async () => {
            setIsModalOpen(false);
            try {
              const res = await axiosInstance.get(
                API_PATH.LEAVE_REQUEST.GET_ALL,
              );
              setLeaveRequests(res.data);
            } catch (err) {
              console.error("Failed to refresh leave requests:", err);
            }
          }}
          editData={editData}
        />
      </div>
    </MainLayout>
  );
};

export default LeaveManagement;
