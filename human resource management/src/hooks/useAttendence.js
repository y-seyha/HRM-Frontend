import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All (Admin)
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATH.ATTENDANCE.GET_ALL);
      setAttendance(res.data);
    } catch (err) {
      setError("Failed to fetch attendance");
      console.error("Failed to fetch attendance", err);
    } finally {
      setLoading(false);
    }
  };

  // Check In
  const checkIn = async (data) => {
    if (!data || typeof data !== "object") {
      console.error("Invalid check-in payload:", data);
      return;
    }

    try {
      await axiosInstance.post(API_PATH.ATTENDANCE.CHECK_IN, {
        employee_id: Number(data.employee_id),
        attendance_date: data.attendance_date,
      });
      fetchAttendance();
    } catch (err) {
      console.error("Check-in failed", err);
      alert("Check-in failed: " + err.response?.data?.error || err.message);
    }
  };

  // Check Out
  const checkOut = async (id, status) => {
    try {
      await axiosInstance.put(API_PATH.ATTENDANCE.CHECK_OUT(id), { status });
      fetchAttendance();
    } catch (err) {
      console.error("Check-out failed", err);
      alert("Check-out failed: " + err.response?.data?.error || err.message);
    }
  };

  const updateAttendance = async (id, data) => {
    try {
      await axiosInstance.put(API_PATH.ATTENDANCE.UPDATE(id), data);
      fetchAttendance();
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Delete (Admin)
  const deleteAttendance = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.ATTENDANCE.DELETE(id));
      fetchAttendance();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed: " + err.response?.data?.error || err.message);
    }
  };

  // Monthly Report
  const getMonthlyReport = async (employee_id, month, year) => {
    const res = await axiosInstance.get(
      `${API_PATH.ATTENDANCE.MONTHLY_REPORT(employee_id)}?month=${month}&year=${year}`,
    );
    return res.data;
  };

  // Total Work Hours
  const getTotalHours = async (employee_id) => {
    const res = await axiosInstance.get(
      API_PATH.ATTENDANCE.TOTAL_HOURS(employee_id),
    );
    return res.data;
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return {
    attendance,
    loading,
    error,
    checkIn,
    checkOut,
    deleteAttendance,
    getMonthlyReport,
    getTotalHours,
    refetch: fetchAttendance,
    updateAttendance,
  };
};
