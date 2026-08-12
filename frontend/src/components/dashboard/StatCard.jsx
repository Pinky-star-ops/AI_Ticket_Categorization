function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;