import { useNavigate } from "react-router-dom";
import { getSeverityColor } from "../../data/dummyDevice";

export default function DeviceTable({ data, onDelete }) {
  const navigate = useNavigate();
  console.log("DATA DI TABLE:", data);

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#444] overflow-hidden">
      <table className="font-mono w-full text-left">
        <thead className="bg-[#2a2a2a] text-gray-400 text-xs">
          <tr>
            <th className="p-2">Host</th>
            <th className="p-2">Device</th>
            <th className="p-2">IP Address</th>
            <th className="p-2">Group</th>
            <th className="p-2">Severity</th>
            <th className="p-2">Problem</th>
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
                className="p-2 cursor-pointer text-blue-400 hover:underline transition active:scale-[0.99]"
              >{item.host}</td>
              <td className="p-2">{item.dev}</td>
              <td className="p-2">{item.ip}</td>
              <td className="p-2">{item.group}</td>

              <td className="p-2 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${getSeverityColor(item.severity)}`}
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
                  className="btn btn-sm btn-warning me-2 text-purple-400 hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/devices/${item.id}/edit`);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger text-yellow-400 hover:underline cursor-pointer"
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