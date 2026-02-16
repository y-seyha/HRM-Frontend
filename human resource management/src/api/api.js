export const BASE_URL = import.meta.env.VITE_BASE_DEVELOPING_URL;

export const API_PATH = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  DEPARTMENTS: {
    GET_ALL: "/departments",
    GET_BY_ID: (id) => `/departments/${id}`,
    CREATE: "/departments",
    UPDATE: (id) => `/departments/${id}`,
    DELETE: (id) => `/departments/${id}`,
  },
  POSITIONS: {
    GET_ALL: "/positions",
    GET_BY_ID: (id) => `/positions/${id}`,
    CREATE: "/positions",
    UPDATE: (id) => `/positions/${id}`,
    DELETE: (id) => `/positions/${id}`,
  },
  EMPLOYEES: {
    GET_ALL: "/employees", // only admin can access
    GET_BY_ID: (id) => `/employees/${id}`,
    CREATE: "/employees", // admin only
    UPDATE: (id) => `/employees/${id}`, // admin only
    DELETE: (id) => `/employees/${id}`, // admin only
  },
  USERS: {
    GET_ALL: "/users", // admin only
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: "/users", // admin only
    UPDATE: (id) => `/users/${id}`, // admin only
    DELETE: (id) => `/users/${id}`, // admin only
  },
  ATTENDANCE: {
    GET_ALL: "/attendance", // admin only
    GET_BY_ID: (id) => `/attendance/${id}`, // admin only
    DELETE: (id) => `/attendance/${id}`, // admin only
    CHECK_IN: "/attendance/check-in", // employee + admin
    CHECK_OUT: (id) => `/attendance/check-out/${id}`, // employee + admin
    MONTHLY_REPORT: (employee_id) => `/attendance/report/${employee_id}`, // admin only
    TOTAL_HOURS: (employee_id) => `/attendance/total-hours/${employee_id}`, // employee + admin
  },
  LEAVE_REQUEST: {
    GET_ALL: "/leaves", // admin + employee
    GET_BY_ID: (id) => `/leaves/${id}`, // admin + employee
    CREATE: "/leaves", // admin + employee
    GET_BY_EMPLOYEE: (employee_id) => `/leaves/employee/${employee_id}`, // ownership check
    APPROVE_REJECT: (id) => `/leaves/approve-reject/${id}`, // admin only
    DELETE: (id) => `/leaves/${id}`, // admin only
  },

  PAYROLL: {
    GET_ALL: "/payment",
    GET_BY_ID: (id) => `/payment/${id}`,
    CREATE: "/payment",
    UPDATE: (id) => `/payment/${id}`,
    DELETE: (id) => `/payment/${id}`,
    REPORT_MONTHLY: "/payment/report/monthly",
    REPORT_YEARLY: "/payment/report/yearly",
    DEDUCT_LEAVE: "/payment/deduct-leave",
  },
};
