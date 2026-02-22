import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

export const useReports = () => {
  const [employees, setEmployees] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [payroll, setPayroll] = useState([]);

  const [loading, setLoading] = useState({
    employees: true,
    leaves: true,
    attendance: true,
    payroll: true,
  });

  const fetchReports = async () => {
    try {
      // Employees
      setLoading((prev) => ({ ...prev, employees: true }));
      const empRes = await axiosInstance.get(API_PATH.EMPLOYEES.GET_ALL);
      setEmployees(empRes.data);

      // Leaves
      setLoading((prev) => ({ ...prev, leaves: true }));
      const leaveRes = await axiosInstance.get(API_PATH.LEAVE_REQUEST.GET_ALL);
      setLeaveRequests(leaveRes.data);

      // Attendance
      setLoading((prev) => ({ ...prev, attendance: true }));
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
      setLoading((prev) => ({ ...prev, payroll: true }));
      const payrollRes = await axiosInstance.get(API_PATH.PAYROLL.GET_ALL);
      setPayroll(payrollRes.data);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading({
        employees: false,
        leaves: false,
        attendance: false,
        payroll: false,
      });
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    employees,
    leaveRequests,
    attendance,
    payroll,
    loading,
    refetch: fetchReports,
  };
};
