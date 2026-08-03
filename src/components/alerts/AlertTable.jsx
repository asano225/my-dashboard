export default function AlertTable({ alerts, onSelect }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#111] text-gray-400">
          <tr>
            <th className="p-3">Time</th>
            <th>Device</th>
            <th>IP</th>
            <th>Severity</th>
            <th>Status</th>
            <th className="text-right pr-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr
              key={a.id}
              className="border-t border-gray-800 hover:bg-[#222] cursor-pointer"
              onClick={() => onSelect(a)}
            >
              <td className="p-3">{a.time}</td>
              <td>{a.device}</td>
              <td>{a.ip}</td>
              <td>{renderSeverity(a.severity)}</td>
              <td>{renderStatus(a.status)}</td>
              <td className="text-right pr-4">
                <button className="text-blue-400 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderSeverity(sev) {
  const color =
    sev === "Critical"
      ? "text-red-500"
      : sev === "Warning"
      ? "text-yellow-400"
      : "text-blue-400";

  return <span className={color}>{sev}</span>;
}

function renderStatus(status) {
  const color =
    status === "Active" ? "text-red-400" : "text-gray-400";

  return <span className={color}>{status}</span>;
}