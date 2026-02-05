import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  FaUsers,
  FaUserClock,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

import MainLayout from "../components/Layouts/DashboardLayout";
import Navbar from "../components/ui/Navbar";
import KpiCard from "../components/ui/KpiCard";
import DataTable from "../components/ui/DataTable";
import ChartWrapper from "../components/ui/ChartWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const employees = [
    { id: 1, name: "Alice", dept: "IT", status: "Active" },
    { id: 2, name: "Bob", dept: "HR", status: "On Leave" },
    { id: 3, name: "Charlie", dept: "Sales", status: "Active" },
    { id: 4, name: "Diana", dept: "Marketing", status: "Active" },
    { id: 5, name: "Evan", dept: "IT", status: "Active" },
    { id: 6, name: "Frank", dept: "HR", status: "Active" },
  ];

  const leaves = [
    {
      name: "Alice",
      type: "Sick",
      from: "2026-02-01",
      to: "2026-02-03",
      status: "Pending",
    },
    {
      name: "Bob",
      type: "Annual",
      from: "2026-02-05",
      to: "2026-02-07",
      status: "Approved",
    },
    {
      name: "Charlie",
      type: "Emergency",
      from: "2026-02-08",
      to: "2026-02-09",
      status: "Pending",
    },
    {
      name: "Diana",
      type: "Annual",
      from: "2026-02-10",
      to: "2026-02-12",
      status: "Approved",
    },
    {
      name: "Evan",
      type: "Sick",
      from: "2026-02-13",
      to: "2026-02-14",
      status: "Approved",
    },
  ];

  const kpiData = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: FaUsers,
      bgColor: "bg-indigo-600",
    },
    {
      title: "On Leave Today",
      value: employees.filter((e) => e.status === "On Leave").length,
      icon: FaUserClock,
      bgColor: "bg-orange-500",
    },
    {
      title: "Pending Leave Requests",
      value: leaves.filter((l) => l.status === "Pending").length,
      icon: FaClipboardList,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Payroll (This Month)",
      value: "$22,000",
      icon: FaMoneyBillWave,
      bgColor: "bg-green-600",
    },
  ];

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance",
        data: [80, 75, 90, 85, 95, 100],
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.2)",
      },
    ],
  };

  const pieData = {
    labels: ["HR", "IT", "Sales", "Marketing"],
    datasets: [
      {
        label: "Payroll",
        data: [5000, 7000, 6000, 4000],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  const employeeColumns = ["id", "name", "dept", "status"];
  const leaveColumns = ["name", "type", "from", "to", "status"];
  const statusColors = {
    Active: "text-green-600",
    "On Leave": "text-red-600",
    Approved: "text-green-600",
    Pending: "text-yellow-600",
  };

  return (
    <MainLayout>
      <Navbar />
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 p-6 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, i) => (
            <KpiCard key={i} {...kpi} />
          ))}
        </div>

        {/* TABLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DataTable
            title="Employee List"
            columns={employeeColumns}
            data={employees}
            top={5}
            statusColors={statusColors}
            viewDetailLink="/employees"
          />
          <DataTable
            title="Leave Requests"
            columns={leaveColumns}
            data={leaves}
            top={5}
            statusColors={statusColors}
            viewDetailLink="/leave"
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartWrapper
            type="line"
            data={lineData}
            options={{ animation: { duration: 1500, easing: "easeOutQuart" } }}
          />
          <ChartWrapper
            type="pie"
            data={pieData}
            options={{
              animation: { duration: 1500, easing: "easeOutQuart" },
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
