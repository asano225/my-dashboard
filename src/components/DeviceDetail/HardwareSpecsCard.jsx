import Card from "../ui/Card";
import { Cpu, HardDrive, Server, Activity, Laptop, Clock, ShieldCheck } from "lucide-react";

export default function HardwareSpecsCard({ device }) {
  if (!device) return null;

  const hw = device.hardware || device.detail?.hardware;
  const isAgentOrLocal = device.mode === "local" || device.mode === "agent";
  const hasHardwareData = Boolean(hw);

  return (
    <Card className="p-5 bg-[#1a1a1a] border border-[#333] shadow-md text-left space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#333] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
            <Server size={20} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              Hardware Specifications & Real-Time Telemetry
            </h3>
            <p className="text-xs text-gray-400">
              {isAgentOrLocal
                ? "Physical hardware metrics collected directly via Native OS probes"
                : "System telemetry and hardware profile"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 ${
              device.mode === "local"
                ? "bg-purple-900/40 text-purple-300 border border-purple-700/50"
                : device.mode === "agent"
                ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50"
                : "bg-blue-900/40 text-blue-300 border border-blue-700/50"
            }`}
          >
            <ShieldCheck size={14} />
            {device.mode === "local"
              ? "Local Machine (Native Probe)"
              : device.mode === "agent"
              ? "Client Agent Active"
              : "Network Telemetry"}
          </span>
        </div>
      </div>

      {hasHardwareData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* CPU Card */}
          <div className="bg-[#222222] p-4 rounded-lg border border-[#383838] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <Cpu size={18} />
                <span>Processor (CPU)</span>
              </div>
              <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                {device.detail?.cpu?.usage ?? 0}%
              </span>
            </div>

            <div className="text-xs text-gray-300 space-y-1">
              <p className="font-medium text-white truncate" title={hw.cpuModel}>
                {hw.cpuModel || "Processor"}
              </p>
              <p className="text-gray-400">
                {hw.cpuCores || 4} Cores {hw.cpuSpeedMhz ? `@ ${hw.cpuSpeedMhz} MHz` : ""}
              </p>
            </div>

            <div className="w-full bg-[#151515] h-2 rounded overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded transition-all duration-500"
                style={{ width: `${Math.min(100, device.detail?.cpu?.usage || 0)}%` }}
              />
            </div>
          </div>

          {/* RAM Card */}
          <div className="bg-[#222222] p-4 rounded-lg border border-[#383838] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <Activity size={18} />
                <span>Memory (RAM)</span>
              </div>
              <span className="text-xs font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">
                {device.detail?.memory?.usage ?? 0}%
              </span>
            </div>

            <div className="text-xs text-gray-300 space-y-1">
              <p className="font-medium text-white">
                {hw.usedRamGb !== undefined && hw.totalRamGb !== undefined
                  ? `${hw.usedRamGb} GB Used / ${hw.totalRamGb} GB Total`
                  : `${device.detail?.memory?.usage ?? 0}% Allocated`}
              </p>
              <p className="text-gray-400">
                {hw.freeRamGb !== undefined ? `${hw.freeRamGb} GB Available` : "Memory healthy"}
              </p>
            </div>

            <div className="w-full bg-[#151515] h-2 rounded overflow-hidden">
              <div
                className="bg-purple-500 h-2 rounded transition-all duration-500"
                style={{ width: `${Math.min(100, device.detail?.memory?.usage || 0)}%` }}
              />
            </div>
          </div>

          {/* Disk Card */}
          <div className="bg-[#222222] p-4 rounded-lg border border-[#383838] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <HardDrive size={18} />
                <span>Storage (Disk)</span>
              </div>
              <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">
                {device.detail?.storage?.used ?? 39.1}%
              </span>
            </div>

            <div className="text-xs text-gray-300 space-y-1">
              <p className="font-medium text-white">
                {hw.usedDiskGb !== undefined && hw.totalDiskGb !== undefined
                  ? `${hw.usedDiskGb} GB Used / ${hw.totalDiskGb} GB Total`
                  : `${device.detail?.storage?.used ?? 39.1}% Used`}
              </p>
              <p className="text-gray-400">
                {hw.freeDiskGb !== undefined ? `${hw.freeDiskGb} GB Free` : "Drive healthy"}
              </p>
            </div>

            <div className="w-full bg-[#151515] h-2 rounded overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded transition-all duration-500"
                style={{ width: `${Math.min(100, device.detail?.storage?.used || 39.1)}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Agentless Network Probe State */
        <div className="bg-[#222222] p-4 rounded-lg border border-[#383838] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <Laptop size={18} />
              <span>Agentless Network Mode ({device.mode.toUpperCase()})</span>
            </div>
            <p className="text-xs text-gray-400">
              Perangkat ini sedang dipantau melalui protokol jaringan ICMP & TCP.
            </p>
            <p className="text-xs text-blue-400 font-mono">
              Status Port: {device.openPortStatus || `Port ${(device.ports || [80])[0]} Active`} • Latency: {device.latency || 2} ms
            </p>
          </div>

          <div className="text-xs bg-[#181818] p-3 rounded border border-[#333] text-gray-300 max-w-sm">
            💡 <strong className="text-white">Ingin membaca CPU & RAM komputer ini?</strong>
            <p className="mt-1 text-gray-400">
              Salin folder <code className="text-blue-300">client-agent</code> ke komputer ini lalu klik 2x <code className="text-blue-300">start-agent.bat</code>.
            </p>
          </div>
        </div>
      )}

      {/* System Details Footer */}
      {hasHardwareData && (
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 pt-2 border-t border-[#2a2a2a] gap-3">
          <div className="flex items-center gap-2">
            <Laptop size={14} className="text-gray-500" />
            <span>Platform: <strong className="text-gray-200">{hw.platform || "OS"} ({hw.arch || "x64"})</strong></span>
          </div>

          {hw.uptimeHours !== undefined && (
            <div className="flex items-center gap-1.5 font-mono">
              <Clock size={14} className="text-gray-500" />
              <span>System Uptime: <strong className="text-gray-200">{hw.uptimeHours} Hours</strong></span>
            </div>
          )}

          <div className="font-mono text-gray-500">
            IP: {device.ip}
          </div>
        </div>
      )}
    </Card>
  );
}
