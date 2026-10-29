import Card from "../ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMonitoring } from "../../context/MonitoringContext";

const cpuColor = ["#3b82f6", "#2a2a2a"];
const ramColor = ["#a855f7", "#2a2a2a"];

export default function ResourceUsage() {
  const { kpiData, devices } = useMonitoring();
  const avgCpu = kpiData.avgCpu || 0;
  const avgRam = kpiData.avgRam || 0;

  const localDev = devices.find((d) => d.mode === "local") || devices[0];
  const hw = localDev?.hardware || localDev?.detail?.hardware;

  const dataCpu = [
    { name: "Used", value: avgCpu },
    { name: "Free", value: Math.max(0, 100 - avgCpu) },
  ];

  const dataRam = [
    { name: "Used", value: avgRam },
    { name: "Free", value: Math.max(0, 100 - avgRam) },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      <Card>
        <div className="grid grid-cols-2 gap-2 items-center text-left">
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Avg. CPU</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-1">{avgCpu}%</h2>
            {hw?.cpuModel && (
              <p className="text-[11px] text-gray-400 truncate mt-1.5" title={hw.cpuModel}>
                {hw.cpuModel}
              </p>
            )}
          </div>

          <div className="w-20 h-20 ml-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataCpu}
                  cx="50%"
                  cy="50%"
                  innerRadius={22}
                  outerRadius={34}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {dataCpu.map((entry, index) => (
                    <Cell key={index} fill={cpuColor[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-2 gap-2 items-center text-left">
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Avg. RAM</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-1">{avgRam}%</h2>
            <p className="text-[11px] text-gray-400 mt-1.5 font-mono">
              {hw?.totalRamGb ? `${hw.usedRamGb || Math.round((avgRam * hw.totalRamGb) / 100)} / ${hw.totalRamGb} GB` : "RAM Physical"}
            </p>
          </div>

          <div className="w-20 h-20 ml-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataRam}
                  cx="50%"
                  cy="50%"
                  innerRadius={22}
                  outerRadius={34}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {dataRam.map((entry, index) => (
                    <Cell key={index} fill={ramColor[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
