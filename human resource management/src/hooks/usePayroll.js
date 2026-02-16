import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../api/axiosInstance";
import { API_PATH } from "../api/api";

export const usePayroll = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(API_PATH.PAYROLL.GET_ALL);
      const data = res.data.map((p) => ({
        ...p,
        employee_name:
          p.first_name && p.last_name
            ? `${p.first_name} ${p.last_name}`
            : `ID ${p.employee_id}`,
      }));
      setPayments(data);
    } catch (err) {
      setError(err.message || "Failed to fetch payments");
      console.error("Fetch payments error:", err);
    } finally {
      setLoading(false);
    }
  }, []);


  const createPayment = (paymentData) =>
    axiosInstance.post(API_PATH.PAYROLL.CREATE, paymentData).then((res) => {
      setPayments((prev) => [res.data, ...prev]);
      return res.data;
    });

  const updatePayment = (id, updates) =>
    axiosInstance.put(API_PATH.PAYROLL.UPDATE(id), updates).then((res) => {
      setPayments((prev) => prev.map((p) => (p.id === id ? res.data : p)));
      return res.data;
    });

  const deletePayment = (id) =>
    axiosInstance.delete(API_PATH.PAYROLL.DELETE(id)).then(() => {
      setPayments((prev) => prev.filter((p) => p.id !== id));
    });

  const fetchPaymentById = (id) =>
    axiosInstance.get(API_PATH.PAYROLL.GET_BY_ID(id)).then((res) => res.data);

  const getMonthlyPayroll = (year, month) =>
    axiosInstance
      .get(API_PATH.PAYROLL.REPORT_MONTHLY, { params: { year, month } })
      .then((res) => res.data);

  const getYearlyPayrollSummary = (year) =>
    axiosInstance
      .get(API_PATH.PAYROLL.REPORT_YEARLY, { params: { year } })
      .then((res) => res.data);

  const calculateLeaveDeduction = ({
    employee_id,
    base_salary,
    total_work_days,
    month,
    year,
  }) =>
    axiosInstance
      .post(API_PATH.PAYROLL.DEDUCT_LEAVE, {
        employee_id,
        base_salary,
        total_work_days,
        month,
        year,
      })
      .then((res) => res.data.deduction);


  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    loading,
    error,
    refetch: fetchPayments,
    createPayment,
    updatePayment,
    deletePayment,
    fetchPaymentById,
    getMonthlyPayroll,
    getYearlyPayrollSummary,
    calculateLeaveDeduction,
  };
};
