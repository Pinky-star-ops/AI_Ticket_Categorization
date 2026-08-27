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

function TicketStatusChart({ stats }) {
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
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">

      {/* Chart Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Ticket Status Distribution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Current distribution of support tickets
        </p>
      </div>

      {/* Responsive Chart */}
      <div className="w-full max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>

    </div>
  );
}

export default TicketStatusChart;