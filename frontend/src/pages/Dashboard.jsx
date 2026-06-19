import { useState, useEffect } from "react";
import { formatCurrency } from "../helpers/formatCurrency";
import { getDashboardStats } from "../services/dashboardServices";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    employeesOnLeave: 0,
    totalMonthlyPayroll: 0,
  });

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const data = await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/*Total Employees*/}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Total Employees</p>
        <h2 className="text-3xl font-bold mt-2">{stats.totalEmployees}</h2>
      </div>

      {/*Acitve Employees*/}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Active Employees</p>
        <h2 className="text-3xl font-bold mt-2">{stats.activeEmployees}</h2>
      </div>

      {/*Employees on Leave*/}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Employees on Leave</p>
        <h2 className="text-3xl font-bold mt-2">{stats.employeesOnLeave}</h2>
      </div>

      {/*Employees on Leave*/}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-500">Total Monthly Payroll</p>
        <h2 className="text-3xl font-bold mt-2">
          {formatCurrency(stats.totalMonthlyPayroll)}
        </h2>
      </div>
    </div>
  );
}

export default Dashboard;
