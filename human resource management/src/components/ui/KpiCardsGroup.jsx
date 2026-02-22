import { useMemo } from "react";
import KpiCard from "./KpiCard";
import {
  FaUsers,
  FaUserClock,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

export const KpiCardsGroup = ({ employees, leaves, payrollTotal, loading }) => {
  const formattedNetSalary = useMemo(
    () =>
      payrollTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    [payrollTotal],
  );

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, i) => (
        <KpiCard key={i} {...kpi} />
      ))}
    </div>
  );
};
