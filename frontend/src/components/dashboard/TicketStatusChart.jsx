import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TicketStatusChart({ stats, darkMode }) {
  const data = {
    labels: ["Open", "Closed", "Pending"],

    datasets: [
      {
        label: "Tickets",

        data: [
          stats.open,
          stats.closed,
          stats.pending,
        ],

        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B",
        ],

        borderWidth: 2,

        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: true,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 20,

          usePointStyle: true,

          color: darkMode ? "#E5E7EB" : "#374151",
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;

            return ` ${context.label}: ${value} tickets`;
          },
        },
      },
    },
  };

  return (
    <div
      className={`rounded-xl p-4 sm:p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-800"
          : "bg-white"
      }`}
    >
      <div className="mb-4 sm:mb-6">

        <h2
          className={`text-lg sm:text-xl font-semibold ${
            darkMode
              ? "text-white"
              : "text-gray-800"
          }`}
        >
          Ticket Status Distribution
        </h2>

        <p
          className={`text-sm mt-1 ${
            darkMode
              ? "text-gray-400"
              : "text-gray-500"
          }`}
        >
          Current distribution of support tickets
        </p>

      </div>

      <div className="w-full max-w-md mx-auto">
        <Pie
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default TicketStatusChart;