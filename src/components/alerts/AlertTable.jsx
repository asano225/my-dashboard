import EmptyState from "../EmptyState/EmptyState";
import LoadingState from "../EmptyState/LoadingState";
import ErrorState from "../EmptyState/ErrorState";

export default function AlertTable({ loading, error, alerts, onSelect }) {
  if (loading) return <LoadingState />;

  if (error) return <ErrorState message="Failed to load alerts" />;

  if (!alerts || alerts.length === 0)
    return (
      <EmptyState
        title="No alerts found"
        description="No alerts match your filters."
      />
    );

  return (
    <div className="p-3">
      <div className="overflow-hidden border border-[#444444] rounded-md">
      <table className="w-full text-left font-mono">
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
          {alerts.map((a) =>{
            const rowColor =
              a.severity === "Critical"
                ? "bg-red-900/20" 
                : a.severity === "Warning"
                ? "bg-yellow-900/10"
                : "";

            return (
              <tr
                key={a.id}
                className={`border-t border-gray-800 hover:bg-[#222] cursor-pointer ${rowColor}`}
                onClick={() => onSelect(a)}
              >
              <td className="p-3">{a.time}</td>
              <td>{a.device}</td>
              <td>{a.ip}</td>
              <td>{renderSeverity(a.severity)}</td>
              <td>{renderStatus(a.status)}</td>
              <td className="text-right pr-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(a);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
    </div>
    
  );
}

function renderSeverity(sev) {
  const style =
    sev === "Critical"
      ? "text-red-500 bg-red-500/10"
      : sev === "Warning"
      ? "text-yellow-400 bg-yellow-400/10"
      : "text-blue-400 bg-blue-400/10";

  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${style}`}>
      {sev}
    </span>
  );
}

function renderStatus(status) {
  const color =
    status === "Active" ? "text-red-400" : "text-gray-400";

  return <span className={color}>{status}</span>;
}