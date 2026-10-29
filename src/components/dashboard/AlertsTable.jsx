import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { useMonitoring } from "../../context/MonitoringContext";

export default function AlertsTable() {
  const { alerts } = useMonitoring();
  const activeAlerts = alerts.filter((a) => a.status === "Active").slice(0, 5);

  return (
    <Card>
      <h3 className="text-white mb-4 font-semibold">Recent Alerts</h3>

      <table className="w-full text-left text-sm font-mono">
        <thead className="text-gray-400">
          <tr>
            <th>Device</th>
            <th>IP Address</th>
            <th>Status</th>
            <th>Problem</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {activeAlerts.map((a, i) => (
            <tr key={a.id || i} className="border-t border-white/10">
              <td className="py-2.5 font-sans font-medium text-white">{a.device}</td>
              <td className="text-gray-300">{a.ip}</td>
              <td>
                <Badge color={a.severity === "Critical" ? "red" : "yellow"}>
                  {a.severity}
                </Badge>
              </td>
              <td className="text-gray-300">{a.problem || 1}</td>
              <td className="text-gray-400">{a.duration}</td>
            </tr>
          ))}
          {activeAlerts.length === 0 && (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500 font-sans">
                No active alerts. All devices healthy!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
