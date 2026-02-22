import { useMemo } from "react";

export const useChartData = (employees = [], attendance = []) => {
  const lineData = useMemo(
    () => ({
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
    }),
    [attendance],
  );

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

  return { lineData, pieData };
};
