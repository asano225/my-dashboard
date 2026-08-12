import { useNavigate } from "react-router-dom";
import { getSeverityColor } from "../../data/dummyDevice";
import EmptyState from "../EmptyState/EmptyState";
import LoadingState from "../EmptyState/LoadingState";
import ErrorState from "../EmptyState/ErrorState";

export default function DeviceTable({ data, onDelete, loading, error }) {
  const navigate = useNavigate();

  if (loading) return <LoadingState />;

  if (error) return <ErrorState message="Failed to load devices" />;

  if (!data || data.length === 0)
    return (
      <EmptyState
        title="No devices found"
        description="Try adding a new device"
      />
    );

  return (
    <div className="bg-[#1f1f1f] rounded-md p-4 min-h-50">
      <table className="w-full text-sm text-gray-300">
        <thead>
          <tr className="text-left border-b border-[#333]">
            <th className="p-2">Host</th>
            <th className="p-2">Device</th>
            <th className="p-2">IP Address</th>
            <th className="p-2">Group</th>
            <th className="p-2">Severity</th>
            <th className="p-2 text-center">Problem</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              className="border-t border-[#333] hover:bg-[#2a2a2a]"
              key={item.id}
            >
              <td
                onClick={() => navigate(`/devices/${item.id}`)}
                className="p-2 cursor-pointer text-blue-400 hover:underline"
              >
                {item.host}
              </td>

              <td className="p-2">{item.dev}</td>
              <td className="p-2">{item.ip}</td>
              <td className="p-2">{item.group}</td>

              <td className="p-2 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${getSeverityColor(
                    item.severity
                  )}`}
                />
                {formatText(item.severity)}
              </td>

              <td className="p-2 text-center">{item.problem}</td>

              <td
                className={`p-2 font-medium ${
                  item.status === "Available"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {item.status}
              </td>

              <td className="p-2">
                <button
                  className="text-purple-400 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/devices/${item.id}/edit`);
                  }}
                >
                  Edit
                </button>

                <button
                  className="ml-2 text-yellow-400 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}