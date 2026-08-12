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
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ticket Status Distribution
      </h2>

      <div className="max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default TicketStatusChart;