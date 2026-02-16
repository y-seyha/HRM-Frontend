import { FaEdit, FaTrash } from "react-icons/fa";

const LeaveCard = ({ req, index, role, onEdit, onDelete, showHeader }) => {
  const getStatusColor = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  return (
    <>
      {/* Header Row (Desktop Only) */}
      {showHeader && (
        <div className="hidden md:flex bg-gray-100 text-gray-600 font-semibold px-4 py-2 rounded-t-lg">
          <div className="w-1/12">No</div>
          <div className="w-1/12">ID</div>
          <div className="w-3/12">Employee Name</div>
          <div className="w-2/12">Leave Type</div>
          <div className="w-3/12">Dates</div>
          <div className="w-1/12">Status</div>
          <div className="w-2/12">Approved By</div>
          <div className="w-2/12 text-right">Actions</div>
        </div>
      )}

      {/* Data Row */}
      <div className="flex flex-col md:flex-row bg-white border-b px-4 py-3 rounded-lg hover:bg-gray-50 transition">
        <div className="w-full md:w-1/12">{index + 1}</div>
        <div className="w-full md:w-1/12">{req.employee_id}</div>
        <div className="w-full md:w-3/12">{req.employee_fullname}</div>
        <div className="w-full md:w-2/12">{req.leave_type}</div>
        <div className="w-full md:w-3/12">
          {formatDate(req.start_date)} → {formatDate(req.end_date)}
        </div>
        <div className="w-full md:w-1/12">
          <span
            className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
              req.status || "pending",
            )}`}
          >
            {req.status || "pending"}
          </span>
        </div>
        <div className="w-full md:w-2/12">
          {req.approved_by_fullname || "-"}
        </div>
        <div className="w-full md:w-2/12 flex justify-end gap-2">
          <button
            onClick={() => onEdit(req)}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEdit />
          </button>

          {role === "admin" && (
            <button
              onClick={() => onDelete(req.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaveCard;
