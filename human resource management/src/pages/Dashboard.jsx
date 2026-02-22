import { useChartData } from "../hooks/useChartData";
import { useDashboardData } from "../hooks/useDashboardData";
import MainLayout from "../components/Layouts/DashboardLayout";
import { KpiCardsGroup } from "../components/ui/KpiCardsGroup";
import DataTable from "../components/ui/DataTable";
import ChartWrapper from "../components/ui/ChartWrapper";

const Dashboard = () => {
  const { employees, leaves, attendance, payrollTotal, loading } =
    useDashboardData();
  const { lineData, pieData } = useChartData(employees, attendance);
  const statusColors = {
    Active: "text-green-600",
    "On Leave": "text-red-600",
    Approved: "text-green-600",
    Pending: "text-yellow-600",
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-gray-100 to-blue-50 p-6 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <KpiCardsGroup
          employees={employees}
          leaves={leaves}
          payrollTotal={payrollTotal}
          loading={loading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DataTable
            title="Employee List"
            columns={["id", "name", "department_name", "status"]}
            data={employees}
            top={5}
            statusColors={statusColors}
            viewDetailLink="/employees"
            loading={loading.employees}
          />
          <DataTable
            title="Leave Requests"
            columns={[
              "employee_name",
              "leave_type",
              "from_date",
              "to_date",
              "status",
            ]}
            data={leaves}
            top={5}
            statusColors={statusColors}
            viewDetailLink="/leave"
            loading={loading.leaves}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartWrapper
            type="line"
            data={lineData}
            options={{ animation: { duration: 1500, easing: "easeOutQuart" } }}
          />
          <ChartWrapper
            type="pie"
            data={pieData}
            options={{
              animation: { duration: 1500, easing: "easeOutQuart" },
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
