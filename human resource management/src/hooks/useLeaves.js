import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

export const useLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATH.LEAVE_REQUEST.GET_ALL);
      setLeaveRequests(res.data);
    } catch (err) {
      console.error("Fetch leaves error:", err);
      setError("Failed to load leave requests.");
    } finally {
      setLoading(false);
    }
  };

  const deleteLeave = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.LEAVE_REQUEST.DELETE(id));
      setLeaveRequests((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return { leaveRequests, fetchLeaves, deleteLeave, loading, error };
};
