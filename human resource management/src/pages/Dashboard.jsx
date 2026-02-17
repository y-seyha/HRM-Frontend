import React, { useEffect, useMemo, useState } from "react";
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
import KpiCard from "../components/ui/KpiCard";
import DataTable from "../components/ui/DataTable";
import ChartWrapper from "../components/ui/ChartWrapper";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

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
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payrollTotal, setPayrollTotal] = useState(0); 
  const [loading, setLoading] = useState({
    employees: true,
    leaves: true,
    attendance: true,
    payroll: true,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading({
          employees: true,
          leaves: true,
          attendance: true,
          payroll: true,
        });

        // Employees
        const empRes = await axiosInstance.get(API_PATH.EMPLOYEES.GET_ALL);
        const formattedEmployees = empRes.data.map((e) => ({
          ...e,
          name: `${e.first_name} ${e.last_name}`,
        }));
        setEmployees(formattedEmployees);

        // Leaves
        const leaveRes = await axiosInstance.get(
          API_PATH.LEAVE_REQUEST.GET_ALL,
        );
        setLeaves(
          leaveRes.data.map((l) => ({
            employee_name: l.employee_fullname,
            leave_type: l.leave_type,
            from_date: new Date(l.start_date).toLocaleDateString(),
            to_date: new Date(l.end_date).toLocaleDateString(),
            status: l.status.charAt(0).toUpperCase() + l.status.slice(1),
          })),
        );

        // Attendance
        const attRes = await axiosInstance.get(API_PATH.ATTENDANCE.GET_ALL);
        const chartData = {};
        attRes.data.forEach((rec) => {
          const date = rec.attendance_date.split("T")[0];
          if (!chartData[date])
            chartData[date] = { date, Present: 0, Absent: 0, Late: 0 };
          chartData[date][rec.status] = (chartData[date][rec.status] || 0) + 1;
        });
        setAttendance(Object.values(chartData));

        // **Total Payroll (All Time)**
        const payrollRes = await axiosInstance.get(API_PATH.PAYROLL.TOTAL);
        setPayrollTotal(payrollRes.data.total_net_salary || 0);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading({
          employees: false,
          leaves: false,
          attendance: false,
          payroll: false,
        });
      }
    };

    fetchDashboardData();
  }, []);

  // Format payroll for display
  const formattedNetSalary = useMemo(() => {
    return payrollTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, [payrollTotal]);

  //KPI Cards
  const kpiData = [
    {
      title: "Total Employees",
      value: loading.employees ? "Loading..." : employees.length,
      icon: FaUsers,
      bgColor: "bg-indigo-600",
    },
    {
      title: "On Leave Today",
      value: loading.employees
        ? "Loading..."
        : employees.filter((e) => e.status === "On Leave").length,
      icon: FaUserClock,
      bgColor: "bg-orange-500",
    },
    {
      title: "Pending Leave Requests",
      value: loading.leaves
        ? "Loading..."
        : leaves.filter((l) => l.status === "Pending").length,
      icon: FaClipboardList,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Payroll (All Time)",
      value: loading.payroll ? "Loading..." : formattedNetSalary,
      icon: FaMoneyBillWave,
      bgColor: "bg-green-600",
    },
  ];

  //Attendance Chart
  const lineData = {
    labels: attendance.map((d) => d.date),
    datasets: [
      {
        label: "Present",
        data: attendance.map((d) => d.Present),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74,222,128,0.2)",
      },
      {
        label: "Absent",
        data: attendance.map((d) => d.Absent),
        borderColor: "#f87171",
        backgroundColor: "rgba(248,113,113,0.2)",
      },
      {
        label: "Late",
        data: attendance.map((d) => d.Late),
        borderColor: "#facc15",
        backgroundColor: "rgba(250,204,21,0.2)",
      },
    ],
  };

  // Department Pie Chart
  const pieData = useMemo(() => {
    const deptCounts = employees.reduce((acc, e) => {
      const dept = e.department_name || "Unassigned";
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(deptCounts),
      datasets: [
        {
          label: "Employees",
          data: Object.values(deptCounts),
          backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
        },
      ],
    };
  }, [employees]);

  const statusColors = {
    Active: "text-green-600",
    "On Leave": "text-red-600",
    Approved: "text-green-600",
    Pending: "text-yellow-600",
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 p-6 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, i) => (
            <KpiCard key={i} {...kpi} />
          ))}
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DataTable
            title="Employee List"
            columns={["id", "name", "department_name", "status"]}
            data={employees}
            top={5}
            statusColors={statusColors}
            viewDetailLink="/employees"
            loading={loading.employees}
          />
          <DataTable
            title="Leave Requests"
            columns={[
              "employee_name",
              "leave_type",
              "from_date",
              "to_date",
              "status",
            ]}
            data={leaves}
            top={5}
            statusColors={statusColors}
            viewDetailLink="/leave"
            loading={loading.leaves}
          />
        </div>

        {/* Charts */}
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
