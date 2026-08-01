import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function AlertsTable() {
  const alerts = [
    {device: "PC", ipAddress: "192.150.204.204",status: "Critical", problem:"5", duration: "0h 2m" },
    { device: "Server", ipAddress: "192.150.204.1",status: "Warning", problem:"1", duration: "0h 2m" },
  ];

  return (
    <Card>
      <h3 className="text-white mb-4 font-semibold">Recent Alerts</h3>

      <table className="w-full text-left text-sm">
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
          {alerts.map((a, i) => (
            <tr key={i} className="border-t border-white/10">
              <td className="py-2">{a.device}</td>
              <td>{a.ipAddress}</td>
              <td>
                <Badge color={a.status === "Critical" ? "red" : "yellow"}>
                  {a.status}
                </Badge>
              </td>
              <td>{a.problem}</td>
              <td>{a.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}