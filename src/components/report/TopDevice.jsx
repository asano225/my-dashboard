import Card from "../ui/Card";

export default function TopDevices({ devices }) {
  
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Top Problematic Devices
      </h2>

      <table className="w-full text-sm font-mono text-left">
        <thead className="text-gray-400">
          <tr>
            <th>Device</th>
            <th>Alerts</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((d) => (
            <tr key={d.name} className="border-t border-gray-700">
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