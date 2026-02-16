import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { API_PATH } from "../../api/api";

export const useLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeave = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATH.LEAVE_REQUEST.GET_ALL);
      setLeaveRequests(res.data);
    } catch (err) {
      console.error("Fetch leaves error", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteLeave = async (id) => {
    await axiosInstance.delete(API_PATH.LEAVE_REQUEST.DELETE(id));
    setLeaveRequests((prev) => prev.filter((l) => l.id !== id));
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  return { leaveRequests, loading, fetchLeave, deleteLeave };
};
