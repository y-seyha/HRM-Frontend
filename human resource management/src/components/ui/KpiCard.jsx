const KpiCard = ({ title, value, icon: Icon, bgColor }) => {
  return (
    <div
      className={`p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow flex justify-between items-center ${bgColor} text-white min-h-[140px]`}
    >
      <div className="flex flex-col justify-center">
        <p className="text-sm sm:text-base opacity-80 mb-1">{title}</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{value}</h2>
      </div>
      {Icon && <Icon className="text-4xl sm:text-5xl md:text-6xl opacity-80" />}
    </div>
  );
};

export default KpiCard;
