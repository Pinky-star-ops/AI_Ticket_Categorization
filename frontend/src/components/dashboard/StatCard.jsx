function StatCard({ title, value, darkMode }) {
  return (
    <div
      className={`
        rounded-xl
        shadow-md
        p-5 sm:p-6
        border
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        ${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-100"
        }
      `}
    >
      <h3
        className={`text-xs sm:text-sm font-medium ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {title}
      </h3>

      <p
        className={`text-2xl sm:text-3xl font-bold mt-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default StatCard;