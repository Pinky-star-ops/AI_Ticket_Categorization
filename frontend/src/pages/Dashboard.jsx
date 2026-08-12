import { useEffect, useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import TicketStatusChart from "../components/dashboard/TicketStatusChart";
import {
  getDashboardStats,
  getCategoryStats,
} from "../services/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    closed: 0,
    pending: 0,
    critical: 0,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);

        const categoryData = await getCategoryStats();
        setCategories(categoryData.categories || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Tickets"
          value={stats.total}
        />

        <StatCard
          title="Open"
          value={stats.open}
        />

        <StatCard
          title="Closed"
          value={stats.closed}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
        />

        <StatCard
          title="Critical"
          value={stats.critical}
        />

      </div>

      {/* Ticket Status Chart */}
      <div className="mt-8">
        <TicketStatusChart stats={stats} />
      </div>

      {/* Category Distribution */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Ticket Category Distribution
        </h2>

        {categories.length === 0 ? (
          <p className="text-gray-500">
            No category data available.
          </p>
        ) : (
          <div className="space-y-5">

            {categories.map((category) => {
              const percentage =
                stats.total > 0
                  ? (category.count / stats.total) * 100
                  : 0;

              return (
                <div key={category.name}>

                  <div className="flex justify-between mb-2">

                    <span className="font-medium text-gray-700">
                      {category.name}
                    </span>

                    <span className="text-gray-600">
                      {category.count}
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;