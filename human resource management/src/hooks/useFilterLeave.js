import { useMemo } from "react";

export const useFilteredLeaves = (leaveRequests, search, statusFilter, typeFilter) => {
  return useMemo(() => {
    return leaveRequests.filter((req) => {
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
  }, [leaveRequests, search, statusFilter, typeFilter]);
};