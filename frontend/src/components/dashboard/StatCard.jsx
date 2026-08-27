function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-5 sm:p-6
        border border-gray-100
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <h3 className="text-gray-500 text-xs sm:text-sm font-medium">
        {title}
      </h3>

      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;