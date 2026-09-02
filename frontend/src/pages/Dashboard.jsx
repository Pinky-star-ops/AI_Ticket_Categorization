import { useEffect, useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import TicketStatusChart from "../components/dashboard/TicketStatusChart";
import {
  getDashboardStats,
  getCategoryStats,
} from "../services/dashboardApi";

function Dashboard({ darkMode, setDarkMode }) {
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
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-gray-100"
      }`}
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex items-start justify-between gap-4">
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Dashboard
          </h1>

          <p
            className={`text-sm sm:text-base mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Overview of your support tickets
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg shadow-md border transition-all duration-200 hover:scale-105 ${
            darkMode
              ? "bg-slate-800 text-white border-slate-700"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="spinner mb-4"></div>

          <p
            className={darkMode ? "text-gray-400" : "text-gray-500"}
          >
            Loading dashboard...
          </p>
        </div>
      ) : (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          <StatCard
  title="Total Tickets"
  value={stats.total}
  darkMode={darkMode}
/>

<StatCard
  title="Open"
  value={stats.open}
  darkMode={darkMode}
/>

<StatCard
  title="Closed"
  value={stats.closed}
  darkMode={darkMode}
/>

<StatCard
  title="Pending"
  value={stats.pending}
  darkMode={darkMode}
/>

<StatCard
  title="Critical"
  value={stats.critical}
  darkMode={darkMode}
/>
          </div>

          {/* Ticket Status Chart */}
          <div
            className={`mt-6 sm:mt-8 rounded-xl shadow p-4 sm:p-6 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border border-slate-700"
                : "bg-white"
            }`}
          >
            <TicketStatusChart
              stats={stats}
              darkMode={darkMode}
            />
          </div>

          {/* Category Distribution */}
          <div
            className={`mt-6 sm:mt-8 rounded-xl shadow p-4 sm:p-6 transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border border-slate-700"
                : "bg-white"
            }`}
          >
            <div className="mb-5 sm:mb-6">
              <h2
                className={`text-lg sm:text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Ticket Category Distribution
              </h2>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Breakdown of tickets by category
              </p>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-8">
                <p
                  className={
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }
                >
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
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span
                          className={`font-medium truncate ${
                            darkMode
                              ? "text-gray-200"
                              : "text-gray-700"
                          }`}
                        >
                          {category.name}
                        </span>

                        <span
                          className={`text-sm font-medium ${
                            darkMode
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {category.count}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div
                        className={`w-full rounded-full h-3 overflow-hidden ${
                          darkMode
                            ? "bg-slate-700"
                            : "bg-gray-200"
                        }`}
                      >
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <p
                        className={`text-xs mt-1 ${
                          darkMode
                            ? "text-gray-500"
                            : "text-gray-400"
                        }`}
                      >
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