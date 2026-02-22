import { useMemo } from "react";

export const useFilteredEmployees = (
  employees,
  search,
  departmentFilter,
  statusFilter,
) => {
  return useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp.first_name} ${emp.last_name}`;
      const matchesSearch =
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.employee_code.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        departmentFilter === "All" || emp.department_name === departmentFilter;
      const matchesStatus =
        statusFilter === "All" || emp.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, search, departmentFilter, statusFilter]);
};
