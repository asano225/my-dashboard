import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { useParams } from "react-router-dom";
import { useMonitoring } from "../../context/MonitoringContext";

export default function DeviceSummary({ device: propDevice }) {
  const { id } = useParams();
  const { devices } = useMonitoring();

  const device = propDevice || devices.find((d) => String(d.id) === String(id));

  if (!device) return <p className="text-gray-400">Not found</p>;

  const detail = device.detail;

  if (!detail) {
    return <p className="text-red-400">Detail data not available</p>;
  }

  const isNetworkOnly = device.mode === "real" || device.mode === "snmp";

  return (
    <div className="flex flex-col md:flex-row gap-3 mt-2 text-sm">
      <div className="flex flex-col gap-2 h-full w-full md:w-64">
        <Card className="flex h-full bg-[#1f2937] text-left justify-between items-center">
          <p>Status:</p>
          <Badge color={device.status === "Unavailable" ? "red" : "green"}>
            {device.status}
          </Badge>
        </Card>
        <Card className="flex h-full bg-[#1f2937] text-left justify-between items-center">
          <p>Severity:</p>
          <Badge
            color={
              device.severity === "Critical"
                ? "red"
                : device.severity === "Warning"
                ? "yellow"
                : "green"
            }
          >
            {device.severity}
          </Badge>
        </Card>
      </div>

      <div className="flex flex-col gap-3 w-full h-full">
        {/* CPU & RAM */}
        <Card className="bg-[#c1cfff] p-4 h-full w-full space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-black font-semibold">
                {isNetworkOnly ? "Ping Latency" : "CPU Usage"}
              </h3>
              <p className="text-sm text-black font-mono">
                {isNetworkOnly ? `${device.latency || 2} ms` : `${detail.cpu.usage}%`}
              </p>
            </div>

            <div className="w-full bg-[#364153] h-2 rounded overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded transition-all duration-500"
                style={{ width: `${Math.min(100, isNetworkOnly ? (device.latency || 2) : detail.cpu.usage)}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="text-black font-semibold">
                {isNetworkOnly ? "TCP Port Status" : "RAM Usage"}
              </h3>
              <p className="text-sm text-black font-mono">
                {isNetworkOnly ? (device.openPortStatus || "Active") : `${detail.memory.usage}%`}
              </p>
            </div>

            <div className="w-full bg-[#364153] h-2 rounded overflow-hidden">
              <div
                className="bg-purple-500 h-2 rounded transition-all duration-500"
                style={{ width: `${isNetworkOnly ? 100 : detail.memory.usage}%` }}
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="flex flex-col text-left text-black justify-center bg-[#38b6ff] md:w-44">
        <p className="text-xs font-semibold uppercase tracking-wider">
          {isNetworkOnly ? "Response Time" : "Download"}
        </p>
        <p className="text-2xl font-bold">
          {isNetworkOnly ? `${device.latency || 2} ms` : `${detail.network.download} Mbps`}
        </p>
      </Card>

      <Card className="flex flex-col text-left text-black justify-center bg-[#cb6ce6] md:w-44">
        <p className="text-xs font-semibold uppercase tracking-wider">
          {isNetworkOnly ? "Port Target" : "Upload"}
        </p>
        <p className="text-2xl font-bold">
          {isNetworkOnly ? (device.ports?.[0] || 80) : `${detail.network.upload} Mbps`}
        </p>
      </Card>
    </div>
  );
}
