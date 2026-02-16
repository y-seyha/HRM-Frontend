const LeaveFilters = ({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  leaveTypes,
}) => {
  const statuses = ["All", "pending", "approved", "rejected"];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        {leaveTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeaveFilters;
