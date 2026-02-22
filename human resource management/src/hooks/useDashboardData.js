import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";
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

// REGISTER ELEMENTS AND SCALES
ChartJS.register(
  CategoryScale, // for X-axis of line chart
  LinearScale, // for Y-axis of line chart
  PointElement, // for points in line chart
  LineElement, // for line chart itself
  ArcElement, // for pie/doughnut chart
  Title,
  Tooltip,
  Legend,
);

export const useDashboardData = () => {
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
    const fetchData = async () => {
      try {
        setLoading({
          employees: true,
          leaves: true,
          attendance: true,
          payroll: true,
        });

        // Employees
        const empRes = await axiosInstance.get(API_PATH.EMPLOYEES.GET_ALL);
        setEmployees(
          empRes.data.map((e) => ({
            ...e,
            name: `${e.first_name} ${e.last_name}`,
          })),
        );

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

        // Payroll
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

    fetchData();
  }, []);

  return { employees, leaves, attendance, payrollTotal, loading };
};
