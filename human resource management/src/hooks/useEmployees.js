import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState(["All"]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(API_PATH.EMPLOYEES.GET_ALL);
        setEmployees(data);
        setDepartments([
          "All",
          ...new Set(data.map((e) => e.department_name || "Unassigned")),
        ]);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    const loadPositions = async () => {
      try {
        const { data } = await axiosInstance.get(API_PATH.POSITIONS.GET_ALL);
        setPositions(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadEmployees();
    loadPositions();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axiosInstance.delete(API_PATH.EMPLOYEES.DELETE(id));
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    employees,
    departments,
    positions,
    loading,
    error,
    setEmployees,
    deleteEmployee,
  };
};
