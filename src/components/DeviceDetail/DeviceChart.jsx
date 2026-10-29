import { useParams } from "react-router-dom";
import { MiniChart, PieChartCard } from "../Device/MiniCHart";
import { useMonitoring } from "../../context/MonitoringContext";

export default function DeviceChart({ device: propDevice }) {
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
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-left">
      <StorageSection 
        title={isNetworkOnly ? "ICMP Packet Stability" : "Storage Usage"}
        detail={detail.storage}
        isNetworkOnly={isNetworkOnly}
      />
      
      <DeviceCard
        title={isNetworkOnly ? "Network Latency History (ms)" : "CPU Utilization History (%)"}
        value={isNetworkOnly ? `${device.latency || 2} ms` : `${detail.cpu.usage}%`}
        data={detail.cpu.history}
      />

      <DeviceCard
        title={isNetworkOnly ? "TCP Handshake Stability" : "Memory Utilization History (%)"}
        value={isNetworkOnly ? (device.openPortStatus || "Stable") : `${detail.memory.usage}%`}
        data={detail.memory.history}
      />

      <DeviceCard
        title="Network Throughput"
        value={`${detail.network.download} Mbps DL / ${detail.network.upload} Mbps UL`}
        data={detail.network.traffic}
      />
    </div>
  );
}

function DeviceCard({ title, value, data }) {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#444]">
      <h2 className="text-sm text-gray-400">{title}</h2>

      <p className="text-xl font-semibold text-white mt-2">
        {value}
      </p>

      <MiniChart data={data} />
    </div>
  );
}

function StorageSection({ title, detail, isNetworkOnly }) {
  const used = detail?.used ?? 0;
  const free = detail?.free ?? 100;

  const data = isNetworkOnly
    ? [
        { name: "Successful Packets", value: 98 },
        { name: "Loss", value: 2 },
      ]
    : [
        { name: "Used", value: used },
        { name: "Free", value: free },
      ];

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg border border-[#444]">
      <h2 className="text-sm text-gray-400">{title}</h2>

      <div className="flex items-center mt-2">
        <div className="flex-1">
          <div className="text-sm space-y-1">
            <div className="font-semibold text-gray-200">
              {isNetworkOnly ? "Delivery Rate: 98%" : `Used: ${used}%`}
            </div>
            <div className="font-semibold text-gray-400">
              {isNetworkOnly ? "Packet Loss: 2%" : `Free: ${free}%`}
            </div>
          </div>
        </div>

        <div className="w-28 h-28">
          <PieChartCard
            data={data}
            colors={isNetworkOnly ? ["#00bf63", "#ff3131"] : ["#3b82f6", "#22c55e"]}
          />
        </div>
      </div>
    </div>
  );
}
