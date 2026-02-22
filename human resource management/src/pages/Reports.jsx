import { useState, useMemo } from "react";
import MainLayout from "../components/Layouts/DashboardLayout";
import KpiCard from "../components/ui/KpiCard";
import { CSVLink } from "react-csv";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaUsers, FaUserClock, FaUserCheck } from "react-icons/fa";
import EmployeeTable from "../components/Employee/EmployeeTable";
import { useReports } from "../hooks/useReport";

const Reports = () => {
  const { employees, leaveRequests, attendance, payroll, loading } =
    useReports();

  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [_deleteId, setDeleteId] = useState(null);

  const departments = ["IT", "HR", "Sales", "Marketing", "Finance"];
  const colors = ["#4ade80", "#facc15", "#f87171"];

  const handleEdit = (emp) => console.log("Edit clicked:", emp);
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };
  const handleDeleteConfirm = () => {
    // Remove employee locally
    setDeleteId(null);
    setIsConfirmOpen(false);
  };

  // Filter leaves by department and status
  const filteredLeaves = useMemo(
    () =>
      leaveRequests.filter(
        (l) =>
          (!filterDept || l.department === filterDept) &&
          (!filterStatus || l.status === filterStatus),
      ),
    [leaveRequests, filterDept, filterStatus],
  );

  // Prepare PieChart data
  const leaveData = useMemo(() => {
    return filteredLeaves.reduce((acc, leave) => {
      const type = leave.leave_type || "Other";
      const existing = acc.find((i) => i.name === type);
      if (existing) existing.value += 1;
      else acc.push({ name: type, value: 1 });
      return acc;
    }, []);
  }, [filteredLeaves]);

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <KpiCard
            title="Total Employees"
            value={employees.length}
            bgColor="bg-gray-800"
            icon={FaUsers}
          />
          <KpiCard
            title="Employees on Leave"
            value={employees.filter((e) => e.status === "On Leave").length}
            bgColor="bg-red-600"
            icon={FaUserClock}
          />
          <KpiCard
            title="Active Employees"
            value={employees.filter((e) => e.status === "Active").length}
            bgColor="bg-green-600"
            icon={FaUserCheck}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            className="border rounded px-3 py-2"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <CSVLink
            data={filteredLeaves}
            filename={"leave-report.csv"}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Employee Table */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6">
          <EmployeeTable
            employees={employees.map((e) => ({
              id: e.id,
              employee_code: e.employee_code || "-",
              first_name: e.first_name || "-",
              last_name: e.last_name || "-",
              email: e.email || "-",
              phone: e.phone || "-",
              date_of_birth: e.date_of_birth || null,
              hire_date: e.hire_date || null,
              department_name: e.department_name || "Unassigned",
              position_name: e.position_name || "Unassigned",
              status: e.status || "Active",
            }))}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
            handleDeleteConfirm={handleDeleteConfirm}
            showActions={false}
            label="Employee"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Attendance Line Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-bold text-gray-700 mb-2">Attendance Trend</h2>
            {loading.attendance ? (
              <p className="text-gray-500">Loading attendance data...</p>
            ) : attendance.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendance}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Present" stroke="#4ade80" />
                  <Line type="monotone" dataKey="Absent" stroke="#f87171" />
                  <Line type="monotone" dataKey="Late" stroke="#facc15" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No attendance data available.</p>
            )}
          </div>

          {/* Leave Pie Chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-bold text-gray-700 mb-2">Leave by Type</h2>
            {loading.leaves ? (
              <p>Loading leave data...</p>
            ) : leaveData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={leaveData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.name} (${entry.value})`}
                  >
                    {leaveData.map((entry, index) => (
                      <Cell key={index} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No leave data available.</p>
            )}
          </div>
        </div>

        {/* Payroll Table */}
        <div className="bg-white shadow rounded overflow-x-auto mb-6">
          <table className="min-w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Employee</th>
                <th className="p-3">Department</th>
                <th className="p-3">Net Pay</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading.payroll ? (
                <tr>
                  <td colSpan={5} className="p-3 text-center">
                    Loading payroll data...
                  </td>
                </tr>
              ) : payroll.length > 0 ? (
                payroll.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="p-3">{p.employee_name}</td>
                    <td className="p-3">{p.department_name || "Unassigned"}</td>
                    <td className="p-3">{p.net_salary}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          p.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status || "-"}
                      </span>
                    </td>
                    <td className="p-3">{p.payment_date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center">
                    No payroll data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
