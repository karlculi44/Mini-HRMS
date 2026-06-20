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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold pt-15 lg:pt-0">Welcome Back </h1>

        <p className="mt-2 text-gray-500">
          Monitor employee records, attendance, payroll, and salary information
          from a single dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Employees */}
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 text-blue-600">
          <p className="text-gray-500">Total Employees</p>
          <h2 className="text-3xl font-bold mt-2">{stats.totalEmployees}</h2>
        </div>

        {/* Active Employees */}
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 text-green-600">
          <p className="text-gray-500">Active Employees</p>
          <h2 className="text-3xl font-bold mt-2">{stats.activeEmployees}</h2>
        </div>

        {/* Employees on Leave */}
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 text-amber-500">
          <p className="text-gray-500">Employees on Leave</p>
          <h2 className="text-3xl font-bold mt-2">{stats.employeesOnLeave}</h2>
        </div>

        {/* Total Monthly Payroll */}
        <div className="bg-white p-6 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 ">
          <p className="text-gray-500">Total Monthly Payroll</p>
          <h2 className="text-3xl font-bold mt-2">
            {formatCurrency(stats.totalMonthlyPayroll)}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
