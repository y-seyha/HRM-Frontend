import React from "react";
import { useNavigate } from "react-router-dom"; // React Router v6

const DataTable = ({
  title,
  columns,
  data,
  top = 5,
  statusColors,
  viewDetailLink, // <-- new prop
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      {/* Title + Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          {title} (Top {top})
        </h2>

        {viewDetailLink && (
          <button
            onClick={() => navigate(viewDetailLink)}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-1 rounded"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            View Details
          </button>
        )}
      </div>

      {/* Table */}
      <table className="min-w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="p-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, top).map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {columns.map((col, j) => {
                const value = row[col.toLowerCase()] || row[col];
                const colorClass =
                  statusColors && statusColors[value]
                    ? statusColors[value]
                    : "";
                return (
                  <td key={j} className={`p-3 font-semibold ${colorClass}`}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
