import { useState, useEffect } from "react";
import { getDashboardStats } from "../services/dashboardServices";
import { StatItem } from "../components/StatItem";
function Dashboard() {
  const [stats, setStats] = useState([]);

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
      <div className="">
        <h1 className="text-4xl font-bold pt-15 lg:pt-0">Welcome Back </h1>

        <p className="mt-2 text-gray-500">
          Monitor employees from a single dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatItem
            key={stat.name}
            name={stat.name}
            value={stat.value}
            type={stat.type}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
