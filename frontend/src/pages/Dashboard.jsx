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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const statsData = await getDashboardStats();
        setStats(statsData);

        const categoryData = await getCategoryStats();
        setCategories(categoryData.categories || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

      {/* Dashboard Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Overview of your support tickets
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="spinner mb-4"></div>

          <p className="text-gray-500">
            Loading dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">

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
          <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow p-4 sm:p-6">
            <TicketStatusChart stats={stats} />
          </div>

          {/* Category Distribution */}
          <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow p-4 sm:p-6">

            <div className="mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Ticket Category Distribution
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Breakdown of tickets by category
              </p>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No category data available.
                </p>
              </div>
            ) : (
              <div className="space-y-5">

                {categories.map((category) => {
                  const percentage =
                    stats.total > 0
                      ? (category.count / stats.total) * 100
                      : 0;

                  return (
                    <div key={category.name}>

                      {/* Category name + count */}
                      <div className="flex items-center justify-between gap-4 mb-2">

                        <span className="font-medium text-gray-700 truncate">
                          {category.name}
                        </span>

                        <span className="text-sm text-gray-600 font-medium">
                          {category.count}
                        </span>

                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      {/* Percentage */}
                      <p className="text-xs text-gray-400 mt-1">
                        {percentage.toFixed(1)}%
                      </p>

                    </div>
                  );
                })}

              </div>
            )}

          </div>
        </>
      )}

    </div>
  );
}

export default Dashboard;