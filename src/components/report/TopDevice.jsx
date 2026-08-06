import Card from "../ui/Card";

const devices = [
  { name: "Server A", alerts: 12, status: "Critical" },
  { name: "Router B", alerts: 8, status: "Warning" },
];

export default function TopDevices() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Top Problematic Devices
      </h2>

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left">Device</th>
            <th className="text-left">Alerts</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((d, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="py-2">{d.name}</td>
              <td>{d.alerts}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}