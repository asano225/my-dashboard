import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function TopDevices({ devices }) {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Top Problematic Devices
      </h2>

      <table className="w-full text-sm font-mono text-left">
        <thead className="text-gray-400">
          <tr>
            <th className="py-2">Device</th>
            <th className="py-2">Alerts</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((d) => (
            <tr key={d.name} className="border-t border-gray-800 hover:bg-[#252525] transition">
              <td className="py-3 font-medium text-white">{d.name}</td>
              <td className="text-gray-300 font-bold">{d.alerts}</td>
              <td>
                <Badge
                  color={
                    d.status === "Critical"
                      ? "red"
                      : d.status === "Warning"
                      ? "yellow"
                      : "green"
                  }
                >
                  {d.status}
                </Badge>
              </td>
            </tr>
          ))}
          {(!devices || devices.length === 0) && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-500 font-sans">
                No problematic devices recorded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
