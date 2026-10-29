import { useParams, useNavigate } from "react-router-dom";
import DeviceSummary from "../components/DeviceDetail/DeviceSummary";
import DeviceChart from "../components/DeviceDetail/DeviceChart";
import HardwareSpecsCard from "../components/DeviceDetail/HardwareSpecsCard";
import { useMonitoring } from "../context/MonitoringContext";
import { ArrowLeft } from "lucide-react";

export default function DeviceDetail({ devices: propDevices }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { devices } = useMonitoring();

  const allDevices = propDevices || devices;
  const device = allDevices.find((d) => String(d.id) === String(id));

  if (!device) {
    return (
      <div className="p-8 text-center text-gray-400 space-y-4">
        <p className="text-lg">Device not found (ID: {id})</p>
        <button
          onClick={() => navigate("/devices")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Devices
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#121212] min-h-screen text-gray-300 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/devices")}
            className="p-1.5 bg-[#1e1e1e] hover:bg-gray-800 rounded text-gray-300 transition cursor-pointer"
            title="Back to Devices"
          >
            <ArrowLeft size={18} />
          </button>
          <p className="text-lg md:text-xl font-semibold lg:text-2xl text-white leading-tight">
            {device.host} ({device.ip})
          </p>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700 font-mono">
            {device.dev} • Mode: {device.mode || "real"}
          </span>
        </div>
      </div>

      <DeviceSummary device={device} />
      <HardwareSpecsCard device={device} />
      <DeviceChart device={device} />
    </div>
  );
}
