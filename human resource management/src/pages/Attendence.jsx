import React, { useState } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import PageHeader from "../components/ui/PageHeader";
import KpiCard from "../components/ui/KpiCard";
import ActionDropdown from "../components/ui/ActionDropdown";
import { CSVLink } from "react-csv";
import { FaUserCheck, FaUserTimes, FaUserClock } from "react-icons/fa";
import { useAttendance } from "../hooks/useAttendence";
import AttendanceModal from "../components/Attendance/AttendanceModal";
import ConfirmationModal from "../components/Employee/ConfirmationModal";

const Attendance = () => {
  const { attendance, refetch, checkIn, updateAttendance, deleteAttendance } =
    useAttendance();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filters + search
  let filtered = attendance.filter((emp) =>
    `${emp.first_name} ${emp.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // Sorting
  if (sortKey) {
    filtered.sort((a, b) =>
      sortKey === "work_hours"
        ? parseFloat(b.work_hours) - parseFloat(a.work_hours)
        : new Date(a.attendance_date).getTime() -
          new Date(b.attendance_date).getTime(),
    );
  }

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // Badge colors based on status
  const getStatusColor = (status) => {
    if (status === "Absent") return "bg-red-100 text-red-700";
    if (status === "Late") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700"; // Present
  };

  // Handlers

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      const payload = {
        employee_id: Number(form.employee_id),
        attendance_date: form.attendance_date,
        status: form.status, // Use selected status
      };

      if (editData) {
        await updateAttendance(editData.id, payload);
      } else {
        await checkIn(payload);
      }

      setModalOpen(false);
      refetch(); // refresh UI after backend update
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteId) await deleteAttendance(deleteId);
      setConfirmOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Page Header */}
        <PageHeader
          title="Attendance"
          searchValue={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          buttonText="Mark Attendance"
          onButtonClick={handleAdd}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <KpiCard
            title="Attendances"
            value={attendance.filter((e) => e.status === "Present").length}
            icon={FaUserCheck}
            bgColor="bg-green-500"
          />
          <KpiCard
            title="Absent"
            value={attendance.filter((e) => e.status === "Absent").length}
            icon={FaUserTimes}
            bgColor="bg-red-500"
          />
          <KpiCard
            title="Late "
            value={attendance.filter((e) => e.status === "Late").length}
            icon={FaUserClock}
            bgColor="bg-yellow-500"
          />
        </div>

        {/* CSV Export + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 justify-between">
          <div className="flex flex-1 gap-4 flex-wrap">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="attendance_date">Date</option>
              <option value="work_hours">Hours Worked</option>
            </select>
          </div>

          <CSVLink
            data={filtered.map((emp) => ({
              "Employee ID": emp.employee_id,
              "Employee Name": `${emp.first_name} ${emp.last_name}`,
              "Check-in": emp.check_in
                ? new Date(emp.check_in).toLocaleTimeString()
                : "-",
              "Check-out": emp.check_out
                ? new Date(emp.check_out).toLocaleTimeString()
                : "-",
              "Work Hours": emp.work_hours,
              Date: emp.attendance_date?.split("T")[0],
              Status: emp.status,
            }))}
            filename={"attendance.csv"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2 sm:mt-0"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Attendance Table */}
        <div className="flex flex-col gap-4">
          {filtered.map((emp) => (
            <div
              key={emp.id}
              className="flex flex-col md:flex-row items-start md:items-center bg-white border-b border-gray-200 hover:bg-gray-50 px-4 py-4 md:py-3 rounded-lg transition"
            >
              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(emp.id)}
                  onChange={() => toggleSelect(emp.id)}
                />
              </div>

              <div className="w-full md:w-1/12 text-gray-600">
                {emp.employee_id}
              </div>
              <div className="w-full md:w-3/12 font-medium text-gray-800">
                {emp.first_name} {emp.last_name}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">
                {emp.check_in
                  ? new Date(emp.check_in).toLocaleTimeString()
                  : "-"}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">
                {emp.check_out
                  ? new Date(emp.check_out).toLocaleTimeString()
                  : "-"}
              </div>
              <div className="w-full md:w-1/12 text-gray-600">
                {emp.work_hours}
              </div>
              <div className="w-full md:w-2/12 text-gray-600">
                {emp.attendance_date?.split("T")[0]}
              </div>

              <div className="w-full md:w-1/12 flex justify-center md:justify-start">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                    emp.status,
                  )}`}
                >
                  {emp.status}
                </span>
              </div>

              <div className="w-full md:w-1/12 flex justify-end gap-2 mt-2 md:mt-0">
                <ActionDropdown
                  onEdit={() => handleEdit(emp)}
                  onDelete={() => handleDelete(emp.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        <AttendanceModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          editData={editData}
          isAdmin={true}
        />

        <ConfirmationModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Attendance"
          message="Are you sure you want to delete this attendance record?"
        />
      </div>
    </MainLayout>
  );
};

export default Attendance;
