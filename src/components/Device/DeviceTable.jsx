import { useNavigate } from "react-router-dom";
import { dummyData, getSeverityColor } from "../../data/dummyDevice";

export default function DeviceTable() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#444] overflow-hidden">
      <table className="font-mono w-full text-left">
        <thead className="bg-[#2a2a2a] text-gray-400 text-xs">
          <tr>
            <th className="p-2">Host</th>
            <th className="p-2">IP Address</th>
            <th className="p-2">Severity</th>
            <th className="p-2">Problem</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {dummyData.map((item) => (
            <tr
              key={item.id}
              onClick={() => navigate(`/device/${item.id}`)}
              className="border-t border-[#333] hover:bg-[#2a2a2a] cursor-pointer transition active:scale-[0.99]"
            >
              <td className="p-2">{item.host}</td>
              <td className="p-2">{item.ip}</td>

              <td className="p-2 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${getSeverityColor(item.severity)}`}
                />
                {item.severity}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}